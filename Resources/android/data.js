function listaComprobantes() {
    xhr = Titanium.Network.createHTTPClient({
        onload: function() {
            Ti.API.info("Respuesta" + this.responseText);
            cargaJsonAlDataStore(JSON.parse(this.responseText));
        },
        onerror: function() {
            Ti.API.info(this.responseText);
            Ti.API.info(this.status);
        },
        timeout: 5e3
    });
    xhr.autoEncodeUrl = false;
    xhr.open("GET", url + userNameLoged + "/COMP");
    xhr.send();
}

function cargaJsonAlDataStore(jsonDatos) {
    Ti.API.info("Longitud de la respuesta jsonDatos.ListaSolCompResult.length : " + jsonDatos.ListaSolCompResult.length);
    for (var i = 0, j = jsonDatos.ListaSolCompResult.length; j > i; i++) {
        var renglon = "Comprobante " + i;
        var row = {
            title: renglon
        };
        Ti.API.info("Renglon " + renglon);
        Ti.API.info(row.title);
        dataStore.push(row);
    }
}

var loggedIn = false;

var userNameLoged = "MACHORGU";

var url = "http://172.16.51.68:8888/WCF/RestServiceImpl.svc/ListaSolComp/";

var dataStore = [];

var dataBuilt = false;

if (Ti.App.Properties.getString("loggedIn")) {
    loggedIn = true;
    userNameLoged = Ti.App.Properties.getString("userName");
    Ti.API.info("Usuario Logeado desde data.js " + userNameLoged);
}

exports.isLoggedIn = function() {
    return loggedIn;
};

exports.login = function(username, password, callback) {
    if ("error" !== username) {
        loggedIn = true;
        userNameLoged = username;
        Ti.App.Properties.setString("loggedIn", 1);
        Ti.App.Properties.setString("userName", username);
        Ti.API.info("Desde data.js en la funcion login Usuario Logeado " + username);
        Ti.API.info("Usuario Logeado desde las propiedades " + Ti.App.Properties.getString("userName"));
        setTimeout(function() {
            callback({
                result: "ok"
            });
        }, 1500);
    } else setTimeout(function() {
        callback({
            result: "error",
            msg: 'Nombre de Usuario "error" no es valido'
        });
    }, 1500);
};

exports.logout = function(callback) {
    loggedIn = false;
    Ti.App.Properties.removeProperty("loggedIn");
    Ti.App.Properties.removeProperty("userName");
    callback({
        result: "ok"
    });
};

!dataBuilt;

exports.deleteItem = function(id) {
    dataStore.splice(id, 1);
};

exports.getItem = function(id) {
    return dataStore[id];
};

exports.getAll = function() {
    return dataStore;
};