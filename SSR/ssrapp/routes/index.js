var express = require('express');
var router = express.Router();

import HelloWorld from '../components/HelloWorld';
import {renderToString} from 'react-dom/server';
var React = require('react');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', helloWorldComponent: renderToString(<HelloWorld/>) });
});

module.exports = router;
