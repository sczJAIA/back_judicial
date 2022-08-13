const express = require('express');
const router = express.Router();
const businessController = require('../../controllers/businessController');
const checkAuth = require('../../middleware/auth');
const checkRole = require('../../middleware/roleAuth');


router
    .get('/', checkAuth, checkRole(['administrador']), businessController.getAllBusiness)

    .get('/:businessId', checkAuth, checkRole(['administrador']), businessController.getOneBusiness)

    .post('/', checkAuth, checkRole(['administrador']), businessController.createNewBusiness)

    .post('/:businessId', checkAuth, checkRole(['administrador']), businessController.updateBusiness)

    .post('/:businessId/delete', checkAuth, checkRole(['administrador']), businessController.deleteBusiness)

    module.exports = router;