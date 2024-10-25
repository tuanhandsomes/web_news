<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package News Elementor
 */

get_header();

	if( did_action( 'elementor/loaded' ) && class_exists( 'Nekit_Render_Templates_Html' ) ) :
		$Nekit_render_templates_html = new Nekit_Render_Templates_Html();
		if( $Nekit_render_templates_html->is_template_available('single') ) {
			$single_rendered = true;
			echo $Nekit_render_templates_html->current_builder_template();
		} else {
			$single_rendered = false;
		}
	else :
		$single_rendered = false;
	endif;

	if( ! $single_rendered ) : // ! $single_rendered
?>
	<div class="theme-container">
		<main id="primary" class="site-main">
			<?php
				while ( have_posts() ) :
					the_post();

					get_template_part( 'template-parts/content', 'page' );

					// If comments are open or we have at least one comment, load up the comment template.
					if ( comments_open() || get_comments_number() ) :
						comments_template();
					endif;

				endwhile; // End of the loop.
			?>
		</main><!-- #main -->
	</div>
<?php
		get_sidebar();
	endif;
	
get_footer();
