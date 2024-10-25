<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Galaxis
 */

$galaxis_blog_has_right_sidebar = galaxis_blog_has_right_sidebar();

get_header();
?>

	<div class="wrapper u-t-margin<?php echo esc_attr( galaxis_blog_left_sidebar_wrapper_class( $galaxis_blog_has_right_sidebar ) ); ?>">
		<div class="columns columns--gutters">

			<?php
			if ( ! $galaxis_blog_has_right_sidebar ) {
				get_sidebar();
			}
			?>

			<div id="primary" class="content-area columns__md-8 u-b-margin">
				<main id="main" class="site-main">

				<?php
				while ( have_posts() ) {
					the_post();

					get_template_part( 'template-parts/content', 'single' );

					if ( 'post' === get_post_type() ) {
						the_post_navigation(
							array(
								'next_text' => '<div class="gx-card-content gx-card-content--same-md-y"><span class="meta-nav" aria-hidden="true">' . esc_html__( 'Next Post', 'galaxis' ) . '</span> ' .
									'<span class="screen-reader-text">' . esc_html__( 'Next post:', 'galaxis' ) . '</span> <br/>' .
									'<span class="post-title">%title</span></div>',
								'prev_text' => '<div class="gx-card-content gx-card-content--same-md-y"><span class="meta-nav" aria-hidden="true">' . esc_html__( 'Previous Post', 'galaxis' ) . '</span> ' .
									'<span class="screen-reader-text">' . esc_html__( 'Previous post:', 'galaxis' ) . '</span> <br/>' .
									'<span class="post-title">%title</span></div>',
							)
						);
					}

					// If comments are open or we have at least one comment, load up the comment template.
					if ( comments_open() || get_comments_number() ) {
						comments_template();
					}
				}
				?>

				</main><!-- #main -->
			</div><!-- #primary -->

			<?php
			if ( $galaxis_blog_has_right_sidebar ) {
				get_sidebar();
			}
			?>

		</div><!-- .columns -->
	</div><!-- .wrapper -->

<?php
get_footer();
