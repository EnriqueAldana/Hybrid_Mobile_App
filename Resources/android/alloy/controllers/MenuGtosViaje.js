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
        0 === index ? Alloy.createController("solicitudGastos") : 1 === index && Alloy.createController("comprobantesGastos");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "MenuGtosViaje";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.winMenuGtosViaje = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "winMenuGtosViaje"
    });
    $.__views.__alloyId0 = Ti.UI.createView({
        backgroundColor: "white",
        id: "__alloyId0"
    });
    $.__views.winMenuGtosViaje.add($.__views.__alloyId0);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 20,
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        id: "activityIndicator"
    });
    $.__views.__alloyId0.add($.__views.activityIndicator);
    $.__views.tableRecordsMenuGtosViaje = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        top: 0,
        font: {
            fontSize: 10,
            fontFamily: "Helvetica Neue"
        },
        id: "tableRecordsMenuGtosViaje"
    });
    $.__views.__alloyId0.add($.__views.tableRecordsMenuGtosViaje);
    $.__views.tabMenuGtosViaje = Ti.UI.createTab({
        window: $.__views.winMenuGtosViaje,
        id: "tabMenuGtosViaje",
        title: "AlEn Móvil Menu Gtos Viaje"
    });
    $.__views.tabMenuGtosViaje && $.addTopLevelView($.__views.tabMenuGtosViaje);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    require("Config");
    var tableDataMenuGtosViaje = [ {
        title: "Solicitud Gastos"
    }, {
        title: "Comprobacion Gastos"
    } ];
    $.tableRecordsMenuGtosViaje.setData(tableDataMenuGtosViaje);
    $.tableRecordsMenuGtosViaje.addEventListener("click", tableClick);
    $.winMenuGtosViaje.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;