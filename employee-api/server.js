require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./models/Employee');

const app = express();
const PORT =  3000;
const DATABASE_URL= "mongodb://localhost:27017/emp-data"

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(DATABASE_URL)
    .then(() => console.log('Database Connected'))
    .catch(err => console.error(err));

// CRUD Operations

// Create an employee // insert the data 
app.post('/employees', async (req, res) => {
    const employee = new Employee(req.body);
    try {
        await employee.save();
        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all employees // view the data 
app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees)
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update an employee by ID
app.put('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!employee) return res.status(404).send();
        res.send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete an employee by ID
app.delete('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).send();
        res.send(employee);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});