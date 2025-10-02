const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact found
 *       404:
 *         description: Contact not found
 */
router.get('/:id', contactController.getContactById);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags:
 *       - Contacts
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: contact
 *         required: true
 *         description: The contact to create
 *         schema:
 *           type: object
 *           required:
 *             - firstName
 *             - lastName
 *             - email
 *             - favoriteColor
 *             - birthday
 *           properties:
 *             firstName:
 *               type: string
 *               example: Jane
 *             lastName:
 *               type: string
 *               example: Doe
 *             email:
 *               type: string
 *               example: jane.doe@example.com
 *             favoriteColor:
 *               type: string
 *               example: Blue
 *             birthday:
 *               type: string
 *               format: date
 *               example: 1990-01-01
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', contactController.addContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     tags:
 *       - Contacts
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The ID of the contact to update
 *       - in: body
 *         name: contact
 *         required: true
 *         description: Updated contact object
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             favoriteColor:
 *               type: string
 *             birthday:
 *               type: string
 *               format: date
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
