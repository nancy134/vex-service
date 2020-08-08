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
    var username = req.get('X-User-Email');
    var token = req.get('X-User-Token');
    var createStorePromise = vexService.createStore(req.body, username, token);
    createStorePromise.then(function(result){
        res.json(result);
    }).catch(function(err){
        res.status(400).send(err);
    });
});

app.get('/users/search', (req, res) => {
    var username = req.get('X-User-Email');
    var token = req.get('X-User-Token');
    var email = req.query.email;
    var findUserPromise = vexService.findUser(email, username, token);
    findUserPromise.then(function(result){
        res.json(result);
    }).catch(function(err){
        res.status(400).send(err);
    });
});

app.get('/template', (req, res) => {
    var name = req.query.name;
    var escape = req.query.escape;
    var getTemplatePromise = vexService.getTemplate(name, escape);
    getTemplatePromise.then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

app.listen(PORT, HOST);
