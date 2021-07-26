const { User } = require('../models');
const {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
    sendAccessToken,
    getDataValues
} = require('./tokens/tokenFunctions');

module.exports = {

    signin: async (req, res) => {
        const { user_email, user_password } = req.body;
        const data = await User.findOne({
            where: {
                user_email,
                user_password
            }
        });
        if (!data) {
            return res.status(404).send({ message: "Invalid user" });
        }
        const dataValues = getDataValues(data);
        const accessToken = generateAccessToken(dataValues);
        const refreshToken = generateRefreshToken(dataValues);
        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, accessToken);
        res.status(200).send({ message: "Login success" })
    },
};
