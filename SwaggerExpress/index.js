var express = require('express');
var app = express();
var port = '2202';

app.get('/', async (req, res, next) => {
    res.json('Done.');
});

app.listen(port, () => console.log(`App listening on port ${port}.`));