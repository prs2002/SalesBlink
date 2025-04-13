import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import emailRoutes from './routes/emailTemplateRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import agenda from './config/agenda.js';
import { defineEmailJob } from './config/emailJob.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use(cors({
  origin: 'https://salesblink-prs.vercel.app',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

  app.options('*',cors());

  defineEmailJob(agenda);

  agenda.on('ready', () => {
    console.log('📆 Agenda is ready!');
    agenda.start();
  });
  app.use('/api/users',userRoutes);
  app.use('/api/contacts',contactRoutes);
  app.use('/api/email',emailRoutes);
  app.use('/api/campaign',campaignRoutes);
  app.use('/api/schedule', scheduleRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));