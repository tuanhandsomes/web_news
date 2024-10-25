<?php
/*
Plugin Name: Content Bot
Plugin URI: https://contentbot.ai
Description: Create amazing AI content snippets with OpenAI's GPT4 autoregressive language model that uses deep learning to produce human-like text.
Version: 1.2.4
Author: ContentBot
Author URI: https://codecabin.io
Text Domain: wp-content-bot
Domain Path: /languages
*/


/**
 * v1.2.4 - 2024-09-04
 * Added a custom REST Endpoint used for unlinking from app side
 * Fixed issue where the "Rewrite draft with AI" action would be displayed if not logged in
 * Updated GPT models
 * 	- GPT-4o-mini
 * 	- GPT-4o
 * 
 * v1.2.3 - 2023-11-27
 * Updated InstructBot to Chat feature
 * Added ability to rewrite posts using AI
 * Added wordpress publish 'status' param
 * Added multi wordpress site functionality
 * 
 * v1.2.2 - 2023-04-21
 * Added InstructBot feature
 * Added ability to rephrase text block content
 * Updated Help submenu page
 * Added Overview to Help page
 * Added JSON escaping for instruct calls 
 * 
 * v1.2.1 - 2023-01-16
 * Added ContentBot.ai integration support
 * Added a custom 'cbai_import_document' REST Endpoint
 * Improved Sign In and Login flows (connect)
 * Added Uninstallation Hook
 * Added all the latest short form tools
 *  - instruct 
 *  - talking points
 *  - summarizer (long form)
 * Changed block name to "AI Content"
 * Added Help submenu page
 *  
 * v1.2.01 - 2022-09-12
 * Fixed incorrect branding image
 * 
 * v1.2.0 - 2022-09-09
 * Added all the latest short form tools
 *  - blog conclusions
 *  - paragraph
 *  - engaging questions
 *  - explain it to a child
 *  - explain it like a professor
 *  - brand story
 *  - photo captions
 * Added ability to login with API key in Gutenberg block area
 * Updated media
 * 
 * v1.1.0 - 2021-07-05
 * Added all the latest short form tools
 *  - blog outline
 *  - bullet point expander
 *  - listicle
 *  - change tone
 *  - summarizer
 *  - finish the sentence
 *  - startup ideas
 *  - brand namees
 *  - slogan generator
 *  - adwords ads
 *  - facebook ads
 *  - video ideas
 *  - video description
 *  - landing page
 *  - value proposition
 *  - sentence rewriter
 *  - pitch yourself
 *  - pain-agitate-solution
 *  - pain-benefit-solution
 *  - AIDA
 *  - quora answers
 *  - sales email
 * Added more robus language options
 * Increased input string lengths
 * Improved UX
 * 
 * v1.0.03
 * Added translation support for input and ouput (powered by Google Translate)
 * Changed brand elements
 * 
 * v1.0.02
 * Added a cache buster for the scripts.js file (CloudFlare users experiencing issues)
 * 
 * v1.0.01
 * Added support for multi outputs
 * Added support to include intros for blog topic requests
 * Fixed a bug that caused our welcome page to show when any plugin was activated
 *
 * v1.0.00
 * Launch
 * 
 */

global $cbaiVersion;
$cbaiVersion = '1.2.4';
define( 'CBAI_PLUGIN_DIR_URL', plugin_dir_url(__FILE__) );
define( 'CBAI_PLUGIN_DIR_PATH', plugin_dir_path(__FILE__) );

// cbai_load_integrations();

/**
 * Enqueues and Localizes the JS scripts when 'block editor' action is called
 * 
 * @return void
 */
