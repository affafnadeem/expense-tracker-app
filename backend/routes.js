const express = require('express');
const {
  getAllTransactions,
  createTransaction,
  removeTransaction,
  getSummary
} = require('./controllers');

const router = express.Router();

router.get('/transactions', getAllTransactions);
router.post('/transactions', createTransaction);
router.delete('/transactions/:id', removeTransaction);
router.get('/summary', getSummary);

module.exports = router;
