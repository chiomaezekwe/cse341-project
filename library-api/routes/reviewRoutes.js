const express = require('express');
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for managing book reviews
 */

/**
 * @swagger
 * definitions:
 *   Review:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       userId:
 *         type: string
 *         description: ID of the user who posted the review
 *       bookId:
 *         type: string
 *         description: ID of the book being reviewed
 *       rating:
 *         type: integer
 *         format: int32
 *       comment:
 *         type: string
 *       createdAt:
 *         type: string
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         format: date-time
 */

/**
 * @swagger
 * /reviews:
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
router.get('/', reviewController.getAllReviews);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: body
 *         name: review
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - bookId
 *             - rating
 *             - comment
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
router.post('/', auth, reviewController.createReview);

/**
 * @swagger
 * /reviews/book/{bookId}:
 *   get:
 *     summary: Get reviews for a specific book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/book/:bookId', reviewController.getReviewsByBook);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
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
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router;
