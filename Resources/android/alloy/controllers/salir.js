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
    this.__controllerPath = "salir";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.salir = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "salir",
        fullscreen: "false"
    });
    $.__views.salir && $.addTopLevelView($.__views.salir);
    $.__views.salirLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 10,
            fontFamily: "Helvetica Neue"
        },
        id: "salirLabel"
    });
    $.__views.salir.add($.__views.salirLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.salir.title = L("salir", "Salir");
    $.salirLabel.text = L("salir", "Salir");
    $.salir.addEventListener("open", function() {
        if ($.salir.activity) {
            var activity = $.salir.activity;
            if (Alloy.Globals.Android.Api >= 11 && activity.actionBar) {
                activity.actionBar.title = L("salir", "Salir");
                activity.actionBar.displayHomeAsUp = true;
                activity.actionBar.onHomeIconItemSelected = function() {
                    $.salir.close();
                    $.salir = null;
                };
            }
        }
    });
    $.salir.addEventListener("android:back", function() {
        $.salir.close();
        $.salir = null;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;