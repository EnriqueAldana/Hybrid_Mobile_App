function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function tableClick(e) {
        var index = e.index;
        0 === index ? Alloy.createController("MenuGtosViaje") : 1 === index ? alert("Pendiente de Implementar") : 2 === index ? alert("Pendiente de Implementar") : 3 === index && alert("Pendiente de Implementar");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "MenuPpal";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.winMenuppal = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "winMenuppal",
        title: "Menu ppal"
    });
    $.__views.__alloyId1 = Ti.UI.createView({
        backgroundColor: "white",
        id: "__alloyId1"
    });
    $.__views.winMenuppal.add($.__views.__alloyId1);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 20,
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        id: "activityIndicator"
    });
    $.__views.__alloyId1.add($.__views.activityIndicator);
    $.__views.tableRecordsMenuppal = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        top: 0,
        font: {
            fontSize: 10,
            fontFamily: "Helvetica Neue"
        },
        id: "tableRecordsMenuppal"
    });
    $.__views.__alloyId1.add($.__views.tableRecordsMenuppal);
    $.__views.tabMenuPpal = Ti.UI.createTab({
        window: $.__views.winMenuppal,
        id: "tabMenuPpal",
        title: "AlEn Móvil Menu ppal"
    });
    $.__views.tabMenuPpal && $.addTopLevelView($.__views.tabMenuPpal);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var Config = require("Config");
    var isLogged = Config.isLogged;
    var tableDatamenuPpal = [ {
        title: "Gastos de Viaje"
    }, {
        title: "Compras"
    }, {
        title: "Contabilidad"
    }, {
        title: "Ventas"
    } ];
    $.tableRecordsMenuppal.setData(tableDatamenuPpal);
    $.tableRecordsMenuppal.addEventListener("click", tableClick);
    $.winMenuppal.open();
    $.tabMenuPpal.addEventListener("onCreateOptionsMenu", function(e) {
        e.actionBar && (e.actionBar.title = $.winMenuppal.title);
        e.menu.add({
            title: "Salir ",
            showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
            itemId: 100,
            visible: isLogged
        }).addEventListener("click", function() {
            Config.isLogged = false;
            Config.userLogged = "";
            isLogged = false;
            Alloy.createController("login");
            e.activity.invalidateOptionsMenu();
        });
    });
    $.tabMenuPpal.addEventListener("onPrepareOptionsMenu", function(e) {
        e.menu.findItem(100).setVisible(isLogged);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;