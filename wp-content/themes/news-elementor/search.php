<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package News Elementor
 */

get_header();

	if( did_action( 'elementor/loaded' ) && class_exists( 'Nekit_Render_Templates_Html' ) ) :
		$Nekit_render_templates_html = new Nekit_Render_Templates_Html();
		if( $Nekit_render_templates_html->is_template_available('archive') ) {
			$search_rendered = true;
			echo $Nekit_render_templates_html->current_builder_template();
		} else {
			$search_rendered = false;
		}
	else :
		$search_rendered = false;
	endif;
	
	if( ! $search_rendered ) : // ! $search_rendered
?>
		<main id="primary" class="site-main">
			<?php
				if ( have_posts() ) :
			?>
					<header class="page-header">
						<h1 class="page-title">
							<?php
							/* translators: %s: search query. */
							printf( esc_html__( 'Search Results for: %s', 'news-elementor' ), '<span>' . get_search_query() . '</span>' );
							?>
						</h1>
					</header><!-- .page-header -->

					<?php
					/* Start the Loop */
					while ( have_posts() ) :
						the_post();

						/**
						 * Run the loop for the search to output the results.
						 * If you want to overload this in a child theme then include a file
						 * called content-search.php and that will be used instead.
						 */
						get_template_part( 'template-parts/content', 'search' );

					endwhile;

					the_posts_navigation();

				else :

					get_template_part( 'template-parts/content', 'none' );

				endif;
			?>
		</main><!-- #main -->

<?php
		get_sidebar();
	endif;

get_footer();