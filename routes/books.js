const express = require('express');
const router = express.Router();
const db = require('../db/init')();

// Get all books
router.get('/', (req, res) => {
    db.all(`SELECT * FROM books`, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get a specific book by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM books WHERE id = ?`, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }
        res.json(row);
    });
});

// Create a new book
router.post('/', (req, res) => {
    const { name, img, summary } = req.body;
    db.run(`INSERT INTO books (name, img, summary) VALUES (?, ?, ?)`, [name, img, summary], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Update a book
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, img, summary } = req.body;
    db.run(`UPDATE books SET name = ?, img = ?, summary = ? WHERE id = ?`, [name, img, summary, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Book updated successfully' });
    });
});

// Delete a book
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM books WHERE id = ?`, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Book deleted successfully' });
    });
});

module.exports = router;
