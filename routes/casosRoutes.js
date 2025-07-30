const express = require('express');
const router = express.Router();
const controller = require('../controllers/casosController');

router.get('/casos', controller.getCase);
router.get('/casos/:id', controller.getCaseById);
router.post('/casos', controller.createCase);
router.put('/casos/:id', controller.putCase);
router.patch('/casos/:id', controller.patchCase);
router.delete('/casos/:id', controller.deleteCase);


module.exports = router;