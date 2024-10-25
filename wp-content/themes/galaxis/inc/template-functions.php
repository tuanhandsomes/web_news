<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Galaxis
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function galaxis_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar-galaxis when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) || ( is_page() && ! is_page_template( array( 'page-templates/template-left-sidebar.php', 'page-templates/template-right-sidebar.php', 'page-templates/template-no-title-left-sidebar.php', 'page-templates/template-no-title-right-sidebar.php' ) ) ) ) {
		$classes[] = 'no-sidebar-galaxis';
	}

	return $classes;
}
add_filter( 'body_class', 'galaxis_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function galaxis_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'galaxis_pingback_header' );

if ( ! function_exists( 'galaxis_excerpt_more' ) ) {
	/**
	 * Change the excerpt more string.
	 *
	 * @param string $more The string shown within the more link.
	 * @return string
	 */
	function galaxis_excerpt_more( $more ) {
		if ( is_admin() ) {
			return $more;
		}

		$more = ( ' [...] <p class="more-link-container"><a href="' . esc_url( get_permalink() ) . '" class="more-link">' . sprintf(
			wp_kses(
				/* translators: %s: Name of current post. Only visible to screen readers */
				__( 'Read More<span class="screen-reader-text"> "%s"</span>', 'galaxis' ),
				array(
					'span' => array(
						'class' => array(),
					),
				)
			),
			wp_kses_post( get_the_title() )
		) . '</a></p>' );

		return apply_filters( 'galaxis_excerpt_more', $more );
	}
	add_filter( 'excerpt_more', 'galaxis_excerpt_more' );
}

if ( ! function_exists( 'galaxis_content_more' ) ) {
	/**
	 * Change the content more string.
	 *
	 * @param string $more The string shown within the more link.
	 * @return string
	 */
	function galaxis_content_more( $more ) {
		if ( is_admin() ) {
			return $more;
		}

		$more = ( '<p class="more-link-container"><a href="' . esc_url( get_permalink() . apply_filters( 'galaxis_more_jump', '#more-' . get_the_ID() ) ) . '" class="more-link">' . sprintf(
			wp_kses(
				/* translators: %s: Name of current post. Only visible to screen readers */
				__( 'Read More<span class="screen-reader-text"> "%s"</span>', 'galaxis' ),
				array(
					'span' => array(
						'class' => array(),
					),
				)
			),
			wp_kses_post( get_the_title() )
		) . '</a></p>' );

		return apply_filters( 'galaxis_content_more', $more );
	}
	add_filter( 'the_content_more_link', 'galaxis_content_more' );
}
