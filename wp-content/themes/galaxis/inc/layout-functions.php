<?php
/**
 * Layout functions for this theme
 *
 * @package Galaxis
 */

if ( ! function_exists( 'galaxis_no_content_get_header' ) ) {
	/**
	 * Header for page builder blank template.
	 */
	function galaxis_no_content_get_header() {
		?>
		<!DOCTYPE html>
		<html <?php language_attributes(); ?>>
		<head>
			<meta charset="<?php bloginfo( 'charset' ); ?>">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link rel="profile" href="https://gmpg.org/xfn/11">

			<?php wp_head(); ?>
		</head>

		<body <?php body_class(); ?>>
		<?php
		do_action( 'galaxis_page_builder_content_body_before' );
	}
}

if ( ! function_exists( 'galaxis_no_content_get_footer' ) ) {
	/**
	 * Footer for page builder blank template.
	 */
	function galaxis_no_content_get_footer() {
		do_action( 'galaxis_page_builder_content_body_after' );

		wp_footer();
		?>
		</body>
		</html>
		<?php
	}
}
