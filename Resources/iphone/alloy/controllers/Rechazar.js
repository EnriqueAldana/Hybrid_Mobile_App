function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function actionRechazar() {
        var AppData = require("data");
        AppData.deleteItem(dataId);
        Ti.App.fireEvent("dataUpdated");
        $.detail.close();
        $.detail = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Rechazar";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.detail = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "detail"
    });
    $.__views.detail && $.addTopLevelView($.__views.detail);
    $.__views.detailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "detailLabel"
    });
    $.__views.detail.add($.__views.detailLabel);
    $.__views.RechazarView = Ti.UI.createView({
        id: "RechazarView",
        layout: "vertical"
    });
    $.__views.detail.add($.__views.RechazarView);
    $.__views.inputComentario = Ti.UI.createTextField({
        width: 200,
        top: 10,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "inputComentario"
    });
    $.__views.RechazarView.add($.__views.inputComentario);
    $.__views.buttonRechazar = Ti.UI.createButton({
        top: 10,
        id: "buttonRechazar"
    });
    $.__views.RechazarView.add($.__views.buttonRechazar);
    actionRechazar ? $.__views.buttonRechazar.addEventListener("click", actionRechazar) : __defers["$.__views.buttonRechazar!click!actionRechazar"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 20,
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "activityIndicator"
    });
    $.__views.RechazarView.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parentTab || "";
    var dataId = 0 === args.dataId || args.dataId > 0 ? args.dataId : "";
    if ("" !== dataId) {
        var AppData = require("data");
        var dataItem = AppData.getItem(dataId);
        $.detail.title = dataItem.title;
        $.detailLabel.text = dataItem.title;
    }
    __defers["$.__views.buttonRechazar!click!actionRechazar"] && $.__views.buttonRechazar.addEventListener("click", actionRechazar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;