<?php
/**
 * Comaptibility for elementor plugin
 * 
 * @package News Elementor
 * @since 1.0.0
 */
namespace News_Elementor\Elementor_Compatibility;

class Admin_Init {
    /**
     * Instance
     *
     * @since 1.0.0
     * @access private
     * @static
     * @var \Elementor_Test_Addon\Plugin The single instance of the class.
     */
    private static $_instance = null;

	public $ajax_response = [];

    /**
	 * Minimum Elementor Version
	 *
	 * @since 1.0.0
	 * @var string Minimum Elementor version required to run the addon.
	 */
	const MINIMUM_ELEMENTOR_VERSION = '3.2.0';

	/**
	 * Minimum PHP Version
	 *
	 * @since 1.0.0
	 * @var string Minimum PHP version required to run the addon.
	 */
	const MINIMUM_PHP_VERSION = '7.0';

	/**
	 * Theme Version
	 *
	 * @since 1.0.0
	 * @var string Version of Current Theme.
	 */
	const NEWS_ELEMENTOR_THEME_VERSION = '1.0.0';

    /**
     * Instance
     *
     * Ensures only one instance of the class is loaded or can be loaded.
     *
     * @since 1.0.0
     * @access public
     * @static
     * @return \Elementor_Test_Addon\Plugin An instance of the class.
     */
    public static function instance() {

        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;

    }

    /**
	 * Constructor
	 *
	 * Perform some compatibility checks to make sure basic requirements are meet.
	 * If all compatibility checks pass, initialize the functionality.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function __construct() {
		add_action( 'admin_init', [ $this, 'init' ] );
		add_action( 'wp_ajax_news_elementor_admin_notice_ajax_call', [ $this, 'admin_notice_ajax_call' ] );
	}

    /**
	 * Compatibility Checks
	 *
	 * Checks whether the site meets the addon requirement.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function is_admin_notices() {
        // Check if Elementor is installed and activated
		if ( ! did_action( 'elementor/loaded' ) || $this->plugin_active_status('news-kit-elementor-addons/news-kit-elementor-addons.php') != 'active' ) {
			add_action( 'admin_notices', [ $this, 'admin_notice_missing_main_plugin' ] );
			return false;
		}
		return true;
	}

	/**
     * Check if Plugin is active or not
     */
    function plugin_active_status($file_path) {
        $status = 'not-installed';
        $plugin_path = WP_PLUGIN_DIR . '/' . esc_attr($file_path);

        if (file_exists($plugin_path)) {
            $status = is_plugin_active($file_path) ? 'active' : 'inactive';
        }

        return $status;
    }
	
