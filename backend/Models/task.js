const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'agents',
        required: true
    },
    tasks: [
        {
            firstName: { type: String, required: true },
            phone: { type: Number, required: true },
            notes: { type: String, required: true }
        }
    ]
});

const TaskModel = mongoose.model('tasks', TaskSchema);
module.exports = TaskModel;
