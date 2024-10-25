<?php
/**
 * Theme menu page.
 *
 * @package Galaxis
 */

/**
 * Adds a theme menu page.
 */
function galaxis_create_menu() {
	$galaxis_page = add_theme_page( 'Galaxis', 'Galaxis', 'edit_theme_options', 'galaxis-options', 'galaxis_page' );
	add_action( 'admin_print_styles-' . $galaxis_page, 'galaxis_options_styles' );
}
add_action( 'admin_menu', 'galaxis_create_menu' );

if ( ! function_exists( 'galaxis_page' ) ) {
	/**
	 * Builds the content of the theme page.
	 */
	function galaxis_page() {
		?>
		<div class="wrap">
			<div class="metabox-holder">
				<div class="galaxis-panel">
					<div class="galaxis-container galaxis-title-wrap">
						<div class="galaxis-title">
							<?php
							printf(
								wp_kses(
									/* translators: %s: theme version number */
									_x( 'Galaxis <span>Version %s</span>', 'menu page heading', 'galaxis' ),
									array( 'span' => array() )
								),
								esc_html( GALAXIS_VERSION )
							);
							?>
						</div>
					</div>
				</div>

				<div class="galaxis-container">
					<div class="galaxis-panel">
						<div class="galaxis-panel-content">
							<span class="galaxis-panel-title"><?php esc_html_e( 'Customize Theme', 'galaxis' ); ?></span>
							<p class="description">
								<?php esc_html_e( 'You can customize the theme using the theme options available in the customizer.', 'galaxis' ); ?>
							</p>
						</div>
						<div class="galaxis-panel-actions">
							<a target="_blank" href="<?php echo esc_url( admin_url( 'customize.php' ) ); ?>" class="button"><?php esc_html_e( 'Theme Options', 'galaxis' ); ?></a>
						</div>
					</div>
					<div class="galaxis-panel">
						<div class="galaxis-panel-content">
							<span class="galaxis-panel-title"><?php esc_html_e( 'Menus', 'galaxis' ); ?></span>
							<p class="description">
								<?php esc_html_e( 'You can create a menu and assign it to a menu location. Galaxis comes with three menu locations which include primary menu, footer menu, and social links menu.', 'galaxis' ); ?>
							</p>
						</div>
						<div class="galaxis-panel-actions">
							<a target="_blank" href="<?php echo esc_url( admin_url( 'nav-menus.php' ) ); ?>" class="button"><?php esc_html_e( 'Menus', 'galaxis' ); ?></a>
						</div>
					</div>
					<div class="galaxis-panel">
						<div class="galaxis-panel-content">
							<span class="galaxis-panel-title"><?php esc_html_e( 'Theme Widgets', 'galaxis' ); ?></span>
							<p class="description">
								<?php esc_html_e( 'You can drag and drop widgets to the widget area. Galaxis comes with a main sidebar.', 'galaxis' ); ?>
							</p>
						</div>
						<div class="galaxis-panel-actions">
							<a target="_blank" href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>" class="button"><?php esc_html_e( 'Widgets', 'galaxis' ); ?></a>
						</div>
					</div>
					<div class="galaxis-panel galaxis-panel--highlight">
						<div class="galaxis-panel-content">
							<span class="galaxis-panel-title"><?php esc_html_e( 'Premium Version', 'galaxis' ); ?></span>
							<p class="description">
								<?php esc_html_e( 'Galaxis Premium comes with additional features:', 'galaxis' ); ?>
							</p>
							<div class="galaxis-check-list-wrap">
								<ul class="galaxis-check-list">
									<li><?php esc_html_e( 'Home Page Sections', 'galaxis' ); ?></li>
									<li><?php esc_html_e( 'Services Section', 'galaxis' ); ?></li>
									<li><?php esc_html_e( 'Features Section', 'galaxis' ); ?></li>
									<li><?php esc_html_e( 'Call to Action Buttons', 'galaxis' ); ?></li>
									<li><?php esc_html_e( 'Latest Blog Section', 'galaxis' ); ?></li>
								</ul>
								<ul class="galaxis-check-list">
									<li><?php esc_html_e( 'Parallax Background Effect', 'galaxis' ); ?></li>
									<li><?php esc_html_e( 'Sortable Sections', 'galaxis' ); ?></li>
									<li><?php esc_html_e( 'Custom Sections', 'galaxis' ); ?></li>
									<li><?php esc_html_e( 'Header Block Area', 'galaxis' ); ?></li>
									<li><?php esc_html_e( 'Footer Widget Area', 'galaxis' ); ?></li>
								</ul>
								<ul class="galaxis-check-list">
									<li><?php esc_html_e( 'Custom Link & Button Colors', 'galaxis' ); ?></li>
									<li><?php esc_html_e( 'Custom Menu Colors', 'galaxis' ); ?></li>
									<li><?php esc_html_e( 'Custom Google Fonts', 'galaxis' ); ?></li>
									<li><?php esc_html_e( 'Advanced Theme Options', 'galaxis' ); ?></li>
									<li><?php esc_html_e( 'Unlimited Color Options', 'galaxis' ); ?></li>
								</ul>
							</div>
							<a target="_blank" href="<?php echo esc_url( galaxis_upsell_buy_url() ); ?>" class="button button-primary"><strong><?php esc_html_e( 'Get Premium', 'galaxis' ); ?></strong></a>
						</div>
					</div>
					<div class="galaxis-panel">
						<div class="galaxis-panel-content">
							<span class="galaxis-panel-title"><?php esc_html_e( 'Theme Colors & General Options', 'galaxis' ); ?></span>
							<p class="description">
								<?php esc_html_e( 'You can find general options from Customizer > General Options. Also, you can find all the available colors options from the Customizer > Colors.', 'galaxis' ); ?>
							</p>
						</div>
						<div class="galaxis-panel-actions">
							<a target="_blank" href="<?php echo esc_url( admin_url( 'customize.php' ) ); ?>?autofocus[section]=colors" class="button"><?php esc_html_e( 'Theme Colors', 'galaxis' ); ?></a>
							<a target="_blank" href="<?php echo esc_url( admin_url( 'customize.php' ) ); ?>?autofocus[section]=sec_general" class="button"><?php esc_html_e( 'General Options', 'galaxis' ); ?></a>
						</div>
					</div>
					<div class="galaxis-panel">
						<div class="galaxis-panel-content">
							<span class="galaxis-panel-title"><?php esc_html_e( 'Footer Block Area', 'galaxis' ); ?></span>
							<p class="description">
								<?php esc_html_e( 'You can enable the footer block area by creating a block in the pattern block manager and assign this block in the Customizer > Footer Options.', 'galaxis' ); ?>
							</p>
						</div>
						<div class="galaxis-panel-actions">
							<a target="_blank" href="<?php echo esc_url( admin_url( 'customize.php' ) ); ?>?autofocus[section]=sec_footer" class="button"><?php esc_html_e( 'Footer Options', 'galaxis' ); ?></a>
							<a target="_blank" href="<?php echo esc_url( admin_url( 'edit.php?post_type=wp_block' ) ); ?>" class="button"><?php esc_html_e( 'Pattern Blocks', 'galaxis' ); ?></a>
						</div>
					</div>
					<div class="galaxis-panel">
						<div class="galaxis-panel-content">
							<span class="galaxis-panel-title"><?php esc_html_e( 'Frequently Asked Questions', 'galaxis' ); ?></span>
							<p class="description">
								<?php esc_html_e( 'You can check the frequently asked questions related to the theme configuration.', 'galaxis' ); ?>
							</p>
						</div>
						<div class="galaxis-panel-actions">
							<a target="_blank" href="<?php echo esc_url( galaxis_faq_url() ); ?>" class="button"><?php esc_html_e( 'Click Here', 'galaxis' ); ?></a>
						</div>
					</div>
					<div class="galaxis-panel">
						<div class="galaxis-panel-content">
							<?php esc_html_e( 'If you like this theme, then you can leave a review. This will encourage us to improve the theme and add more features to the theme.', 'galaxis' ); ?>
							<br>
							<a target="_blank" href="https://wordpress.org/support/theme/galaxis/reviews/#new-post" class="galaxis-review-stars-link">
								<div class="vers column-rating">
									<div class="star-rating">
										<span class="screen-reader-text"><?php esc_html_e( 'If you like this theme, then you can leave a review.', 'galaxis' ); ?></span>
										<div class="star star-full" aria-hidden="true"></div>
										<div class="star star-full" aria-hidden="true"></div>
										<div class="star star-full" aria-hidden="true"></div>
										<div class="star star-full" aria-hidden="true"></div>
										<div class="star star-full" aria-hidden="true"></div>
									</div>
								</div>
							</a>
						</div>
						<div class="galaxis-panel-actions">
							<a target="_blank" href="https://wordpress.org/support/theme/galaxis/reviews/#new-post" class="button"><?php esc_html_e( 'Leave a Review', 'galaxis' ); ?></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php
	}
}

