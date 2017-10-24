//
// Login stuff
//
var loggedIn = false;

// Check for persisted login
if (Ti.App.Properties.getString('loggedIn')) {
    loggedIn = true;
}

exports.isLoggedIn = function () {
    return loggedIn;
};

exports.login = function(username, password, callback) {
    if (username !== 'error') {
        loggedIn = true;
        Ti.App.Properties.setString('loggedIn', 1);
        
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
    callback({ result: 'ok' });
};

/*
// Llamada al WS
// create request
//var address =
//var method =
    var xhr = Titanium.Network.createHTTPClient();
    //set timeout
    xhr.setTimeout(10000);

    //Here you set the webservice address and method
    xhr.open('POST', address + method);

    //set enconding
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    //send request with parameters
    xhr.send(JSON.stringify(args));

    // function to deal with errors
    xhr.onerror = function() {

    };

    // function to deal with response
    xhr.onload = function() {
        var obj = JSON.parse(this.responseText);

    };

*/
//
// Datos Y Metodos
//
var dataStore = [];
var dataBuilt = false;

function getListaComprobantes () {
	/*
var client = new XMLHttpRequest();
    client.open("GET", "https://localhost:8080/WCF/RestServiceImpl.svc/ListaSolComp/JEAS/SOL", true);
    client.send();    
 client.onreadystatechange = function() {

        var get=JSON.parse(client.responseText);

     for( var i=0; i<get.length; i++){
 var row = Ti.UI.createTableViewRow({
        title: get[i].todo,
        hasChild : true,
    });     
    dataStore.push(row);                
             }
      // $.tableView.setData(dataArray);

    };  
  */
  // Llamada al WS
// create request
  	var address ="http://127.0.0.1:8080/WCF/RestServiceImpl.svc/ListaSolComp/JEAS/SOL";
   	var method ="";
    var xhr = Titanium.Network.createHTTPClient();
    //set timeout
    xhr.setTimeout(100000);

    //Here you set the webservice address and method
    //xhr.open('POST', address + method);
	xhr.open('GET', address);
    //set enconding
   // xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    //send request with parameters
    //xhr.send(JSON.stringify(args));
	xhr.send();
    // function to deal with errors
    xhr.onerror = function() {

    };

    // function to deal with response
    xhr.onload = function() {
        var get = JSON.parse(xhr.response);
		for( var i=0; i<get.length; i++){
 					var row = Ti.UI.createTableViewRow({
        			title: get[i].NOMBRE,
        			hasChild : true,
    				});
    	alert(get[i].NOMBRE);     
    	dataStore.push(row); 
    	}; 
	}; 
};        
        
function listaComprobantes(){
	//url="http://ip.jsontest.com/";
	url="http://127.0.0.1:8080/WCF/RestServiceImpl.svc/ListaSolComp/JEAS/SOL";
	xhr= Titanium.Network.createHTTPClient({
		onload : function(){
			Ti.API.info(this.responseText);
			//cargaJsonAlDataStore(JSON.parse(this.responseText));
			/*
			Ti.API.info(this.responseText);
			var get = JSON.parse(this.responseText);
			Ti.API.info(get.length);
			for( var i=0; i<get.length; i++){
		 		var row = Ti.UI.createTableViewRow({
		        			title: get[i].ip,
		        			hasChild : true,
		    				});
		    	Ti.API.info(get[i].ip); 
		    	Ti.API.info(row);    
		    	dataStore.push(row); 
    		}; 
    		*/	
		},
		onerror : function(){
			Ti.API.info(this.response.Text);
			Ti.API.info(this.status);
			Ti.API.info(e.error);
		},
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
		timeout : 5000	
	});
	xhr.open('GET',url);
	xhr.send();
}

function cargaJsonAlDataStore(json){
	
	
}
// When app opens, build some dummy data - we are not going to persist the data though
// Create/Delete actions will be applied to this dataStore, which will be reset on relaunch
if (! dataBuilt) {
   // Llamar inicialmente Lista de Comprobantes
   /* for (var i=0; i<10; i++) {
        var row = {title: 'Gasto ' + i}
        dataStore.push(row);
    }
    */
   listaComprobantes();
   //getListaComprobantes ();
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
    return dataStore;
};