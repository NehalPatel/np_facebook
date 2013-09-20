/**
 *  jQuery Facebook connect v1.0.0
 * Created by Nehal Patel (http://www.tecknic.in)
 * Date: 16/9/2013
 * Time: 10:00 AM
 */

	/* GLOBAL VARIABLES */
	var user_facebook_id = '';

    $(document).ready(function(){
        //get hidden doms
        $.get('hidden_doms.php', function(data) {
            $('body').append(data);
        });
    });

(function( window, $, undefined ){
	'use strict';

	/* LOCAL VARIABLES */
    var instance;
	var is_connected = false;
    var is_checkedonload = false;
    var is_pagesRetrived = false;

    $.fn.npfacebook = function( options ) {
		this.each(function() {
			instance = $.data( this, 'npfacebook' );
            if ( instance ) {
				// apply options & init
				instance.option( options || {} );
				instance._init();
			} else {
				// initialize new instance
				$.data( this, 'npfacebook', new $.NPFacebook( options, this ) );
                instance = $.data( this, 'npfacebook' );
			}
		});
		return this;
	};
	
	$.NPFacebook = function( options, element ){
		this.element = $( element );
		
		this._create( options );
		this._init();
	};
	
	$.NPFacebook.settings = {
		onLoadCheckConnected: true,
		fanpagePermissions : 'publish_stream,email,manage_pages,offline_access,user_location,user_about_me,user_photos,user_events,user_videos,user_likes',
		mandatoryPermissions : 'basic_info, user_likes, publish_stream, manage_pages',
        nextPageURL : false,
        showPersonalProfile : true,
        personalPermissions : 'user_location,user_about_me,user_photos,user_events,user_videos',
        isFanpageListingPage : false,
        fanpageListingPage : {
            fanpageListingDivId : "np_facebook_fanpages",
            askFanpagePermission : true,
            inFancybox : false
        },
		trackCode : {
			connect : {
				category : 'Facebook Connect Popup',
				label : 'Click',
				value : 'Connect.#connect',
				pageview : 'facebook_clicked_connect'
			},
			afterConnect : {
				category : 'Facebook Connect Popup',
				label : 'App.Approved',
				value : 'App.Approved'
			},
			notApproved : {
				category : 'Facebook Connect Popup',
				label : 'App.Rejected',
				value : 'App.Rejected'
			},
            fanpagesFound : {
                category : 'Facebook Connect Popup',
                label : 'Pages.Number',
                value : 'Undefined'
            },
            fanpagePermission : {
                category : 'Facebook Connect Popup',
                label : 'App.Fanpage Page Permissions',
                value : 'Undefined'
            },
            fanpagePermissionApproved : {
                category : 'Facebook Connect Popup',
                label : 'App.Fanpage Page Permissions Approved',
                value : 'Undefined'
            },
            fanpagePermissionRejected : {
                category : 'Facebook Connect Popup',
                label : 'App.Fanpage Page Permissions Rejected',
                value : 'Undefined'
            },
            personalPermissionBefore : {
                category : 'Facebook Connect Popup',
                label : 'App.Personal Page Permissions',
                value : 'Undefined'
            },
            personalPermissionApproved : {
                category : 'Facebook Connect Popup',
                label : 'App.Personal_Page_Permissions.Approved',
                value : 'Undefined'
            },
            personalPermissionRejected : {
                category : 'Facebook Connect Popup',
                label : 'App.Personal_Page_Permissions.Rejected',
                value : 'Undefined'
            }
		},
        debug : false
	};
	  
	$.NPFacebook.prototype = {
		// sets up widget
		_create : function( options ) {
			this.options = $.extend( true, {}, $.NPFacebook.settings, options );
			
			$(this.element).bind( "click", this.handler );

            $(".fanpage_button").on('click', this.handler);
		},
			  
		// _init fires when instance is first created
		_init : function() {
			if(! this.checkFB()){
                this._showMessage('Facebook object not found.');
				console.log('Facebook object not found.');
				return;
			}
			if(! this.checkFancybox()){
                this._showMessage('Fancybox plugin not found.');
                console.log('Fancybox plugin not loaded.');
				return;
			}
            if(this.options.onLoadCheckConnected && (!is_checkedonload)){
                this._showLoader("Checking Facebook Connected...");
                this.checkConnectedWithFacebook(function(result){
					if(result){
						is_connected = true;
					}
				}, false);
                is_checkedonload = true;
                this._closeLoader();
			}

            if(this.options.isFanpageListingPage && (!is_pagesRetrived)){
                this._showLoader("Checking Facebook Connected...");
                this.checkConnectedWithFacebook(function(result){
                    if(result){
                        instance.checkPermissions('manage_pages', function(response){
                            if(! response.status){
                                //manage_pages permission not found on fanpage listing page
                                //show user the personal profile link and manage_pages button
                                instance.options.showPersonalProfile = true;
                                instance.options.fanpageListingPage.askFanpagePermission = true;
                                console.log(instance.options);
                            }
                            instance._showLoader("Getting Facebook Fanpages...");
                            instance.getFacebookFanPages(function(response){
                                instance.loadPages(response['data']);
                            });
                        });
                    } else {
                        instance._showMessage("User is not connected with Facebook. Go back and try again.");
                    }
                });
                is_pagesRetrived = true;
                this._closeLoader();
            }
		},

        option: function( key, value ){
			// set options AFTER initialization:
			// signature: $('#foo').npfacebook({ cool:false });
			if ( $.isPlainObject( key ) ){
				this.options = $.extend(true, this.options, key);
			}
		},
		
		// This is main function which will handle the click event of Facebook button
		handler : function(){
			//check if user is logged in with Facebook
			instance._debug(instance.options.onLoadCheckConnected);
            instance._debug(is_connected);
            if( instance.options.onLoadCheckConnected && is_connected){
                instance.checkConnectedWithFacebook(function(result){
                    instance._debug(result);
					if(result){
						instance.afterFacebookConnect();
					} else {
						//if not ask for
						instance.connectFacebook(instance.options.fanpagePermissions, instance.afterFacebookConnect);
					}
				});
			}else{
                //either user is not logged in facebook or not connected
                instance.connectFacebook(instance.options.fanpagePermissions, instance.afterFacebookConnect);
            }
		},
		
		_trackEvent : function(code){
            this._debug(code);
            if(typeof trackEvent == "function"){
			    trackEvent(code.category, code.label, code.value);
            }
		},
		_trackPageView : function(code){
            if(typeof trackPageView == "function"){
			    trackPageView(code.pageview);
            }
		},

        _debug : function(data, type){
            if(typeof type=='undefined'){
                type = 'log';
            }
            if(this.options.debug == true && window.console && window.console.log && typeof window.console.log === "function" ){
                switch (type){
                    case 'log':
                        console.log(data);
                        break;
                    case 'warn':
                        console.warn(data);
                        break;
                    case 'info':
                        console.info(data);
                        break;
                    case 'error':
                        console.error(data);
                        break;
                    default:
                        console.log(data);
                        break;
                }
            }
        },
        _showLoader : function(message){
            $("#loader span").html(message);
            $.fancybox.open({
                href : "#loader",
                padding : 5,
                width : 300,
                height : 50,
                fitToView : false,
                autoSize : false,
                closeBtn : false
            });
        },
        _closeLoader : function(){
            $.fancybox.close();
        },

        _showMessage : function(message){
            $("#info_window span").html(message);
            $.fancybox.open({
                href : "#info_window",
                padding : 5,
                width : 400,
                height : 50,
                fitToView : false,
                autoSize : false
            });
        },

		checkFB : function(){
			if( typeof FB ==  'undefined' ){
				return false;
			}
			return true;
		},
		
		checkFancybox : function(){
			if(typeof $.fancybox == 'function') {
				 return true
			}
			return false;
		},
		
		// add user's facebook id in tracking code
		_updateTrackingCode : function(user_id){
			this.options.trackCode.afterConnect.value = 'App.Approved :' + user_id;
			this.options.trackCode.connect.value = 'App.Approved :' + user_id;
            instance.options.trackCode.personalPermissionBefore.value = 'User :'+ user_id +' extended permissions for personal site';
            instance.options.trackCode.personalPermissionApproved.value = 'User :'+ user_id +' extended permissions, approved permission :';
            instance.options.trackCode.personalPermissionRejected.value = 'User :'+ user_id +' extended permissions, rejected permission :';

            instance.options.trackCode.fanpagePermission.value = 'User :'+ user_id +' permissions for fanpages';
            instance.options.trackCode.fanpagePermissionApproved.value = 'User :'+ user_id +' fanpage permissions, approved permission :';
            instance.options.trackCode.fanpagePermissionRejected.value = 'User :'+ user_id +' fanpage permissions, rejected permission :';
		},

        loadPages : function(pages){
            instance._showLoader("Loading User's Fanpages");
            $("#" + instance.options.fanpageListingPage.fanpageListingDivId).html('');
            if(pages.length == 0){
                instance._debug("No Facebook fanpages found.");
                console.log(instance.options);
                if(instance.options.showPersonalProfile == false){
                    return false;
                }
            }

            var $parent_dom = $(".facebook_fanpages").clone();
            // Add pages
            $.each(pages, function(index, value){
                var $dom = jQuery(".page_thumbnail").clone();
                if(value.category != 'Application'){
                    $(".page_name", $dom).html(value.name);$(".page_name", $dom).attr('href',FULL_PATH + 'sites/add/fbid:'+value.id);$(".page_name", $dom).attr('page_id', value.id);
                    $(".page_image", $dom).attr('href',FULL_PATH + 'sites/add/fbid:'+value.id);$(".page_image", $dom).attr('page_id', value.id);
                    $(".media-object",$dom).attr('src','http://graph.facebook.com/'+value.id+'/picture?type=small');
                    $($parent_dom).append($dom.html());
                }
            });
            $("#" + instance.options.fanpageListingPage.fanpageListingDivId).append($parent_dom).addClass("tb np_facebook_fanpages");
            if(instance.options.showPersonalProfile  || pages.length == 0){
                instance.addPersonalPage();
            }

            if(instance.options.fanpageListingPage.askFanpagePermission || pages.length == 0){
                instance.addManagePagesButton();
            }
            instance._closeLoader();

            if(instance.options.nextPageURL == false && instance.options.fanpageListingPage.inFancybox){
                $.fancybox.open({
                    href : "#" + instance.options.fanpageListingPage.fanpageListingDivId,
                    padding : 5,
                    width : 600,
                    minHeight : 400,
                    height : 400,
                    fitToView : false,
                    autoSize : false
                });
            }
        },

        addPersonalPage : function(){
            if(instance.options.showPersonalProfile){
                var $dom = jQuery(".page_thumbnail").clone();
                // Add personal site
                $(".page_name", $dom).html('My personal profile').attr('href','javascript:void(0);').addClass("personal");
                $(".page_image", $dom).attr('href','javascript:void(0);').addClass("personal");

                var user_image_url = 'http://profile.ak.fbcdn.net/hprofile-ak-ash4/c178.0.604.604/s50x50/252231_1002029915278_1941483569_n.jpg';
                if(user_facebook_id) {
                    user_image_url = 'http://graph.facebook.com/'+user_facebook_id+'/picture?type=square';
                }
                $(".media-object",$dom).attr('src',user_image_url);
                $("#"+ instance.options.fanpageListingPage.fanpageListingDivId +" .facebook_fanpages").append($dom.html());
            }
            $(".personal").on('click', function(){
                instance._trackEvent(instance.options.trackCode.personalPermissionBefore);
                instance.connectFacebook(instance.options.personalPermissions, function(){
                    instance.checkPermissions(instance.options.personalPermissions, function(response){
                        if(response.status){
                            if(typeof response.found_permissions != "undefined"){
                                instance.options.trackCode.personalPermissionApproved.value += response.found_permissions.join();
                            }
                            instance._trackEvent(instance.options.trackCode.personalPermissionApproved);
                            instance._debug("All permissions found");
                            window.top.location.href = FULL_PATH + 'sites/add/type:fb_personal';
                            return;
                        }else{
                            if(typeof response.not_found_permissions != "undefined"){
                                instance.options.trackCode.personalPermissionRejected.value += response.not_found_permissions.join();
                            }
                            instance._trackEvent(instance.options.trackCode.personalPermissionRejected);
                            instance._debug("Some permissions are missings");
                            $.fancybox.open({
                                href : "#personal_content",
                                padding : 5,
                                width : 500,
                                minHeight : 400,
                                height : 400,
                                fitToView : false,
                                autoSize : false
                            });
                        }
                    });
                });
            });
        },

        addManagePagesButton : function(){
            var $button = $(".permission_btn").clone();
            $("#" + instance.options.fanpageListingPage.fanpageListingDivId).append("<div class='clear'></div>");
            $("#" + instance.options.fanpageListingPage.fanpageListingDivId).append($button.html());

            $(".manage_pages").on('click', function(){
                instance.connectFacebook('manage_pages', function(){
                    instance.checkPermissions('manage_pages', function(response){
                        if(response.status){
                            //instance._debug("Manage Pages Permission found");
                            //instance._showMessage("Manage Pages Permission found");
                            window.top.location.reload();
                            return;
                        }else{
                            instance._showMessage("Manage pages permissions not found");
                            instance._debug("Manage pages permissions not found");
                        }
                    });
                });
            });
        },

        afterFacebookConnect : function(){
            //check if user allowed permission
            instance.checkPermissions(instance.options.mandatoryPermissions, function(response){
                if(response.status){
                    instance._debug("All permissions found");
                    if(instance.options.nextPageURL){
                        window.top.location.href = instance.options.nextPageURL;
                        return;
                    } else {
                        if(instance.options.fanpageListingPage.inFancybox){
                            instance.getFacebookFanPages(function(response){
                                instance.loadPages(response['data']);
                            });
                        }else{
                            instance._showMessage("next page URL not defined");
                            instance._debug("next page URL not defined");
                        }
                        return;
                    }
                }else{
                    instance._debug("Some permissions are missings");
                    $.fancybox.open({
                        href : "#main_content",
                        padding : 5,
                        width : 500,
                        minHeight : 400,
                        height : 400,
                        fitToView : false,
                        autoSize : false
                    });
                }
            });
        },

		/* FACEBOOK FUNCTIONS */
		checkConnectedWithFacebook : function( callback, is_track){
			if(typeof is_track == "undefined"){ is_track = true; }

			FB.getLoginStatus(function(response) {
                instance._debug(response);
				if (response.status === 'connected' && response.authResponse.userID > 0) {
					user_facebook_id = response.authResponse.userID;
                    instance._updateTrackingCode(user_facebook_id);
					if(is_track){
                        instance._trackEvent(instance.options.trackCode.connect);
					}
					callback(true);
				}else{
					callback(false);
				}
			});
		},
		
		connectFacebook : function( permissions , callback){
			this._trackEvent(this.options.trackCode.connect);
			this._trackPageView(this.options.trackCode.connect);
			FB.login(function(response){
				if(response.status == 'connected' && response.authResponse.userID > 0){
					// user is logged in
					user_facebook_id = response.authResponse.userID;
                    instance._updateTrackingCode(user_facebook_id);
                    instance._trackEvent(instance.options.trackCode.afterConnect);
				} else {
                    instance._trackEvent(instance.options.trackCode.notApproved);
				}

                callback();
			}, {
				scope: permissions
			});
		},

        checkPermissions : function(permissions, callback){
            instance._showLoader("Checking User's Permissions...");
			var obj = new Object();
			var result = { 
				status : true,
				found_permissions : new Array(),
				not_found_permissions : new Array()
			};
			
			if(typeof permissions == "string"){
				permissions = String.prototype.split.call( permissions, ',' );
			}
			FB.api('/me/permissions', function (response) {
				if(typeof response.data == "undefined" ){
                    instance._debug("Permission response not found");
                    instance._debug(response);
                    result.status = false;
                    result.message = response.message;
                } else {
                    $.each(permissions, function(key, permission){
                        if ($.trim(permission) in response.data[0]) {
                            result.found_permissions.push($.trim(permission));
                            console.log(permission + ' found');
                        }else{
                            result.status = false;
                            result.not_found_permissions.push($.trim(permission));
                            console.warn(permission + ' not found');
                        }
                    });
                }
                instance._closeLoader();
				callback(result);
			});
		},

        getFacebookFanPages : function( callback ){
            FB.api('/me/accounts', { limit: 100 }, function(response) {
                console.log(response);
                if(response.data != undefined){
                    instance.options.trackCode.fanpagesFound.value =  response.data.length+' pages';
                }
                instance._trackEvent(instance.options.trackCode.fanpagesFound);
                callback(response);
            });
        }
	};
})( window, jQuery );