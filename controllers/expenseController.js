// In-memory array to store expenses temporarily
let expenses = [];

// 1. Get All Expenses
const getExpenses = (req, res) => {
    res.status(200).json(expenses);
};

// 2. Add New Expense
const addExpense = (req, res) => {
    const { title, amount, category } = req.body;

    // Edge Case / Invalid Case Validation
    if (!title || title.trim() === "") {
        return res.status(400).json({ error: "Title is required and cannot be empty." });
    }
    if (amount === undefined || amount <= 0) {
        return res.status(400).json({ error: "Amount must be a positive number greater than zero." });
    }

    const newExpense = {
        id: expenses.length + 1,
        title: title.trim(),
        amount: Number(amount),
        category: category || "Uncategorized",
        date: new Date()
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
};

// 3. Delete Expense (Refactored with Error Handling)
const deleteExpense = (req, res) => {
    const id = parseInt(req.params.id);
    
    // Find if expense exists
    const expenseIndex = expenses.findIndex(exp => exp.id === id);

    // Refactored Error Handling: If ID does not exist
    if (expenseIndex === -1) {
        return res.status(404).json({ error: `Expense with ID ${id} not found.` });
    }

    // Remove the expense if found
    expenses.splice(expenseIndex, 1);
    res.status(200).json({ message: "Expense deleted successfully." });
};

// Helper function to clear expenses (Useful for running clean tests)
const clearExpenses = () => {
    expenses = [];
};

module.exports = {
    getExpenses,
    addExpense,
    deleteExpense,
    clearExpenses
};