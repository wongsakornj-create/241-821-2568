const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 8000;

app.use(bodyParser.json());

let conn = null;

// ====== Initialize DB Connection ======
const initDBconnection = async () => {
    try {
        conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8821
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

// ====== GET ALL USERS ======
app.get('/users', async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch users'
        });
    }
});

// ====== GET USER BY ID ======
app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await conn.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch user data'
        });
    }
});

// ====== CREATE USER ======
app.post('/users', async (req, res) => {
    try {
        const user = req.body;

        const [result] = await conn.query(
            'INSERT INTO users SET ?',
            user
        );

        res.status(201).json({
            message: 'User created successfully',
            insertId: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            error: 'Failed to insert user data'
        });
    }
});

// ====== UPDATE USER ======
app.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;

        const [result] = await conn.query(
            'UPDATE users SET ? WHERE id = ?',
            [updatedUser, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'User updated successfully'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Failed to update user'
        });
    }
});

// ====== DELETE USER ======
app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [result] = await conn.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'User deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Failed to delete user'
        });
    }
});

app.delete('/users', async (req, res) => {
    try {
        let id = req.params.id
        const result = await conn.query('DELETE FROM users WHERE id = ?', [id]);
        if (result[0].affectedRows === 0) {
            throw { statusCode: 404, message: 'User not found' };
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
       console.error('Error deleting user:', error.message);
       let statusCode = error.statusCode || 500;
       res.status(statusCode).json({
        message : 'Error deleting user',
        error: error.message
       });
    }
});


// ====== START SERVER ======
app.listen(port, async () => {
    await initDBconnection();
    console.log(`Server is running on port ${port}`);

});
