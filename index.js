import express from 'express';
import mongoose from 'mongoose';
import routeInsertFeedback from './routes/insertfeedback.js';
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

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '191.176.91.228'); // update to match the domain you will make the request from
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.get('/', function (req, res) {
  res.send('Ok api iniciada ');
  console.log('GET OK');
});

app.use('/', routeInsertFeedback);

const APP_PORT = process.env.PORT || 3000;
app.listen(APP_PORT, () => {
  console.log(`Servidor iniciado na porta ${APP_PORT}`);
});
