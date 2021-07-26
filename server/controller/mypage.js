const { User } = require('../models/index')
require('dotenv').config()

module.exports = {

    getUserData: async (req, res) => {
        try{
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

    fixUserData: async (req, res) => {
        try{
            const data = await User.findOne({where: 
                {id: req.params.id}
            });

            if (!data) {
                return res.status(404).json({ "message": "Invalid user" })
            }
            const {user_email, user_password} = req.body; 
            // TODO: json.parse 해야하는지 점검
            const user_info = JSON.parse(req.body.user_info)
            const updateData = {user_email, user_password, ...user_info}

            Object.keys(updateData).forEach(key => {
                data.dataValues[key] = updateData[key];
            });
            await data.save();

            return res.redirect(200, process.env.CLIENT_ENDPOINT + `/profile`)
        } catch (err) {
            return res.status(500).send(err)
        }
    }
    
};
