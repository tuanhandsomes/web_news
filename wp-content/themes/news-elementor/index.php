<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package News Elementor
 */

get_header();

	if( did_action( 'elementor/loaded' ) && class_exists( 'Nekit_Render_Templates_Html' ) ) :
		$Nekit_render_templates_html = new Nekit_Render_Templates_Html();
		if( $Nekit_render_templates_html->is_template_available('archive') ) {
			$archive_rendered = true;
			echo $Nekit_render_templates_html->current_builder_template();
		} else {
			$archive_rendered = false;
		}
	else :
		$archive_rendered = false;
	endif;

	if( ! $archive_rendered ) : // ! $archive_rendered
?>
	<div class="theme-container">
		<main id="primary" class="site-main">
			<div class="nekit-container">
				<div class="row">
					<div class="primary-content">
						<div class="nekit-news-list-wrap">
							<?php
								if ( have_posts() ) :

									if ( is_home() && ! is_front_page() ) :
										?>
										<header>
											<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
										</header>
										<?php
									endif;

									/* Start the Loop */
									while ( have_posts() ) :
										the_post();

										/*
										* Include the Post-Type-specific template for the content.
										* If you want to override this in a child theme, then include a file
										* called content-___.php (where ___ is the Post Type name) and that will be used instead.
										*/
										get_template_part( 'template-parts/content', get_post_type() );

									endwhile;

									the_posts_navigation();

								else :

									get_template_part( 'template-parts/content', 'none' );

								endif;
							?>
						</div>
						<div class="secondary-sidebar"><?php get_sidebar(); ?></div>
					</div>
				</div>
			</div>
		</main><!-- #main -->
	</div>
<?php
	endif;

get_footer();