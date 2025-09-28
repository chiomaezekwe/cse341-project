const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Add Swagger docs

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the contact
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         favoriteColor:
 *           type: string
 *         birthday:
 *           type: string
 *           format: date
 *       example:
 *         firstName: Juddie
 *         lastName: kayode
 *         email: judikay@gmail.com
 *         favoriteColor: White
 *         birthday: 11/25/2000
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Returns the list of all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: The list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */

// Routes
router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContactById);

// Add similar comments for POST, PUT, DELETE
//router.post('/', contactController.createContact);
router.post('/', contactController.addContact);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);


module.exports = router;
