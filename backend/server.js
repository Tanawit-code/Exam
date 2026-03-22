import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose
.connect("mongodb://127.0.0.1:27017/auth.exam")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

app.listen(5000, ()=>{
    console.log("Server runnig on port 5000")
});