const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authControllers');



router.post('/login', authController.loginCtrl);


module.exports = router;