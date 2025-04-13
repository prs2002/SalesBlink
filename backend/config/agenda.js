import Agenda from 'agenda';
import dotenv from 'dotenv';
dotenv.config();

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: 'emailJobs' },
  processEvery: '30 seconds',
});

export default agenda;
