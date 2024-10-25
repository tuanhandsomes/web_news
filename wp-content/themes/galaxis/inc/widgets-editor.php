<?php
/**
 * Theme widgets editor.
 *
 * @package Galaxis
 */

if ( is_admin() && isset( $GLOBALS['pagenow'] ) && in_array( $GLOBALS['pagenow'], array( 'widgets.php', 'nav-menus.php' ), true ) ) {
	add_filter( 'body_class', 'galaxis_widgets_body_classes' );
	add_action( 'wp_print_styles', 'galaxis_widgets_print_styles' );
	add_action( 'wp_enqueue_scripts', 'galaxis_widgets_enqueue_scripts', 11 );
}

if ( ! function_exists( 'galaxis_widgets_body_classes' ) ) {
	/**
	 * Adds custom classes to the array of body classes.
	 *
	 * @param array $classes Classes for the body element.
	 * @return array
	 */
	function galaxis_widgets_body_classes( $classes ) {
		$classes[] = 'galaxis-widgets-editor';

		return $classes;
	}
}

if ( ! function_exists( 'galaxis_widgets_print_styles' ) ) {
	/**
	 * Remove theme inline style.
	 */
	function galaxis_widgets_print_styles() {
		if ( wp_style_is( 'galaxis-style', 'enqueued' ) ) {
			wp_style_add_data( 'galaxis-style', 'after', '' );
		}
	}
}

if ( ! function_exists( 'galaxis_widgets_enqueue_scripts' ) ) {
	/**
	 * Enqueue styles and scripts.
	 */
	function galaxis_widgets_enqueue_scripts() {
		wp_enqueue_style( 'galaxis-widgets-editor-legacy-style', get_template_directory_uri() . '/inc/widgets-editor-legacy.css', array(), GALAXIS_VERSION );
	}
}
