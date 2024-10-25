<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Galaxis
 */

?>
	</div><!-- #content -->

	<footer id="footer" class="site-footer">
		<?php
		if ( galaxis_is_boxed_footer() ) {
			echo '<div class="wrapper">';
		}

		do_action( 'galaxis_after_footer_start' );

		get_template_part( 'template-parts/footer/block-area' );
		get_template_part( 'template-parts/footer/menu-text' );

		do_action( 'galaxis_before_footer_end' );

		if ( galaxis_is_boxed_footer() ) {
			echo '</div>';
		}
		?>
	</footer><!-- #footer -->

	<?php if ( get_theme_mod( 'set_back_to_top', true ) ) { ?>
	<a href="#" class="back-to-top"><span class="screen-reader-text"><?php esc_html_e( 'Back to Top', 'galaxis' ); ?></span></a>
	<?php } ?>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
