const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userControllers');
const checkAuth = require('../../middleware/auth');
const checkRole = require('../../middleware/roleAuth');


router
    .get('/', checkAuth, checkRole(['administrador']), userController.getAllUsers)

    .get('/:userId', checkAuth, userController.getOneUser)

    .post('/', checkAuth, userController.createNewUser)

    .post('/:userId', checkAuth, userController.updateUser)

    .post('/:userId/delete', checkAuth, userController.deleteUser)

    module.exports = router;