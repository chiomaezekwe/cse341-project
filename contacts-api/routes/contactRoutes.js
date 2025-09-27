const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContactById);

module.exports = router;
