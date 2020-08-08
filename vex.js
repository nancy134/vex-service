const rp = require('request-promise');

String.prototype.escapeSpecialChars = function() {
    return this.replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
};

var createStore = function(body,username, token){
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

var findUser = function(email, username, token){
    return new Promise(function(resolve, reject){
        var options = {
            uri: process.env.VIRTUAL_EXCHANGE+"/api/users/search?email="+email,
            method: 'GET',
            json: true,
            headers: {
                'X-User-Email': username,
                'X-User-Token': token
            }
        };
        rp(options).then(function(resp){
            resolve(resp);
        }).catch(function(err){
            reject(err);
        });
    });
}

var getTemplate = function(templateName, escape){
    return new Promise(function(resolve, reject){
        var options = {
             uri: process.env.VIRTUAL_EXCHANGE+"/templates/"+templateName+".html",
             method: 'GET',
        };
        rp(options).then(function(resp){
            if (escape === "true"){
                resolve(resp.escapeSpecialChars());
            } else {
                resolve(resp);
            }
        }).catch(function(err){
            reject(err);
        });
    });
}

exports.createStore = createStore;
exports.findUser = findUser;
exports.getTemplate = getTemplate;
