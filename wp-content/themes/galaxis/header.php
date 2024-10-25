<?php
/**
 * The header for this theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Galaxis
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<?php
if ( function_exists( 'wp_body_open' ) ) {
	wp_body_open();
} else {
	do_action( 'wp_body_open' );
}
?>

<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'galaxis' ); ?></a>

	<header id="header" class="site-header">
		<?php
		if ( galaxis_is_boxed_header() ) {
			echo '<div class="wrapper">';
		}

		do_action( 'galaxis_after_header_start' );

		get_template_part( 'template-parts/header/topbar' );
		get_template_part( 'template-parts/header/main-menu' );

		do_action( 'galaxis_before_header_end' );

		if ( galaxis_is_boxed_header() ) {
			echo '</div>';
		}
		?>
	</header><!-- #header -->

	<div id="content" class="site-content">
