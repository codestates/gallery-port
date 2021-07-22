const { User } = require('../../models');
const {
	generateAccessToken,
	generateRefreshToken,
	sendRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
} = require('./tokenFunctions');

// case1: access token과 refresh token 모두가 만료된 경우 -> 에러 발생
// case2: access token은 만료됐지만, refresh token은 유효한 경우 -> access token 재발급
// case3: access token은 유효하지만, refresh token은 만료된 경우 -> refresh token 재발급
// case4: access token과 refresh token 모두가 유효한 경우 -> 다음 미들웨어로

module.exports = {
	checkToken: async (req, res, next) => {
		const accessTokenData = verifyAccessToken(req);
		const refreshTokenData = verifyRefreshToken(req);
		console.log(accessTokenData);
		console.log(refreshTokenData);
		console.log('-----------');
		if (accessTokenData === null) {
			if (refreshTokenData === null) {	// case1
				res.status(404).send({ message: 'Not found' });
			} else {	// case2
				const { user_email } = refreshTokenData;
				const data = await User.findOne({
					where: {
						user_email
					}
				});
				const newAccessToken = generateAccessToken(data.dataValues);
				return newAccessToken;
			}
		} else {
			if (refreshTokenData === null) { // case3
				const { user_email } = accessTokenData;
				const data = await User.findOne({
					where: {
						user_email
					}
				});
				console.log(data);
				const newRefreshToken = generateRefreshToken(data.dataValues);
				sendRefreshToken(res, newRefreshToken);
				next();
			} else { // case4
				next();
			}
		}
	}
}
