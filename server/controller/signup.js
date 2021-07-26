const fs = require('fs')
const { User } = require('../models/index')
const { generateAccessToken, 
        generateRefreshToken, 
        sendAccessToken, 
        sendRefreshToken,
        getDataValues } = require('./tokens/tokenFunctions')
require('dotenv').config();

module.exports = {

    createNewUser : async (req, res) => {   

        const {user_email, user_password} = req.body;
        const user_info = JSON.parse(req.body.user_info)

        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(!emailRegex.test(user_email)) {
            return res.status(400).send("Invalid email");
        }

        try {
            let data = await User.create({user_email, user_password, ...user_info})
            
            if (req.file) {
                const oldPath = __dirname + `/../${req.file.path}`;
                const newFile = `profile_${data.id}.` + req.file.mimetype.split('/')[1];
                const newPath = __dirname + `/../${req.file.destination}` + newFile;
                fs.renameSync(oldPath, newPath);
                
                // https://localhost:80/image/profile/profile_87.png
                data.user_photo = process.env.IMAGE_ENDPOINT + "/image/profile/" + newFile;
                await data.save();
            }
            
            const tokenData = getDataValues(data);
            const accessToken = generateAccessToken(tokenData);
            const refreshToken = generateRefreshToken(tokenData);
            sendAccessToken(res, accessToken);
            sendRefreshToken(res, refreshToken);

            return res.sendStatus(201);
        } catch (err) {
            if(err.errors[0].message === "users.user_email must be unique") {
                return res.status(409).send(`${err.errors[0].value} already exists`);
            }
            return res.status(500).send(err);
        }
            
    }
        
};