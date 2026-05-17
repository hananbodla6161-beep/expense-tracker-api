const express = require('express');
const { getExpenses, addExpense, deleteExpense } = require('./controllers/expenseController');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// API Routes
app.get('/api/expenses', getExpenses);

app.post('/api/expenses', addExpense);

app.delete('/api/expenses/:id', deleteExpense);

// Only start the server if this file is run directly (not during testing)
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // Export for testing purposes