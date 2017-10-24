var AppData = require('data');
//var loginControllerInicio = Alloy.createController('login');
var Config = require('Config');

												
if (! Config.isLogged) {
    var loginController = Alloy.createController('login');
} else {
	
    $.tabGroupGastosDeViaje.open();
    $.tabGroupGastosDeViaje.setActiveTab(0); 
    $.tabGroupGastosDeViaje.title="AlEn Movil - Gastos de Viaje";
    Alloy.Globals.tabGroup = $.tabGroupGastosDeViaje;
    
    //
    // Navigation
    //
    
    // Android
    if (OS_ANDROID) {
    	
        $.tabGroupGastosDeViaje.addEventListener('open', function() {
            if($.tabGroupGastosDeViaje.activity) {
                var activity = $.tabGroupGastosDeViaje.activity,
                actionBar = activity.actionBar;
    			activity.onCreateOptionsMenu = function (e) {
					 
							// Clear menu
							e.menu.clear();
							// Pass on references with event
							e.activity = activity;
							e.actionBar = actionBar;
							// Pass on to the active tab using a custom event
							$.tabGroupGastosDeViaje.activeTab.fireEvent('onCreateOptionsMenu', e);
					};
                // Action Bar
                if( Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar) {      
                    activity.actionBar.title = L('appTitle', 'AlEn - Gastos de Viaje');            
                }
            }   
        });
        
        // Back Button
        $.tabGroupGastosDeViaje.addEventListener('android:back', function() {
            var activity = Ti.Android.currentActivity;
            activity.finish();
        });
       
	
	} 
    
}