add_action( 'enqueue_block_editor_assets', 'cbai_loadMyBlock' );
function cbai_loadMyBlock() {
	global $cbaiVersion;

	wp_enqueue_script(
		'content-bot-functions',
		plugin_dir_url(__FILE__) . 'js/functions.js',
		array( 'wp-blocks','wp-editor' ),
		$cbaiVersion
	);

	wp_enqueue_script(
		'content-bot-gutenberg',
		plugin_dir_url(__FILE__) . 'js/script.js',
		array( 'wp-blocks','wp-editor' ),
		$cbaiVersion
	);

	wp_enqueue_script(
		'content-bot-frame-builders',
		plugin_dir_url(__FILE__) . 'js/frame-builders.js',
		array( 'wp-blocks','wp-editor' ),
		$cbaiVersion
	);

	wp_enqueue_script(
		'content-bot-block-controls',
		plugin_dir_url(__FILE__) . 'js/block-controls.js',
		array( 'wp-blocks','wp-editor' ),
		$cbaiVersion
	);

	wp_enqueue_script(
		'content-bot-content-modulizer',
		plugin_dir_url(__FILE__) . 'js/content-modulizer.js',
		array( 'wp-blocks','wp-editor' ),
		$cbaiVersion
	);

	$current_user = wp_get_current_user();

	$gravs_array = array(
		1 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		2 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		3 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		4 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		5 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		6 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		7 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		8 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		9 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		10 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		11 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		12 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" )
	);

	$cbaiData = array(
		'hash' => get_option( 'cbai_hash' ),
		'website' => get_site_url(),
		'otl' => get_option( 'cbai_otl' ),
		'account' => get_option( 'cbai_account' ),
		'nonce' => wp_create_nonce( 'cbai_ajaxnonce' ),
		'ajaxurl' => admin_url( 'admin-ajax.php' ),
		'uemail' => esc_html( $current_user->user_email ),
		'location' => plugin_dir_url(__FILE__),
		'stringGenerating' => __( 'Generating AI content. Please be patient...' , 'wp-content-bot' ),
	);

	wp_localize_script( 'content-bot-functions', 'cbai_data', $cbaiData );
	wp_localize_script( 'content-bot-gutenberg', 'cbai_data', $cbaiData );
	wp_localize_script( 'content-bot-frame-builders', 'cbai_data', $cbaiData );

	wp_enqueue_style( 'content-bot', plugin_dir_url(__FILE__) . 'css/style.css' );
};



$cbaiAdminPages = array(
	'wp-content-bot-menu',
	'wp-content-bot-instruct',
	'wp-content-bot-help'
);

if(isset($_GET['page']) && in_array($_GET['page'], $cbaiAdminPages)){
	add_action( 'admin_enqueue_scripts', 'cbai_enqueue_admin_scripts' );
}
/**
 * Enqueues CSS admin styles if on a cb admin page
 * 
 * @return void
 */
function cbai_enqueue_admin_scripts(){
	global $cbaiVersion;

	wp_enqueue_style( 'cbai_admin_styles', plugin_dir_url(__FILE__) . 'css/cb-admin-styles.css', array(), $cbaiVersion );
}
  

/**
 * Adds the ContentBot admin menu options
 * 
 * @return void
 */
add_action( 'admin_menu', 'cbai_onAdminMenu' );
function cbai_onAdminMenu() {
	add_menu_page(
		'ContentBot', 
		__( 'ContentBot', 'wp-content-bot' ), 
		'manage_options', 
		'wp-content-bot-menu', 
		'cbai_menu_page',
		"dashicons-smiley"
	);

	if(!empty(get_option( 'cbai_otl' ))){
		
		add_submenu_page(
			'wp-content-bot-menu',
			__( 'Chat', 'wp-content-bot' ),
			__( 'Chat', 'wp-content-bot' ),
			'manage_options',
			'wp-content-bot-instruct',
			'cbai_instruct_page'
		);
		
	}

	add_submenu_page(
		'wp-content-bot-menu',
		__( 'Help', 'wp-content-bot' ),
		__( 'Help', 'wp-content-bot' ),
		'manage_options',
		'wp-content-bot-help',
		'cbai_help_page'
	);
}



/**
 * Handles the POST and page load of the ContentBot main page (page=wp-content-bot-menu)
 * 
 * @return void
 */
