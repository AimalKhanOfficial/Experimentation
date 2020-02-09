var express = require('express');
var app = express();
var wrapper = require('./wrapper/CosmosDbWrapper');
var port = '2202';

var bodyParser = require('body-parser')
app.use( bodyParser.json());       
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.post('/', async (req, res, next) => {
    res.json('Up and running!');
});

app.get('/', async (req, res, next) => {
    var dbRes = await wrapper.get();
    res.json(dbRes);
});

app.listen(port, () => console.log(`App listening on port ${port}.`));