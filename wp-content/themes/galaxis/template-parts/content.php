<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Galaxis
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'gx-card u-b-margin' ); ?>>

	<?php galaxis_post_thumbnail(); ?>

	<div class="gx-card-content">

		<header class="entry-header">
			<?php
			galaxis_post_categories();

			the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );

			if ( 'post' === get_post_type() ) {
				?>
			<div class="entry-meta">
				<?php
				galaxis_posted_by();
				galaxis_posted_on();
				galaxis_post_comments();
				?>
			</div><!-- .entry-meta -->
				<?php
			}
			?>
		</header><!-- .entry-header -->

		<div class="entry-content">
			<?php
			if ( galaxis_show_excerpt() ) {
				the_excerpt();
			} else {
				the_content();

				wp_link_pages(
					array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'galaxis' ),
						'after'  => '</div>',
					)
				);
			}
			?>
		</div><!-- .entry-content -->

		<?php if ( get_edit_post_link() ) { ?>
		<footer class="entry-footer">
			<?php galaxis_edit_post_link(); ?>
		</footer><!-- .entry-footer -->
		<?php } ?>

	</div><!-- .gx-card-content -->

</article><!-- #post-<?php the_ID(); ?> -->
