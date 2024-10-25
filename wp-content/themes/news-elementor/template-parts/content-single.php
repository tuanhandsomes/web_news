<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package News Elementor
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php news_elementor_post_thumbnail(); ?>

	<div class="content-wrap">

		<header class="entry-header">
			<?php
			if ( is_singular() ) :
				the_title( '<h1 class="entry-title">', '</h1>' );
			else :
				the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
			endif;
	
			if ( 'post' === get_post_type() ) :
				?>
				<div class="entry-meta">
					<?php
					news_elementor_posted_on();
					news_elementor_posted_by();
					?>
				</div><!-- .entry-meta -->
			<?php endif; ?>
		</header><!-- .entry-header -->
		<div class="entry-content">
			<?php
				the_content();
	
				wp_link_pages(
					array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'news-elementor' ),
						'after'  => '</div>',
					)
				);
			?>
		</div><!-- .entry-content -->
	</div>
</article><!-- #post-<?php the_ID(); ?> -->