function cbai_menu_page() {

	if (isset($_POST)) {
		if (isset($_POST['cbai_apikey'])) {
			$key = get_option('cbai_hash');
			$otl = get_option('cbai_otl');
			$website = get_option('cbai_website');

			// User is updating their API Key
			if($_POST['cbai_apikey'] != $key){
				update_option( 'cbai_otl', '' );
				update_option( 'cbai_hash', '' );
				update_option( 'cbai_website', '' );

				// Send request to unlink CB Account
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL,"https://contentbot.ai/app/api/?api=true&");
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				curl_setopt($ch, CURLOPT_POST, 1);
				
				curl_setopt($ch, CURLOPT_POSTFIELDS, 
					http_build_query(array('action' => 'removeIntegrationWordpress', 'type' => 'wordpress', 'hash' => $key, 'url' => $website, 'otl' => $otl))
				);
				
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				$server_output = curl_exec($ch);
				
				curl_close ($ch);
			}
		}

		update_option( 'cbai_website', sanitize_text_field( get_site_url() ) );
	}

	if (isset($_GET['action'])) {
		switch ($_GET['action']){
			case 'welcome' :
				include( CBAI_PLUGIN_DIR_PATH."/templates/welcome.html.php" );
			break;

			case 'getting_started' :
				include( CBAI_PLUGIN_DIR_PATH."/templates/getting-started.html.php" );

				wp_enqueue_script(
					'content-bot-data',
					plugin_dir_url(__FILE__) . 'js/getting-started.js'
				);

				$current_user = wp_get_current_user();
				$cbai_data = array(
					'rest' => 'https://contentbot.ai/app/api/?api=true&',
					'hash' => get_option( 'cbai_hash' ),
					'website' => get_site_url(),
					'otl' => get_option( 'cbai_otl' ),
					'account' => get_option( 'cbai_account' ),
					'nonce' => wp_create_nonce( 'cbai_ajaxnonce' ),
					'ajaxurl' => admin_url( 'admin-ajax.php' ),
					'uemail' => esc_html( $current_user->user_email ),
					'location' => plugin_dir_url(__FILE__),
				);
			
				wp_localize_script( 'content-bot-data', 'cbai_data', $cbai_data );
			break;

			default:
				include( CBAI_PLUGIN_DIR_PATH."/templates/settings.html.php" );
		}

    } else {
    	include( CBAI_PLUGIN_DIR_PATH."/templates/settings.html.php" );
    }
	
}


/**
 * Handles the page load of the ContentBot help page (page=wp-content-bot-help)
 * 
 * @return void
 */
function cbai_help_page() {
	include( CBAI_PLUGIN_DIR_PATH."/templates/help.html.php" );
}


/**
 * Handles the page load of the ContentBot Instruct bot page (page=wp-content-bot-instruct)
 * 
 * @return void
 */
function cbai_instruct_page() {
	include( CBAI_PLUGIN_DIR_PATH."/templates/instruct-bot.html.php" );
	
	// wp_enqueue_script(
	// 	'content-bot-prompt-templates',
	// 	plugin_dir_url(__FILE__) . 'js/prompt-templates.js'
	// );
	
	wp_enqueue_script(
		'content-bot-instruct-bot',
		plugin_dir_url(__FILE__) . 'js/instruct-bot.js'
	);

	$current_user = wp_get_current_user();
	
	$cbai_instruct_data = array(
		'rest' => 'https://contentbot.ai/app/api/?api=true&',
		'hash' => get_option( 'cbai_hash' ),
		'website' => get_site_url(),
		'otl' => get_option( 'cbai_otl' ),
		'account' => get_option( 'cbai_account' ),
		'nonce' => wp_create_nonce( 'cbai_ajaxnonce' ),
		'ajaxurl' => admin_url( 'admin-ajax.php' ),
		'uemail' => esc_html( $current_user->user_email ),
		'uicon' => esc_url( get_avatar_url( $current_user->ID ) ),
		'location' => plugin_dir_url(__FILE__),
	);

	wp_localize_script( 'content-bot-instruct-bot', 'cbai_instruct_data', $cbai_instruct_data );
}


/**
 * Handles Activation tasks
 * 
 * @return void
 */
add_action( 'activated_plugin', 'cbai_activation' );
function cbai_activation( $plugin ) {
	if(!preg_match( '/content-bot\.php$/', $plugin))
		return;

	global $cbaiVersion;
    update_option( 'cbai_version' , $cbaiVersion );

	if(empty(get_option( 'cbai_otl' ))){ // Not linked
		wp_redirect(admin_url( 'admin.php?page=wp-content-bot-menu&action=getting_started' ));
	} else { // Linked
		wp_redirect(admin_url( 'admin.php?page=wp-content-bot-menu&action=welcome' ));
	}

	exit;
}



/**
 * Handles Uninstallation tasks
 * 
 * @return void
 */
register_uninstall_hook( __FILE__, 'cbai_uninstall' );
function cbai_uninstall() {
	$key = get_option( 'cbai_hash' );
	$otl = get_option( 'cbai_otl' );
	$website = get_option( 'cbai_website' );
	
	delete_option( 'cbai_version' );
	delete_option( 'cbai_hash' );
	delete_option( 'cbai_otl' );
	delete_option( 'cbai_website' );

	// Send request to unlink CB Account
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,"https://contentbot.ai/app/api/?api=true&");
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_POST, 1);
	
	curl_setopt($ch, CURLOPT_POSTFIELDS, 
		http_build_query(array('action' => 'removeIntegrationWordpress', 'type' => 'wordpress', 'hash' => $key, 'url' => $website, 'otl' => $otl))
	);
	
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$server_output = curl_exec($ch);
	curl_close ($ch);
}