if ( ! function_exists( 'galaxis_options_styles' ) ) {
	/**
	 * Enqueue styles for the theme page.
	 */
	function galaxis_options_styles() {
		wp_enqueue_style( 'galaxis-options', get_template_directory_uri() . '/inc/admin.css', array(), GALAXIS_VERSION );
	}
}

/**
 * Add a notice after theme activation.
 */
function galaxis_welcome_notice() {
	global $pagenow;
	if ( is_admin() && isset( $_GET['activated'] ) && 'themes.php' === $pagenow ) { // phpcs:ignore
		?>
		<div class="updated notice notice-success is-dismissible">
			<p>
				<?php
				echo wp_kses(
					sprintf(
						/* translators: %s: Welcome page link. */
						__( 'Welcome! Thank you for choosing Galaxis. To get started, visit our <a href="%s">welcome page</a>.', 'galaxis' ),
						esc_url( admin_url( 'themes.php?page=galaxis-options' ) )
					),
					array( 'a' => array( 'href' => array() ) )
				);
				?>
			</p>
			<p>
				<a class="button" href="<?php echo esc_url( admin_url( 'themes.php?page=galaxis-options' ) ); ?>">
					<?php esc_html_e( 'Get started with Galaxis', 'galaxis' ); ?>
				</a>
			</p>
		</div>
		<?php
	}
}
add_action( 'admin_notices', 'galaxis_welcome_notice' );
