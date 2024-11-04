import User from "../model/User.js";
import AuthServise from "../Servise/authServise.js";

class AuthController {
  async registration(req, res) {
    try {
      const { username, password } = req.body;
      const userData = await AuthServise.registration(username, password);
      return res.json({ message: "Пользователь сохранен", userData });
    } catch (error) {
      res.json("Ошибка регистрации");
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const userData = await AuthServise.login(username, password);
      return res.json({ message: "Пользователь вошел", userData });
      return res
        .status(200)
        .header("auth-token", userData.tokens.accessToken)
        .send({ token: userData.tokens.accessToken });
    } catch (error) {
      res.status(400).json("ТЫ сосал");
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export default new AuthController();
