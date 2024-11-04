import express from "express";
import mongoose from "mongoose";
import todoRouter from "./Routers/todoRouter.js";
import cors from "cors";
import authRouter from "./Routers/authRouter.js";
import "dotenv/config.js";

const PORT = process.env.PORT;
const app = express();

console.log(PORT);

const URL = process.env.URL;

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200,
};
app.use(cors());
app.use(express.json());
app.use("/api", todoRouter);
app.use("/api", authRouter);

async function startApp() {
  try {
    await mongoose.connect(URL);
    app.listen(PORT, () => console.log(PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
