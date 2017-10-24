
// Argumentos
var args = arguments[0] || {};
Ti.API.info("Argumento en comprobantesGastos tipoLista " + args.tipoLista);
var Config = require('Config');
var userNameLoged=Config.userLogged;
var isLogged=Config.isLogged;
var tipoLista=args.tipoLista;
								
//
// View Language
//



var Config = require('Config');
var isLogged=Config.isLogged;
var userNameLoged=Config.userLogged;
//"MACHORGU";

// Ambiente de Desarrollo Local
var url=Config.url;
var urlDetalle=Config.urlDetalle;
var urlAprobarRechazar=Config.urlAprobarRechazar;

// Ambiente de QA AlEn  172.17.1.100:8004
//var url="http://172.17.1.100:8004/WCF/RestServiceImpl.svc/ListaSolComp/";
//var urlDetalle="http://172.17.1.100:8004/WCF/RestServiceImpl.svc/DetalleViaje/";
//var urlAprobarRechazar="http://172.17.1.100:8004/WCF/RestServiceImpl.svc/AprobarRechazar/";

var wi_parent;
var wi_id;
var accion = "A"; // Parametro A si quiero autorizar o R si qiero rechazar
var comentario;
//
// 8 de Octubre del 2014
// Jesus Enriqueq Aldana Sanchez. jealdana@gmail.com
//
// Color Blanco tendiendo a Verde #F3FFFA
var searchbar = Ti.UI.createSearchBar({
	barColor: '#90EE90',
	showCancel: true,
	hintText: 'Escriba aquí para buscar...',
	height: 40 

});
  $.tableRecords.search=searchbar;
  $.tableRecords.hideSearchOnSelection="true";  // Esto es irrelevante ; pues nuestra seleccion invoca otra Activity

Ti.App.addEventListener('dataUpdated', function(e) {
    // Reset table if there are any existing rows (Alloy includes underscore)
    if(! _.isEmpty($.tableRecords.data)) {
        $.tableRecords.data = [];
        $.tableRecords.removeEventListener('click', tableClick);
        $.tableRecords.removeEventListener('longpress', tableLongPress);        
    } 
    
    // Set loading state
    $.activityIndicator.show();
    $.labelNoRecords.visible = false;
    
    var data = [];
    // Traer lista de Comprobaciones si el usuario logeado es diferente de vacio
    Ti.API.info("Usuario Logeado desde comprobanteGastos.js" + Config.userLogged); 
    if('' !== Config.userLogged){
			    xhr= Titanium.Network.createHTTPClient({
					onload : function(){
						Ti.API.info("Respuesta de Lista de Comprobaciones"+this.responseText);
						var jsonDatos= JSON.parse(this.responseText);
							for(var i=0,j=jsonDatos.ListaSolCompResult.length; i<j; i++){
								var renglon = "  Folio No. "+jsonDatos.ListaSolCompResult[i].FOLIO + "\n" +
								"  Nombre : "+jsonDatos.ListaSolCompResult[i].NOMBRE + "\n" +
								"  Num. "+jsonDatos.ListaSolCompResult[i].NUMERO + "\n" +
								"  Destino : "+jsonDatos.ListaSolCompResult[i].DESTINO +"\n" +
								"  Motivo : "+jsonDatos.ListaSolCompResult[i].MOTIVO;
								
								var row = Ti.UI.createTableViewRow({
			                    title: renglon,
			                    folioId: jsonDatos.ListaSolCompResult[i].FOLIO, 
			                    numeroEmpleadoId : jsonDatos.ListaSolCompResult[i].NUMERO,                            
			                    className: 'row',
			                    objName: 'row',
			                   // height: Alloy.Globals.Styles.TableViewRow.height,
			                    textAlign :Ti.UI.TEXT_ALIGNMENT_LEFT,
			                    height: Alloy.Globals.Styles.TableViewRow.height + 20,
			                    backgroundColor:'#F3FFFA',
			                    borderWidth:1,
			                    borderColor:'#bbb',
			                    borderRadius:5,
			                    font:{fontFamily:'Arial', fontSize:10, fontWeight:'normal',fontColor:'#bbb'},
			                    someRandomVar: 'Es solo un ejemplo ' + i
			                   
			                });
							   	Ti.API.info(row.title);    
					 			data.push(row); 
							};
							$.tableRecords.setData(data);                       
			        		$.tableRecords.addEventListener('click', tableClick);
					        $.tableRecords.addEventListener('longpress', tableLongPress);
								
					},
					onerror : function(){
						Ti.API.info(this.responseText);
						Ti.API.info(this.status);
					},
					timeout : 5000	
				});
	
				xhr.autoEncodeUrl = false;
				
			// "/SOL" es una constante del WS para la lista de Solicitudes de Comprobacion
				xhr.open('GET', url+userNameLoged+"/"+tipoLista);
				xhr.send();
				Ti.API.info("Se envia traer la lista de Solicitudes desde comprobantesGastos.js con " + url+userNameLoged+"/"+tipoLista );
	}
	
 
});

