//
// Login stuff
//
var loggedIn = false;
var userNameLoged="MACHORGU";
var url="http://172.16.51.68:8888/WCF/RestServiceImpl.svc/ListaSolComp/";
// AlEn Desarrollo
//var url="http://172.17.1.100:8004/WCF/RestServiceImpl.svc/ListaSolComp/";

//
// App data and methods
//
var dataStore = [];
var dataBuilt = false;

// Check for persisted login
if (Ti.App.Properties.getString('loggedIn')) {
    loggedIn = true;
    userNameLoged=Ti.App.Properties.getString('userName');
	
			Ti.API.info("Usuario Logeado desde data.js " + userNameLoged);
		
}

exports.isLoggedIn = function () {
    return loggedIn;
};

exports.login = function(username, password, callback) {
    if (username !== 'error') {
        loggedIn = true;
        userNameLoged=username;
        Ti.App.Properties.setString('loggedIn', 1);
        Ti.App.Properties.setString('userName',username);
        Ti.API.info("Desde data.js en la funcion login Usuario Logeado "+username);
        Ti.API.info("Usuario Logeado desde las propiedades "+Ti.App.Properties.getString('userName'));
        // setTimeout to simulate delay of calling remote service
        setTimeout(function() {
            callback({ result: 'ok' }); 
        }, 1500);              
    } else {
        setTimeout(function() {
            callback({ result: 'error', msg: 'Nombre de Usuario "error" no es valido' });
        }, 1500);
    }       
};

exports.logout = function (callback) {
    loggedIn = false;
    Ti.App.Properties.removeProperty('loggedIn'); 
    Ti.App.Properties.removeProperty('userName');
    callback({ result: 'ok' });
};



// When app opens, build some dummy data - we are not going to persist the data though
// Create/Delete actions will be applied to this dataStore, which will be reset on relaunch
if (! dataBuilt ) {
	/* Dummy
		    for (var i=0; i<10; i++) {
		        var row = {title: 'Gasto ' + i}
		        dataStore.push(row);
		    }
		    Ti.App.Properties.getString('userName')
		   if ('' !==Ti.App.Properties.getString('userName')){
		   		listaComprobantes(Ti.App.Properties.getString('userName'));
		   }
    */
   
   /*
   var data = [];
	Ti.API.info("Entrando a getAll en data,js " );
	Ti.API.info("Longitud del dataStore.length entrando " + data.length);
	xhr= Titanium.Network.createHTTPClient({
		onload : function(){
			Ti.API.info("Respuesta"+this.responseText);
			var jsonDatos= JSON.parse(this.responseText);
				for(var i=0,j=jsonDatos.ListaSolCompResult.length; i<j; i++){
					//var renglon = 'Comprobante ' +i;
					var renglon = jsonDatos.ListaSolCompResult[i].NOMBRE + "-" +jsonDatos.ListaSolCompResult[i].DESTINO +"-" +jsonDatos.ListaSolCompResult[i].FOLIO + "-" + jsonDatos.ListaSolCompResult[i].NUMERO + "-" + jsonDatos.ListaSolCompResult[i].MOTIVO;
					var row = {title: renglon }; 
					//var row = {title: 'Gasto ' + i};
				   	Ti.API.info(row.title);    
		 			data.push(row); 
				};	
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
	xhr.open('GET', url+userNameLoged+"/COMP");
	xhr.send();
	Ti.API.info("Longitud del dataStore.length saliendo " + data.length);
    dataStore= data;
 */  
}
function listaComprobantes(){
	
	//url="http://ip.jsontest.com/";
	//url="http://192.168.1.117:8080/WCF/RestServiceImpl.svc/ListaSolComp/";
	xhr= Titanium.Network.createHTTPClient({
		onload : function(){
			Ti.API.info("Respuesta"+this.responseText);
			cargaJsonAlDataStore(JSON.parse(this.responseText));	
		},
		onerror : function(){
			Ti.API.info(this.responseText);
			Ti.API.info(this.status);
			//Ti.API.info(this.);
		},
		/*
		onreadystatuschange: function(){  // dificilmente se utilizan
			switch (readyState){
					case 0: // sucede cuando se crea la variable
					Ti.API.info(this.responseText);
					breake;
					case 1:  // sucede cuando se abre la conexion xhr.open
					breake;
					case 2:  // secede cuando el destino ha recibido los headers del request
					breake;
					case 3: // sucede cuando nuestra variable es llamada xhr.send()
					breake;
					case 4 : // sucede cuando se encuentra dentro de la funcion onload()
			}
			
		},
		onsendstream : function(){  // se utiliza para mandar archivos 
			
		},
		ondatastream : function(){ // se utiliza para recibir archivos de datos binarios tales como videos, musica, etc
			
		},
		*/
		timeout : 5000	
	});
	
	xhr.autoEncodeUrl = false;
	
// "/SOL" es una constante del WS para la lista de Solicitudes de Comprobacion
	xhr.open('GET', url+userNameLoged+"/COMP");
	xhr.send();
	//xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	//xhr.send(params); // request is actually sent with this statement
	//xhr.send(url+"/WCF/RestServiceImpl.svc/ListaSolComp/"+"JEAS"+"/SOL"); // request is actually sent with this statement


}

