<?php
/**
 * Getting Started page
 */

if(!defined('ABSPATH')){
	exit;
}

// Redirect to setting page if already linked
if(!empty(get_option('cbai_otl'))){
    $settingsPage = admin_url( 'admin.php?page=wp-content-bot-menu' );

    ?>
        <script>
            window.location.href = '<?php echo $settingsPage; ?>';
        </script>
    <?php
}

?>

<style>
    div#content-bot-welcome-page {
        background-color: #fff;
        border: 1px solid #e3e6f0 !important;
        border-radius: 5px;
        text-align: center;
        margin: 25px auto;
        padding: 25px;
    }

    .cbaiHeading{
        text-align: center;
        margin: 0 !important;
    }

    .cbaiInputsInner {
        width: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .cbaiRow {
        width: 30%;
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-bottom: 25px;
    }

    .cbaiRow:last-of-type{
        margin-bottom: 0;
    }

    .cbaiRow label{
        font-weight: 600;
        margin-bottom: 5px;
    }

    @media screen and (max-width: 1100px){
        .cbaiRow{
            width: 50%;
        }
    }

    @media screen and (max-width: 635px){
        .cbaiRow{
            width: 80%;
        }
    }

    .cbaiInfoText{
        width: 50%;
        margin: 0 auto 45px auto;
    }

    #cbaiConnect.linked {
        background: #dc34d8;
        border-color: #b535b2;
    }
</style>




<div id="content-bot-welcome-page" class="wrap about-wrap">
    <p>&nbsp;</p>
    <img style="width: 212px;" src="<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-icon.png'; ?>" alt="ContentBot"/>
    <h1 class="cbaiHeading">
        <?php _e("Link your ContentBot account!","wp-content-bot"); ?>
    </h1>

    <p>&nbsp;</p>

    <p class="cbaiInfoText"><?php _e('Please enter your'); ?> <strong><a href="https://contentbot.ai/app/apikey" target="_BLANK"><?php _e("API Key"); ?></a></strong> <?php _e("and the"); ?> <strong><?php _e("link"); ?></strong> <?php _e('to your website so that we may connect the plugin with your ContentBot account?'); ?></p>

    <div class="cbaiInputContainer">
        <div class="cbaiInputsInner">
            <div class="cbaiRow">
                <label for="cbaiApiKey"><?php _e("API Key"); ?></label>
                <input type="text" name="cbaiApiKey" id="cbaiApiKey" placeholder="">
            </div>
    
            <div class="cbaiRow">
                <label for="cbaiWebsite"><?php _e("Website Link"); ?></label>
                <input type="text" name="cbaiWebsite" id="cbaiWebsite" value="<?php echo get_site_url(); ?>" placeholder="https://example.com" disabled>
            </div>
        </div>
    </div>

    <p>&nbsp;</p>    

    <button class="button-primary" style="padding:5px; padding-right:15px; padding-left:15px; height:inherit;" id="cbaiConnect"><?php _e("Connect"); ?></button>
    
    <p>&nbsp;</p>             
</div>