var express = require('express');
var app = express();
var wrapper = require('./wrapper/CosmosDbWrapper');
var axiosWrapper = require('./wrapper/AxiousWrapper');
var port = '2202';

var bodyParser = require('body-parser')
app.use( bodyParser.json());       
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.post('/', async (req, res, next) => {
    var dbRes = await wrapper.set(req.body.teamName, req.body.tro);
    wrapper.closeConnection();
    res.json(dbRes);
});

app.get('/', async (req, res, next) => {
    var dbRes = await wrapper.get();
    wrapper.closeConnection();
    res.json(dbRes);
});

app.post('/checkUserValidity', async (req, res, next) => res.status(200).json(await axiosWrapper.checkUserAndFetchPermissions(req.body.teamName)));

app.listen(port, () => console.log(`App listening on port ${port}.`));