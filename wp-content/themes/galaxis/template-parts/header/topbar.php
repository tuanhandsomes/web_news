<?php
/**
 * Template part for displaying the topbar
 *
 * @package Galaxis
 */

if ( galaxis_show_topbar() ) {
	?>
	<div class="site-topbar">
		<div class="site-topbar__wrap wrapper">
			<?php get_template_part( 'template-parts/header/topbar-text' ); ?>

			<?php if ( has_nav_menu( 'social' ) ) { ?>
			<nav class="social-navigation" aria-label="<?php esc_attr_e( 'Social Links', 'galaxis' ); ?>">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'social',
						'link_before'    => '<span class="screen-reader-text">',
						'link_after'     => '</span>',
						'depth'          => 1,
						'menu_id'        => 'social-menu',
					)
				);
				?>
			</nav><!-- .social-navigation -->
			<?php } ?>
		</div><!-- .site-topbar__wrap -->
	</div><!-- .site-topbar -->
	<?php
}
