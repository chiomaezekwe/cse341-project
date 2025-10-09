const Book = require('../models/bookModel');
const validateBook = require('../validations/bookValidation');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createBook = async (req, res) => {
  const errors = validateBook(req.body);
  if (errors) return res.status(400).json({ errors });

  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

// PUT
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// DELETE
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};

// Get books by title (partial match)
exports.getBooksByTitle = async (req, res) => {
  try {
    const books = await Book.find({ title: new RegExp(req.params.title, 'i') });
    if (!books.length) return res.status(404).json({ message: 'No books found with that title' });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get books by author (partial match)
exports.getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: new RegExp(req.params.author, 'i') });
    if (!books.length) return res.status(404).json({ message: 'No books found by that author' });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
