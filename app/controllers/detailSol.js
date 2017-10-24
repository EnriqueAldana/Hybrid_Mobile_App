//
// Check for expected controller args
//
var args = arguments[0] || {};
var parentTab = args.parentTab || '';
//var folioId = (args.folioId === 0 || args.folioId > 0) ? args.folioId : '';
//var numeroEmpleadoId = (args.numeroEmpleadoId === 0 || args.numeroEmpleadoId > 0) ? args.numeroEmpleadoId: '';
var folioId = args.folioId;
var tipoLista=args.tipoLista;
var numeroEmpleadoId = args.numeroEmpleadoId;
var Config = require('Config');

var url=Config.urlDetalle;

 Ti.API.info("Entrando en detailSol.js");

if (folioId !== '' && numeroEmpleadoId !=='') {
    
    // Traer el detalle y ponerlo en la etiqueta
      //  var data = [];
    // Traer lista de Comprobaciones
    xhr= Titanium.Network.createHTTPClient({
		onload : function(){
			Ti.API.info("Respuesta de Lista de Comprobaciones desde detail.js "+this.responseText);
			var jsonDatos= JSON.parse(this.responseText);
			Ti.API.info("jsonDatos.DetalleViajeResult desde Rechazar.js "+jsonDatos.DetalleViajeResult);
			var jsonObjeto=jsonDatos.DetalleViajeResult;
			//JSON.parse(jsonDatos.DetalleViajeResult);
			Ti.API.info("jsonObjeto.ANTICIPO desde detail.js "+jsonObjeto.ANTICIPO);
			/*
				var renglon = 	"Anticipo : "+jsonObjeto.ANTICIPO + "\n" +"\n" +
									"Costo Total : "+ jsonObjeto.COSTOTOTAL +"\n"  +"\n" +
					"Destino: "+jsonObjeto.DESTINO + "\n"  + "\n" +
					"Empleado : "+jsonObjeto.EMPLEADO+ "\n"  + "\n" +
					"Nombre: "+jsonObjeto.NOMBRE+ "\n"  +"\n" +
					"Enviado por : "+jsonObjeto.ENVIADOPOR+ "\n"  +"\n" +
					"Fecha de Inicio : "+jsonObjeto.FECHA_INICIO+ "\n"  +"\n" +
					"Fecha de Fin: "+jsonObjeto.FECHA_FIN+ "\n"  +"\n" +
					"Folio : "+jsonObjeto.FOLIO+ "\n"  +"\n" +
					"Hora de Inicio: "+jsonObjeto.HORA_INICIO+ "\n"  +"\n" +
					"Hora de Fin: "+jsonObjeto.HORA_FIN+ "\n"  +"\n" +
					"Moneda: "+jsonObjeto.MONEDA+ "\n"  +"\n" +
					"Motivo: "+jsonObjeto.MOTIVO+ "\n"  +"\n" +
					"WI ID: "+jsonObjeto.WI_ID+ "\n"  +"\n" +
					"Wi Parent: "+jsonObjeto.WI_PARENT;
					
				   	Ti.API.info("Detalle : "+renglon);    
		 			 
				
				*/
				var renglon = "Detalle";
				Ti.API.info("Renglon del Detalle desde detail.js" + renglon);
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
    
   
    
    //
    // Navigation
    //
        
    // Android
    if (OS_ANDROID) {
    	 
        $.detailSol.addEventListener('open', function() {
            if($.detailSol.activity) {
                var activity = $.detailSol.activity;

                // Action Bar
                if( Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar) { 
                	if('COMP' == tipoLista){
                		activity.actionBar.title =  'Detalle Comprobación de Viaje';
    					// $.detail.title = "Detalle Comprobante de viaje para el Folio "+ folioId + " y Numero empleado " +numeroEmpleadoId;
    				}else{
    					activity.actionBar.title =  'Detalle Solicitud de Viaje';
    	 				//$.detail.title = "Detalle Solicitud de viajepara el Folio "+ folioId + " y Numero empleado " +numeroEmpleadoId;
    				}     
                    activity.actionBar.displayHomeAsUp = true; 
                    activity.actionBar.onHomeIconItemSelected = function() {              
                        $.detailSol.close();
                        $.detailSol = null;
                    };             
                }
            }
        });
        
     
      
         // No es necesario pues es generado de un padre
         //Back Button - not really necessary here - this is the default behaviour anyway?
		        $.detailSol.addEventListener('android:back', function() {              
		            $.detailSol.close();
		            $.detailSol = null;
		        }); 
		         
           
    }
    
    // iOS
    // as detail was opened in the tabGroup, iOS will handle the nav itself (back button action and title)
    // but we could change the iOS back button text:
    //$.detail.backButtonTitle = L('backText', 'Back to List');
}