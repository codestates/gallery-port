const { ProjectByUser, Project, Content, StackForProject, Stack, User } = require('../models/index')
const { verifyAccessToken } = require('./tokens/tokenFunctions')
const fs = require('fs');
require('dotenv').config();

module.exports = {

    getProjectData: async (req, res) => {

        const projectId = req.params.projectid;
        try {
            const data = await Project.findOne({ where: 
                {
                    id: projectId
                }
            });
            if (!data) {
                return res.status(404).json({"message": "Invalid project"})
            } 
            const projectData = data.dataValues;
            
            // Content 테이블에서 image 와 content 를 배열 형태로 받아오기
            const contentData = await Content.findAll({ where: {
                project_id: projectId  
            }});
            let project_content = [];
            if (contentData) {
                for (let value of contentData) {
                    project_content.push({
                        "text" : value.content_text,
                        "image": value.content_image
                    });
                }
            }
            
            // StackForProject 테이블에서 project 의 stack 정보 받아서 projectData 에 추가.
            const stackData = await StackForProject.findAll({ where: 
                {
                    project_id: projectId  
                }
            });
            let project_stack = [];
            if (stackData) {
                for (let value of stackData) {
                    let stackName = await Stack.findOne({ where: { id: value.stack_id }});
                    project_stack.push(stackName.stack_name);
                }
            }   

            // user 정보 함께 반환할 수 있도록 조회
            const projectUserData = await ProjectByUser.findOne({ where: {
                project_id: projectId
            }});
            const ProjectUserId = projectUserData.user_id;
            const userData = await User.findOne({ where: { id: ProjectUserId }});

            projectData.project_start = projectData.project_start.toLocaleDateString('ko-KR')
            projectData.project_end = projectData.project_end.toLocaleDateString('ko-KR')

            return res.status(200).json({
                "projectdata": {...projectData, project_content, project_stack}, 
                "userdata": { user_id: userData.id , user_photo: userData.user_photo, user_name: userData.user_name},
                "message" : "Project successfully found"
            })
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
            
    },
        
        createProjectData: async (req, res) => {
            
            // Project 테이블에 받아온 data 저장 후 id 확보 
            const { project_name, project_content } = req.body
            const project_info = JSON.parse(req.body.project_info);

            try {
                let data = await Project.create({project_name, project_content, ...project_info, project_thumbnail: 'temp'})
                
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
                    let stackId = await Stack.findOne({ where: 
                        { stack_name: value }
                    })
                    await StackForProject.create({ project_id: data.id, stack_id: stackId.id }) 
                }
                
                // image 배열 순차적으로 이름 변경 후 Content 테이블에 image, content 저장
                const projectImages = req.files.image;
                const projectContents = JSON.parse(req.body.project_content);
                for (let i = 0; i < projectImages.length; i++) {
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
                return res.sendStatus(201);

                } catch (err) {
                    console.log(err)
                    return res.status(500).send(err);
                }
            },
            
        updateProjectData: async (req, res) => {
            
            const projectId = req.params.projectid;
            const { project_name } = req.body
            const project_info = JSON.parse(req.body.project_info);
            
            // 토큰 유효성 검사 통해 실제 프로젝트 주인이 데이터 변경하려고 하는 것인지 검토
            const tokenData = verifyAccessToken(req);
            const projectUser = await ProjectByUser.findAll({ where : {
                user_id: tokenData.id
            }})
            const projectListOfUser = projectUser.map(el => el.project_id)
            if(!projectListOfUser.includes(Number(projectId))){
                return res.status(401).json({"message": "Unauthorized user"})
            }

            try {
                // Project 테이블의 정보 업데이트
                let data = await Project.findOne({ where: { id: projectId }})
                if (!data) {
                    return res.status(404).json({"message": "Invalid project"})
                }
                data.project_name = project_name;
                for (let key in project_info) {
                    data[key] = project_info[key];
                }
                // await data.save();

                // StackForProject 에서 stack 정보 업데이트
                const stackData = JSON.parse(req.body.project_stack);
                let currentStackCode = await StackForProject.findAll({where: {
                    project_id: projectId
                }})
                currentStackCode = currentStackCode.map(el => el.stack_id)

                const newStackData = []
                for (let el of stackData) {
                    const stackName = await Stack.findOne({ where: { stack_name: el }})
                    await StackForProject.findOrCreate({ where: { 
                        project_id: projectId,
                        stack_id: stackName.id
                    }});
                    newStackData.push(stackName.id)
                }

                let deleteStackCode = currentStackCode.filter(el => !newStackData.includes(el))
                for (let el of deleteStackCode) {
                    await StackForProject.destroy({ where: {
                        stack_id: el,
                        project_id: projectId
                    }})
                }

                // thumbnail, image 파일명 Project, Content 테이블에 저장
                const newThumbnailImage = process.env.IMAGE_ENDPOINT + '/image/project/' + req.files.thumbnail[0].filename
                if (data.project_thumbnail !== newThumbnailImage){
                    data.project_thumbnail = newThumbnailImage;
                }
                await data.save();

                const projectImages = req.files.image;
                await Content.destroy({where: {
                    project_id: projectId
                }});
                const contentList = JSON.parse(req.body.project_content);
                for (let i=0; i<projectImages.length; i++) {
                    const curImage = projectImages[i].filename;
                    const curContent = contentList[i];
                    await Content.create({
                        project_id: projectId,
                        content_image: process.env.IMAGE_ENDPOINT + '/image/project/' + curImage,
                        content_text: curContent
                    });
                }

                return res.sendStatus(200)
            } catch (err) {
                return res.status(500).json(err)
            }

    },

    deleteProjectData: async (req, res) => {

        const projectId = req.params.projectid;

        const tokenData = verifyAccessToken(req);
        const projectUser = await ProjectByUser.findAll({ where : {
            user_id: tokenData.id
        }})
        const projectListOfUser = projectUser.map(el => el.project_id)
        if(!projectListOfUser.includes(Number(projectId))){
            return res.status(401).json({"message": "Unauthorized user"})
        }

        try {
            const checkUser = await Project.findOne({ where: { id: projectId }});
            if (!checkUser) {
                return res.status(404).json({"message": "Invalid user"})
            }
            await Project.destroy({ where: { id: projectId }});
            await ProjectByUser.destroy({ where: { project_id: projectId }});
            await StackForProject.destroy({ where: { project_id: projectId }});
            await Content.destroy({ where: { project_id: projectId }});

            fs.rmdirSync(__dirname + `/../uploads/project/${projectId}/`, {recursive: true})

            return res.sendStatus(200)
        } catch (err) {
            return res.status(500).send(err)
        }
        
    }
    
};
