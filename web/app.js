const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});