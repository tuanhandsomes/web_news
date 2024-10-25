<?php
/**
 * The template for displaying archive pages
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
							?>
									<header class="page-header">
										<?php
										the_archive_title( '<h1 class="page-title">', '</h1>' );
										the_archive_description( '<div class="archive-description">', '</div>' );
										?>
									</header><!-- .page-header -->

									<?php
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
		get_sidebar();
	endif;
	
get_footer();
