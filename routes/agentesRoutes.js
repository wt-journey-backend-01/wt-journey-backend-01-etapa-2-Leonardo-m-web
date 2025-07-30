const express = require('express');
const router = express.Router();
const controller = require('../controllers/agentesController');

router.get('/agentes', controller.getAgents);
router.get('/agentes/:id', controller.getAgentById);
router.post('/agentes', controller.createAgent);
router.put('/agentes/:id', controller.putAgent);
router.patch('/agentes/:id', controller.patchAgent);
router.delete('/agentes/:id', controller.deleteAgent);


module.exports = router;