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
    this.__controllerPath = "index";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __alloyId1 = [];
    $.__views.tabsolicitudGastos = Alloy.createController("solicitudGastos", {
        id: "tabsolicitudGastos"
    });
    __alloyId1.push($.__views.tabsolicitudGastos.getViewEx({
        recurse: true
    }));
    $.__views.tabcomprobantesGastos = Alloy.createController("comprobantesGastos", {
        id: "tabcomprobantesGastos"
    });
    __alloyId1.push($.__views.tabcomprobantesGastos.getViewEx({
        recurse: true
    }));
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId1,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var AppData = require("data");
    if (AppData.isLoggedIn()) {
        $.tabGroup.open();
        $.tabGroup.setActiveTab(1);
        Alloy.Globals.tabGroup = $.tabGroup;
    } else Alloy.createController("login");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;