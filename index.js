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
  const expenses = readExpenses();
  res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
  const { description, amount, category } = req.body;

  if (!description || !amount || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const expenses = readExpenses();

  const newExpense = {
    id: getNextId(expenses),
    description,
    amount: parseFloat(amount),
    category
  };

  expenses.push(newExpense);
  saveExpenses(expenses);
  res.status(201).json(newExpense);
});

app.put('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { description, amount, category } = req.body;

  const expenses = readExpenses();
  const expense = expenses.find(exp => exp.id === id);

  if (!expense) return res.status(404).json({ error: 'Expense not found' });

  if (description) expense.description = description;
  if (amount) expense.amount = parseFloat(amount);
  if (category) expense.category = category;

  saveExpenses(expenses);
  res.json(expense);
});

app.delete('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const expenses = readExpenses();
  const updatedExpenses = expenses.filter(exp => exp.id !== id);

  if (updatedExpenses.length === expenses.length) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  saveExpenses(updatedExpenses);
  res.status(204).end();
});

app.get('/api/expenses/summary', (req, res) => {
  const expenses = readExpenses();
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  res.json({ total });
});

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
