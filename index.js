const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const expensesFilePath = path.join(__dirname, 'data', 'expenses.json');

app.use(express.json());
app.use(express.static('public'));

// Valid categories in English
const validCategories = ['Food', 'Leisure', 'Electronics', 'Services', 'Clothing', 'Health', 'Pets', 'Others'];

/**
 * Read the expenses from data/expenses.json file
 * 
 * @returns An array with all the expenses as objects
 */
const readExpenses = () => {
  try {
    const data = fs.readFileSync(expensesFilePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

/**
 * Store the expenses in a JSON file
 * 
 * @param {array} expenses Array of objects with the expenses to store
 */
const saveExpenses = (expenses) => {
  fs.writeFileSync(expensesFilePath, JSON.stringify(expenses, null, 2));
};

// Get the next valid ID
const getNextId = (expenses) => {
  const ids = expenses.map(exp => exp.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
};


// Iteración 1
app.get('/api/expenses', (req, res) => {
  // Cargar los gastos
  const expenses = readExpenses();

  // Devolvemos el JSON
  res.status(200).json(expenses);

});

// Iteración 1b
app.get('/api/categories', (req, res) => {
  // Devolvemos el array de categorías directamente
  res.status(200).json(validCategories);
});


// Iteración 2
app.post('/api/expenses', (req, res) => {

  // Vamos a obtener todos los campos de req.body
  const {description, amount, category } = req.body;
  // const description = req.body.description;
  // const amount = req.body.amount
  // const category = req.body.category

  // En el caso que nos intenten poner información inválida bien sea por que intentan romper algo o por error del programador, debemos defendernos
  if (!description || !amount || !category) { // FALTA comprobar amount y category
    return res.status(400).json({error: "All fields are required"});
  }

  // Comprobar valores invalidos
  if (amount < 0) {
    return res.status(400).json({error: "Amount must be a positive number"});
  }

  // Description must be shorted than 40 characters
  if (description.length > 40) {
        return res.status(400).json({error: "Description must be 40 character max long"});
  }

  // Check if category is valid
  if (!validCategories.includes(category)) {
        return res.status(400).json({error: `Category ${category} is invalid`});
  }

  // cargar todos los gastos
  let expenses = readExpenses();

  // crear nuevo objeto
  const newExpense = {
    id: getNextId(expenses),
    description,
    amount,
    category
  }

  // Añadir el objeto al array de gastos
  expenses.push(newExpense);
  
  // Actualizar el fichero JSON
  saveExpenses(expenses);
  
  // respondemos al cliente con el gasto que acabmos de crear
  res.status(201).json(newExpense);
});

// Iteración 3
app.put('/api/expenses/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// Iteración 4
app.delete('/api/expenses/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// Iteración 5
app.get('/api/expenses/summary', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
