const bcrypt = require('bcryptjs');
const { User } = require('../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
  getDataValues,
} = require('./tokens/tokenFunctions');

module.exports = {
  signin: async (req, res) => {
    console.log(req.body)
    const { user_email, user_password } = req.body;

    const data = await User.findOne({
      where: {
        user_email,
      },
    });

    if (!data) {
      return res.status(404).send({ message: 'Invalid user' });
    }

    // 해시한 비밀번호 비교
    const isValidPassword = bcrypt.compareSync(user_password, data.user_password);

    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    const dataValues = getDataValues(data);
    const accessToken = generateAccessToken(dataValues);
    const refreshToken = generateRefreshToken(dataValues);
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, accessToken);
    res.status(200).json({ message: 'Login success', id: data.id });
  },
};
