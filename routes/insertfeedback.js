import express from 'express';
import { TransactionModel } from '../models/conection.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, menssagem, nota, data } = req.query;

    const grade = {
      name: name,
      email: email,
      menssagem: menssagem,
      nota: nota,
      data: data,
    };
    console.log(grade);

    const trasaction = new TransactionModel(req.query);
    await trasaction.save();
    res.status(200).send('Salvo com sucesso!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
