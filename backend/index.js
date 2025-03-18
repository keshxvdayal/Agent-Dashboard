const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const AgentRouter = require('./Routes/AgentRouter');
const UploadRouter = require('./Routes/UploadCSV');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 3001;

app.get('/ping', (req, res) => {
    res.send('PONG');
});
app.get('/agent/add', (req, res) => {
    res.send('Add Agent');
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/agent', AgentRouter);
app.use('/tasks', require('./Routes/TaskRoutes'));
app.use('/upload', UploadRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})