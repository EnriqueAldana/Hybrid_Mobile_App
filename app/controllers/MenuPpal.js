var args = arguments[0] || {};
var Config = require('Config');
var isLogged=Config.isLogged;
//$.tableRecords.search=searchbar;
//$.tableRecords.hideSearchOnSelection="true";  // Esto es irrelevante ; pues nuestra seleccion invoca otra Activity
var tableDatamenuPpal = [ {title: 'Gastos de Viaje'}, {title: 'Compras'}, {title: 'Contabilidad'}, {title: 'Ventas'} ];

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
$.tableRecordsMenuppal.setData(tableDatamenuPpal);
$.tableRecordsMenuppal.addEventListener('click', tableClick);
$.winMenuppal.open();
function tableClick(e) {
	
    var index = e.index;
    if ( index === 0) {
        		
    	var menuGtosViajeController=Alloy.createController('MenuGtosViaje');
 
        } else if ( index === 1) {
        	
        	// Pendiente de implementar
        	alert('Pendiente de Implementar');
        	
        }else if ( index === 2) {
        	
        	// Pendiente de implementar
        	alert('Pendiente de Implementar');
        	
        }else if ( index === 3) {
        	
        	// Pendiente de implementar
        	alert('Pendiente de Implementar');
        	
        }
        
    
    // As detail controller will only be opened from this list controller, which will call an open() method on it
    // there is no need in the detail.js controller to call $.detail.open();

    
   
    
}
// Android
if(OS_ANDROID) {
// Creando el Menu para el Grupo de Tabs.
			$.tabMenuPpal.addEventListener('onCreateOptionsMenu', function(e) {
			 
							if (e.actionBar) {
							e.actionBar.title = $.winMenuppal.title;
							}
							 
							// Adiciona la opcion de Menu
							e.menu.add({
							title: "Salir " ,
							showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
							itemId: 100 ,
							visible: isLogged
							 
										}).addEventListener("click", function() {
												Config.isLogged=false;
												Config.userLogged='';
												isLogged=false;
												var loginController = Alloy.createController('login');
												e.activity.invalidateOptionsMenu();
												});
			});
			 
			// Prepare a non-actionbar menu before it shows
			$.tabMenuPpal.addEventListener('onPrepareOptionsMenu', function(e) {
					// Hide menu item once we've said hello
					e.menu.findItem(100).setVisible(isLogged);
			});
  
    
}
