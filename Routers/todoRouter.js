import Router from "express";
import TodoController from "../Controller/TodoController.js";
import checkAuth from "../utils/checkAuth.js";

const todoRouter = new Router();

todoRouter.post("/todos", checkAuth, TodoController.create);
todoRouter.get("/todos", checkAuth, TodoController.getAllTodos);
todoRouter.get("/todos/:id", TodoController.getItem);
todoRouter.put("/todos/", TodoController.updateItem);
todoRouter.delete("/todos/:id", TodoController.deleteItem);

export default todoRouter;
