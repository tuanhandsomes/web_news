<?php
/**
 * Template part for displaying the footer text and menu.
 *
 * @package Galaxis
 */

?>

<div class="site-footer-section site-footer__text">
	<div class="wrapper">
		<div class="columns columns--gutters-large v-center-mdl">

			<div class="columns__md-4 columns__md-4--larger">
				<?php get_template_part( 'template-parts/footer/copyright' ); ?>
			</div>

			<?php if ( has_nav_menu( 'footer' ) ) { ?>
			<div class="columns__md-8 columns__md-8--smaller">
				<nav class="footer-menu" aria-label="<?php esc_attr_e( 'Footer Links', 'galaxis' ); ?>">
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'footer',
							'depth'          => 1,
							'menu_id'        => 'footer-menu',
						)
					);
					?>
				</nav>
			</div>
			<?php } ?>

		</div>
	</div>
</div>
