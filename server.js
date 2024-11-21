const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up multer to save files to the "customerimg" directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'customerimg');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the file upload
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.send('Image uploaded successfully!');
    } else {
        res.status(400).send('Failed to upload image.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
