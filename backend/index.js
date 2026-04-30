import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import {connectDB} from "./config/db.js";
import resumeRoute from "./routes/resumeRoute.js";
import aiRoute from "./routes/aiRoute.js";  


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
app.use("/api/resume", resumeRoute);
app.use("/api/ai", aiRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 5000");
});