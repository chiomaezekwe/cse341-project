const express = require('express');
const Review = require('../models/reviewModel');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for managing book reviews
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: A list of reviews
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Review'
 */
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().populate('bookId userId');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: review
 *         description: Review to add
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - bookId
 *             - rating
 *           properties:
 *             bookId:
 *               type: string
 *             rating:
 *               type: integer
 *             comment:
 *               type: string
 *     responses:
 *       201:
 *         description: Review created
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/reviews', authenticateToken, async (req, res) => {
  const { bookId, rating, comment } = req.body;
  try {
    const review = new Review({
      bookId,
      userId: req.user.id,
      rating,
      comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/reviews/book/{bookId}:
 *   get:
 *     summary: Get reviews for a specific book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         type: string
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/book/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted
 *       403:
 *         description: Forbidden - not the owner
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this review' });
    }

    await review.remove();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
