<?php
/**
 * Utilities for elementor plugin
 * 
 * @package News Elementor
 * @since 1.0.0
 */
namespace News_Elementor\Elementor_Plugin_Installer;

class Plugin_Installer {
    public $ajax_response = array();

    function __construct() {
        add_action( 'wp_ajax_news_elementor_plugin_action', [$this,'plugin_action'] );
    }
    /**
     * Activate or install importer plugin
     *
     */
    function plugin_action() {
        check_ajax_referer( 'news-elementor-admin-compatibility-nonce', '_wpnonce' );
        $plugin = isset( $_POST['plugin'] ) ? sanitize_text_field( $_POST['plugin'] ) : '';
        if( empty( $plugin ) ) {
            $this->ajax_response['status'] = false;
            $this->ajax_response['message'] = esc_html__( 'Plugin to install not found', 'news-elementor' );
            $this->send_ajax_response();
        }
        switch($plugin) {
            case 'elementor': $plugin_name = esc_html__('Elementor', 'news-elementor');
                                $file_path = 'elementor/elementor.php';
                                $_plugin_action = $this->plugin_active_status($file_path);
                break;
            case 'news-kit-elementor-addons': $plugin_name = esc_html__('News Kit Elementor Addons', 'news-elementor');
                                $file_path = 'news-kit-elementor-addons/news-kit-elementor-addons.php';
                                $_plugin_action = $this->plugin_active_status($file_path);
                break;
            case 'news-kit-elementor-addons-pro': $plugin_name = esc_html__('News Kit Elementor Addons Pro', 'news-elementor');
                                $file_path = 'news-kit-elementor-addons-pro/news-kit-elementor-addons-pro.php';
                                $_plugin_action = $this->plugin_active_status($file_path);
                                if( $_plugin_action == 'not-installed' ) $_plugin_action = 'premium-not-required';
                break;
        }
        if( $_plugin_action === 'inactive' ) {
            if( $file_path ) {
                activate_plugin( $file_path, '', false, true );
            }
            $this->ajax_response['status'] = true;
            $this->ajax_response['message'] = esc_html( $plugin_name ) . esc_html__( ' plugin activated', 'news-elementor' );
            $this->send_ajax_response();
        } else if( $_plugin_action === 'not-installed' ) {
            $download_link = esc_url( 'https://downloads.wordpress.org/plugin/' .esc_html($plugin). '.zip' );
            // Include required libs for installation
            require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
            require_once ABSPATH . 'wp-admin/includes/class-wp-ajax-upgrader-skin.php';
            require_once ABSPATH . 'wp-admin/includes/class-plugin-upgrader.php';
            $skin = new \WP_Ajax_Upgrader_Skin();
            $upgrader = new \Plugin_Upgrader($skin);
            $upgrader->install( $download_link );
            activate_plugin( $file_path, '', false, true );
            $this->ajax_response['status'] = true;
            $this->ajax_response['message'] = esc_html( $plugin_name ) . esc_html__( ' plugin installed and activated', 'news-elementor' );
            $this->send_ajax_response();
        } else if( $_plugin_action === 'active' ) {
            $this->ajax_response['status'] = true;
            $this->ajax_response['message'] = esc_html( $plugin_name ) . esc_html__( ' plugin already activated', 'news-elementor' );
            $this->send_ajax_response();
        } else if( $_plugin_action === 'premium-not-required' ) {
            $this->ajax_response['status'] = true;
            $this->ajax_response['message'] = esc_html( $plugin_name ) . esc_html__( ' - premium plugin not required to install', 'news-elementor' );
            $this->send_ajax_response();
        }
        $this->ajax_response['status'] = false;
        $this->ajax_response['message'] = esc_html__( 'Error while trying to install or active the plugin.', 'news-elementor' );
        $this->send_ajax_response();
    }

    public function send_ajax_response() {
        $json = wp_json_encode( $this->ajax_response );
        echo $json;
        die();
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
}
new Plugin_Installer();