var express = require('express');
var app = express();
var wrapper = require('./wrapper/CosmosDbWrapper');
var port = '2202';

app.get('/', (req, res, next) => {
    res.json('App listening on port 2202');
});

app.post('/api/set', (req, res, next) => {
    console.log('calling set');
    wrapper.set();
    res.json('Post called.');
});

app.listen(port, () => console.log(`App listening on port ${port}.`));