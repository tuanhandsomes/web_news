<?php
/**
 * The sidebar containing the shop widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Galaxis
 */

if ( ! is_active_sidebar( 'sidebar-shop' ) ) {
	return;
}
?>

<div class="sidebar__inner">
	<?php do_action( 'galaxis_before_shop_sidebar' ); ?>

	<aside id="secondary" class="widget-area sidebar-shop h-center-upto-md" aria-label="<?php esc_attr_e( 'Shop Sidebar', 'galaxis' ); ?>">
		<?php dynamic_sidebar( 'sidebar-shop' ); ?>
	</aside><!-- #secondary -->

	<?php do_action( 'galaxis_after_shop_sidebar' ); ?>
</div><!-- .sidebar__inner -->
