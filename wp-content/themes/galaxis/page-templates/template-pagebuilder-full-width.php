<?php
/**
 * Template Name: Page builder full width
 *
 * @package Galaxis
 */

get_header();

do_action( 'galaxis_page_builder_full_width_before_content' );

while ( have_posts() ) {
	the_post();

	get_template_part( 'template-parts/content', 'pagebuilder' );
}

do_action( 'galaxis_page_builder_full_width_after_content' );

get_footer();