// Actualizacion manual de la Lista de Solicitudes de gastos por Comprobar
Ti.App.fireEvent('dataUpdated');


//
// Manejadores de Acciones
//

// Table Clicks
function tableClick(e) {
    var folioId = e.rowData.folioId;
    var numeroEmpleadoId = e.rowData.numeroEmpleadoId;
   
    // folioId: jsonDatos.ListaSolCompResult[i].FOLIO, 
   //  numeroEmpleadoId : jsonDatos.ListaSolCompResult[i].NUMERO,
    var detailController = Alloy.createController('detail', {
        parentTab: $.tabcomprobantesGastos,
        folioId: folioId,
        numeroEmpleadoId : numeroEmpleadoId,
        tipoLista : tipoLista
    });
    // As detail controller will only be opened from this list controller, which will call an open() method on it
    // there is no need in the detail.js controller to call $.detail.open();
    $.tabcomprobantesGastos.open(detailController.getView()); 
}
// Un Click LARGO abre unas opciones de MENU que permite VER,APROBAR o RECHAZAR el Item
function tableLongPress(e) {
    var folioId = e.rowData.folioId;
    var numeroEmpleadoId = e.rowData.numeroEmpleadoId;

    var dialog = Ti.UI.createOptionDialog({
        options: ['Rechazar', 'Aprobar', 'Cancelar'],
        cancel: 2,
        destructive: 1,
        persistent: false,
        folioId: folioId,
        numeroEmpleadoId : numeroEmpleadoId
    });  
    
    // Handle clicks on our dialog menu itself
    dialog.addEventListener('click', function(e) {
        var index = e.index;
        var folioId=e.source.folioId;
        var numeroEmpleadoId= e.source.numeroEmpleadoId;
		// Se ha seleccionado RECHAZAR detalle
        if (folioId !== '' && numeroEmpleadoId!='' && index === 0) {
            var rechazarController = Alloy.createController('Rechazar', {
                parentTab: $.tabcomprobantesGastos,
                folioId: folioId,
        		numeroEmpleadoId : numeroEmpleadoId
            });
            $.tabcomprobantesGastos.open(rechazarController.getView()); 
 
        } else if (folioId !== '' && numeroEmpleadoId!='' && index === 1) {
		    // Se ha seleccionado APROBAR
			// AQUI MANDAR LLAMAR AL WS de APROBAR
			// Llamar al detalle para tomar parametros
						xhr= Titanium.Network.createHTTPClient({
								onload : function(){
								Ti.API.info("Respuesta de Lista de Comprobaciones desde comprobantesGastos.js "+this.responseText);
									var jsonDatos= JSON.parse(this.responseText);
									var jsonObjeto=jsonDatos.DetalleViajeResult;
									Ti.API.info("jsonDatos.DetalleViajeResult desde comprobantesGastos.js "+jsonDatos.DetalleViajeResult);
									
										wi_parent	=	jsonObjeto.WI_PARENT;
										wi_id		=	jsonObjeto.WI_ID;	 
						             
			        				// Llamar al WS de actualizacion de APROBAR 
			        				comentario="OK";
									xhr= Titanium.Network.createHTTPClient({
										onload : function(){
											Ti.API.info("Respuesta de Aprobar/Rechazar desde Rechazar.js "+this.responseText);
											var jsonDatos= JSON.parse(this.responseText);
											// Regresa {"AprobarRechazarResult":"True"}
											Ti.API.info("Valor de Aprobar/Rechazar desde comprobanteGastos.js "+jsonDatos.AprobarRechazarResult);
											   if ("True" == jsonDatos.AprobarRechazarResult){
											   	        dialog.hide();
												        dialog = null;
											   	 	 	Ti.App.fireEvent('dataUpdated');
											   }else{
											   			alert("NO ha sido posible actualizar la Aprobación...el servicio regresa el valor: "+jsonDatos.AprobarRechazarResult);
											   }				
										},
										onerror : function(){
											Ti.API.info(this.responseText);
											Ti.API.info(this.status);	
										},
										timeout : 5000	
									});
									Ti.API.info("Invocando Aprobar/Rechazar desde comprobantesGastos.js como : "+urlAprobarRechazar+wi_parent +"/"+wi_id+"/"+accion+"/"+comentario);
									xhr.autoEncodeUrl = false;
									xhr.open('GET', urlAprobarRechazar+wi_parent +"/"+wi_id+"/"+accion+"/"+comentario);
									xhr.send();
								
					},
					onerror : function(){
						Ti.API.info(this.responseText);
						Ti.API.info(this.status);
					},
					timeout : 5000	
				});
				
				xhr.autoEncodeUrl = false;
					xhr.open('GET', urlDetalle+numeroEmpleadoId +"/"+folioId);
				xhr.send();
			          
        }
        
        
    });
    
    // Open it
    dialog.show();  
}



