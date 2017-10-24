function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "solicitudGastos";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.winsolicitudGastos = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "winsolicitudGastos"
    });
    $.__views.__alloyId2 = Ti.UI.createView({
        id: "__alloyId2"
    });
    $.__views.winsolicitudGastos.add($.__views.__alloyId2);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 20,
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "activityIndicator"
    });
    $.__views.__alloyId2.add($.__views.activityIndicator);
    $.__views.labelNoRecords = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        visible: false,
        top: 20,
        id: "labelNoRecords"
    });
    $.__views.__alloyId2.add($.__views.labelNoRecords);
    $.__views.tableRecords = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        top: 0,
        id: "tableRecords"
    });
    $.__views.__alloyId2.add($.__views.tableRecords);
    $.__views.tabsolicitudGastos = Ti.UI.createTab({
        window: $.__views.winsolicitudGastos,
        id: "tabsolicitudGastos"
    });
    $.__views.tabsolicitudGastos && $.addTopLevelView($.__views.tabsolicitudGastos);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabsolicitudGastos.title = L("solicitudGastos", "Solicitud");
    $.winsolicitudGastos.title = L("solicitudGastos", "Solicitudes de Gasto");
    $.labelNoRecords.text = L("labelNoRecords", "Aqui lista de Solicitudes pendientes por aprobar");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;