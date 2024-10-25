<?php
/**
 * Galaxis functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Galaxis
 */

define( 'GALAXIS_VERSION', '1.8.3' );

if ( ! function_exists( 'galaxis_setup' ) ) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 */
	function galaxis_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Galaxis, use a find and replace
		 * to change 'galaxis' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'galaxis', get_template_directory() . '/languages/' );

		// This theme uses wp_nav_menu() in three location.
		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary', 'galaxis' ),
				'footer' => esc_html__( 'Footer Menu', 'galaxis' ),
				'social' => esc_html__( 'Social Links Menu', 'galaxis' ),
			)
		);

		// Set content-width.
		$GLOBALS['content_width'] = apply_filters( 'galaxis_content_width', 740 );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			apply_filters(
				'galaxis_html5_args',
				array(
					'navigation-widgets',
					'search-form',
					'comment-form',
					'comment-list',
					'gallery',
					'caption',
					'style',
					'script',
				)
			)
		);

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

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 150,
				'width'       => 150,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'galaxis_custom_background_args',
				array( 'default-color' => 'f4f4f4' )
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		// Add support for wide alignment.
		add_theme_support( 'align-wide' );

		// Add support for responsive embedded content.
		add_theme_support( 'responsive-embeds' );

		// Add support for custom line height controls.
		add_theme_support( 'custom-line-height' );

		// Add theme support for padding controls.
		add_theme_support( 'custom-spacing' );
	}
}
add_action( 'after_setup_theme', 'galaxis_setup' );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function galaxis_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Main Sidebar', 'galaxis' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'galaxis' ),
			'before_widget' => '<section id="%1$s" class="widget gx-card-content u-b-margin %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		)
	);
}
add_action( 'widgets_init', 'galaxis_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function galaxis_scripts() {
	// Enqueue Google Fonts.
	wp_enqueue_style( 'galaxis-fonts', galaxis_fonts_url(), array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters

	// Theme script.
	wp_enqueue_script( 'galaxis-script', get_template_directory_uri() . '/js/script.min.js', array(), GALAXIS_VERSION, true );

	// Theme stylesheet.
	wp_enqueue_style( 'galaxis-style', get_template_directory_uri() . '/style.min.css', array(), GALAXIS_VERSION );
	wp_style_add_data( 'galaxis-style', 'rtl', 'replace' );

	// Add output of customizer settings as inline style.
	wp_add_inline_style( 'galaxis-style', galaxis_get_customizer_css() );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( galaxis_sticky_sidebar() ) {
		// Resize observer polyfill.
		wp_enqueue_script( 'resize-observer-polyfill', get_template_directory_uri() . '/js/ResizeObserver.min.js', array(), '1.5.1', true );

		// Sticky sidebar.
		wp_enqueue_script( 'sticky-sidebar', get_template_directory_uri() . '/js/sticky-sidebar.min.js', array(), '1.1.1', true );

		wp_add_inline_script(
			'sticky-sidebar',
			'try{new StickySidebar(".site-content > .wrapper > .columns > .columns__md-4",{topSpacing:100,bottomSpacing:0,containerSelector:".site-content > .wrapper > .columns",innerWrapperSelector:".sidebar__inner",minWidth:799});}catch(e){}'
		);
	}
}
add_action( 'wp_enqueue_scripts', 'galaxis_scripts' );

/**
 * Register custom fonts.
 */
function galaxis_fonts_url() {
	$fonts_url = apply_filters( 'galaxis_fonts_url', 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;1,400;1,600&family=Poppins:ital@0;1&display=swap' );

	$fonts_url = esc_url_raw( $fonts_url );

	require_once get_template_directory() . '/classes/class-wptt-webfont-loader.php';
	return wptt_get_webfont_url( $fonts_url );
}

/**
 * Enqueue block editor assets.
 */
function galaxis_block_assets() {
	if ( function_exists( '\get_current_screen' ) ) {
		$current_screen = get_current_screen();
		if ( $current_screen && method_exists( $current_screen, 'is_block_editor' ) && $current_screen->is_block_editor() && ! in_array( $current_screen->id, array( 'widgets', 'nav-menus' ), true ) ) {
			wp_enqueue_style( 'galaxis-block-editor', get_template_directory_uri() . '/inc/block-editor.css', array(), GALAXIS_VERSION );
		}
	}
}
add_filter( 'enqueue_block_assets', 'galaxis_block_assets', 10, 2 );

/**
 * Enqueue files for the TGM Plugin Activation library.
 */
require get_template_directory() . '/classes/class-tgm-plugin-activation.php';
require get_template_directory() . '/inc/recommended-plugins.php';

/**
 * Layout functions.
 */
require get_template_directory() . '/inc/layout-functions.php';

/**
 * Main theme functions.
 */
require get_template_directory() . '/inc/theme-functions.php';

/**
 * Theme menu page.
 */
require get_template_directory() . '/inc/theme-page.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Theme defaults.
 */
require get_template_directory() . '/inc/defaults.php';

/**
 * Builds dynamic CSS class.
 */
require get_template_directory() . '/classes/class-galaxis-css.php';

/**
 * Custom CSS output.
 */
require get_template_directory() . '/inc/css-output.php';

/**
 * Upsell section class.
 */
require get_template_directory() . '/classes/class-galaxis-upsell-section.php';

/**
 * Upsell control class.
 */
require get_template_directory() . '/classes/class-galaxis-upsell-control.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Widgets editor.
 */
require get_template_directory() . '/inc/widgets-editor.php';

/**
 * SVG Icons class.
 */
require get_theme_file_path( '/classes/class-galaxis-svg-icons.php' );

/**
 * SVG Icons related functions.
 */
require get_template_directory() . '/inc/icon-functions.php';

/**
 * Primary menu walker class.
 */
require get_template_directory() . '/classes/class-galaxis-primary-walker-nav-menu.php';

/**
 * Load Jetpack compatibility file.
 */
if ( class_exists( '\Jetpack' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Load WooCommerce compatibility file.
 */
if ( class_exists( '\WooCommerce' ) ) {
	require get_template_directory() . '/inc/woocommerce.php';
}
