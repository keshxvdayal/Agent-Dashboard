const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const AgentModel = require('../Models/agent');
const TaskModel = require('../Models/task');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /csv/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only CSV files are allowed!'));
    }
});

const uploadCSV = async (req, res) => {
    try {
        console.log('File:', req.file); // Log the file details
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    console.log('CSV Data:', results);

                    // Validate CSV data
                    const invalidRows = results.filter(item => !item.FirstName || !item.Phone || !item.Notes);
                    if (invalidRows.length > 0) {
                        console.error('Invalid CSV rows:', invalidRows);
                        return res.status(400).json({ message: 'Invalid CSV format', invalidRows });
                    }

                    const agents = await AgentModel.find();
                    if (agents.length === 0) {
                        return res.status(400).json({ message: 'No agents found' });
                    }

                    // Delete previous tasks
                    await TaskModel.deleteMany({});

                    const totalTasks = results.length;
                    const numAgents = agents.length;

                    const tasksPerAgent = Math.floor(totalTasks / numAgents);
                    const remainingTasks = totalTasks % numAgents;

                    let taskIndex = 0;
                    const distributedTasks = [];
                    for (let i = 0; i < numAgents; i++) {
                        const agentTasks = results.slice(taskIndex, taskIndex + tasksPerAgent);
                        if (i < remainingTasks) {
                            agentTasks.push(results[taskIndex + tasksPerAgent]);
                            taskIndex++;
                        }
                        taskIndex += tasksPerAgent;

                        const task = new TaskModel({
                            agentId: agents[i]._id,
                            agentName: agents[i].name, // Add agentName
                            agentPhone: agents[i].mobile, // Add agentPhone
                            agentEmail: agents[i].email, // Add agentEmail
                            tasks: agentTasks.map(task => ({
                                firstName: task.FirstName,
                                phone: task.Phone,
                                notes: task.Notes
                            }))
                        });
                        await task.save();

                        distributedTasks.push({
                            agent: agents[i],
                            tasks: agentTasks
                        });
                    }

                    res.status(201).json({ message: 'Tasks distributed successfully', distributedTasks });
                } catch (error) {
                    console.error('Error distributing tasks:', error);
                    res.status(500).json({ message: 'Error distributing tasks', error });
                }
            });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file', error });
    }
};

const getUploads = async (req, res) => {
    try {
        const agents = await TaskModel.find();
        res.status(200).json({ success: true, agents });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching agents', error });
    }
};
module.exports = { upload, uploadCSV, getUploads };
