const AgentModel = require('../Models/agent');

const addAgent = async (req, res) => {
    try {
        console.log('Request headers:', req.headers);
        console.log('Request body:', req.body);
        const { name, email, mobile, password } = req.body;
        const newAgent = new AgentModel({ name, email, mobile, password });
        await newAgent.save();
        res.status(201).json({ message: 'Agent added successfully' });
    } catch (error) {
        console.error('Error in addAgent:', error);
        res.status(500).json({ message: 'Error adding agent', error });
    }
};

const getAgents = async (req, res) => {
    try {
        const agents = await AgentModel.find();
        res.status(200).json({ success: true, agents });
    } catch (error) {
        console.error('Error fetching agents:', error); // Add this line for detailed logging
        res.status(500).json({ success: false, message: 'Error fetching agents', error });
    }
};


module.exports = {
    addAgent,
    getAgents
};