	/**
	 * Check if Elementor Editor is open.
	 *
	 * @since  1.0.0
	 *
	 * @return boolean True IF Elementor Editor is loaded, False If Elementor Editor is not loaded.
	 */
	private function is_elementor_editor() {
		if ( ( isset( $_REQUEST['action'] ) && 'elementor' == $_REQUEST['action'] ) || isset( $_REQUEST['elementor-preview'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			return true;
		}
		return false;
	}

	/**
	 * Initialize
	 *
	 * Load the addons functionality only after Elementor is initialized.
	 *
	 * Fired by `elementor/init` action hook.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function init() {
		define( 'NEWS_ELEMENTOR_ELEMENTOR_COMPATIBILITY', TRUE );
		$this->is_admin_notices();
		add_action( 'admin_enqueue_scripts', [$this,'compatibility_scripts'] );
		require_once get_theme_file_path( 'inc/plugin-installer.php' );
	}

	// admimn styles and scripts
	function compatibility_scripts() {
		wp_enqueue_style( 'news-elementor-compatibility', get_template_directory_uri() . '/compatibility/compatibility.css', [], self::NEWS_ELEMENTOR_THEME_VERSION, 'all' );
		wp_enqueue_script( 'news-elementor-compatibility', get_template_directory_uri() . '/compatibility/compatibility.js', ['jquery'], self::NEWS_ELEMENTOR_THEME_VERSION, true );
		wp_localize_script( 'news-elementor-compatibility', 'newsElementorCompatibilityThemeInfoObject', [
			'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
			'_wpnonce'  => wp_create_nonce( 'news-elementor-admin-compatibility-nonce' ),
			'progressText'	=> esc_html__( 'Progressing', 'news-elementor' ),
			'redirectingText'	=> esc_html__( 'Redirecting', 'news-elementor' ),
			'newsElementorKitAdminUrl'	=> esc_url( admin_url('admin.php?page=news-kit-elementor-addons') )
		]);
	}

	/**
	 * Welcome notice ajax call function
	 * 
	 * @since 1.0.0
	 */
	public function admin_notice_ajax_call() {
		check_ajax_referer( 'news-elementor-admin-compatibility-nonce', '_wpnonce' );
		if( ! current_user_can( 'manage_options' ) ) wp_die( esc_html__( "You dont have permission to perform this action", "news-elementor" ) );  // check if user role is admin, if not display restriction message
		update_option( 'news_elementor_welcome_notice_dismiss', true );
		$this->ajax_response['status'] = true;
		$this->ajax_response['message'] = esc_html__( 'Welcome notice hidden', 'news-elementor' );
		$this->send_ajax_response();
		wp_die();
	}
	
    /**
	 * Admin notice
	 *
	 * Warning when the site doesn't have Elementor installed or activated.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function admin_notice_missing_main_plugin() {
		if( ! current_user_can( 'manage_options' ) ) return;
		if( get_option( 'news_elementor_welcome_notice_dismiss' ) ) return;
		if ( isset( $_GET['activate'] ) ) unset( $_GET['activate'] );
		$heading = sprintf(
			/* translators: 1: Plugin name 2: Elementor */
			'<strong class="nekit_heading_admin">' . esc_html__( 'Welcome to News Elementor', 'news-elementor' ) . '</strong><div class="nekit_admin_subhead"><strong> '.
			esc_html__( '%1$s has many more to offer you with %2$s and %3$s ', 'news-elementor' ),
			'' . esc_html__( 'News Elementor Theme', 'news-elementor' ) . '</strong>',
			'<strong>' . esc_html__( '"Elementor"', 'news-elementor' ) . '</strong>',
			'<strong>' . esc_html__( '"News Kit Elementor Addons"', 'news-elementor' ) . '</strong> integrated </div>'
		);
		$description = sprintf(
			/* translators: 1: Plugin name 2: Elementor */
			esc_html__( 'Are you ready to create an amazing website using "%1$s" ? Click start with elementor to install and activate "%2$s" and "%3$s" plugins. "%2$s" is the elementor compatibility kit for the current theme.', 'news-elementor' ),
			'<strong>' . esc_html__( 'Elementor Page builder', 'news-elementor' ) . '</strong>',
			'<strong>' . esc_html__( 'Elementor', 'news-elementor' ) . '</strong>',
			'<strong>' . esc_html__( 'News Kit Elementor Addons', 'news-elementor' ) . '</strong>'
		);
		printf( '<div class="news-elementor-admin-notice notice notice-info is-dismissible"><div class="news-elementor-text-wrap"><h2 class="notice-heading">%1$s</h2><p class="notice-description">%2$s</p><div class="notice-actions"><button class="install-plugins">%3$s</button><button class="redirect-button" data-redirect="%5$s">%4$s</button></div></div><div class="news-elementor-image-wrap"><img src="%6$s/screenshot.png"></div><button class="dismiss-notice">%7$s</button></div>', $heading, $description, esc_html__( 'Start With News Kit Elementor Addons', 'news-elementor' ), esc_html__( 'How it works?', 'news-elementor' ), esc_url( 'https://blazethemes.com/' ), esc_url( esc_url(get_template_directory_uri()) ), '<span class="news_elementor_dismiss_admin_notice">'. esc_html__('Dismiss this notice','news-elementor').'</span>' );
	}

	/**
	 * send ajax response to ajax call in js file
	 * 
	 * @since 1.0.0
	 */
	public function send_ajax_response() {
		$json = wp_json_encode( $this->ajax_response );
		echo $json;
		die();
	}
}