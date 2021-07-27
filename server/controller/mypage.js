const { User } = require('../models/index')
const { verifyAccessToken } = require('./tokens/tokenFunctions')
require('dotenv').config()

module.exports = {

    getUserData: async (req, res) => {
        try{

            const tokenData = verifyAccessToken(req);

            if (tokenData.id !== Number(req.params.id)) {
                return res.status(401).json({ "message": "Unauthorized user" })
            }

            const data = await User.findOne({where: {
                id: req.params.id}
            });  

            if (!data) {
                return res.status(404).json({ "message": "Invalid user" })
            }

            delete data.dataValues.id;
            return res.status(200).json({data, "message": "User data successfully found"})
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    updateUserData: async (req, res) => {
        try{
            
            const tokenData = verifyAccessToken(req);
        
            if (tokenData.id !== Number(req.params.id)) {
                return res.status(401).json({ "message": "Unauthorized user" })
            }

            const data = await User.findOne({where: 
                {id: req.params.id}
            });

            if (!data) {
                return res.status(404).json({ "message": "Invalid user" })
            }

            const {user_password} = req.body; 

            const user_info = JSON.parse(req.body.user_info)
            const updateData = { user_password, ...user_info}

            for (let key of Object.keys(updateData)) {
                data[key] = await updateData[key];
            }
            if (req.file){
                data.user_photo = process.env.IMAGE_ENDPOINT + '/image/profile/' + req.file.filename
            }
            await data.save();

            return res.sendStatus(200)
        } catch (err) {
            return res.status(500).send(err)
        }
    }
    
};
