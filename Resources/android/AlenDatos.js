function getListaComprobantes() {
    var address = "http://127.0.0.1:8080/WCF/RestServiceImpl.svc/ListaSolComp/JEAS/SOL";
    var xhr = Titanium.Network.createHTTPClient();
    xhr.setTimeout(1e5);
    xhr.open("GET", address);
    xhr.send();
    xhr.onerror = function() {};
    xhr.onload = function() {
        var get = JSON.parse(xhr.response);
        for (var i = 0; get.length > i; i++) {
            var row = Ti.UI.createTableViewRow({
                title: get[i].NOMBRE,
                hasChild: true
            });
            alert(get[i].NOMBRE);
            dataStore.push(row);
        }
    };
}

function listaComprobantes() {
    url = "http://127.0.0.1:8080/WCF/RestServiceImpl.svc/ListaSolComp/JEAS/SOL";
    xhr = Titanium.Network.createHTTPClient({
        onload: function() {
            Ti.API.info(this.responseText);
        },
        onerror: function() {
            Ti.API.info(this.response.Text);
            Ti.API.info(this.status);
            Ti.API.info(e.error);
        },
        onreadystatuschange: function() {
            switch (readyState) {
              case 0:
                Ti.API.info(this.responseText);
                breake;

              case 1:
                breake;

              case 2:
                breake;

              case 3:
                breake;

              case 4:            }
        },
        onsendstream: function() {},
        ondatastream: function() {},
        timeout: 5e3
    });
    xhr.open("GET", url);
    xhr.send();
}

function cargaJsonAlDataStore() {}

var loggedIn = false;

Ti.App.Properties.getString("loggedIn") && (loggedIn = true);

exports.isLoggedIn = function() {
    return loggedIn;
};

exports.login = function(username, password, callback) {
    if ("error" !== username) {
        loggedIn = true;
        Ti.App.Properties.setString("loggedIn", 1);
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
    callback({
        result: "ok"
    });
};

var dataStore = [];

var dataBuilt = false;

dataBuilt || listaComprobantes();

exports.deleteItem = function(id) {
    dataStore.splice(id, 1);
};

exports.getItem = function(id) {
    return dataStore[id];
};

exports.getAll = function() {
    return dataStore;
};