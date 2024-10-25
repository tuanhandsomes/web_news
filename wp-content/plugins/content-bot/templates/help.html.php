<?php
/**
 * Help page - submenu page
 */

if(!defined('ABSPATH')){
	exit;
}

?>

<div class="cbaiPageWrapper" id="cbaiHelpPage">
    <div class="cbaiPageHead">
        <div class="cbaiPageHeading">
            <img src="<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-icon.png'?>" alt="ContentBot">
            <h1><?php _e("ContentBot Help", "wp-content-bot"); ?></h1>
        </div>
        <div>
            <a href="https://contentbot.ai/#contact" target="_BLANK" class="button-primary">Contact Us!</a>
        </div>
    </div>

    <div>
        <div class="cbaiRow cbaiOverviewContainer">
            <h2 class="cbaiQuestion">Overview</h2>
            <div class="cbaiAnswer">
                <ul class="cbaiOverviewQuestionsList">
                    <li style="margin-top: 15px"> <span style="font-weight: 600;">Getting Started</span>
                        <ul>
                            <li><a href="#connect-account">How do I connect to my ContentBot account?</a></li>
                            <li><a href="#not-connecting">Why is my API key not connecting?</a></li>
                        </ul>
                    </li>
                    <li style="margin-top: 15px"> <span style="font-weight: 600;">Generating Content</span>
                        <ul>
                            <li><a href="#generate-content">How do I generate content?</a></li>
                            <li><a href="#rephrase-content">How do I rephrase content in my post/page?</a></li>
                            <li><a href="#rewrite-post">How do I rewrite my whole post/page content?</a></li>
                        </ul>
                    </li>
                    <li style="margin-top: 15px"> <span style="font-weight: 600;">Chats</span>
                        <ul>
                            <li><a href="#change-model">How do I change the GPT model?</a></li>
                            <li><a href="#how-variables-work">How do I use variables in my prompt?</a></li>
                        </ul>
                    </li>
                    <li style="margin-top: 15px"> <span style="font-weight: 600;">Other</span>
                        <ul>
                            <li><a href="#import-documents">How do I import documents from ContentBot to my site?</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

        </div>
        <div class="cbaiRow" id="connect-account">
            <h2 class="cbaiQuestion">Q: How do I connect to my ContentBot account?</h2>

            <div class="cbaiAnswer">
                <p>Not sure how to connect the plugin to your ContentBot account? Please see and follow the steps below that explains how to do this.</p>
    
                <ol>
                    <li>Go to the <a href="./admin.php?page=wp-content-bot-menu&action=getting_started" target="_BLANK">Get started</a> page in WordPress.</li>
                    <li>Enter your API Key into the <strong>API Key</strong> field.</li>
                    <li>Your Website address will be auto-filled.</li>
                    <li>Click the <strong>Connect</strong> button.</li>
                </ol>
    
                <p>Once you have done this, we will check if your API key exists and connect the plugin on your site to your ContentBot account.</p>
            </div>
        </div>
        
        <div class="cbaiRow" id="not-connecting">
            <h2 class="cbaiQuestion">Q: Why is my API key not connecting?</h2>

            <div class="cbaiAnswer">
                <p>You may be using the wrong API key... please ensure you are using your API key which you may find <a href="https://contentbot.ai/app/apikey" target="_BLANK">here</a>.</p>
    
                <p>If you are still having issues connecting to your ContentBot account, please <a href="https://contentbot.ai/#contact">get in touch with us</a>.</p>
            </div>
        </div>

        <div class="cbaiRow" id="generate-content">
            <h2 class="cbaiQuestion">Q: How do I generate content?</h2>

            <div class="cbaiAnswer">
                <p>Not sure how to generate content? Please see and follow the steps below that briefly explains how to generate content using our <strong>AI Content</strong> Gutenberg block.</p>
    
                <ol>
                    <li><a href="./post-new.php?post_type=page" target="_BLANK">Create</a> or <a href="./edit.php">Edit</a> a post.</li>
                    <li>Add the <strong>AI Content</strong> block.</li>
                    <li>Select the <strong>type</strong> of content that you want to generate.</li>
                    <li>Give the AI information to work with.</li>
                    <li>Click the <strong>Generate Content</strong> button.</li>
                </ol>
    
                <div class="cbaiGifContainer">
                    <img src="<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-gutenberg-step-1.gif'; ?>" class="cbaiGif cbaiGif-half">
                    <img src="<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-gutenberg-step-2.gif'; ?>" class="cbaiGif cbaiGif-half">
                </div>
    
                <p>Once you have done the above steps, the AI will start generating content and output the content in the post editor.</p>
            </div>
        </div>

        <div class="cbaiRow" id="rephrase-content">
            <h2 class="cbaiQuestion">Q: How do I rephrase content in my post/page?</h2>

            <div class="cbaiAnswer">
                <p>Not sure how to rephrase the content in your post or page? Please see and follow the steps below that briefly explains how to do this using the Gutenberg block options.</p>
                <p><em>Note that the rephrasing functionality is only available with text related Gutenberg blocks.</em></p>
    
                <ol>
                    <li><a href="./post-new.php?post_type=page" target="_BLANK">Create</a> or <a href="./edit.php">Edit</a> a post.</li>
                    <li>Select text block that you would like to rephrase.</li>
                    <li>Click the text options dropdown and click the "Rephrase" option.</li>
                </ol>
    
                <div class="cbaiGifContainer">
                <img src='<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-rephrase-content.gif'; ?>' class='cbaiGif'>
                </div>
    
                <p>Once you have done the above steps, the AI will start grouping the content if the section contain too many words and output the rephrased content below the original content.</p>
            </div>
        </div>

        <div class="cbaiRow" id="rewrite-post">
            <h2 class="cbaiQuestion">Q: How do I rewrite my whole post/page content?</h2>

            <div class="cbaiAnswer">
                <p>Not sure how to rephrase the all the content in your post or page? Please see and follow the steps below that briefly explains how to do this with a simple click.</p>
    
                <ol>
                    <li>Go to your <a href="./edit.php">Posts</a> or <a href="./edit.php?post_type=page">Pages</a>.</li>
                    <li>Hover over your post/page and click the "Rewrite Draft with AI" action link.</li>
                    <li>Give the AI some time to rewrite your post/page.</li>
                </ol>
    
                <div class="cbaiGifContainer">
                <img src='<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-rewrite-post.gif'; ?>' class='cbaiGif'>
                </div>
    
                <p>Once you have done the above steps, the AI will start rewriting your post/page and redirect you to the new draft of your post/page.</p>
            </div>
        </div>

        <div class="cbaiRow" id="change-model">
            <h2 class="cbaiQuestion">Q: How do I change the GPT model?</h2>

            <div class="cbaiAnswer">
                <p>Not sure how to change to GPT-4? Please see and follow the steps below that briefly explains how to do this in the Chat section.</p>
                <p><em>Note that changing the GPT model is not possible with the shortform templates, and is only available when using the <a href="./admin.php?page=wp-content-bot-instruct">Chat</a> feature.</em></p>

                <ol>
                    <li>Click on the Advanced Options button (cog icon).</li>
                    <li>Find and change the "Model" dropdown menu.</li>
                </ol>
    
                <div class="cbaiGifContainer">
                <img src='<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-change-model.gif'; ?>' class='cbaiGif'>
                </div>
    
                <p>Once you have changed to use your preferred model, the AI will use that GPT model to generate your content.</p>
            </div>
        </div>

        <div class="cbaiRow" id="how-variables-work">
            <h2 class="cbaiQuestion">Q: How do I use variables in my prompt?</h2>

            <div class="cbaiAnswer">
                <p>Not sure how or how to use variables in your prompt? Please see below that briefly explains this.</p>
                
                <p>When writing your prompt to the AI, you may make use of variables which allow you to easily and quickly insert content into your prompt in a single or multiple places. It also allows you to write a template prompt and fill in your variables with the preferred content.</p>

                <p>Variables have a specific syntax which means that they need to be written in a specific way. Here is an example of a variabe: <strong><em>{Blog Topic}</em></strong></p>

                <p>Here is an example of how you could use this variable in your prompt: <strong><em>Write me a blog post about {Blog Topic}</em></strong>.</p>

                <p>With that said, if you inserted <strong><em>"Content Marketing"</em></strong> into the <strong><em>Blog Topic</em></strong> variable field, the full prompt would be sent to the AI as <strong><em>"Write me a blog post about Content Marketing."</em></strong>.</p>
            </div>
        </div>

        <div class="cbaiRow" id="import-documents">
            <h2 class="cbaiQuestion">Q: How do I import documents from ContentBot to my site?</h2>
            
            <div class="cbaiAnswer">
                <p>Not sure how to import your documents from ContentBot to your site? Please see the below steps that explain how to do this.</p>
    
                <ol>
                    <li><a href="https://contentbot.ai/app/login.php" target="_BLANK">Login</a> to ContentBot.</li>
                    <li>Go to the <a href="https://contentbot.ai/app/documents" target="_BLANK">Documents</a> page.</li>
                    <li>Find the document that you want to import to your site, and click the <em>actions</em> icon (3 dots)</li>
                    <li>Select the <strong>Push to WordPress</strong> action.</li>
                </ol>
    
                <div class="cbaiGifContainer">
                    <img src='<?php echo CBAI_PLUGIN_DIR_URL.'img/cb-import-documents.gif'; ?>' class='cbaiGif'>
                </div>
    
                <p>Once you have done the above steps, your post will be created in the background and you will be automatically redirected to your newly created post.</p>
            </div>
        </div>
    </div>
</div>