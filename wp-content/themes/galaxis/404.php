<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
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

					<section class="error-404 not-found gx-card-content">

						<header class="page-header">
							<h1 class="page-title">
								<?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'galaxis' ); ?>
							</h1>
						</header><!-- .page-header -->

						<div class="page-content">
							<p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'galaxis' ); ?></p>

							<?php
							get_search_form();

							the_widget( 'WP_Widget_Recent_Posts' );

							the_widget( 'WP_Widget_Tag_Cloud' );
							?>
						</div><!-- .page-content -->

					</section><!-- .error-404 -->

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
