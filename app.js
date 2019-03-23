const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Set PORT
const port = process.env.PORT || 3000;

// Set Express app
const app = express();

// Set Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set view engine
app.set('view engine', 'pug');

// Set static files
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const indexRoute = require('./routes');
const booksRoute = require('./routes/books');
const newBookRoute = require('./routes/new-book');
const updateBookRoute = require('./routes/update-book');
const deleteBookRoute = require('./routes/delete-book');

// Set Routes
app.use(indexRoute);
app.use('/books', booksRoute);
app.use('/books/new', newBookRoute);
app.use('/books/:id', updateBookRoute);
app.use('/books/:id/delete', deleteBookRoute);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).render('page-not-found');
});

// Handle 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error');
});

// Set up server
app.listen(port, () => console.log(`App is listening to port ${port}`));