function cargaJsonAlDataStore(jsonDatos){
	Ti.API.info("Longitud de la respuesta jsonDatos.ListaSolCompResult.length : "+jsonDatos.ListaSolCompResult.length);
	for(var i=0,j=jsonDatos.ListaSolCompResult.length; i<j; i++){
		var renglon = 'Comprobante ' +i;
		//var renglon = jsonDatos.ListaSolCompResult[i].NOMBRE + "-" +jsonDatos.ListaSolCompResult[i].DESTINO +"-" +jsonDatos.ListaSolCompResult[i].FOLIO + "-" + jsonDatos.ListaSolCompResult[i].NUMERO + "-" + jsonDatos.ListaSolCompResult[i].MOTIVO;
		var row = {title: renglon }; 
		//var row = {title: 'Gasto ' + i};
		/*  No aplica poruqe el renglon al TableView se hace en otro lugar
	   			var row = Ti.UI.createTableViewRow({
	   				height : (Ti.Platform.displayCaps.getPlatformHeight()/100)*10  // 10% de la altura de la pantalla
	   				
	   			});
	   			nombre = Ti.UI.createLabel({
	   				text : jsonDatos.ListaSolCompResult[i].NOMBRE ,
	   				color : 'red',
	   				top : 0
	   			}),
	   			destino = Ti.UI.createLabel({
	   				text : jsonDatos.ListaSolCompResult[i].DESTINO ,
	   				color : 'black',
	   				bottom : 0
	   			}),
	   			folio = Ti.UI.createLabel({
	   				text : jsonDatos.ListaSolCompResult[i].FOLIO ,
	   				color : 'black',
	   				top : 0
	   			}),
	   			numero = Ti.UI.createLabel({
	   				text : jsonDatos.ListaSolCompResult[i].NUMERO ,
	   				color : 'black',
	   				top : 0
	   			});
	   			motivo = Ti.UI.createLabel({
	   				text : jsonDatos.ListaSolCompResult[i].MOTIVO ,
	   				color : 'black',
	   				top : 0
	   			});
	   			
	   			
	   			 
		    	row.add(numero);
		    	row.add(nombre);
		    	row.add(destino);
		    	row.add(folio);
		    	row.add(motivo);
		    	*/
		    	//Ti.API.info(jsonDatos.ListaSolCompResult[i].NOMBRE);
		    	Ti.API.info("Renglon " + renglon);  
		    	Ti.API.info(row.title);    
		    	dataStore.push(row); 
	  
	  
	};
	
}


// Delete
exports.deleteItem = function (id) {
    dataStore.splice(id, 1);   
};

// Get
exports.getItem = function (id) {
    return dataStore[id];   
};

// GetAll
exports.getAll = function () {
	/*
	var data = [];
	Ti.API.info("Entrando a getAll en data,js " );
	Ti.API.info("Longitud del dataStore.length entrando " + data.length);
	xhr= Titanium.Network.createHTTPClient({
		onload : function(){
			Ti.API.info("Respuesta"+this.responseText);
			var jsonDatos= JSON.parse(this.responseText);
				for(var i=0,j=jsonDatos.ListaSolCompResult.length; i<j; i++){
					var renglon = 'Comprobante ' +i;
					//var renglon = jsonDatos.ListaSolCompResult[i].NOMBRE + "-" +jsonDatos.ListaSolCompResult[i].DESTINO +"-" +jsonDatos.ListaSolCompResult[i].FOLIO + "-" + jsonDatos.ListaSolCompResult[i].NUMERO + "-" + jsonDatos.ListaSolCompResult[i].MOTIVO;
					//var row = {title: renglon }; 
					var row = {title: 'Gasto ' + i};
				   	Ti.API.info(row.title);    
		 			data.push(row); 
				};	
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
	xhr.open('GET', url+userNameLoged+"/COMP");
	xhr.send();
	Ti.API.info("Longitud del dataStore.length saliendo " + data.length);
    return data;
    */
   return dataStore;
};