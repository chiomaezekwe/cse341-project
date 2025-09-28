const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Add Swagger docs

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

/**
 * @swagger
 * /contacts:
 *   get:
 *     description: Get all contacts
 *     responses:
 *       200:
 *         description: Success
 */

router.get('/', contactController.getContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     description: Get contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Contact found
 *       404:
 *         description: Contact not found
 */

router.get('/:id', contactController.getContactById);

// Add similar comments for POST, PUT, DELETE
//router.post('/', contactController.createContact);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags:
 *       - Contacts
 *     description: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - favoriteColor
 *               - birthday
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jane
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: jane.doe@example.com
 *               favoriteColor:
 *                 type: string
 *                 example: Blue
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *     responses:
 *       201:
 *         description: Contact created
 *       400:
 *         description: Invalid input
 */
router.post('/', contactController.addContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     description: Update an existing contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 */

router.put('/:id', contactController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     description: Delete a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 */

router.delete('/:id', contactController.deleteContact);


module.exports = router;
