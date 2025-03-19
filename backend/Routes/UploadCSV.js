const express = require('express');
const { upload, uploadCSV, getUploads } = require('../Controllers/TaskController');

const router = express.Router();
router.post('/upload', upload.single('file'), (req, res, next) => {
    console.log('🔹 File Middleware executed:', req.file);
    next();
}, uploadCSV);

router.get('/all', getUploads);
module.exports = router;

