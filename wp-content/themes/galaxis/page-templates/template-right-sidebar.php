<?php
/**
 * Template Name: Page with right sidebar
 *
 * @package Galaxis
 */

get_header();
?>

	<div class="wrapper u-t-margin">
		<div class="columns columns--gutters">

			<div id="primary" class="content-area columns__md-8 u-b-margin">
				<main id="main" class="site-main">

				<?php
				while ( have_posts() ) {
					the_post();

					get_template_part( 'template-parts/content', 'page' );

					// If comments are open or we have at least one comment, load up the comment template.
					if ( comments_open() || get_comments_number() ) {
						comments_template();
					}
				}
				?>

				</main><!-- #main -->
			</div><!-- #primary -->

			<?php get_sidebar(); ?>

		</div><!-- .columns -->
	</div><!-- .wrapper -->
<?php
get_footer();
