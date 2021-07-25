const { User } = require('../models/index')

module.exports = {

    getUserData: async (req, res) => {

        const data = await User.findOne({where: {
            id: req.params.id}
        });

        if (!data) {
            return res.status(404).json({ "message": "Not Found" })
        }

        delete data.dataValues.id;
        return res.status(200).json({data, "message": "ok"})

    },

    fixUserData: async (req, res) => {

        const data = await User.findOne({where: 
            {id: req.params.id}
        });

        if (!data) {
            return res.status(404).json({ "message": "Not Found" })
        }
        const {user_email, user_password} = req.body; 
        const user_info = JSON.parse(req.body.user_info)
        const updateData = {user_email, user_password, ...user_info}

        Object.keys(updateData).forEach(key => {
            data.dataValues[key] = updateData[key];
        });
        await data.save();

        delete data.dataValues.id;
        delete data.dataValues.user_password;
        return res.status(200).json({data, "message": "ok"})

    }
    
};
