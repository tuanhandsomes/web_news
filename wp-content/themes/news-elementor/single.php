<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
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

	if( ! $single_rendered ) :
?>	
	<div class="theme-container">
		<main id="primary" class="site-main">
			<div class="primary-content">
				<div class="nekit-single-wrap">
					<?php
						while ( have_posts() ) :
							the_post();

							get_template_part( 'template-parts/content', 'single' );

							the_post_navigation(
								array(
									'prev_text' => '<span class="nav-subtitle">' . esc_html__( 'Previous:', 'news-elementor' ) . '</span> <span class="nav-title">%title</span>',
									'next_text' => '<span class="nav-subtitle">' . esc_html__( 'Next:', 'news-elementor' ) . '</span> <span class="nav-title">%title</span>',
								)
							);

							// If comments are open or we have at least one comment, load up the comment template.
							if ( comments_open() || get_comments_number() ) :
								comments_template();
							endif;

						endwhile; // End of the loop.
					?>
				</div>
			</div>
		</main><!-- #main -->
	</div>
	<?php
	endif;

get_footer();