import express from 'express';
import mongoose from 'mongoose';
import routeInsertFeedback from './routes/insertfeedback.js';
import routeListFeedback from './routes/listafeedbacks.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const { DB_CONNECTION } = process.env;

const connect = async () => {
  try {
    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connectado ao Mongo');
  } catch (err) {
    console.log(err);
  }
};

connect();

const app = express();
app.use(express.json());

app.use(cors());

app.use('/', routeInsertFeedback);
app.use('/', routeListFeedback);

const APP_PORT = process.env.PORT || 3000;
app.listen(APP_PORT, () => {
  console.log(`Servidor iniciado na porta ${APP_PORT}`);
});
