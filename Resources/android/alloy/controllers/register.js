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
    this.__controllerPath = "register";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.register = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "register",
        fullscreen: "false"
    });
    $.__views.register && $.addTopLevelView($.__views.register);
    $.__views.registerLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 10,
            fontFamily: "Helvetica Neue"
        },
        id: "registerLabel"
    });
    $.__views.register.add($.__views.registerLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.register.title = L("register", "Salir");
    $.registerLabel.text = L("register", "Salir");
    $.register.addEventListener("open", function() {
        if ($.register.activity) {
            var activity = $.register.activity;
            if (Alloy.Globals.Android.Api >= 11 && activity.actionBar) {
                activity.actionBar.title = L("login", "Acceso");
                activity.actionBar.displayHomeAsUp = true;
                activity.actionBar.onHomeIconItemSelected = function() {
                    $.register.close();
                    $.register = null;
                };
            }
        }
    });
    $.register.addEventListener("android:back", function() {
        $.register.close();
        $.register = null;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;