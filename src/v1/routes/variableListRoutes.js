const express = require('express');
const router = express.Router();
const variableListController = require('../../controllers/variableListControllers');
const checkAuth = require('../../middleware/auth');
const checkRole = require('../../middleware/roleAuth');


router
    .get('/', checkAuth, checkRole(['administrador']), variableListController.getAllVariableList)

    // .get('/:businessId', checkAuth, checkRole(['administrador']), businessController.getOneBusiness)

    // .post('/', checkAuth, checkRole(['administrador']), businessController.createNewBusiness)

    .post('/:variableListId', checkAuth, checkRole(['administrador']), variableListController.updateVariableList)

    // .post('/:businessId/delete', checkAuth, checkRole(['administrador']), businessController.deleteBusiness)

    module.exports = router;