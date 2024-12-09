const express = require('express');
const Book = require('../models/book');

const router = express.Router();

router.get('/', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});


router.get('/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.send('Book not found');
    }
});


router.post('/', async (req, res) => {
    const { title, author, year } = req.body;
    const book = await Book.create({ title, author, year });
    res.json({ id: book.id });
});


router.delete('/:id', async (req, res) => {
    const result = await Book.destroy({ where: { id: req.params.id } });
    if (result) {
        res.send('Book deleted')
    } else {
        res.send('Book not found');
    }
});

module.exports = router;
