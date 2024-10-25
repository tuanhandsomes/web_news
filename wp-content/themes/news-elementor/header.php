<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package News Elementor
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'news-elementor' ); ?></a>
	<?php
		if( did_action( 'elementor/loaded' ) && class_exists( 'Nekit_Render_Templates_Html' ) ) :
			$Nekit_render_templates_html = new Nekit_Render_Templates_Html();
			if( $Nekit_render_templates_html->is_template_available('header') ) {
				$header_rendered = true;
				echo $Nekit_render_templates_html->current_builder_template();
			} else {
				$header_rendered = false;
			}
		else :
			$header_rendered = false;
		endif;

		if( ! $header_rendered ) :
	?>
		<div class="elementor-section elementor-section-boxed theme-container">
			<header id="masthead" class="site-header elementor-container">
				<div class="site-branding">
					<?php
					the_custom_logo();
					if ( is_front_page() && is_home() ) :
						?>
						<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
						<?php
					else :
						?>
						<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
						<?php
					endif;
					$news_elementor_description = get_bloginfo( 'description', 'display' );
					if ( $news_elementor_description || is_customize_preview() ) :
						?>
						<p class="site-description"><?php echo $news_elementor_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
					<?php endif; ?>
				</div><!-- .site-branding -->

				<nav id="site-navigation" class="main-navigation">
					<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'MENU', 'news-elementor' ); ?></button>
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'menu-1',
							'menu_id'        => 'primary-menu'
						)
					);
					?>
				</nav><!-- #site-navigation -->
			</header><!-- #masthead -->
		</div>
		<?php
			endif;