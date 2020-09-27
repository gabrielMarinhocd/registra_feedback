import express from 'express';
import { TransactionModel } from '../models/conection.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const grades = await TransactionModel.find({});
    console.log(grades);
    res.status(200).send(grades);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
