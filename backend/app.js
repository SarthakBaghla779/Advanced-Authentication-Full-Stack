import express, { application } from 'express';
import dotenv, { parse } from 'dotenv';
import dbConnect from './config/dbconnect.js';
import authRouter from './routes/auth_routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());


//middelwares 
app.use("/auth/api", authRouter);


//Listening 
const PORT = parseInt(process.env.PORT) || 5050;
app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is running on port: ${PORT}`);
});

