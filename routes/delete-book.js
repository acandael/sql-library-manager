const express = require('express');
const router = express.Router({ mergeParams: true });
const Book = require('../models').Book;

// POST delete book
router.post('/', (req, res) => {
  Book.findOne({
    where: { id: req.params.id }
  })
    .then(book => {
      if (book) {
        return book.destroy();
      } else {
        res.sendStatus(404);
      }
    })
    .then(() => {
      res.redirect('/books');
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

module.exports = router;
