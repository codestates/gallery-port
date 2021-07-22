const { User } = require('../../models');
const {
	generateAccessToken,
	generateRefreshToken,
	sendRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
	getDataValues
} = require('./tokenFunctions');

module.exports = {
	checkToken: async (req, res, next) => {
		const accessTokenData = verifyAccessToken(req);
		const refreshTokenData = verifyRefreshToken(req);

		// case1: access token과 refresh token 모두가 만료된 경우 -> 에러 발생
		if (accessTokenData === null && refreshTokenData === null) {
				res.status(401).send({ message: 'Not found' });
		}
		// case2: access token은 만료됐지만, refresh token은 유효한 경우 -> access token 재발급
		if (accessTokenData === null && refreshTokenData !== null) {
			const { user_email } = refreshTokenData;
			const data = await User.findOne({
				where: {
					user_email
				}
			});
			const dataValues = getDataValues(data);
			const newAccessToken = generateAccessToken(dataValues);
			req.headers.authorization = `Bearer ${newAccessToken}`;
			next();
		}
		// case3: access token은 유효하지만, refresh token은 만료된 경우 -> refresh token 재발급
		if (accessTokenData !== null && refreshTokenData === null) {
			const { user_email } = accessTokenData;
			const data = await User.findOne({
				where: {
					user_email
				}
			});
			const dataValues = getDataValues(data);
			const newRefreshToken = generateRefreshToken(dataValues);
			sendRefreshToken(res, newRefreshToken);
			next();
		}
		// case4: access token과 refresh token 모두가 유효한 경우 -> 다음 미들웨어로
		if (accessTokenData !== null && refreshTokenData !== null) {
			next(); 
		}

	}
}