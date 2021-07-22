const { users } = require('../../models');
const {
	generateAccessToken,
	generateRefreshToken,
	sendRefreshToken,
	getAccessToken,
	getRefreshToken,
} = require('./tokenFunctions');

// case1: access token과 refresh token 모두가 만료된 경우 -> 에러 발생
// case2: access token은 만료됐지만, refresh token은 유효한 경우 -> access token 재발급
// case3: access token은 유효하지만, refresh token은 만료된 경우 -> refresh token 재발급
// case4: acesss token과 refresh token 모두가 유효한 경우 -> 다음 미들웨어로

module.exports = {
	checkToken: async (req, res, next) => {
		const accessTokenData = getAccessToken(req);
		const refreshTokenData = getRefreshToken(req);
		if (accessTokenData === null) {
			if (refreshTokenData === null) {	// case1
				throw Error('No token provided');
			} else {	// case2
				const { email } = refreshTokenData;
				const user = await users.findOne({ email });
				const newAccessToken = generateAccessToken(user);
				return newAccessToken;
			}
		} else {
			if (refreshTokenData === null) { // case3
				const { email } = accessTokenData;
				const user = await users.findOne({ email });
				const newRefreshToken = generateRefreshToken(user);
				sendRefreshToken(res, newRefreshToken);
				next();
			} else { // case4
				next();
			}
		}
	}
}
