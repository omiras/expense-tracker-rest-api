const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const expensesFilePath = path.join(__dirname, 'data', 'expenses.json');

app.use(express.json());
app.use(express.static('public'));

// Valid categories in English
const validCategories = ['Food', 'Leisure', 'Electronics', 'Services', 'Clothing', 'Health', 'Others'];

const categories = [
  'Food',
  'Leisure',
  'Electronics',
  'Utilities',
  'Clothing',
  'Health',
  'Other'
];

// To read the JSON file
const readExpenses = () => {
  try {
    const data = fs.readFileSync(expensesFilePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Save the array of expenses to the JSON file
const saveExpenses = (expenses) => {
  fs.writeFileSync(expensesFilePath, JSON.stringify(expenses, null, 2));
};

// Get the next valid ID
const getNextId = (expenses) => {
  const ids = expenses.map(exp => exp.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
};

app.get('/api/expenses', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

app.post('/api/expenses', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

app.put('/api/expenses/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

app.delete('/api/expenses/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

app.get('/api/expenses/summary', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

app.get('/api/categories', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
