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
        const dataValues = getDataValues(data);
        const accessToken = generateAccessToken(dataValues);
        const refreshToken = generateRefreshToken(dataValues);
        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, accessToken);
        res.send('ok')
    },
};
