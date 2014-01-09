<?php
/**
 * Created by Nehal Patel (http://www.tecknic.in)
 * Date: 16/9/13
 * Time: 10:00 AM
 */

?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Tecknic Facebook Connect Plugin : Nehal Patel</title>
		<link rel="stylesheet" type="text/css" href="css/jquery.fancybox.css" />
		
		<style type="text/css">
			.big_button a{
				background: url("images/button1.png") no-repeat scroll 0 0 transparent;
				color: #FFFFFF;
				height: 75px;
				width: 344px;
				text-indent: -999px;
				display: block;
			}
		</style>
		<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
		<script type="text/javascript" src="js/jquery.fancybox.js"></script>
		<script type="text/javascript" src="js/jquery.np_facebook.js"></script>
	</head>
<body>
	<div id="fb-root"></div>
	<script type="text/javascript">
		var fb_id = '621453107898679';
		window.fbAsyncInit = function() {
			FB.init({ appId: fb_id,status: true,cookie: true,xfbml: true});
			
			$(".np_facebook").npfacebook({
                fanpagePermissions : 'email, offline_access, manage_pages',
                mandatoryPermissions : 'basic_info, email',
                debug : false,
                nextPageURL : 'index2.php'
				//onLoadCheckConnected : false
			});
		};

		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/all.js&appId=" + fb_id;
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		
		
		function trackEvent(category, action, label) {
			console.log(category + ': ' + action +' : '+ label);
		}
		function trackPageView(page){
			console.log('Track Pageview' + page);
		}
	</script>

    <article class="panel1">
		<div class="big_button">
			<a href='javascript:void(0);' class="np_facebook">Facebook Connect</a>
		</div>
	</article>
</body>
</html>
