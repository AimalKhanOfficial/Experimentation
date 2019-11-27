var express = require('express');
var router = express.Router();

import HelloWorld from '../components/HelloWorld';
import {renderToString} from 'react-dom/server';
var React = require('react');

/* GET home page. */
router.get('/', function(req, res, next) {
  let helloWorldComponent = renderToString(<HelloWorld/>);
  res.render('index', { title: 'Express', helloWorldComponent });
});

module.exports = router;
