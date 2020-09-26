import express from 'express';
import mongoose from 'mongoose';
import routeInsertFeedback from './routes/insertfeedback.js';
import dotenv from 'dotenv';

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

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Ok api iniciada ');
  console.log('GET OK');
});

app.use('/', routeInsertFeedback);

app.listen(3000, () => console.log('API iniciada'));
