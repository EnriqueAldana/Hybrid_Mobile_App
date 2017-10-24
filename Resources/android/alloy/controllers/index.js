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
    var __alloyId3 = [];
    $.__views.tabsolicitudGastos = Alloy.createController("solicitudGastos", {
        id: "tabsolicitudGastos",
        tipoLista: "SOL"
    });
    __alloyId3.push($.__views.tabsolicitudGastos.getViewEx({
        recurse: true
    }));
    $.__views.tabcomprobantesGastos = Alloy.createController("comprobantesGastos", {
        id: "tabcomprobantesGastos",
        tipoLista: "COMP"
    });
    __alloyId3.push($.__views.tabcomprobantesGastos.getViewEx({
        recurse: true
    }));
    $.__views.tabGroupGastosDeViaje = Ti.UI.createTabGroup({
        tabs: __alloyId3,
        id: "tabGroupGastosDeViaje",
        title: "AlEn Móvil Gastos de Viaje"
    });
    $.__views.tabGroupGastosDeViaje && $.addTopLevelView($.__views.tabGroupGastosDeViaje);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("data");
    var Config = require("Config");
    if (Config.isLogged) {
        $.tabGroupGastosDeViaje.open();
        $.tabGroupGastosDeViaje.setActiveTab(0);
        $.tabGroupGastosDeViaje.title = "AlEn Movil - Gastos de Viaje";
        Alloy.Globals.tabGroup = $.tabGroupGastosDeViaje;
        $.tabGroupGastosDeViaje.addEventListener("open", function() {
            if ($.tabGroupGastosDeViaje.activity) {
                var activity = $.tabGroupGastosDeViaje.activity, actionBar = activity.actionBar;
                activity.onCreateOptionsMenu = function(e) {
                    e.menu.clear();
                    e.activity = activity;
                    e.actionBar = actionBar;
                    $.tabGroupGastosDeViaje.activeTab.fireEvent("onCreateOptionsMenu", e);
                };
                Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar && (activity.actionBar.title = L("appTitle", "AlEn - Gastos de Viaje"));
            }
        });
        $.tabGroupGastosDeViaje.addEventListener("android:back", function() {
            var activity = Ti.Android.currentActivity;
            activity.finish();
        });
    } else Alloy.createController("login");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;