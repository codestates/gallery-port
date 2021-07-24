const fs = require('fs')
const { User } = require('../models/index')
const { generateAccessToken, 
        generateRefreshToken, 
        sendAccessToken, 
        sendRefreshToken,
        getDataValues } = require('./tokens/tokenFunctions')


module.exports = {

    createNewUser : async (req, res) => {   

        const { user_email, user_password, user_name, user_introduction, user_github } = req.body;

        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(!emailRegex.test(user_email)) {
            return res.status(400).send("invalid email!").end();
        }

        let data; 
        try {
            data = await User.create({
                user_email, user_password, user_name, user_introduction, user_github
            })
        } catch (err) {
            return res.status(409).send(`${err.errors[0].value} already exists!`).end();
        }

        if (req.file) {
            const oldPath = __dirname + `/../${req.file.path}`;
            const newFile = `profile_${data.id}.` + req.file.mimetype.split('/')[1];
            const newPath = __dirname + `/../${req.file.destination}` + newFile;
            fs.renameSync(oldPath, newPath);

            data.user_photo = req.file.destination + newFile;
            await data.save();
        }

        const tokenData = getDataValues(data);
        const accessToken = generateAccessToken(tokenData);
        const refreshToken = generateRefreshToken(tokenData);
        sendAccessToken(res, accessToken);
        sendRefreshToken(res, refreshToken);

        return res.status(201).json({"message":"ok"})

    }
    
};