const request = require('supertest');
const app = require('../server');
const { clearExpenses } = require('../controllers/expenseController');

// Every time before running a test, reset the array to keep tests independent
beforeEach(() => {
    clearExpenses();
});

describe('Expense Tracker API Unit Tests', () => {

    // Test 1: Normal Case - Add valid expense
    test('1. Should successfully add a valid expense', async () => {
        const response = await request(app)
            .post('/api/expenses')
            .send({
                title: 'Biryani Lunch',
                amount: 350,
                category: 'Food'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Biryani Lunch');
        expect(response.body.amount).toBe(350);
    });

    // Test 2: Normal Case - Get all expenses
    test('2. Should successfully retrieve all expenses', async () => {
        // First, add one sample expense
        await request(app).post('/api/expenses').send({ title: 'Internet Bill', amount: 2000 });

        const response = await request(app).get('/api/expenses');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
    });

    // Test 3: Invalid Case - Negative amount
    test('3. Should return 400 error for a negative or zero amount', async () => {
        const response = await request(app)
            .post('/api/expenses')
            .send({
                title: 'Books',
                amount: -50 // Invalid amount
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    // Test 4: Edge Case - Empty or blank title
    test('4. Should return 400 error for an empty expense title', async () => {
        const response = await request(app)
            .post('/api/expenses')
            .send({
                title: '   ', // Edge Case: spaces only
                amount: 100
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    // Test 5: Invalid/Edge Case - Delete an ID that does not exist (Refactored logic)
    test('5. Should return 404 error if trying to delete a non-existent expense ID', async () => {
        const response = await request(app).delete('/api/expenses/999'); // ID 999 doesn't exist

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Expense with ID 999 not found.');
    });

});