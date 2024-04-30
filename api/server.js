const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3001;

app.get('/api/status', (req, res) => {
    res.status(200).send('API is running...');
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});