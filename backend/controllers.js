const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
      date TEXT NOT NULL
    )
  `);

  db.get('SELECT COUNT(*) AS count FROM transactions', (err, row) => {
    if (!err && row.count === 0) {
      const stmt = db.prepare('INSERT INTO transactions (title, amount, category, type, date) VALUES (?, ?, ?, ?, ?)');
      [
        ['Salary', 3200, 'Job', 'income', '2026-04-01'],
        ['Groceries', 120, 'Food', 'expense', '2026-04-03'],
        ['Internet Bill', 45, 'Bills', 'expense', '2026-04-05'],
        ['Freelance Project', 640, 'Side Hustle', 'income', '2026-04-09'],
        ['Fuel', 60, 'Transport', 'expense', '2026-04-11']
      ].forEach((item) => stmt.run(item));
      stmt.finalize();
    }
  });
});

const getAllTransactions = (req, res) => {
  db.all('SELECT * FROM transactions ORDER BY date DESC, id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

const createTransaction = (req, res) => {
  const { title, amount, category, type, date } = req.body;
  if (!title || amount === undefined || !category || !type || !date) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  db.run(
    'INSERT INTO transactions (title, amount, category, type, date) VALUES (?, ?, ?, ?, ?)',
    [title, amount, category, type, date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id: this.lastID,
        title,
        amount,
        category,
        type,
        date
      });
    }
  );
};

const removeTransaction = (req, res) => {
  db.run('DELETE FROM transactions WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes > 0 });
  });
};

const getSummary = (req, res) => {
  db.all('SELECT type, amount FROM transactions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const income = rows.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0);
    const expense = rows.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0);

    res.json({
      income,
      expense,
      balance: income - expense
    });
  });
};

module.exports = {
  getAllTransactions,
  createTransaction,
  removeTransaction,
  getSummary
};
