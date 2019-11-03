var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/req', async function(req, res, next) {
  console.log('here');
  const data = await axios.get('https://baconipsum.com/api/?type=meat-and-filler');
  return res.status(200).json(data.data[0]);
});

module.exports = router;
