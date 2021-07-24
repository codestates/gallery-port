const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "7d" });
  },
  sendRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });
  },
  verifyAccessToken: (req) => {
    try {
      return verify(req.cookies.accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  verifyRefreshToken: (req) => {
    try {
      return verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  },
  getDataValues: (data) => {
    const { id, user_email } = data.dataValues;
    return { id, user_email}
  }
};