/**
 * Registers the AI Writer Gutenberg Block
 * 
 * @return string
 */
register_block_type( 'content-bot/content-block', array(
        'render_callback' => 'cbai_render_callback'
    )
);

function cbai_render_callback( $attributes, $content ){
    return html_entity_decode( $content );
}



/**
 * Adds the Rewrite metabox
 * 
 * @returns void
 */
add_action( 'add_meta_boxes', 'cbai_add_rewrite_metabox' );
function cbai_add_rewrite_metabox(){

	if(empty($_GET['post'])){
		return;
	}
	
	$post_id = $_GET['post'];
	if(empty($post_id)){
		return;
	}

	add_meta_box( 'cb_rewrite_post_box', "ContentBot Rewrite", 'cbai_rewrite_meta_box', ['post', 'page'], 'side' );

	wp_enqueue_script( 'content-bot-rewrite-controls', plugin_dir_url(__FILE__) . 'js/rewrite-controls.js');

}



/**
 * Returns the HTML content of the rewrite meta box
 * 
 * @returns $html
 */
function cbai_rewrite_meta_box(){

	$post_id = sanitize_text_field( $_GET['post'] );

	echo "
		<p>Use AI to rewrite your content.</p>
		<a href='?cb_rewrite_post={$post_id}' id='cb_rewrite_post' class='button button-primary' data-post-id=''>Rewrite with AI</a>
	";
	
}



add_action( 'load-edit.php', 'cb_addPostActions' );
function cb_addPostActions(){

	if(empty(get_option( 'cbai_hash' ))){
		return false;
	}
	wp_enqueue_script( 'content-bot-rewrite-action', plugin_dir_url(__FILE__) . 'js/rewrite-actions.js');

	$current_user = wp_get_current_user();

	$gravs_array = array(
		1 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		2 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		3 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		4 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		5 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		6 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		7 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		8 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		9 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		10 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		11 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" ),
		12 => md5(rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000)."@test".rand(0,1000).rand(0,1000).".com" )
	);

	$cbaiData = array(
			'hash' => get_option( 'cbai_hash' ),
			'website' => get_site_url(),
			'otl' => get_option( 'cbai_otl' ),
			'account' => get_option( 'cbai_account' ),
			'nonce' => wp_create_nonce( 'cbai_ajaxnonce' ),
			'ajaxurl' => admin_url( 'admin-ajax.php' ),
			'uemail' => esc_html( $current_user->user_email ),
			'location' => plugin_dir_url(__FILE__),
			'stringGenerating' => __( 'Generating AI content. Please be patient...' , 'wp-content-bot' ),
	);

	wp_localize_script( 'content-bot-rewrite-action', 'cbai_data', $cbaiData );

}

if(!empty($_GET['action']) && $_GET['action'] === 'cb_rewrite_draft_with_ai'){

  if(!empty($_GET['post'])){

    $post_id = intval($_GET['post']);

    if(!empty($post_id)){

      add_action( 'admin_init', function() use ( $post_id ) { cb_rewriteWithAiAction( $post_id ); } );

    } else {

      wp_die( "Invalid post/page ID." );

    }
    
  } else {

    wp_die( "No post/page provided to be rewritten." );
    
  }

}

function cb_rewriteWithAiAction($post_id){
  include_once(CBAI_PLUGIN_DIR_PATH . '/includes/class.rewriter.php');

  $rewriter = new CB_Rewriter();
  $rewriter->set_id($post_id);

  $rewriter->rewritePost();
}



/**
 * Registers ContentBot custom REST endpoint
 * 
 * @return void
 */
add_action( 'rest_api_init', 'cbai_register_route' );
function cbai_register_route(){
    register_rest_route( 'content-bot', '/cbai_import_document', array(
        'methods' => 'POST',
        'callback' => 'cbai_import_document',
        'show_in_index' => false,
        'permission_callback' => '__return_true',
    ));

	register_rest_route( 'content-bot', '/cbai_force_unlink', array(
        'methods' => 'POST',
        'callback' => 'cbai_force_unlink',
        'show_in_index' => false,
        'permission_callback' => '__return_true',
    ));
}



/**
 * Imports a document when called through the REST API endpoint
 * 
 * @param array $data
 * 
 * @return void
 */
