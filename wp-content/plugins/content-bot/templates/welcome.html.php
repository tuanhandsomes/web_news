<?php
/**
 * Welcome page
 */

if(!defined('ABSPATH')){
	exit;
}

?>

<div id="content-bot-welcome-page" class="wrap about-wrap">
    <p>&nbsp;</p>
    
    <img style="width: 212px;" src="<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-icon.png'; ?>" alt="ContentBot"/>
    <h1 style="margin: 0;"><?php  _e("Welcome to ContentBot","wp-content-bot"); ?></h1>

    <div class="about-text" style="margin: 0;"><?php _e("The world's most advanced WordPress AI Content plugin.","wp-content-bot"); ?></div>

    <p>&nbsp;</p>
    
    <p><em><?php _e("Generate meaningful AI content in seconds using OpenAI's powerful autoregressive language model, GPT-3."); ?></em></p>
    
    <p>&nbsp;</p>

    <h2 class="feature-heading"><?php _e("Generate Content using the AI Gutenberg Block"); ?></h2>
    <div class="cbai-flex feature-section two-col">
        <div class="col cbai-flex-grid__item">
            <div class="cbai-card">
                <h3><?php _e("Step 1","wp-content-bot"); ?></h3>
                <p><?php _e("Add the ContentBot block to your page/post","wp-content-bot"); ?></p>
                <img src='<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-gutenberg-step-1.gif'; ?>' style="border:1px solid #ccc;" />
            </div>             
        </div>
        <div class="col cbai-flex-grid__item">
            <div class="cbai-card">
                <h3><?php _e("Step 2","wp-content-bot"); ?></h3>
                <p><?php _e("Generate your AI content snippets!","wp-content-bot"); ?></p>
                <img src='<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-gutenberg-step-2.gif'; ?>' style="border:1px solid #ccc;" />
            </div>
        </div>
    </div>

    <p>&nbsp;</p>

    <h2 class="feature-heading"><?php _e("Ask the AI to generate content for you directly within your WordPress site."); ?></h2>
    <div class="cbai-flex feature-section two-col">
        <div class="col cbai-flex-grid__item">
            <div class="cbai-card">
                <h3><?php _e("Quick and easy!","wp-content-bot"); ?></h3>
                <p><?php _e("Tell the AI what content you would like to generate, or ask it questions and respond accordingly.","wp-content-bot"); ?></p>
                <img src='<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-chat.gif'; ?>' style="border:1px solid #ccc;" />
            </div>             
        </div>
    </div>

    <p>&nbsp;</p>

    <h2 class="feature-heading"><?php _e("Import your documents from ContentBot to your WordPress site"); ?></h2>
    <div class="cbai-flex feature-section two-col">
        <div class="col cbai-flex-grid__item">
            <div class="cbai-card">
                <h3><?php _e("Watch how simple it is!","wp-content-bot"); ?></h3>
                <p><?php _e("Select 'Push to WordPress' action for your documents and a WordPress post will be created with your document title and content.","wp-content-bot"); ?></p>
                <img src='<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-import-documents.gif'; ?>' style="border:1px solid #ccc;" />
            </div>             
        </div>
    </div>
   
    <p><h2><?php _e("Ready to get started?"); ?></h2></p>
    <a class="button-primary" style="padding:5px; padding-right:15px; padding-left:15px; height:inherit;" href="./post-new.php?post_type=page"><?php _e("Start Generating!"); ?></a>
    
    <p>&nbsp;</p>             
</div>
