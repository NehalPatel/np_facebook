<?php
/**
 * Created by Nehal Patel (http://www.tecknic.in)
 * Date: 17/9/13
 * Time: 12:41 PM
 */
    define('LOCALHOST', 1);
    define('FULL_PATH', 'http://www.tecknic.in/');
    define('FACEBOOK_APP_ID', '621453107898679');
?>
<script type="text/javascript">
    var FULL_PATH = '<?php echo FULL_PATH?>';
</script>
<style type="text/css">
    .tb .dialog_box .modal-header h3 {padding: 0;margin: 0;}
    .tb .dialog_box .media {float: left;margin: 0;min-height:65px;}
    .dialog_box {margin-top: 10px;padding-right:10px;padding-left:20px;}
        /*.tb .media-body {width:380px;}*/
        /*.tb .media {width: 100% !important;}*/
    .tb .dialog_box p.media-heading {line-height: 1.25em;}
    .tb .dialog_box .emphasize_links a {color: #005580;text-decoration: underline;}
    .dialog_box .page_image img.media-object {width:50px;}

    .tb .dialog_box .media {padding: 3px;margin-right:7px;width: 270px;}
    .tb .dialog_box .media:hover {background-color:azure;}
    /*.dialog_box .media-body.pull-left {width: 130px;}*/
    #main_content {padding-left:0px;}
    .fancybox-skin {background: #fff !important;}

    .center { text-align:center; margin: auto}
    .right { text-align:right;}
    .np_facebook_fanpages {width: 600px;height: auto;display: block;margin: 0 auto;}
</style>
<a href='javascript:void(0);' class="np_facebook" style="display: none">Facebook Connect</a>
<div id="np_facebook_fanpages" class="tb np_facebook_fanpages"></div>

<div id="hidden_doms" style="display: none">
    <div class="facebook_fanpages emphasize_links dialog_box" style="display: inline-block">
        <h3 style="margin-bottom:10px">Create a website for:</h3>
    </div>

    <div class="page_thumbnail" style="display: none">
        <div class="media site-item">
            <a href="#" class="page_image" style="float: left">
                <img class="media-object" src="" height="50" width="50">
            </a>

            <div class="media-body pull-left" style="float: left;margin-left: 10px">
                <p class="media-heading">
                    <a href="#" class="page_name"></a>
                </p>
            </div>
        </div>
    </div>


    <div class="tb" id="main_content" style="display:none">
        <div class="dialog_box emphasize_links" style="">
            <div class="center"><img src="http://www.tecknic.in/images/logo.png" /></div>
            <p style="margin:20px 0 0px;text-align:center;font-size:14px;line-height:1.4em;padding:0 20px;">
                In order to create your website, we need you to connect to Facebook:<br/><br/>
            </p>

            <div class="center">
                <a href="javascript:void(0);" class="np_facebook">
                    <img src="http://www.tecknic.in/images/fb_connect_233x40.png" alt="Connect with Facebook" title="Connect with Facebook" />
                </a>
            </div>

            <p style="margin:20px 0 10px;text-align:center;font-size:10px;line-height:1.4em;padding:0 20px 25px;color:rgb(207, 205, 205);">
                Don't worry, you will have full control over your website. <br/>
                We won't publish on your behalf nor make any changes to your page without your permission. <br/>
                <a id="a_contact_us_to_learn_more" href="http://www.tecknic.in/contact" target="_blank" style="text-decoration: underline" >Contact us to learn more</a>
            </p>

            <div class="right" style="font-size:10px;">
                <a id="a_connect_later" href="http://tecknic.in/faq" target="_blank" onclick="parent.jQuery.fancybox.close();" style="text-decoration: underline">Connect later</a>
            </div>
        </div>
    </div>

    <div class="tb" id="personal_content" style="display:none">
        <div class="dialog_box emphasize_links" style="">
            <div class="center"><img src="http://www.tecknic.in/images/logo.png" /></div>
            <p style="margin:20px 0 0px;text-align:center;font-size:14px;line-height:1.4em;padding:0 20px;">
                Creating a website requires your timeline content. We need your permission to read it.<br/><br/>
            </p>

            <div class="center">
                <a href="javascript:void(0);" class="personal">
                    <img src="http://www.tecknic.in/images/fb_connect_233x40.png" alt="Connect with Facebook" title="Connect with Facebook" />
                </a>
            </div>

            <p style="margin:20px 0 10px;text-align:center;font-size:10px;line-height:1.4em;padding:0 20px 25px;color:rgb(207, 205, 205);">
                Don't worry, you will have full control over your website. <br/>
                We won't publish on your behalf nor make any changes to your page without your permission. <br/>
                <a id="a_contact_us_to_learn_more" href="http://tecknic.in/contact" target="_blank" style="text-decoration: underline" >Contact us to learn more</a>
            </p>

            <div class="right" style="font-size:10px;">
                <a id="a_connect_later" href="http://tecknic.in/faq" target="_blank" onclick="parent.jQuery.fancybox.close();" style="text-decoration: underline">Connect later</a>
            </div>
        </div>
    </div>

    <div class="permission_btn">
        <div class="button1 manage_pages tracking_enabled" data-ga-category="FanpageListingPage.Behavior.Clicked.Create_website" data-ga-label="Create_website.Main_button"></div>
    </div>

    <div id="loader">
        <div class="center" style="margin: 40px auto;">
            <img src="images/loader.gif" style="margin-right: 10px;" />
            <span>Loading...</span>
        </div>
    </div>

    <div id="info_window">
        <div class="center" style="margin: 40px auto;">
            <span></span>
        </div>
    </div>
</div>