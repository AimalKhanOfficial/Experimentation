var express = require('express');
var app = express();
var wrapper = require('./wrapper/CosmosDbWrapper');
var port = '2202';

app.get('/', (req, res, next) => {
    res.json('App listening on port 2202');
});

app.post('/api/set', (req, res, next) => {
    res.json('Set called.');
});

app.get('/api/get', async (req, res, next) => {
    res.json(await wrapper.get());
});

app.listen(port, () => console.log(`App listening on port ${port}.`));