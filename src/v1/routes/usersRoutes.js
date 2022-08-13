const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userControllers');
const checkAuth = require('../../middleware/auth');
const checkRole = require('../../middleware/roleAuth');


router
    .get('/', checkAuth, checkRole(['administrador']), userController.getAllUsers)

    .get('/:userId', checkAuth, checkRole(['administrador']), userController.getOneUser)

    .post('/', checkAuth, checkRole(['administrador']), userController.createNewUser)

    .post('/:userId', checkAuth, checkRole(['administrador']), userController.updateUser)

    .post('/:userId/delete', checkAuth, checkRole(['administrador']), userController.deleteUser)

    module.exports = router;