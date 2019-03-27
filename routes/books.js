const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Get all books
router.get('/', (req, res, next) => {
  Book.findAll({ order: [['id', 'ASC']] })
    .then(function(books) {
      res.render('index', { books: books });
    })
    .catch(function(err) {
      res.sendStatus(500);
    });
});

module.exports = router;
