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
    this.__controllerPath = "detailSol";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.detailSolWin = Ti.UI.createWindow({
        backgroundColor: "#F3FFFA",
        id: "detailSolWin",
        borderWidth: "1",
        borderColor: "#bbb",
        borderRadius: "5"
    });
    $.__views.detailSolWin && $.addTopLevelView($.__views.detailSolWin);
    $.__views.detailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#bbb",
        font: {
            fontSize: 10,
            fontFamily: "Helvetica Neue"
        },
        id: "detailLabel",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
    });
    $.__views.detailSolWin.add($.__views.detailLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parentTab || "";
    var folioId = args.folioId;
    var tipoLista = args.tipoLista;
    var numeroEmpleadoId = args.numeroEmpleadoId;
    var Config = require("Config");
    var url = Config.urlDetalle;
    Ti.API.info("Entrando en detailSol.js");
    if ("" !== folioId && "" !== numeroEmpleadoId) {
        xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Respuesta de Lista de Comprobaciones desde detail.js " + this.responseText);
                var jsonDatos = JSON.parse(this.responseText);
                Ti.API.info("jsonDatos.DetalleViajeResult desde Rechazar.js " + jsonDatos.DetalleViajeResult);
                var jsonObjeto = jsonDatos.DetalleViajeResult;
                Ti.API.info("jsonObjeto.ANTICIPO desde detail.js " + jsonObjeto.ANTICIPO);
                var renglon = "Detalle";
                Ti.API.info("Renglon del Detalle desde detail.js" + renglon);
                $.detailLabel.text = renglon;
            },
            onerror: function() {
                Ti.API.info(this.responseText);
                Ti.API.info(this.status);
            },
            timeout: 5e3
        });
        xhr.autoEncodeUrl = false;
        xhr.open("GET", url + numeroEmpleadoId + "/" + folioId);
        xhr.send();
        $.detailSol.addEventListener("open", function() {
            if ($.detailSol.activity) {
                var activity = $.detailSol.activity;
                if (Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar) {
                    activity.actionBar.title = "COMP" == tipoLista ? "Detalle Comprobación de Viaje" : "Detalle Solicitud de Viaje";
                    activity.actionBar.displayHomeAsUp = true;
                    activity.actionBar.onHomeIconItemSelected = function() {
                        $.detailSol.close();
                        $.detailSol = null;
                    };
                }
            }
        });
        $.detailSol.addEventListener("android:back", function() {
            $.detailSol.close();
            $.detailSol = null;
        });
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;