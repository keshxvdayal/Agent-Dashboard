const mongoose = require('mongoose');
const Agent = require('./models/Agent'); // Assuming you have an Agent model
const CSV = require('./models/CSV'); // Assuming you have a CSV model

const deleteAllAgentsAndCSV = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await Agent.deleteMany({});
        console.log("All agents deleted");

        await CSV.deleteMany({});
        console.log("All CSV files deleted");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error deleting agents and CSV files:", error);
    }
};

deleteAllAgentsAndCSV();