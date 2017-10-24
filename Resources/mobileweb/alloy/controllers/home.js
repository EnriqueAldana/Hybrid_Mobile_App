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
    this.__controllerPath = "home";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.home = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "home"
    });
    $.__views.__alloyId0 = Ti.UI.createView({
        backgroundColor: "white",
        id: "__alloyId0"
    });
    $.__views.home.add($.__views.__alloyId0);
    $.__views.labelHome = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "labelHome"
    });
    $.__views.__alloyId0.add($.__views.labelHome);
    $.__views.tabHome = Ti.UI.createTab({
        window: $.__views.home,
        id: "tabHome"
    });
    $.__views.tabHome && $.addTopLevelView($.__views.tabHome);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabHome.title = L("home", "Solicitud");
    $.home.title = L("home", "Solicitud");
    $.labelHome.text = L("labelHome", "Aqui lista de Solicitudes pendientes por aprobar");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;