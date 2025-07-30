const express = require('express');
const router = express.Router();
const controller = require('../controllers/casosController');

router.get('/', controller.getCase);
router.get('/:id', controller.getCaseById);
router.post('/', controller.createCase);
router.put('/:id', controller.putCase);
router.patch('/:id', controller.patchCase);
router.delete('/:id', controller.deleteCase);


module.exports = router;