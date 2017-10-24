//
// Check for expected controller args
//
var args = arguments[0] || {};
var parentTab = args.parentTab || '';
var folioId = args.folioId;
var numeroEmpleadoId = args.numeroEmpleadoId;
var wi_parent;
var wi_id;
var accion = "R"; // Parametro A si quiero autorizar o R si qiero rechazar
var comentario;
// Ambiente de Desarrollo Local
var Config = require('Config');

var url=Config.urlDetalle;
var urlAprobarRechazar=Config.urlAprobarRechazar;

 Ti.API.info("Entrando en Rechazar.js");
 $.buttonRechazar.title      = L('rechazarBtn',      'Rechazar');

if (folioId !== '' && numeroEmpleadoId !=='') {
    //
    // Fetch data row and assign title value to the label/window title (nothing else!)
    //
    $.rechazar.title = "Rechazar para el Folio "+ folioId + " y Numero empleado " +numeroEmpleadoId;
    xhr= Titanium.Network.createHTTPClient({
		onload : function(){
			Ti.API.info("Respuesta de Lista de Comprobaciones desde Rechazar.js "+this.responseText);
			var jsonDatos= JSON.parse(this.responseText);
			Ti.API.info("jsonDatos.DetalleViajeResult desde Rechazar.js "+jsonDatos.DetalleViajeResult);
			var jsonObjeto=jsonDatos.DetalleViajeResult;
			Ti.API.info("jsonObjeto.ANTICIPO desde Rechazar.js "+jsonObjeto.ANTICIPO);
			
			
					var renglon = 	"Anticipo : "+jsonObjeto.ANTICIPO + "\n" +
									"Costo Total : "+ jsonObjeto.COSTOTOTAL +"\n"  +
					"Destino: "+jsonObjeto.DESTINO + "\n"  + 
					"Empleado : "+jsonObjeto.EMPLEADO+ "\n"  + 
					"Nombre: "+jsonObjeto.NOMBRE+ "\n"  +
					"Enviado por : "+jsonObjeto.ENVIADOPOR+ "\n"  +
					"Fecha de Inicio : "+jsonObjeto.FECHA_INICIO+ "\n"  +
					"Fecha de Fin: "+jsonObjeto.FECHA_FIN+ "\n"  +
					"Folio : "+jsonObjeto.FOLIO+ "\n"  +
					"Hora de Inicio: "+jsonObjeto.HORA_INICIO+ "\n"  +
					"Hora de Fin: "+jsonObjeto.HORA_FIN+ "\n"  +
					"Moneda: "+jsonObjeto.MONEDA+ "\n"  +
					"Motivo: "+jsonObjeto.MOTIVO+ "\n"  +
					"WI ID: "+jsonObjeto.WI_ID+ "\n"  +
					"Wi Parent: "+jsonObjeto.WI_PARENT;
					wi_parent	=	jsonObjeto.WI_PARENT;
					wi_id		=	jsonObjeto.WI_ID;
				   	Ti.API.info("Detalle : "+renglon); 
	/*			   	
				for(var i=0,j=jsonDatos.DetalleViajeResult.length; i<j; i++){
					//var renglon = 'Comprobante ' +i;
					
					var renglon = jsonDatos.DetalleViajeResult[i].ANTICIPO + "-" +
					jsonDatos.DetalleViajeResult[i].COSTOTOTAL +"-" +
					jsonDatos.DetalleViajeResult[i].DESTINO + "-" + 
					jsonDatos.DetalleViajeResult[i].EMPLEADO+ "-" + 
					jsonDatos.DetalleViajeResult[i].ENVIADOPOR+ "-" +
					jsonDatos.DetalleViajeResult[i].FECHA_FIN+ "-" +
					jsonDatos.DetalleViajeResult[i].FECHA_INICIO+ "-" +
					jsonDatos.DetalleViajeResult[i].FOLIO+ "-" +
					jsonDatos.DetalleViajeResult[i].HORA_FIN+ "-" +
					jsonDatos.DetalleViajeResult[i].HORA_INICIO+ "-" +
					jsonDatos.DetalleViajeResult[i].MONEDA+ "-" +
					jsonDatos.DetalleViajeResult[i].MOTIVO+ "-" +
					jsonDatos.DetalleViajeResult[i].NOMBRE+ "-" +
					jsonDatos.DetalleViajeResult[i].WI_ID+ "-" +
					jsonDatos.DetalleViajeResult[i].WI_PARENT;
					wi_parent	=	jsonDatos.DetalleViajeResult[i].WI_PARENT;
					wi_id		=	jsonDatos.DetalleViajeResult[i].WI_ID;
				   	Ti.API.info("Detalle : "+renglon);    
		 			 
				};
				
				*/
				Ti.API.info("Renglon del Detalle desde Rechazar.js" + renglon);
				$.detailLabel.text  = renglon;                       
        		
					
		},
		onerror : function(){
			Ti.API.info(this.responseText);
			Ti.API.info(this.status);
			//Ti.API.info(this.);
		},
		timeout : 5000	
	});
	
	xhr.autoEncodeUrl = false;
	
// "/SOL" es una constante del WS para la lista de Solicitudes de Comprobacion
	xhr.open('GET', url+numeroEmpleadoId +"/"+folioId);
	xhr.send();
    
    
    
   
    
    function actionRechazar(e) {
    	// AQUI MANDAR LA ACTUALIZACION AL WS para el rechazado
			/*    	Aprobar y Rechazar
			http://172.17.1.100:8004/WCF/RestServiceImpl.svc/AprobarRechazar/00041073/0070015245/00041073/OK
			{"AprobarRechazarResult":"True"}
			
			Parametros
			
			Parametro WI_PARENT
			Parametro WI_ID
			Parametro A si quiero autorizar o R si qiero rechazar
			Parametros Ulktimo es COMENTARIO
			
			*/
			comentario=$.inputComentario.value;
			xhr= Titanium.Network.createHTTPClient({
				onload : function(){
					Ti.API.info("Respuesta de Aprobar/Rechazar desde Rechazar.js "+this.responseText);
					var jsonDatos= JSON.parse(this.responseText);
					// Regresa {"AprobarRechazarResult":"True"}
					Ti.API.info("Valor de Aprobar/Rechazar desde Rechazar.js "+jsonDatos.AprobarRechazarResult);
					   if ("True" == jsonDatos.AprobarRechazarResult){
					   	 	$.rechazar.close();
                        	$.rechazar = null;
                        	// Actualizacion manual de la Lista de Solicitudes de gastos por Comprobar
							Ti.App.fireEvent('dataUpdated');
					   }else{
					   	alert("NO ha sido posible actualizar el Rechazo...el servicio regresa el valor: "+jsonDatos.AprobarRechazarResult);
					   }				
				},
				onerror : function(){
					Ti.API.info(this.responseText);
					Ti.API.info(this.status);	
				},
				timeout : 5000	
			});
	
			xhr.autoEncodeUrl = false;
			xhr.open('GET', urlAprobarRechazar+wi_parent +"/"+wi_id+"/"+accion+"/"+comentario);
			xhr.send();
	
           

    }
    //
    // Navigation
    //
        
    // Android
    if (OS_ANDROID) {
        $.rechazar.addEventListener('open', function() {
            if($.rechazar.activity) {
                var activity = $.rechazar.activity;

                // Action Bar
                if( Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar) {      
                    activity.actionBar.title = L('rechazar', 'Rechazar Sol De Comprobación');
                    activity.actionBar.displayHomeAsUp = true; 
                    activity.actionBar.onHomeIconItemSelected = function() {               
                        $.rechazar.close();
                        $.rechazar = null;
                    };             
                }
            }
        });
        
        // Back Button - not really necessary here - this is the default behaviour anyway?
        $.rechazar.addEventListener('android:back', function() {              
            $.rechazar.close();
            $.rechazar = null;
        });     
    }
    
    // iOS
    // as detail was opened in the tabGroup, iOS will handle the nav itself (back button action and title)
    // but we could change the iOS back button text:
    //$.detail.backButtonTitle = L('backText', 'Back to List');
}