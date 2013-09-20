Facebook Connect Plugin
	Plugin will connect your Facebook Account and load Fanpages.
	

Use of Plugin

window.fbAsyncInit = function() {
	FB.init({ appId: fb_id,status: true,cookie: true,xfbml: true});
	$(".np_facebook").npfacebook({
 		fanpagePermissions : 'email, offline_access, manage_pages',
		mandatoryPermissions : 'basic_info, email, manage_pages',
		onLoadCheckConnected : false
	});
};
	