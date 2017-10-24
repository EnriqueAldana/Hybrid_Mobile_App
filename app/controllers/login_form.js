
var Config = require('Config');											
//
// Action handlers
//
function actionLogin(e) {
    if (! $.inputUsername.value || ! $.inputPassword.value) {
        var dialog = Ti.UI.createAlertDialog({
            message: L('formMissingFields', 'Por favor complete los datos'),
            ok: 'OK',
            title: L('actionRequired', 'Accion requerida')
        }).show();
    }
    else {
        $.activityIndicator.show();
        $.buttonLogin.enabled = false;

        var AppData = require('data');
        //var AppData = require('AlenData');
        AppData.login($.inputUsername.value, $.inputPassword.value,
            function(response) {
                $.activityIndicator.hide();
                $.buttonLogin.enabled = true;

                if (response.result === 'ok') {
                	Config.isLogged=true;
                	Config.userLogged=$.inputUsername.value;
                    //var indexController = Alloy.createController('index');
                    var menuPpalController=Alloy.createController('MenuPpal');
                    
                    if (OS_IOS) {
                        Alloy.Globals.navgroup.close();
                        Alloy.Globals.navgroup = null;   
                    } else if (OS_ANDROID) {
                      //JEAS $.loginForm.close();
                      //JEAS $.loginForm = null;
                    }                 
                } else {
                    $.inputPassword.value = '';
                    alert(L('error', 'Error') + ':\n' + response.msg);
                }
            });
    }
}

function openTerminar(e) {
    var activity = Titanium.Android.currentActivity;
	activity.finish();
}


//
// View Language
//
$.loginForm.title        = L('login',      'Acceso');
$.inputUsername.hintText = L('username',   'Nombre de Usuario');
$.inputPassword.hintText = L('password',   'Contraseña');
$.buttonLogin.title      = L('login',      'Acceder');


//
// Navigation
//

// Android 
if (OS_ANDROID) {
    $.loginForm.addEventListener('open', function() {
        if($.loginForm.activity) {
            var activity = $.loginForm.activity;
    
            // Menu
            activity.invalidateOptionsMenu();
            activity.onCreateOptionsMenu = function(e) {
                var menu = e.menu;
                var menuItem1 = menu.add({
                    title: L('terminar', 'Terminar'),
                    showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER
                });
                menuItem1.addEventListener('click', openTerminar);
            };
    
            // Action Bar
            if( Alloy.Globals.Android.Api >= 11 && activity.actionBar) {      
                activity.actionBar.title = L('login', 'AlEn Movil - Acceso');            
            }
        }
    });
    
    // Back Button
    $.loginForm.addEventListener('android:back', function() {
        var activity = Ti.Android.currentActivity;
        activity.finish();
    });    
}

// iOS
if (OS_IOS) {
    var btnRightNav = Ti.UI.createButton({
       title: L('register', 'Register')
    });
    btnRightNav.addEventListener('click', openRegister);
    $.loginForm.rightNavButton = btnRightNav;
}