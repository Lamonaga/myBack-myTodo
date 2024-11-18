import User from "../model/User.js";
import Role from "../model/Role.js";
import bcrypt from "bcrypt";
import UserDto from "../dtos/user-dto.js";
import tokenServise from "../Servise/tokenServise.js";

class AuthServise {
  async registration(username, password) {
    const condidate = await User.findOne({ username });
    if (condidate) {
      throw new Error("Такой пользователь уже существует");
    }
    const userRole = await Role.findOne({ value: "USER" });
    const hashPassword = bcrypt.hashSync(password, 6);
    const user = new User({
      username,
      password: hashPassword,
      role: [userRole.value],
    });
    const userDto = new UserDto(user);
    const tokens = await tokenServise.generateToken({
      ...userDto,
    });
    await tokenServise.saveRefreshToken(userDto.id, tokens.refreshToken);
    await user.save();
    return { tokens, user: userDto };
  }

  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("пользователь не найден");
      throw new Error("пользователь не найден");
    }
    const isPassTrue = bcrypt.compareSync(password, user.password);
    if (!isPassTrue) {
      console.log("Пароль не верный");
      throw new Error("Пароль не верный ");
    }
    const userDto = new UserDto(user);
    const tokens = await tokenServise.generateToken({ ...userDto });
    await tokenServise.saveRefreshToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: { ...userDto } };
  }
}

export default new AuthServise();
