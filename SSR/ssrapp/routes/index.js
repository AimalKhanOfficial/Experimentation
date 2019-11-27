var express = require('express');
var router = express.Router();

import HelloWorld from '../components/HelloWorld';
import {renderToString} from 'react-dom/server';
var React = require('react');
import renderFullPage from '../server-entry';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { helloWorldComponent: renderFullPage(renderToString(<HelloWorld/>)) });
});

module.exports = router;
