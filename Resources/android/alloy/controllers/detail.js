function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function actionRegresar() {
        $.detail.close();
        $.detail = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "detail";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.detail = Ti.UI.createWindow({
        backgroundColor: "#F3FFFA",
        id: "detail",
        borderWidth: "1",
        borderColor: "#bbb",
        borderRadius: "5"
    });
    $.__views.detail && $.addTopLevelView($.__views.detail);
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
    $.__views.detail.add($.__views.detailLabel);
    $.__views.RechazarView = Ti.UI.createView({
        id: "RechazarView",
        layout: "vertical",
        backgroundColor: "F1F8F5"
    });
    $.__views.detail.add($.__views.RechazarView);
    $.__views.buttonRechazar = Ti.UI.createButton({
        top: "60",
        id: "buttonRechazar"
    });
    $.__views.RechazarView.add($.__views.buttonRechazar);
    actionRegresar ? $.__views.buttonRechazar.addEventListener("click", actionRegresar) : __defers["$.__views.buttonRechazar!click!actionRegresar"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 20,
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        id: "activityIndicator"
    });
    $.__views.RechazarView.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parentTab || "";
    var folioId = args.folioId;
    var tipoLista = args.tipoLista;
    var numeroEmpleadoId = args.numeroEmpleadoId;
    var Config = require("Config");
    var url = Config.urlDetalle;
    Ti.API.info("Entrando en detail.js");
    if ("" !== folioId && "" !== numeroEmpleadoId) {
        xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Respuesta de Lista de Comprobaciones desde detail.js " + this.responseText);
                var jsonDatos = JSON.parse(this.responseText);
                Ti.API.info("jsonDatos.DetalleViajeResult desde Rechazar.js " + jsonDatos.DetalleViajeResult);
                var jsonObjeto = jsonDatos.DetalleViajeResult;
                Ti.API.info("jsonObjeto.ANTICIPO desde detail.js " + jsonObjeto.ANTICIPO);
                var renglon = "Anticipo : " + jsonObjeto.ANTICIPO + "\n" + "\n" + "Costo Total : " + jsonObjeto.COSTOTOTAL + "\n" + "\n" + "Destino: " + jsonObjeto.DESTINO + "\n" + "\n" + "Empleado : " + jsonObjeto.EMPLEADO + "\n" + "\n" + "Nombre: " + jsonObjeto.NOMBRE + "\n" + "\n" + "Enviado por : " + jsonObjeto.ENVIADOPOR + "\n" + "\n" + "Fecha de Inicio : " + jsonObjeto.FECHA_INICIO + "\n" + "\n" + "Fecha de Fin: " + jsonObjeto.FECHA_FIN + "\n" + "\n" + "Folio : " + jsonObjeto.FOLIO + "\n" + "\n" + "Hora de Inicio: " + jsonObjeto.HORA_INICIO + "\n" + "\n" + "Hora de Fin: " + jsonObjeto.HORA_FIN + "\n" + "\n" + "Moneda: " + jsonObjeto.MONEDA + "\n" + "\n" + "Motivo: " + jsonObjeto.MOTIVO + "\n" + "\n" + "WI ID: " + jsonObjeto.WI_ID + "\n" + "\n" + "Wi Parent: " + jsonObjeto.WI_PARENT;
                Ti.API.info("Detalle : " + renglon);
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
        $.detail.addEventListener("open", function() {
            if ($.detail.activity) {
                var activity = $.detail.activity;
                if (Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar) {
                    activity.actionBar.title = "COMP" == tipoLista ? "Detalle Comprobación de Viaje" : "Detalle Solicitud de Viaje";
                    activity.actionBar.displayHomeAsUp = true;
                    activity.actionBar.onHomeIconItemSelected = function() {
                        $.detail.close();
                        $.detail = null;
                    };
                }
            }
        });
        $.detail.addEventListener("android:back", function() {
            $.detail.close();
            $.detail = null;
        });
    }
    __defers["$.__views.buttonRechazar!click!actionRegresar"] && $.__views.buttonRechazar.addEventListener("click", actionRegresar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;