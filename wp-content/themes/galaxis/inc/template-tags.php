<?php
/**
 * Custom template tags for this theme
 *
 * @package Galaxis
 */

if ( ! function_exists( 'galaxis_post_thumbnail' ) ) {
	/**
	 * Displays an optional post thumbnail.
	 *
	 * Wraps the post thumbnail in an anchor element on index views, or a div
	 * element when on single views.
	 */
	function galaxis_post_thumbnail() {
		if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
			return;
		}

		if ( is_singular() ) {
			?>
			<figure class="post-thumbnail">
				<?php the_post_thumbnail( 'post-thumbnail', array( 'class' => 'gx-card-image' ) ); ?>
			</figure>
			<?php
		} else {
			?>
			<figure class="post-thumbnail">
				<a href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
					<?php
					the_post_thumbnail(
						'post-thumbnail',
						array(
							'class' => 'gx-card-image',
							'alt'   => the_title_attribute(
								array(
									'echo' => false,
								)
							),
						)
					);
					?>
				</a>
			</figure>
			<?php
		}
	}
}

if ( ! function_exists( 'galaxis_post_categories' ) ) {
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function galaxis_post_categories() {
		// Hide category text for pages and check if post has category.
		if ( 'post' === get_post_type() && has_category() ) {
			?>
			<span class="cat-links">
				<span class="screen-reader-text"><?php esc_html_e( 'Posted in:', 'galaxis' ); ?></span>
				<?php the_category( esc_html__( ', ', 'galaxis' ) ); ?>
			</span>
			<?php
		}
	}
}

if ( ! function_exists( 'galaxis_entry_footer' ) ) {
	/**
	 * Prints HTML with meta information for the tags and edit link for the post.
	 */
	function galaxis_entry_footer() {
		// Hide tag text for pages and check if post has tag.
		if ( 'post' === get_post_type() && has_tag() ) {
			?>
			<span class="tag-links">
				<span class="screen-reader-text"><?php esc_html_e( 'Tags:', 'galaxis' ); ?></span>
				<?php the_tags( '', esc_html__( ', ', 'galaxis' ), '' ); ?>
			</span>
			<?php
		}

		galaxis_edit_post_link();
	}
}

if ( ! function_exists( 'galaxis_edit_post_link' ) ) {
	/**
	 * Prints HTML for the edit post link.
	 */
	function galaxis_edit_post_link() {
		edit_post_link(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Edit <span class="screen-reader-text">%s</span>', 'galaxis' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			),
			'<span class="edit-link">',
			'</span>'
		);
	}
}

if ( ! function_exists( 'galaxis_post_comments' ) ) {
	/**
	 * Prints HTML with meta information for comments.
	 */
	function galaxis_post_comments() {
		if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			?>
			<span class="comments-link">
			<?php
			comments_popup_link(
				sprintf(
					wp_kses(
						/* translators: %s: post title */
						__( 'Leave a Comment<span class="screen-reader-text"> on %s</span>', 'galaxis' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					get_the_title()
				),
				false,
				false,
				'text--secondary'
			);
			?>
			</span>
			<?php
		}
	}
}

if ( ! function_exists( 'galaxis_posted_on' ) ) {
	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function galaxis_posted_on() {
		?>
		<span class="posted-on">
			<a href="<?php the_permalink(); ?>" rel="bookmark">
			<?php
			if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
				printf(
					'<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>',
					esc_attr( get_the_date( DATE_W3C ) ),
					esc_html( get_the_date() ),
					esc_attr( get_the_modified_date( DATE_W3C ) ),
					esc_html( get_the_modified_date() )
				);
			} else {
				printf(
					'<time class="entry-date published updated" datetime="%1$s">%2$s</time>',
					esc_attr( get_the_date( DATE_W3C ) ),
					esc_html( get_the_date() )
				);
			}
			?>
			</a>
		</span>
		<?php
	}
}

if ( ! function_exists( 'galaxis_posted_by' ) ) {
	/**
	 * Prints HTML with meta information for the current author.
	 */
	function galaxis_posted_by() {
		?>
		<span class="byline">
			<?php if ( get_avatar( get_the_author_meta( 'ID' ), 48 ) ) { ?>
			<span class="author-avatar">
				<?php echo get_avatar( get_the_author_meta( 'ID' ), 48 ); ?>
			</span>
			<?php } ?>
			<span class="author-meta">
			<?php
			printf(
				/* translators: %s: post author */
				esc_html_x( 'Written by %s', 'post author', 'galaxis' ),
				'<a class="author_meta__url" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a>'
			)
			?>
			</span>
		</span>
		<?php
	}
}
