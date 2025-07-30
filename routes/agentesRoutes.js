const express = require('express');
const router = express.Router();
const controller = require('../controllers/agentesController');

router.get('/', controller.getAgents);
router.get('/:id', controller.getAgentById);
router.post('/', controller.createAgent);
router.put('/:id', controller.putAgent);
router.patch('/:id', controller.patchAgent);
router.delete('/:id', controller.deleteAgent);


module.exports = router;