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
        comentario = $.inputComentario.value;
        xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Respuesta de Aprobar/Rechazar desde Rechazar.js " + this.responseText);
                var jsonDatos = JSON.parse(this.responseText);
                Ti.API.info("Valor de Aprobar/Rechazar desde Rechazar.js " + jsonDatos.AprobarRechazarResult);
                if ("True" == jsonDatos.AprobarRechazarResult) {
                    $.rechazar.close();
                    $.rechazar = null;
                    Ti.App.fireEvent("dataUpdated");
                } else alert("NO ha sido posible actualizar el Rechazo...el servicio regresa el valor: " + jsonDatos.AprobarRechazarResult);
            },
            onerror: function() {
                Ti.API.info(this.responseText);
                Ti.API.info(this.status);
            },
            timeout: 5e3
        });
        xhr.autoEncodeUrl = false;
        xhr.open("GET", urlAprobarRechazar + wi_parent + "/" + wi_id + "/" + accion + "/" + comentario);
        xhr.send();
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
    $.__views.rechazar = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "rechazar"
    });
    $.__views.rechazar && $.addTopLevelView($.__views.rechazar);
    $.__views.detailLabel = Ti.UI.createLabel({
        width: "300",
        height: "200",
        color: "#bbb",
        font: {
            fontSize: 10,
            fontFamily: "Helvetica Neue"
        },
        id: "detailLabel",
        top: "10",
        Align: Ti.UI.TEXT_ALIGNMENT_LEFT,
        borderWidth: "2",
        borderColor: "#bbb",
        borderRadius: "5"
    });
    $.__views.rechazar.add($.__views.detailLabel);
    $.__views.RechazarView = Ti.UI.createView({
        id: "RechazarView",
        layout: "vertical",
        backgroundColor: "F1F8F5"
    });
    $.__views.rechazar.add($.__views.RechazarView);
    $.__views.inputComentario = Ti.UI.createTextArea({
        id: "inputComentario",
        borderWidth: "2",
        borderColor: "#bbb",
        borderRadius: "5",
        color: "#888",
        textAlign: "left",
        value: "",
        top: "220",
        width: "300",
        height: "70"
    });
    $.__views.RechazarView.add($.__views.inputComentario);
    $.__views.buttonRechazar = Ti.UI.createButton({
        top: "60",
        id: "buttonRechazar"
    });
    $.__views.RechazarView.add($.__views.buttonRechazar);
    actionRechazar ? $.__views.buttonRechazar.addEventListener("click", actionRechazar) : __defers["$.__views.buttonRechazar!click!actionRechazar"] = true;
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
    var numeroEmpleadoId = args.numeroEmpleadoId;
    var wi_parent;
    var wi_id;
    var accion = "R";
    var comentario;
    var Config = require("Config");
    var url = Config.urlDetalle;
    var urlAprobarRechazar = Config.urlAprobarRechazar;
    Ti.API.info("Entrando en Rechazar.js");
    $.buttonRechazar.title = L("rechazarBtn", "Rechazar");
    if ("" !== folioId && "" !== numeroEmpleadoId) {
        $.rechazar.title = "Rechazar para el Folio " + folioId + " y Numero empleado " + numeroEmpleadoId;
        xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Respuesta de Lista de Comprobaciones desde Rechazar.js " + this.responseText);
                var jsonDatos = JSON.parse(this.responseText);
                Ti.API.info("jsonDatos.DetalleViajeResult desde Rechazar.js " + jsonDatos.DetalleViajeResult);
                var jsonObjeto = jsonDatos.DetalleViajeResult;
                Ti.API.info("jsonObjeto.ANTICIPO desde Rechazar.js " + jsonObjeto.ANTICIPO);
                var renglon = "Anticipo : " + jsonObjeto.ANTICIPO + "\n" + "Costo Total : " + jsonObjeto.COSTOTOTAL + "\n" + "Destino: " + jsonObjeto.DESTINO + "\n" + "Empleado : " + jsonObjeto.EMPLEADO + "\n" + "Nombre: " + jsonObjeto.NOMBRE + "\n" + "Enviado por : " + jsonObjeto.ENVIADOPOR + "\n" + "Fecha de Inicio : " + jsonObjeto.FECHA_INICIO + "\n" + "Fecha de Fin: " + jsonObjeto.FECHA_FIN + "\n" + "Folio : " + jsonObjeto.FOLIO + "\n" + "Hora de Inicio: " + jsonObjeto.HORA_INICIO + "\n" + "Hora de Fin: " + jsonObjeto.HORA_FIN + "\n" + "Moneda: " + jsonObjeto.MONEDA + "\n" + "Motivo: " + jsonObjeto.MOTIVO + "\n" + "WI ID: " + jsonObjeto.WI_ID + "\n" + "Wi Parent: " + jsonObjeto.WI_PARENT;
                wi_parent = jsonObjeto.WI_PARENT;
                wi_id = jsonObjeto.WI_ID;
                Ti.API.info("Detalle : " + renglon);
                Ti.API.info("Renglon del Detalle desde Rechazar.js" + renglon);
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
        $.rechazar.addEventListener("open", function() {
            if ($.rechazar.activity) {
                var activity = $.rechazar.activity;
                if (Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar) {
                    activity.actionBar.title = L("rechazar", "Rechazar Sol De Comprobación");
                    activity.actionBar.displayHomeAsUp = true;
                    activity.actionBar.onHomeIconItemSelected = function() {
                        $.rechazar.close();
                        $.rechazar = null;
                    };
                }
            }
        });
        $.rechazar.addEventListener("android:back", function() {
            $.rechazar.close();
            $.rechazar = null;
        });
    }
    __defers["$.__views.buttonRechazar!click!actionRechazar"] && $.__views.buttonRechazar.addEventListener("click", actionRechazar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;