import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const secreatKey = process.env.SECRET_TOKEN_KEY;
      const tokenData = jwt.verify(token, secreatKey);
      req.userId = tokenData.id;
    } catch (error) {
      res.status(400).json({ message: "нет доступа" });
    }
  }

  next();
};
