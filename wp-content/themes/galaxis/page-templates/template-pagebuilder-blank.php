<?php
/**
 * Template Name: Page builder blank
 *
 * @package Galaxis
 */

galaxis_no_content_get_header();

do_action( 'galaxis_page_builder_blank_before_content' );

while ( have_posts() ) {
	the_post();

	get_template_part( 'template-parts/content', 'pagebuilder' );
}

do_action( 'galaxis_page_builder_blank_after_content' );

galaxis_no_content_get_footer();
