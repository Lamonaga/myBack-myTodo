import Router from "express";
import authController from "../Controller/authController.js";
import checkAuth from "../utils/checkAuth.js";

const authRouter = new Router();

authRouter.post("/registration", authController.registration);
authRouter.post("/login", checkAuth, authController.login);
authRouter.get("/users", checkAuth, authController.getUsers);

export default authRouter;
