const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/auth');

//added lines 5 to  6
const Book = require('../models/bookModel');
const auth = require('../middleware/auth');

// Validation middleware (simple example)
const validateBook = (req, res, next) => {
  const { title, author, publishedYear } = req.body;
  if (!title || !author || typeof publishedYear !== 'number') {
    return res.status(400).json({ error: 'All fields are required and publishedYear must be a number.' });
  }
  next();
};

// added lines 17 to 28
// Public Route
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Protected Route
router.post('/', auth, async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

/**
 * @swagger
 * definitions:
 *   BookCreate:
 *     type: object
 *     required:
 *       - title
 *       - author
 *       - genre
 *       - publishedYear
 *       - ISBN
 *       - language
 *       - summary
 *     properties:
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       genre:
 *         type: string
 *       publishedYear:
 *         type: integer
 *       ISBN:
 *         type: string
 *       language:
 *         type: string
 *       summary:
 *         type: string
 *
 *   Book:
 *     allOf:
 *       - $ref: '#/definitions/BookCreate'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 *             description: Auto-generated ID
 */


/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: A list of books
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Book'
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Books
 *     summary: Add a new book
 *     parameters:
 *       - in: body
 *         name: book
 *         required: true
 *         schema:
 *           $ref: '#/definitions/BookCreate'
 *     responses:
 *       201:
 *         description: Book created successfully
 */
router.post('/', bookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     tags:
 *       - Books
 *     summary: Update an existing book
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - in: body
 *         name: book
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 */
router.put('/:id', validateBook, bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete('/:id', bookController.deleteBook);


/**
 * @swagger
 * /books/id/{id}:
 *   get:
 *     summary: Get a book by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: A single book
 *       404:
 *         description: Book not found
 */
// Get book by ID
router.get('/id/:id', bookController.getBookById);

/**
 * @swagger
 * /books/title/{title}:
 *   get:
 *     summary: Get books by its title (partial match)
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Title or part of the title
 *     responses:
 *       200:
 *         description: List of matching books
 *       404:
 *         description: No books found
 */
// Get books by title (partial match)
router.get('/title/:title', bookController.getBooksByTitle);

/**
 * @swagger
 * /books/author/{author}:
 *   get:
 *     summary: Get books by the author (partial match)
 *     parameters:
 *       - in: path
 *         name: author
 *         required: true
 *         schema:
 *           type: string
 *         description: Author's name or part of it
 *     responses:
 *       200:
 *         description: List of books by that author
 *       404:
 *         description: No books found
 */
// Get books by author (partial match)
router.get('/author/:author', bookController.getBooksByAuthor);

//--- added new start

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       description: Book details
 *       required: true
 *     parameters:
 *       - in: body
 *         name: book
 *         description: Book object
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - author
 *           properties:
 *             title:
 *               type: string
 *             author:
 *               type: string
 *             year:
 *               type: integer
 *     responses:
 *       201:
 *         description: Book created
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, bookController.createBook);
//router.post('/', authMiddleware, addBookController);

// --- added new end 

module.exports = router;









