import mongoose from "mongoose";

const Todo = new mongoose.Schema({
  data: String,
  complited: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("todos", Todo);
