<?php
/**
 * Template part for displaying content in page builders templates.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Galaxis
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php the_content(); ?>
</article><!-- #post-<?php the_ID(); ?> -->
