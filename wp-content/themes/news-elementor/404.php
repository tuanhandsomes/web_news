<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package News Elementor
 */

get_header();

	if( did_action( 'elementor/loaded' ) && class_exists( 'Nekit_Render_Templates_Html' ) ) :
		$Nekit_render_templates_html = new Nekit_Render_Templates_Html();
		if( $Nekit_render_templates_html->is_template_available('404') ) {
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
		<main id="primary" class="site-main">
			<section class="error-404 not-found">
				<header class="page-header">
					<h2><?php esc_html_e('404', 'news-elementor'); ?></h2>
					<h1 class="page-title"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'news-elementor' ); ?></h1>
				</header><!-- .page-header -->

				<div class="page-content">
					<p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'news-elementor' ); ?></p>
						<?php
							get_search_form();
							//the_widget( 'WP_Widget_Recent_Posts' );
						?>

						<?php
							/* translators: %1$s: smiley */
							// $news_elementor_archive_content = '<p>' . sprintf( esc_html__( 'Try looking in the monthly archives. %1$s', 'news-elementor' ), convert_smilies( ':)' ) ) . '</p>';
							// the_widget( 'WP_Widget_Archives', 'dropdown=1', "after_title=</h2>$news_elementor_archive_content" );

							// the_widget( 'WP_Widget_Tag_Cloud' );
						?>
				</div><!-- .page-content -->
			</section><!-- .error-404 -->
		</main><!-- #main -->
<?php
	endif;
	
get_footer();