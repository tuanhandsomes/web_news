<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package News Elementor
 */


	if( did_action( 'elementor/loaded' ) && class_exists( 'Nekit_Render_Templates_Html' ) ) :
		$Nekit_render_templates_html = new Nekit_Render_Templates_Html();
		if( $Nekit_render_templates_html->is_template_available('footer') ) {
			$footer_rendered = true;
			echo $Nekit_render_templates_html->current_builder_template();
		} else {
			$footer_rendered = false;
		}
	else :
		$footer_rendered = false;
	endif;

	if( ! $footer_rendered ) :
?>
		<div class="elementor-section elementor-section-boxed theme-container">
			<footer id="colophon" class="site-footer">
				<div class="site-info">
						<?php
						/* translators: %s: CMS name, i.e. WordPress. */
						printf( esc_html__( 'Proudly powered by %s', 'news-elementor' ), 'WordPress' );
						?>
					<span class="sep"> | </span>
						<?php
						/* translators: 1: Theme name, 2: Theme author. */
						printf( esc_html__( 'Theme : %1$s by %2$s', 'news-elementor' ), ' News Elementor', '<a href="https://blazethemes.com/">BlazeThemes</a>' );
						?>
				</div><!-- .site-info -->
			</footer><!-- #colophon -->
		</div>
<?php
	endif;
?>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>