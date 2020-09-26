import express from 'express';
import { TransactionModel } from '../models/conection.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { name, email, menssagem, nota } = req.query;

    const teste = {
      name: name,
      email: email,
      menssagem: menssagem,
      nota: nota,
    };
    console.log(teste);

    const trasaction = new TransactionModel(req.query);
    await trasaction.save();
    console.log(name);

    res.status(200).send('Removido com sucesso!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
