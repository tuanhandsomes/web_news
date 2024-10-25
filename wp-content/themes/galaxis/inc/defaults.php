<?php
/**
 * Sets all of our theme defaults.
 *
 * @package Galaxis
 */

if ( ! function_exists( 'galaxis_get_color_defaults' ) ) {
	/**
	 * Set default options.
	 */
	function galaxis_get_color_defaults() {
		return apply_filters(
			'galaxis_color_option_defaults',
			array(
				'topbar_bg_color'            => '#1291ee',
				'back_to_top_bg_color'       => '#299cf0',
				'back_to_top_hover_bg_color' => '#333333',
				'footer_bg_color'            => '#081d56',
				'selection_bg_color'         => '#2c8cf4',
			)
		);
	}
}

if ( ! function_exists( 'galaxis_show_site_title_default' ) ) {
	/**
	 * Set if site title is shown by default.
	 */
	function galaxis_show_site_title_default() {
		return true;
	}
}

if ( ! function_exists( 'galaxis_show_site_tagline_default' ) ) {
	/**
	 * Set if site tagline is shown by default.
	 */
	function galaxis_show_site_tagline_default() {
		return true;
	}
}

if ( ! function_exists( 'galaxis_branding_area_width_lg_default' ) ) {
	/**
	 * Set default minimum width for branding area.
	 */
	function galaxis_branding_area_width_lg_default() {
		return 33;
	}
}

if ( ! function_exists( 'galaxis_sticky_sidebar_default' ) ) {
	/**
	 * Set if sticky sidebar is enabled by default.
	 */
	function galaxis_sticky_sidebar_default() {
		return true;
	}
}

if ( ! function_exists( 'galaxis_copyright_default' ) ) {
	/**
	 * Set default copyright text.
	 */
	function galaxis_copyright_default() {
		/* translators: 1: current year, 2: blog name, 3: theme name, 4: theme shop URL, 5: theme shop name */
		return sprintf( wp_kses( __( 'Copyright &copy; %1$s %2$s.<br>Theme %3$s by <a href="%4$s" itemprop="url">%5$s</a>.', 'galaxis' ), galaxis_site_info_allowed_tags() ), esc_html( date_i18n( _x( 'Y', 'copyright date format', 'galaxis' ) ) ), get_bloginfo( 'name', 'display' ), esc_html__( 'Galaxis', 'galaxis' ), esc_url( galaxis_author_url() ), esc_html__( 'ScriptsTown', 'galaxis' ) );
	}
}

if ( ! function_exists( 'galaxis_footer_block_defaults' ) ) {
	/**
	 * Set default settings for the footer block area.
	 */
	function galaxis_footer_block_defaults() {
		return array(
			'post_id'            => '',
			'full_width'         => true,
			'show_on_front_page' => true,
			'show_on_blog_page'  => true,
			'show_on_archives'   => false,
			'show_on_posts'      => false,
			'show_on_pages'      => false,
		);
	}
}
