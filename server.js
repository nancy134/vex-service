'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const vexService = require('./vex');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.post('/store', (req, res) => {
    console.log("req.body: "+JSON.stringify(req.body));
    var username = req.get('X-User-Email');
    var token = req.get('X-User-Token');
    console.log("username: "+username);
    console.log("token: "+token);
    var createStorePromise = vexService.createStore(req.body, username, token);
    createStorePromise.then(function(result){
        res.json(result);
    }).catch(function(err){
        res.status(400).send(err);
    });
});

app.listen(PORT, HOST);
