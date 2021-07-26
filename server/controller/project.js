const { ProjectByUser, Project, Content, StackForProject, Stack } = require('../models/index')
const { verifyAccessToken } = require('./tokens/tokenFunctions')
const fs = require('fs');
require('dotenv').config();

module.exports = {

    getProjectData: async (req, res) => {

        const projectId = req.params.projectid;

        // Project 테이블에서 기본 정보 조회 
        let data;
        try {
            data = await Project.findOne({ where: {
                id: projectId
            }});
            if (!data) {
                return res.status(404).json({"message": "Not Found"})
            } 
        } catch (err) {
            return res.status(404).send(err)
        }
        let projectData = data.dataValues;

        // Content 테이블에서 image 와 content 를 배열 형태로 받아오기
        const contentData = await Content.findAll({ where: {
            project_id: projectId  
        }});
        let project_content = [];
        for (let value of contentData) {
            project_content.push({
                "text" : value.content_text,
                "image": value.content_image
            });
        }

        // StackForProject 테이블에서 project 의 stack 정보 받아서 projectData 에 추가
        const stackData = await StackForProject.findAll({ where: {
            project_id: projectId  
        }});
        let project_stacks = [];
        for (let value of stackData) {
            let stackName = await Stack.findOne({ where: { id: value.stack_id }});
            project_stacks.push(stackName.stack_name);
        }
        console.log(project_stacks)
        
        // ProjectByUser 테이블에서 project 의 user 정보 받아서 projectData 에 추가
        // TODO: FE 와 논의 후 수정 필요

        return res.status(200).json({
            "data": {...projectData, project_content, project_stacks}, 
            "message" : "ok"
        })
    },

    createProjectData: async (req, res) => {

        // Project 테이블에 받아온 data 저장 후 id 확보 
        const { project_name, project_content } = req.body
        const project_info = JSON.parse(req.body.project_info);
        let data;
        try {
            data = await Project.create({project_name, project_content, ...project_info, project_thumbnail: 'temp'})
        } catch (err) {
            return res.status(404).send(err)
        }
        // thumbnail 사진 path 변경 후 테이블에 저장
        let newThumbnailFile = req.files.thumbnail[0].filename.split('_')
        newThumbnailFile.splice(1,1, data.id)
        newThumbnailFile = newThumbnailFile.join('_')
        // https://localhost:80/image/project/project_1_thumbnail_8asdf7.png
        data.project_thumbnail = process.env.IMAGE_ENDPOINT + '/image/project/' + newThumbnailFile
        await data.save();

        // 서버 로컬 디렉토리에 저장된 폴더 이름 변경 
        const oldPath = __dirname + `/../${req.files.thumbnail[0].destination}`;
        const newPath = __dirname + `/../uploads/project/${data.id}`
        fs.renameSync(oldPath, newPath);

        // 서버 로컬 디렉토리에 저장된 파일 이름 변경
        fs.renameSync(newPath + '/' + req.files.thumbnail[0].filename, newPath + '/' + newThumbnailFile);

        // ProjectByUser 에 저장
        const tokenData = await verifyAccessToken(req)
        await ProjectByUser.create({ user_id: tokenData.id, project_id: data.id })
        
        // StackForProject 에 저장
        const stackData = JSON.parse(req.body.project_stack);
        for (let value of stackData) {
            try {
                let stack_id = await Stack.findOne({ where: 
                    { stack_name: value }
                })
                await StackForProject.create({ project_id: data.id, stack_id: stack_id.id })
            } catch (err) {
                return res.status(404).send(err)
            }
        }

        // image 배열 순차적으로 이름 변경 후 Content 테이블에 image, content 저장
        const projectImages = req.files.image;
        const projectContents = JSON.parse(req.body.project_content);
        for (let i=0; i < projectImages.length; i++) {
            let curContent = projectContents[i];
            let newImageFile = projectImages[i].filename.split('_');
            newImageFile.splice(1,1, data.id);
            newImageFile = newImageFile.join('_');
            fs.renameSync(newPath + '/' + projectImages[i].filename, newPath + '/' + newImageFile);
            await Content.create({ 
                project_id: data.id, 
                content_image: process.env.IMAGE_ENDPOINT + '/image/project/' + newImageFile, 
                content_text: curContent 
            })
        }

        return res.status(201).json({"message":"Project created!"})
    },

    fixProjectData: async (req, res) => {

        const projectId = req.params.projectid;
        const { project_name, project_content } = req.body
        const project_info = JSON.parse(req.body.project_info);
        let data;

        try {
            // Project 테이블의 정보 업데이트
            data = await Project.findOne({ where: { id: projectId }})
            if (!data) {
                return res.status(404).json({"message": "Project not found!"})
            }
            data.project_name = project_name;
            for (let key in project_info) {
                data[key] = project_info[key];
            }
            await data.save();

            // StackForProject 에서 stack 정보 업데이트
            // TODO::정보 조회 후 일치하는 것 필터링, 일치하지 않는 내용 삭제 후 추가 
            // const newStackData = JSON.parse(req.body.project_stack);
            // const oldStackData = await StackForProject.findAll({ 
            //     include: [{ model: Stack, attributes: ['stack_name'] }],
            //     where: { project_id: projectId }
            // })
            // console.log(oldStackData)
            const stackData = JSON.parse(req.body.project_stack);
            stackData.forEach(async (el) => {
                let stack = await Stack.findOne({ where: { stack_name: el }})
                await StackForProject.findOrCreate({ where: { 
                    project_id: projectId,
                    stack_id: stack.id
                }});
            })

            // thumbnail, image 파일명 Project, Content 테이블에 저장
            // TODO::정보 조회 후 일치하는 것 필터링, 일치하지 않는 내용 삭제 후 추가 
            const thumbnailImage = req.files.thumbnail[0].filename
            data.project_thumbnail = process.env.IMAGE_ENDPOINT + '/image/project/' + thumbnailImage;
            await data.save();

            const projectImages = req.files.image;
            for (let i=0; i<projectImages.length; i++) {
                const curImage = projectImages[i].filename;
                const curContent = project_content[i];
                await Content.findOrCreate({ where: {
                    project_id: projectId,
                    content_image: process.env.IMAGE_ENDPOINT + '/image/project/' + curImage,
                    content_text: curContent
                }});
            }

        } catch (err) {
            console.log(err)
            return res.status(404).json(err)
        }

        return res.status(200).json({"message":"ok"})
    },

    deleteProjectData: async (req, res) => {

        const projectId = req.params.projectid;

        try {
            const checkUser = await Project.findOne({ where: { id: projectId }});
            if (!checkUser) {
                return res.status(404).json({"message": "User not found"})
            }
            await Project.destroy({ where: { id: projectId }});
            await ProjectByUser.destroy({ where: { project_id: projectId }});
            await StackForProject.destroy({ where: { project_id: projectId }});
            await Content.destroy({ where: { project_id: projectId }});
        } catch (err) {
            return res.status(404).send(err)
        }

        fs.rmdirSync(__dirname + `/../uploads/project/${projectId}/`, {recursive: true})

        return res.status(200).json({"message": "successfully deleted!"})
    }
    
};
