<?php
/**
 * Template part for displaying the pattern blocks in the footer.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Galaxis
 */

$galaxis_footer_block = galaxis_footer_block();

if ( ( is_front_page() && ! $galaxis_footer_block['show_on_front_page'] ) ||
	( is_home() && ! $galaxis_footer_block['show_on_blog_page'] ) ||
	( is_archive() && ! $galaxis_footer_block['show_on_archives'] ) ||
	( is_404() ) ||
	( is_search() && ! $galaxis_footer_block['show_on_archives'] ) ||
	( is_single() && ! $galaxis_footer_block['show_on_posts'] ) ||
	( ( ! is_front_page() && is_page() ) && ! $galaxis_footer_block['show_on_pages'] ) ) {
	return;
}

$galaxis_footer_block_query = new \WP_Query(
	array(
		'post_type'     => 'wp_block',
		'no_found_rows' => true,
		'post__in'      => empty( $galaxis_footer_block['post_id'] ) ? array( 0 ) : array( $galaxis_footer_block['post_id'] ),
	)
);

if ( $galaxis_footer_block_query->have_posts() ) {
	?>
	<div class="gx-footer-block-area">
	<?php
	if ( ! $galaxis_footer_block['full_width'] ) {
		?>
		<div class="wrapper">
		<?php
	}

	while ( $galaxis_footer_block_query->have_posts() ) {
		$galaxis_footer_block_query->the_post();
		?>
		<div class="entry-content">
			<?php the_content(); ?>
		</div><!-- .entry-content -->
		<?php
	}

	wp_reset_postdata();

	if ( ! $galaxis_footer_block['full_width'] ) {
		?>
		</div>
		<?php
	}
	?>
	</div>
	<?php
}
