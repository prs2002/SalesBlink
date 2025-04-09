import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import connectDB from './db.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

app.use(cookieParser());

app.use('/api/users',userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));