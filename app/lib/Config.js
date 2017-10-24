var config = {

nombreApp: 'AlEn - Gastos de Viaje', //nombre de la aplicacion

autoPlay: false, //iniciar video automáticamente

//Iniciar y terminar las rutas con un slash '/'
rutaDeFotos: '/content/photos/',

rutaDeImagenes: '/content/imgs/',

rutaDeAudio: '/content/audio/',

isLogged:false,
userLogged:'',
// Ambiente de Desarrollo Local comprobantesGastos.js
url:'http://192.168.1.117:8888/WCF/RestServiceImpl.svc/ListaSolComp/',
urlDetalle:'http://192.168.1.117:8888/WCF/RestServiceImpl.svc/DetalleViaje/',
urlAprobarRechazar:'http://192.168.1.117:8888/WCF/RestServiceImpl.svc/AprobarRechazar/'

// Ambiente de QA AlEn  172.17.1.100:8004
//var url='http://172.17.1.100:8004/WCF/RestServiceImpl.svc/ListaSolComp/',
//var urlDetalle='http://172.17.1.100:8004/WCF/RestServiceImpl.svc/DetalleViaje/',
//var urlAprobarRechazar='http://172.17.1.100:8004/WCF/RestServiceImpl.svc/AprobarRechazar/'

};
module.exports = config;