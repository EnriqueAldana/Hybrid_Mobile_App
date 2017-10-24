function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function tableClick(e) {
        var folioId = e.rowData.folioId;
        var numeroEmpleadoId = e.rowData.numeroEmpleadoId;
        var detailController = Alloy.createController("detail", {
            parentTab: $.tabcomprobantesGastos,
            folioId: folioId,
            numeroEmpleadoId: numeroEmpleadoId,
            tipoLista: tipoLista
        });
        $.tabcomprobantesGastos.open(detailController.getView());
    }
    function tableLongPress(e) {
        var folioId = e.rowData.folioId;
        var numeroEmpleadoId = e.rowData.numeroEmpleadoId;
        var dialog = Ti.UI.createOptionDialog({
            options: [ "Rechazar", "Aprobar", "Cancelar" ],
            cancel: 2,
            destructive: 1,
            persistent: false,
            folioId: folioId,
            numeroEmpleadoId: numeroEmpleadoId
        });
        dialog.addEventListener("click", function(e) {
            var index = e.index;
            var folioId = e.source.folioId;
            var numeroEmpleadoId = e.source.numeroEmpleadoId;
            if ("" !== folioId && "" != numeroEmpleadoId && 0 === index) {
                var rechazarController = Alloy.createController("Rechazar", {
                    parentTab: $.tabcomprobantesGastos,
                    folioId: folioId,
                    numeroEmpleadoId: numeroEmpleadoId
                });
                $.tabcomprobantesGastos.open(rechazarController.getView());
            } else if ("" !== folioId && "" != numeroEmpleadoId && 1 === index) {
                xhr = Titanium.Network.createHTTPClient({
                    onload: function() {
                        Ti.API.info("Respuesta de Lista de Comprobaciones desde comprobantesGastos.js " + this.responseText);
                        var jsonDatos = JSON.parse(this.responseText);
                        var jsonObjeto = jsonDatos.DetalleViajeResult;
                        Ti.API.info("jsonDatos.DetalleViajeResult desde comprobantesGastos.js " + jsonDatos.DetalleViajeResult);
                        wi_parent = jsonObjeto.WI_PARENT;
                        wi_id = jsonObjeto.WI_ID;
                        comentario = "OK";
                        xhr = Titanium.Network.createHTTPClient({
                            onload: function() {
                                Ti.API.info("Respuesta de Aprobar/Rechazar desde Rechazar.js " + this.responseText);
                                var jsonDatos = JSON.parse(this.responseText);
                                Ti.API.info("Valor de Aprobar/Rechazar desde comprobanteGastos.js " + jsonDatos.AprobarRechazarResult);
                                if ("True" == jsonDatos.AprobarRechazarResult) {
                                    dialog.hide();
                                    dialog = null;
                                    Ti.App.fireEvent("dataUpdated");
                                } else alert("NO ha sido posible actualizar la Aprobación...el servicio regresa el valor: " + jsonDatos.AprobarRechazarResult);
                            },
                            onerror: function() {
                                Ti.API.info(this.responseText);
                                Ti.API.info(this.status);
                            },
                            timeout: 5e3
                        });
                        Ti.API.info("Invocando Aprobar/Rechazar desde comprobantesGastos.js como : " + urlAprobarRechazar + wi_parent + "/" + wi_id + "/" + accion + "/" + comentario);
                        xhr.autoEncodeUrl = false;
                        xhr.open("GET", urlAprobarRechazar + wi_parent + "/" + wi_id + "/" + accion + "/" + comentario);
                        xhr.send();
                    },
                    onerror: function() {
                        Ti.API.info(this.responseText);
                        Ti.API.info(this.status);
                    },
                    timeout: 5e3
                });
                xhr.autoEncodeUrl = false;
                xhr.open("GET", urlDetalle + numeroEmpleadoId + "/" + folioId);
                xhr.send();
            }
        });
        dialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "comprobantesGastos";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.wincomprobantesGastos = Ti.UI.createWindow({
        backgroundColor: "#F3FFFA",
        id: "wincomprobantesGastos",
        fullscreen: "true"
    });
    $.__views.__alloyId2 = Ti.UI.createView({
        id: "__alloyId2"
    });
    $.__views.wincomprobantesGastos.add($.__views.__alloyId2);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 20,
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        id: "activityIndicator"
    });
    $.__views.__alloyId2.add($.__views.activityIndicator);
    $.__views.labelNoRecords = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 10,
            fontFamily: "Helvetica Neue"
        },
        visible: false,
        top: 20,
        id: "labelNoRecords"
    });
    $.__views.__alloyId2.add($.__views.labelNoRecords);
    $.__views.tableRecords = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        top: 0,
        font: {
            fontSize: 10,
            fontFamily: "Helvetica Neue"
        },
        id: "tableRecords"
    });
    $.__views.__alloyId2.add($.__views.tableRecords);
    $.__views.tabcomprobantesGastos = Ti.UI.createTab({
        window: $.__views.wincomprobantesGastos,
        id: "tabcomprobantesGastos"
    });
    $.__views.tabcomprobantesGastos && $.addTopLevelView($.__views.tabcomprobantesGastos);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.API.info("Argumento en comprobantesGastos tipoLista " + args.tipoLista);
    var Config = require("Config");
    var userNameLoged = Config.userLogged;
    var isLogged = Config.isLogged;
    var tipoLista = args.tipoLista;
    var Config = require("Config");
    var isLogged = Config.isLogged;
    var userNameLoged = Config.userLogged;
    var url = Config.url;
    var urlDetalle = Config.urlDetalle;
    var urlAprobarRechazar = Config.urlAprobarRechazar;
    var wi_parent;
    var wi_id;
    var accion = "A";
    var comentario;
    var searchbar = Ti.UI.createSearchBar({
        barColor: "#90EE90",
        showCancel: true,
        hintText: "Escriba aquí para buscar...",
        height: 40
    });
    $.tableRecords.search = searchbar;
    $.tableRecords.hideSearchOnSelection = "true";
    Ti.App.addEventListener("dataUpdated", function() {
        if (!_.isEmpty($.tableRecords.data)) {
            $.tableRecords.data = [];
            $.tableRecords.removeEventListener("click", tableClick);
            $.tableRecords.removeEventListener("longpress", tableLongPress);
        }
        $.activityIndicator.show();
        $.labelNoRecords.visible = false;
        var data = [];
        Ti.API.info("Usuario Logeado desde comprobanteGastos.js" + Config.userLogged);
        if ("" !== Config.userLogged) {
            xhr = Titanium.Network.createHTTPClient({
                onload: function() {
                    Ti.API.info("Respuesta de Lista de Comprobaciones" + this.responseText);
                    var jsonDatos = JSON.parse(this.responseText);
                    for (var i = 0, j = jsonDatos.ListaSolCompResult.length; j > i; i++) {
                        var renglon = "  Folio No. " + jsonDatos.ListaSolCompResult[i].FOLIO + "\n" + "  Nombre : " + jsonDatos.ListaSolCompResult[i].NOMBRE + "\n" + "  Num. " + jsonDatos.ListaSolCompResult[i].NUMERO + "\n" + "  Destino : " + jsonDatos.ListaSolCompResult[i].DESTINO + "\n" + "  Motivo : " + jsonDatos.ListaSolCompResult[i].MOTIVO;
                        var row = Ti.UI.createTableViewRow({
                            title: renglon,
                            folioId: jsonDatos.ListaSolCompResult[i].FOLIO,
                            numeroEmpleadoId: jsonDatos.ListaSolCompResult[i].NUMERO,
                            className: "row",
                            objName: "row",
                            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                            height: Alloy.Globals.Styles.TableViewRow.height + 20,
                            backgroundColor: "#F3FFFA",
                            borderWidth: 1,
                            borderColor: "#bbb",
                            borderRadius: 5,
                            font: {
                                fontFamily: "Arial",
                                fontSize: 10,
                                fontWeight: "normal",
                                fontColor: "#bbb"
                            },
                            someRandomVar: "Es solo un ejemplo " + i
                        });
                        Ti.API.info(row.title);
                        data.push(row);
                    }
                    $.tableRecords.setData(data);
                    $.tableRecords.addEventListener("click", tableClick);
                    $.tableRecords.addEventListener("longpress", tableLongPress);
                },
                onerror: function() {
                    Ti.API.info(this.responseText);
                    Ti.API.info(this.status);
                },
                timeout: 5e3
            });
            xhr.autoEncodeUrl = false;
            xhr.open("GET", url + userNameLoged + "/" + tipoLista);
            xhr.send();
            Ti.API.info("Se envia traer la lista de Solicitudes desde comprobantesGastos.js con " + url + userNameLoged + "/" + tipoLista);
        }
    });
    Ti.App.fireEvent("dataUpdated");
    $.tabcomprobantesGastos.addEventListener("onCreateOptionsMenu", function(e) {
        e.actionBar && (e.actionBar.title = $.wincomprobantesGastos.title);
        e.menu.add({
            title: "Regresar ",
            showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
            itemId: 100,
            visible: isLogged
        }).addEventListener("click", function() {
            Alloy.createController("MenuGtosViaje");
            e.activity.invalidateOptionsMenu();
        });
    });
    $.tabcomprobantesGastos.addEventListener("onPrepareOptionsMenu", function(e) {
        e.menu.findItem(100).setVisible(isLogged);
    });
    $.wincomprobantesGastos.addEventListener("focus", function() {
        if ($.wincomprobantesGastos.activity) {
            $.wincomprobantesGastos.title = L("comprobantesGastos", "Comprobacion de gastos");
            Ti.App.fireEvent("dataUpdated");
        }
    });
    $.tabcomprobantesGastos.title = L("comprobantesGastos", "Comprobacion");
    $.wincomprobantesGastos.title = L("comprobantesGastos", "Comprobacion de gastos");
    $.wincomprobantesGastos.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;