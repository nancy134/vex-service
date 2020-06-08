const rp = require('request-promise');

var createStore = function(body,username, token){
    console.log("body: "+JSON.stringify(body));
    console.log("username: "+username);
    console.log("token: "+token);
    return new Promise(function(resolve, reject){
        var options = {
            uri: process.env.VIRTUAL_EXCHANGE+"/api/stores",
            method: 'POST',
            json: true,
            body: body,
            headers: {'X-User-Email' : username, 'X-User-Token' : token}
        };
        rp(options).then(function(resp){
            resolve(resp);
        }).catch(function(err){
            reject(err);
        });
    });
}

exports.createStore = createStore;
