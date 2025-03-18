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

router.post('/upload', async (req, res) => {
    try {
        const tasks = req.body.tasks; // Assuming tasks are sent in the request body
        const agents = await AgentModel.find();

        if (agents.length === 0) {
            return res.status(400).json({ message: 'No agents available' });
        }

        // Distribute tasks among agents
        for (let i = 0; i < tasks.length; i++) {
            const agentIndex = i % agents.length;
            const agentId = agents[agentIndex]._id;

            await TaskModel.create({
                agentId,
                tasks: [tasks[i]]
            });
        }

        res.status(200).json({ message: 'Tasks uploaded and distributed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading tasks', error });
    }
});


module.exports = router;
