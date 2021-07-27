const fs = require('fs')
const bcrypt = require('bcryptjs');
const { User } = require('../models/index')
const { generateAccessToken, 
        generateRefreshToken, 
        sendAccessToken, 
        sendRefreshToken,
        getDataValues } = require('./tokens/tokenFunctions')
require('dotenv').config();

module.exports = {

    createNewUser : async (req, res) => {   

        const {user_email} = req.body;
        const user_info = JSON.parse(req.body.user_info)

        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(!emailRegex.test(user_email)) {
            return res.status(400).send("Invalid email");
        }

        try {
            
            // 비밀번호 해시 
            const hashedPassword = await bcrypt.hashSync(req.body.user_password, 10);
            let data = await User.create({user_email, user_password: hashedPassword, ...user_info})

            if (req.file) {
                const oldPath = __dirname + `/../${req.file.path}`;
                const newFile = `profile_${data.id}.` + req.file.mimetype.split('/')[1];
                const newPath = __dirname + `/../${req.file.destination}` + newFile;
                fs.renameSync(oldPath, newPath);
                
                // https://localhost:80/image/profile/profile_87.png
                data.user_photo = process.env.IMAGE_ENDPOINT + "/image/profile/" + newFile;
                await data.save();
            }
            
            return res.sendStatus(201);
        } catch (err) {
            if(err.errors[0].message === "users.user_email must be unique") {
                return res.status(409).send(`${err.errors[0].value} already exists`);
            }
            return res.status(500).send(err);
        }
            
    }
        
};