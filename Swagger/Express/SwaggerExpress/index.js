var express = require('express');
var app = express();
var port = '2202';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var options = {
    explorer: true
};

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/pets', (req, res) => {
    res.json('Hey');
});

app.listen(port, () => console.log(`App listening on port ${port}.`));