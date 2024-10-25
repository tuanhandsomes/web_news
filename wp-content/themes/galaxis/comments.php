<?php
/**
 * The template for displaying comments
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Galaxis
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}
?>

<div id="comments" class="comments-area">

	<?php
	if ( have_comments() ) {
		?>
		<h2 class="comments-title gx-card-content gx-card-content--same-md-y">
			<?php
			$comments_number = get_comments_number();
			printf(
				wp_kses(
					/* translators: 1: number of comments, 2: post title */
					_nx(
						'Comment (%1$s) <span class="screen-reader-text">on "%2$s"</span>',
						'Comments (%1$s) <span class="screen-reader-text">on "%2$s"</span>',
						$comments_number,
						'comments title',
						'galaxis'
					),
					array( 'span' => array( 'class' => array() ) )
				),
				esc_html( number_format_i18n( $comments_number ) ),
				esc_html( get_the_title() )
			);
			?>
		</h2><!-- .comments-title -->

		<?php the_comments_navigation(); ?>

		<ol class="comment-list">
			<?php
			wp_list_comments(
				array(
					'style'       => 'ol',
					'short_ping'  => true,
					'avatar_size' => 56,
				)
			);
			?>
		</ol><!-- .comment-list -->

		<?php
		the_comments_navigation();

		// If comments are closed and there are comments, let's leave a little note, shall we?
		if ( ! comments_open() ) {
			?>
			<p class="no-comments"><?php esc_html_e( 'Comments are closed.', 'galaxis' ); ?></p>
			<?php
		}
	} // Check for have_comments().

	comment_form(
		array( 'class_form' => 'comment-form gx-card-content gx-card-content--same-md-y u-b-margin' )
	);
	?>

</div><!-- #comments -->
