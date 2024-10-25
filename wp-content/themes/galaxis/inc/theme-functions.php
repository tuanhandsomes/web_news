<?php
/**
 * Main theme functions
 *
 * @package Galaxis
 */

if ( ! function_exists( 'galaxis_show_excerpt' ) ) {
	/**
	 * Find out if we should show the excerpt or the content.
	 *
	 * @return bool Whether to show the excerpt.
	 */
	function galaxis_show_excerpt() {
		global $post;

		// Check if the more tag is being used.
		$more_tag = apply_filters( 'galaxis_more_tag', strpos( $post->post_content, '<!--more-->' ) );

		$format = ( false !== get_post_format() ) ? get_post_format() : 'standard';

		$show_excerpt = ( 'summary' === get_theme_mod( 'set_blog_content', 'summary' ) );

		$show_excerpt = ( 'standard' !== $format ) ? false : $show_excerpt;

		$show_excerpt = ( $more_tag ) ? false : $show_excerpt;

		$show_excerpt = ( is_search() ) ? true : $show_excerpt;

		return apply_filters( 'galaxis_show_excerpt', $show_excerpt );
	}
}

if ( ! function_exists( 'galaxis_show_site_title_or_tagline' ) ) {
	/**
	 * Whether to show site title or tagline.
	 *
	 * @return bool
	 */
	function galaxis_show_site_title_or_tagline() {
		return ( get_theme_mod( 'set_show_site_title', galaxis_show_site_title_default() ) || get_theme_mod( 'set_show_site_tagline', galaxis_show_site_tagline_default() ) );
	}
}

if ( ! function_exists( 'galaxis_show_site_title' ) ) {
	/**
	 * Whether to show site title.
	 *
	 * @return bool
	 */
	function galaxis_show_site_title() {
		return get_theme_mod( 'set_show_site_title', galaxis_show_site_title_default() );
	}
}

if ( ! function_exists( 'galaxis_show_site_tagline' ) ) {
	/**
	 * Whether to show site tagline.
	 *
	 * @return bool
	 */
	function galaxis_show_site_tagline() {
		return get_theme_mod( 'set_show_site_tagline', galaxis_show_site_tagline_default() );
	}
}

if ( ! function_exists( 'galaxis_branding_area_width_lg' ) ) {
	/**
	 * Branding area minimum width.
	 *
	 * @return int
	 */
	function galaxis_branding_area_width_lg() {
		return absint( get_theme_mod( 'set_branding_area_width_lg', galaxis_branding_area_width_lg_default() ) );
	}
}

if ( ! function_exists( 'galaxis_sticky_sidebar' ) ) {
	/**
	 * Whether to enable sticky sidebar.
	 *
	 * @return bool
	 */
	function galaxis_sticky_sidebar() {
		return get_theme_mod( 'set_sticky_sidebar', galaxis_sticky_sidebar_default() );
	}
}

if ( ! function_exists( 'galaxis_blog_has_right_sidebar' ) ) {
	/**
	 * Find out if the blog posts has right sidebar.
	 *
	 * @return bool Whether the blog posts has right sidebar.
	 */
	function galaxis_blog_has_right_sidebar() {
		return ( 'right' === get_theme_mod( 'set_blog_sidebar', 'right' ) );
	}
}

if ( ! function_exists( 'galaxis_show_topbar' ) ) {
	/**
	 * Find out if we should show the topbar.
	 *
	 * @return bool Whether to show the excerpt.
	 */
	function galaxis_show_topbar() {
		return ( get_theme_mod( 'set_topbar_text', '' ) || has_nav_menu( 'social' ) );
	}
}

/**
 * Get sticky main menu class name.
 *
 * @return string
 */
function galaxis_sticky_main_menu_class() {
	if ( get_theme_mod( 'set_sticky_main_menu', true ) ) {
		return ' site-menu-content--sticky';
	}

	return '';
}

/**
 * Get blog with left sidebar wrapper class name.
 *
 * @param boolean $has_right_sidebar Blog has right sidebar.
 * @return string
 */
function galaxis_blog_left_sidebar_wrapper_class( $has_right_sidebar = true ) {
	if ( ! $has_right_sidebar ) {
		return ' blog-has-left-sidebar';
	}

	return '';
}

if ( ! function_exists( 'galaxis_site_info_allowed_tags' ) ) {
	/**
	 * Get allowed tags for site info.
	 * Used for copyright and topbar text.
	 *
	 * @return string
	 */
	function galaxis_site_info_allowed_tags() {
		return array(
			'span'   => array( 'class' => array() ),
			'i'      => array( 'class' => array() ),
			'br'     => array(),
			'em'     => array(),
			'strong' => array(),
			'a'      => array(
				'href'  => array(),
				'title' => array(),
				'rel'   => array(),
				'class' => array(),
			),
		);
	}
}

/**
 * Check if boxed header.
 *
 * @return bool
 */
function galaxis_is_boxed_header() {
	return get_theme_mod( 'set_boxed_header', false );
}

/**
 * Check if boxed footer.
 *
 * @return bool
 */
function galaxis_is_boxed_footer() {
	return get_theme_mod( 'set_boxed_footer', false );
}

/**
 * Get copyright text.
 *
 * @return array Copyright text.
 */
function galaxis_copyright() {
	return get_theme_mod( 'set_copyright', galaxis_copyright_default() );
}

/**
 * Get footer block area settings.
 *
 * @return array Footer block area settings.
 */
function galaxis_footer_block() {
	return wp_parse_args(
		get_theme_mod( 'set_footer_block', array() ),
		galaxis_footer_block_defaults()
	);
}

/**
 * Get theme author URL.
 * Used in footer credit link.
 *
 * @return string
 */
function galaxis_author_url() {
	return 'https://scriptstown.com/';
}

/**
 * Get upsell detail URL.
 *
 * @return string
 */
function galaxis_upsell_detail_url() {
	return 'https://scriptstown.com/wordpress-themes/galaxis-premium-wordpress-theme/';
}

/**
 * Get upsell buy URL.
 *
 * @return string
 */
function galaxis_upsell_buy_url() {
	return 'https://scriptstown.com/account/signup/galaxis-premium-wordpress-theme';
}

/**
 * Get FAQ URL.
 *
 * @return string
 */
function galaxis_faq_url() {
	return 'https://scriptstown.com/wordpress-themes/galaxis-wordpress-theme/#faq';
}
