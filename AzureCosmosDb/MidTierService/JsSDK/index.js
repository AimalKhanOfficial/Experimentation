var express = require('express');
var app = express();
var wrapper = require('./wrapper/CosmosDbWrapper');
var port = '2202';

var bodyParser = require('body-parser')
app.use( bodyParser.json());       
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.post('/', async (req, res, next) => await wrapper.set(req.body) ? res.status(200).json('Item was created.') : res.status(500).json('Something went wrong, try again later.'));

app.get('/', async (req, res, next) => res.status(200).json(await wrapper.get()));

app.listen(port, () => console.log(`App listening on port ${port}.`));