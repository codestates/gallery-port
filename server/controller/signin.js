const { User } = require('../models');
const {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
    sendAccessToken,
} = require('./tokens/tokenFunctions');

module.exports = {

    signin: async (req, res) => {
        const { email, password } = req.body;
        const data = await User.findOne({
            where: {
                user_email: email,
                user_password: password
            }
        });
        if (!data) {
            return res.status(404).send({
                message: 'Not found',
            });
        }
        delete data.dataValues.user_password;
        const accessToken = generateAccessToken(data.dataValues);
        const refreshToken = generateRefreshToken(data.dataValues);
        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, accessToken);
    },
};
