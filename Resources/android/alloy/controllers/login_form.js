function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function actionLogin() {
        if ($.inputUsername.value && $.inputPassword.value) {
            $.activityIndicator.show();
            $.buttonLogin.enabled = false;
            var AppData = require("data");
            AppData.login($.inputUsername.value, $.inputPassword.value, function(response) {
                $.activityIndicator.hide();
                $.buttonLogin.enabled = true;
                if ("ok" === response.result) {
                    Config.isLogged = true;
                    Config.userLogged = $.inputUsername.value;
                    Alloy.createController("MenuPpal");
                } else {
                    $.inputPassword.value = "";
                    alert(L("error", "Error") + ":\n" + response.msg);
                }
            });
        } else Ti.UI.createAlertDialog({
            message: L("formMissingFields", "Por favor complete los datos"),
            ok: "OK",
            title: L("actionRequired", "Accion requerida")
        }).show();
    }
    function openTerminar() {
        var activity = Titanium.Android.currentActivity;
        activity.finish();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login_form";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.loginForm = Ti.UI.createWindow({
        backgroundColor: "#F3FFFA",
        id: "loginForm",
        fullscreen: "false"
    });
    $.__views.loginForm && $.addTopLevelView($.__views.loginForm);
    $.__views.loginView = Ti.UI.createView({
        id: "loginView",
        layout: "vertical"
    });
    $.__views.loginForm.add($.__views.loginView);
    $.__views.inputUsername = Ti.UI.createTextField({
        width: 200,
        top: 10,
        color: "#000",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "inputUsername"
    });
    $.__views.loginView.add($.__views.inputUsername);
    $.__views.inputPassword = Ti.UI.createTextField({
        width: 200,
        top: 10,
        color: "#000",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "inputPassword",
        passwordMask: "true"
    });
    $.__views.loginView.add($.__views.inputPassword);
    $.__views.buttonLogin = Ti.UI.createButton({
        top: 10,
        id: "buttonLogin"
    });
    $.__views.loginView.add($.__views.buttonLogin);
    actionLogin ? $.__views.buttonLogin.addEventListener("click", actionLogin) : __defers["$.__views.buttonLogin!click!actionLogin"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 20,
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        id: "activityIndicator"
    });
    $.__views.loginView.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Config = require("Config");
    $.loginForm.title = L("login", "Acceso");
    $.inputUsername.hintText = L("username", "Nombre de Usuario");
    $.inputPassword.hintText = L("password", "Contraseña");
    $.buttonLogin.title = L("login", "Acceder");
    $.loginForm.addEventListener("open", function() {
        if ($.loginForm.activity) {
            var activity = $.loginForm.activity;
            activity.invalidateOptionsMenu();
            activity.onCreateOptionsMenu = function(e) {
                var menu = e.menu;
                var menuItem1 = menu.add({
                    title: L("terminar", "Terminar"),
                    showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER
                });
                menuItem1.addEventListener("click", openTerminar);
            };
            Alloy.Globals.Android.Api >= 11 && activity.actionBar && (activity.actionBar.title = L("login", "AlEn Movil - Acceso"));
        }
    });
    $.loginForm.addEventListener("android:back", function() {
        var activity = Ti.Android.currentActivity;
        activity.finish();
    });
    __defers["$.__views.buttonLogin!click!actionLogin"] && $.__views.buttonLogin.addEventListener("click", actionLogin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;