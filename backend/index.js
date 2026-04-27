import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import {connectDB} from "./config/db.js";



dotenv.config();    

connectDB();

const app = express();
app.use(cors());    

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
    res.send("Backend Running");
});

app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 5000");
});