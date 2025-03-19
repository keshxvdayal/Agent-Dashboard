const express = require('express');
const TaskModel = require('../Models/task');
const router = express.Router();
const AgentModel = require('../Models/agent'); 



router.get('/distributed', async (req, res) => {
    try {
        const tasks = await TaskModel.find().populate('agentId');
        if (!tasks.length) {
            return res.status(404).json({ message: "No distributed tasks found" });
        }
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching distributed tasks', error });
    }
});

router.get('/:agentId', async (req, res) => {
    try {
        const tasks = await TaskModel.find({ agentId: req.params.agentId });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});




module.exports = router;
