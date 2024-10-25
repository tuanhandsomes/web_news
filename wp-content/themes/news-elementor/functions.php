<?php
/**
 * News Elementor functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package News Elementor
 */

if ( ! defined( 'NEWS_ELEMENTOR_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( 'NEWS_ELEMENTOR_VERSION', '1.0.2' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function news_elementor_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on News Elementor, use a find and replace
	 * to change 'news-elementor' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'news-elementor', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'news-elementor' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'news_elementor_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'news_elementor_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function news_elementor_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'news_elementor_content_width', 640 );
}
add_action( 'after_setup_theme', 'news_elementor_content_width', 0 );

/**
 * Enqueue scripts and styles.
 */
function news_elementor_scripts() {
	wp_enqueue_style( 'news-elementor-style', get_stylesheet_uri(), array(), NEWS_ELEMENTOR_VERSION );
	wp_style_add_data( 'news-elementor-style', 'rtl', 'replace' );

	wp_enqueue_script( 'news-elementor-navigation', get_template_directory_uri() . '/js/navigation.js', array( 'jquery' ), NEWS_ELEMENTOR_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'news_elementor_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

require get_template_directory() . '/compatibility/elementor/compatibility.php';
News_Elementor\Elementor_Compatibility\Admin_Init::instance();

/**
 * Function to enqueue style for admin
 */
function news_elementor_admin_scripts() {
	wp_register_style( 'news-elementor-admin', get_template_directory_uri() . '/admin/admin.css', [], '1.0.0' );
	wp_enqueue_style( 'news-elementor-admin' );
}
add_action( 'admin_enqueue_scripts', 'news_elementor_admin_scripts' );

if ( ! function_exists('news_elementor_create_elementor_kit') ) {
	/**
	 * Create Elementor default kit
	 * 
	 * @since 1.0.2
	 */
	function news_elementor_create_elementor_kit() {
		if (!did_action('elementor/loaded')) {
			return;
		}
		$kit = Elementor\Plugin::$instance->kits_manager->get_active_kit();
		if (!$kit->get_id()) {
			$created_default_kit = Elementor\Plugin::$instance->kits_manager->create_default();
			update_option('elementor_active_kit', $created_default_kit);
		}
	}
	add_action( 'init', 'news_elementor_create_elementor_kit' );
}