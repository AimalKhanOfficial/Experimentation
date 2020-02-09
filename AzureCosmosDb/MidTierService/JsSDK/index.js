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
  let response = await wrapper.set(req.body);
  res.status(response.status).json(response.status);
});

app.get('/', async (req, res, next) => res.status(200).json(await wrapper.get()));

app.post('/users', async (req, res, next) => res.status(200).json(await wrapper.isUserAuthorized(req.body.team)));

app.listen(port, () => console.log(`App listening on port ${port}.`));