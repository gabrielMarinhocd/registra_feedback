import mongoose from 'mongoose';

let schema = mongoose.Schema({
  email: String,
  email: String,
  menssagem: String,
  nota: Number,
  data: String,
});

const TransactionModel = mongoose.model('feedback', schema, 'feedback');

export { TransactionModel };
