
//
// View Language
//
$.salir.title     = L('salir', 'Salir');
$.salirLabel.text = L('salir', 'Salir');


//
// Navigation
//

// Android 
if (OS_ANDROID) {
    $.salir.addEventListener('open', function() {
        if($.salir.activity) {
            var activity = $.salir.activity;
    
            // Action Bar
            if( Alloy.Globals.Android.Api >= 11 && activity.actionBar) {      
                activity.actionBar.title = L('salir', 'Salir');
                activity.actionBar.displayHomeAsUp = true; 
                activity.actionBar.onHomeIconItemSelected = function() {              
                    $.salir.close();
                    $.salir = null;
                };             
            }
        }
    });
    
    // Back Button
    $.salir.addEventListener('android:back', function() {             
        $.salir.close();
        $.salir = null;
    });     
}