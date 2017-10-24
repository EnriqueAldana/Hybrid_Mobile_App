var args = arguments[0] || {};
var Config = require('Config');
//$.tableRecords.search=searchbar;
//$.tableRecords.hideSearchOnSelection="true";  // Esto es irrelevante ; pues nuestra seleccion invoca otra Activity
var tableDataMenuGtosViaje = [ {title: 'Solicitud Gastos'}, {title: 'Comprobacion Gastos'} ];

/*
 var renglon = "  Folio No. "+jsonDatos.ListaSolCompResult[i].FOLIO + "\n" +
								"  Nombre : "+jsonDatos.ListaSolCompResult[i].NOMBRE + "\n" +
								"  Num. "+jsonDatos.ListaSolCompResult[i].NUMERO + "\n" +
								"  Destino : "+jsonDatos.ListaSolCompResult[i].DESTINO +"\n" +
								"  Motivo : "+jsonDatos.ListaSolCompResult[i].MOTIVO;
								
								//var renglon ="Solicitud "+i;
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
			        		$.tableRecords.addEventListener('click', tableClick)
			        		
*/

function tableClick(e) {
	
    var index = e.index;
    if ( index === 0) {
        	
        	var menuSolicitudGastosController=Alloy.createController('solicitudGastos');
 
        } else if ( index === 1) {
        	var menuComprobanteGastosController=Alloy.createController('comprobantesGastos');
        	
        }
        	
 
}
// Android
if(OS_ANDROID) {
/*
  // Back Button
  $.MenuGtosViaje.addEventListener('android:back', function() {
        var menuPpalController=Alloy.createController('MenuPpal');
        menuPpalController.getView();
    }); 
			    
*/    
}

$.tableRecordsMenuGtosViaje.setData(tableDataMenuGtosViaje);
$.tableRecordsMenuGtosViaje.addEventListener('click', tableClick);
$.winMenuGtosViaje.open();
