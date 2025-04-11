import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import emailRoutes from './routes/emailTemplateRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import cookieParser from 'cookie-parser';
import connectDB from './db.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Specific origin for your client
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
  }));

  app.use('/api/users',userRoutes);
  app.use('/api/contacts',contactRoutes);
  app.use('/api/email',emailRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));