function cbai_import_document($data){
	$params = $data->get_params();

	$otl = get_option( 'cbai_otl' );

	if(!empty($params['otl'])){

		if($otl !== $params['otl']){
			echo json_encode(
				array(
					"success" => false,
					"error" => "Not authorized - OTL does not match"
				)
			);
			exit();
		}

		$user_id = get_current_user_id();

		if(empty($params['status'])){
			$status = 'draft';
		} else {
			$status = $params['status'];
		}
		
		$post_id = wp_insert_post(
			array(
				'post_author' => $user_id,
				'post_title' => $params['title'],
				'post_content' => $params['content'],
				'post_status' => $status
			)
		);

		if($post_id == 0){
			echo json_encode(
				array(
					"success" => false,
					"error" => "Failed to create post in WordPress"
				)
			);

			exit();
		} else {
			echo json_encode(
				array(
					"id" => $post_id,
					"success" => true,
					"link" => admin_url( "post.php?post={$post_id}&action=edit" )
				)
			);
		}

	} else {
		echo json_encode(
			array(
				"success" => false,
				"error" => "Not authorized - OTL missing"
			)
		);

		exit();
	}
}


/**
 * Unlinks the site when called through the REST API endpoint
 * 
 * @param array $data
 * 
 * @return void
 */
function cbai_force_unlink($data){
	$params = $data->get_params();

	$otl = get_option( 'cbai_otl' );

	if(!empty($params['otl'])){

		if($otl !== $params['otl']){
			echo json_encode(
				array(
					"success" => false,
					"error" => "Not authorized - OTL does not match"
				)
			);
			exit();
		}

		$user_id = get_current_user_id();

		delete_option( 'cbai_hash' );
		delete_option( 'cbai_otl' );
		delete_option( 'cbai_website' );

		echo json_encode(
			array(
				"success" => true,
				"error" => "WordPress site unlinked"
			)
		);

		exit();

	} else {
		echo json_encode(
			array(
				"success" => false,
				"error" => "Not authorized - OTL missing"
			)
		);

		exit();
	}
}


/**
 * Gets the version number of the plugin
 * 
 * @return string
 */
function cbai_GetVersionNumber() {
	return get_option( 'cbai_version' );
}



/**
 * Saves the API key option (cbai_hash)
 * 
 * @return void
 */
add_action( 'wp_ajax_contentbot_save_apikey', 'cbai_saveApiKey' );
function cbai_saveApiKey() {
	if( !wp_verify_nonce( sanitize_text_field( $_POST['nonce'] ), 'cbai_ajaxnonce' ) ) {
		http_response_code(403);
		exit;
	}
	update_option( 'cbai_hash', sanitize_text_field( $_POST['apikey'] ) );

	die( '1' );
}



/**
 * Saves the website option (cbai_website)
 * 
 * @return void
 */
add_action( 'wp_ajax_contentbot_save_website', 'cbai_saveWebsite' );
function cbai_saveWebsite() {
	if( !wp_verify_nonce( sanitize_text_field( $_POST['nonce'] ), 'cbai_ajaxnonce' ) ) {
		http_response_code(403);
		exit;
	}
	update_option( 'cbai_website', sanitize_text_field( get_site_url() ) );
	die( '1' );
}



/**
 * Saves the otl option (cbai_otl)
 * 
 * @return void
 */
add_action( 'wp_ajax_contentbot_save_otl', 'cbai_saveOTL' );
function cbai_saveOTL() {
	if( !wp_verify_nonce( sanitize_text_field( $_POST['nonce'] ), 'cbai_ajaxnonce' ) ) {
		http_response_code(403);
		exit;
	}
	update_option( 'cbai_otl', sanitize_text_field( $_POST['otl'] ) );
	die( '1' );
}



/**
 * Saves the model option (cbai_model)
 * 
 * @return void
 */
add_action( 'wp_ajax_contentbot_save_model', 'cbai_saveModel' );
function cbai_saveModel() {
	if( !wp_verify_nonce( sanitize_text_field( $_POST['nonce'] ), 'cbai_ajaxnonce' ) ) {
		http_response_code(403);
		exit;
	}
	update_option( 'cbai_model', sanitize_text_field( $_POST['model'] ) );
	die( '1' );
}



add_action( 'init', 'cbai_check_rewrite');
function cbai_check_rewrite() {

	if(!empty($_GET['cb_rewrite_post'])){

		$post_id = sanitize_text_field( $_GET['cb_rewrite_post'] );

		include_once('includes/class.rewriter.php');

		$rewriter = new CB_Rewriter();
		$rewriter->set_id($post_id);

		$rewriter->rewritePost();

	}
	
}