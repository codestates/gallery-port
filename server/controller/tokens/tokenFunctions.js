const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "30s" });
  },
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "60s" });
  },
  sendRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
  },
  sendAccessToken: (res, accessToken) => {
    res.status(200).json({ data: { accessToken }, message: "ok" });
  },
  verifyAccessToken: (req) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    const token = authorization.split(" ")[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
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
    delete data.dataValues.id;
    delete data.dataValues.user_password;
    delete data.dataValues.user_github;
    delete data.dataValues.user_introduction;
    delete data.dataValues.user_photo;
    return data.dataValues;
  }
};
