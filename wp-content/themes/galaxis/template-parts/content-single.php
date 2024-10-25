<?php
/**
 * Template part for displaying single posts
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

			the_title( '<h1 class="entry-title">', '</h1>' );

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
			the_content();

			wp_link_pages(
				array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'galaxis' ),
					'after'  => '</div>',
				)
			);
			?>
		</div><!-- .entry-content -->

		<footer class="entry-footer">
			<?php galaxis_entry_footer(); ?>
		</footer><!-- .entry-footer -->

	</div><!-- .gx-card-content -->

</article><!-- #post-<?php the_ID(); ?> -->