//
// Navigation
//
// Android
if(OS_ANDROID) {
	
			// Creando el Menu para el Grupo de Tabs.
			$.tabcomprobantesGastos.addEventListener('onCreateOptionsMenu', function(e) {
			 
							if (e.actionBar) {
							e.actionBar.title = $.wincomprobantesGastos.title;
							}
							 
							// Adiciona la opcion de Menu
							e.menu.add({
							title: "Regresar " ,
							showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
							itemId: 100 ,
							visible: isLogged
							 
										}).addEventListener("click", function() {
												var menuGtosViajeController=Alloy.createController('MenuGtosViaje');
												e.activity.invalidateOptionsMenu();
												});
			});
			 
			// Prepare a non-actionbar menu before it shows
			$.tabcomprobantesGastos.addEventListener('onPrepareOptionsMenu', function(e) {
					// Hide menu item once we've said hello
					e.menu.findItem(100).setVisible(isLogged);
			});
	
	
	
	
    $.wincomprobantesGastos.addEventListener('focus', function() {
        if($.wincomprobantesGastos.activity) { 
        	$.wincomprobantesGastos.title = L('comprobantesGastos', 'Comprobacion de gastos');        
           // Actualizar listado cuando tome el foco
           Ti.App.fireEvent('dataUpdated');           
        }   
    });

}

// iOS
if (OS_IOS) {
	// JEAS var btnRightNav = Ti.UI.createButton({
	// JEAS   title: L('addItem', 'Add Item')
	// JEAS });
	// JEAS btnRightNav.addEventListener('click', openAddItem);
	// JEAS $.list.rightNavButton = btnRightNav;
	// iOS

} 

$.tabcomprobantesGastos.title = L('comprobantesGastos', 'Comprobacion');
$.wincomprobantesGastos.title = L('comprobantesGastos', 'Comprobacion de gastos');
$.wincomprobantesGastos.open();
