import TodoServise from "../Servise/TodoServise.js";

class TodoCntroller {
  async create(req, res) {
    try {
      if (!req.headers.authorization) {
        return new Error("Пользователь не авторизован");
      }
      const todo = await TodoServise.create(req);
      res.json(todo);
    } catch (error) {
      console.log("Опять сосал");

      res.status(500).json(error);
    }
  }
  async getAllTodos(req, res) {
    try {
      const todos = await TodoServise.getAllTodos();
      // if (!req.userId) {
      //   throw new Error("Пользователь не авторизован");
      // }
      const filterTodosUser = todos.filter(
        (item) => String(item.user) === req.userId
      );
      console.log("todos", filterTodosUser);
      res.json(filterTodosUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getItem(req, res) {
    try {
      const item = await TodoServise.getItem(req.params.id);
      res.json(item);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateItem(req, res) {
    try {
      const updateTodo = await TodoServise.updateItem(req.body);
      return res.json(updateTodo);
    } catch (error) {
      res.json(error);
    }
  }

  async deleteItem(req, res) {
    try {
      const deleteItem = await TodoServise.deleteItem(req.params.id);
      return res.json(deleteItem);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new TodoCntroller();
