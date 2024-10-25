<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Galaxis
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'gx-card' ); ?>>

	<?php galaxis_post_thumbnail(); ?>

	<div class="gx-card-content">

		<header class="entry-header">
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		</header><!-- .entry-header -->

		<div class="entry-content">
			<?php
			the_content();

			wp_link_pages(
				array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'galaxis' ),
					'after'  => '</div>',
				)
			);
			?>
		</div><!-- .entry-content -->

		<?php if ( get_edit_post_link() ) { ?>
		<footer class="entry-footer">
			<?php galaxis_edit_post_link(); ?>
		</footer><!-- .entry-footer -->
		<?php } ?>

	</div><!-- .gx-card-content -->

</article><!-- #post-<?php the_ID(); ?> -->
