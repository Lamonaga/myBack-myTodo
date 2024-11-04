import Todo from "../model/Todo.js";

class TodoServise {
  async create(req) {
    const todo = {
      ...req.body,
      user: req.userId,
    };
    console.log("reeq", req);
        
    const createItem = await Todo.create(todo);
    return createItem;
  }

  async getAllTodos() {
    const todos = await Todo.find();
    return todos;
  }

  async getItem(id) {
    const item = await Todo.findById(id);
    return item;
  }

  async updateItem(item) {
    if (!item._id) {
      res.status(400).json({ message: "id не указан" });
      console.log("id не указан");
    }
    const updateTodo = await Todo.findByIdAndUpdate(item._id, item, {
      new: true,
    });
    return updateTodo;
  }

  async deleteItem(id) {
    if (!id) {
      res.json({ message: "id не найден" });
    }
    const deleteItem = await Todo.findByIdAndDelete(id);
    return deleteItem;
  }
}

export default new TodoServise();
