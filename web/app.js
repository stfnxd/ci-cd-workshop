const express = require('express');
const fetch = require('node-fetch'); 
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// TODO: You must change the connectionstring to the API when deploying in docker compose
app.get('/', (req, res) => {
fetch('http://localhost:3001/api/names')
    .then(response => response.json())
    .then(names => res.render('index', { names }))
    .catch(err => res.status(500).json(err));
});

// TODO: You must change the connectionstring to the API when deploying in docker compose
app.post('/add-name', (req, res) => {
fetch('http://localhost:3001/api/names', {
    method: 'POST',
    body: JSON.stringify({ name: req.body.name }),
    headers: { 'Content-Type': 'application/json' }
})
.then(response => res.redirect('/'))
.catch(err => res.status(500).json(err));
});

app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});
