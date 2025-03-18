const express = require('express');
const { addAgent, getAgents } = require('../Controllers/AgentController');
const router = express.Router();

router.post('/add', addAgent);
router.get('/all', getAgents);


module.exports = router;