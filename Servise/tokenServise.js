import jwt from "jsonwebtoken";
import tokenModel from "../model/tokenModel.js";
import "dotenv/config.js";

const SECRET_KEY = process.env.SECRET_TOKEN_KEY || "SECRET_TOKEN_KEY";

class TokenServise {
  async generateToken(payload) {
    const accessToken = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "3h",
    });
    const refreshToken = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({
      user: userId,
      token: refreshToken,
    });
    return token;
  }
}

export default new TokenServise();
