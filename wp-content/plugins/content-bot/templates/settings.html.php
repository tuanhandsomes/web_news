<?php
/**
 * Settings - submenu page
 */

if(!defined('ABSPATH')){
	exit;
}

// Redirect to setting page if already linked
if(empty(get_option('cbai_otl'))){
    $key = get_option('cbai_hash');

    $gettingStartedPage = 'admin.php?page=wp-content-bot-menu&action=getting_started';
    if(!empty($key)){
        $gettingStartedPage .= '&unlinked='.$key;
    }

    ?>
        <script>
            window.location.href = '<?php echo admin_url($gettingStartedPage); ?>';
        </script>
    <?php
}


if(!empty($_POST)){
    if(!empty($_POST['cbai_model'])){
        $model = sanitize_text_field( $_POST['cbai_model'] );
        
        if(empty(get_option( 'cbai_model' ))){
            add_option( 'cbai_model' , $model );
        } else {
            update_option( 'cbai_model', $model );
        }
    }
}

$cbaiGPT4Mini = 'selected';
$cbaiGPT4 = '';

if(!empty(get_option('cbai_model'))){

    $model = get_option('cbai_model');

    if($model == 'open_prompt_v4'){
        $cbaiGPT4Mini = '';
        $cbaiGPT4 = 'selected';
    }

}

?>

<div class="cbaiPageWrapper">
    <div class="cbaiPageHead">
        <div class="cbaiPageHeading">
            <img src="<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-icon.png'?>" alt="ContentBot">
            <h1><?php _e("ContentBot Settings", "wp-content-bot"); ?></h1>
        </div>
        <div>
            <a href="https://contentbot.ai/app" class="button-primary">Visit ContentBot</a>
            <button class="button-primary" id="cbai_unlink">Unlink</button>
        </div>
    </div>

    <form method="post" action="" novalidate="novalidate">
        <input type="hidden" id="_wpnonce" name="_wpnonce" value="<?php echo wp_create_nonce('cbai_settings'); ?>">

        <table class="form-table" role="presentation">

            <tbody>                
                <tr>
                    <th scope="row"><label for="cbai_apikey"><?php _e("API Key", "wp-content-bot"); ?></label></th>
                    <td>
                        <input name="cbai_apikey" type="text" id="cbai_apikey" value="<?php echo get_option('cbai_hash'); ?>" class="regular-text cbai-input">
                        <p class="cbai-input-description" id="apikey-description">
                            <?php _e("If you already have a ContentBot account, you may find your API key on the <a href='https://contentbot.ai/app/apikey' target='_BLANK'>API Key</a> page, or create one <a href='https://contentbot.ai/app/register.php' target='_BLANK'>here</a>.", "wp-content-bot"); ?>
                        </p>
                    </td>
                </tr>

                <tr style="display: none; pointer-events: none;">
                    <th scope="row"><label for="cbai_otl"><?php _e("Integration Token", "wp-content-bot"); ?></label></th>
                    <td>
                        <input name="cbai_otl" type="text" id="cbai_otl" value="<?php echo get_option('cbai_otl'); ?>" class="regular-text cbai-input" disabled>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="cbai_website"><?php _e("Website Link", "wp-content-bot"); ?></label></th>
                    <td>
                        <input name="cbai_website" type="text" id="cbai_website" value="<?php echo(get_site_url()); ?>" class="regular-text cbai-input" disabled>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="<?php _e("Save Changes", "wp-content-bot"); ?>"></p>
    </form>
</div>

<script>
    jQuery(function($){
        $(document).on('click', '#cbai_unlink', function(event){
            let button = $(event.target);
            $('input#cbai_apikey').val('');
            $('#submit').click();
        })
    })
</script>