const { users } = require('../../models');
const {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
    sendAccessToken,
} = require('./tokens/tokenFunctions');

module.exports = {

    signin: async (req, res) => {
        const { email, password } = req.body;
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(401).send({
                message: 'User not found',
            });
        }
        if (!user.authenticate(password)) {
            return res.status(401).send({
                message: 'Wrong password',
            });
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, accessToken);
    },
};
