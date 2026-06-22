import express, { application } from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/dbconnect.js';
import authRouter from './routes/auth_routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);


app.use(express.json());
app.use(cookieParser());


//middelwares 
app.use("/auth/api", authRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})


//Listening 
const PORT = parseInt(process.env.PORT) || 5050;
app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is running on port: ${PORT}`);
});

