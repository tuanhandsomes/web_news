<?php
/**
 * WooCommerce Compatibility File
 *
 * @link https://woocommerce.com/
 *
 * @package Galaxis
 */

/**
 * WooCommerce setup function.
 *
 * @link https://docs.woocommerce.com/document/third-party-custom-theme-compatibility/
 * @link https://github.com/woocommerce/woocommerce/wiki/Enabling-product-gallery-features-(zoom,-swipe,-lightbox)-in-3.0.0
 *
 * @return void
 */
function galaxis_woocommerce_setup() {
	// Add support for WooCommerce.
	add_theme_support(
		'woocommerce',
		array(
			'product_grid' => array(
				'default_rows'    => 8,
				'min_rows'        => 5,
				'max_rows'        => 10,
				'default_columns' => 4,
				'min_columns'     => 2,
				'max_columns'     => 4,
			),
		)
	);

	// Add support for WooCommerce features.
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );

	// Remove default WooCommerce wrappers.
	remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
	remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10 );
	remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );
}
add_action( 'after_setup_theme', 'galaxis_woocommerce_setup' );

/**
 * Add 'woocommerce-active' class to the body tag.
 *
 * @param  array $classes CSS classes applied to the body tag.
 * @return array $classes modified to include 'woocommerce-active' class.
 */
function galaxis_woocommerce_active_body_class( $classes ) {
	$classes[] = 'woocommerce-active';

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ( is_shop() || is_archive() ) && ! is_active_sidebar( 'sidebar-shop' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'galaxis_woocommerce_active_body_class' );

/**
 * Register shop widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function galaxis_shop_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Shop Sidebar', 'galaxis' ),
			'id'            => 'sidebar-shop',
			'description'   => esc_html__( 'Add shop widgets here.', 'galaxis' ),
			'before_widget' => '<section id="%1$s" class="widget gx-card-content u-b-margin %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h4 class="widget-title">',
			'after_title'   => '</h4>',
		)
	);
}
add_action( 'widgets_init', 'galaxis_shop_widgets_init' );

if ( ! function_exists( 'galaxis_woocommerce_modify' ) ) {
	/**
	 * Modify WooCommerce templates.
	 */
	function galaxis_woocommerce_modify() {
		/**
		 * Opening wrapper and columns.
		 */
		function galaxis_woocommerce_open_wrapper_columns() {
			?>
			<div class="wrapper woocommerce-shop-wrapper u-t-margin">
				<div class="columns columns--gutters">
				<?php
		}
		add_action( 'woocommerce_before_main_content', 'galaxis_woocommerce_open_wrapper_columns', 5 );

		/**
		 * Closing wrapper and columns.
		 */
		function galaxis_woocommerce_close_wrapper_columns() {
			?>
				</div><!-- .columns -->
			</div><!-- .wrapper -->
			<?php
		}
		add_action( 'woocommerce_after_main_content', 'galaxis_woocommerce_close_wrapper_columns', 12 );

		if ( is_shop() || is_archive() ) {
			/**
			 * Opening column for shop sidebar.
			 */
			function galaxis_woocommerce_open_sidebar_column() {
				?>
				<div class="shop-sidebar columns__md-4">
				<?php
			}
			add_action( 'woocommerce_before_main_content', 'galaxis_woocommerce_open_sidebar_column', 6 );

			// Output the shop sidebar inside the wrapper.
			add_action( 'woocommerce_before_main_content', 'woocommerce_get_sidebar', 7 );

			/**
			 * Closing column for shop sidebar.
			 */
			function galaxis_woocommerce_close_sidebar_column() {
				?>
				</div><!-- .sidebar-shop -->
				<?php
			}
			add_action( 'woocommerce_before_main_content', 'galaxis_woocommerce_close_sidebar_column', 8 );
		}

		/**
		 * Opening column for shop content.
		 */
		function galaxis_woocommerce_open_content_column() {
			if ( is_shop() || is_archive() ) {
				?>
				<div id="primary" class="shop-content content-area columns__md-8 u-b-margin">
				<?php
			} else {
				?>
				<div id="primary" class="shop-content content-area u-b-margin">
				<?php
			}
			?>
					<main id="main" class="site-main">

						<article id="post-<?php the_ID(); ?>" <?php post_class( 'gx-card' ); ?>>

							<div class="gx-card-content">
								<div class="entry-content">
			<?php
		}
		add_action( 'woocommerce_before_main_content', 'galaxis_woocommerce_open_content_column', 9 );

		/**
		 * Closing column for shop content.
		 */
		function galaxis_woocommerce_close_content_column() {
			?>
								</div><!-- .entry-content -->
							</div><!-- .gx-card-content -->

						</article><!-- #post-<?php the_ID(); ?> -->

					</main><!-- #main -->
				</div><!-- #primary -->
				<?php
		}
		add_action( 'woocommerce_after_main_content', 'galaxis_woocommerce_close_content_column', 11 );

		if ( ! function_exists( 'galaxis_woocommerce_cart_link_fragment' ) ) {
			/**
			 * Cart Fragments.
			 *
			 * Ensure cart contents update when products are added to the cart via AJAX.
			 *
			 * @param array $fragments Fragments to refresh via AJAX.
			 * @return array Fragments to refresh via AJAX.
			 */
			function galaxis_woocommerce_cart_link_fragment( $fragments ) {
				ob_start();
				galaxis_woocommerce_cart_link();
				$fragments['a.cart-contents'] = ob_get_clean();

				return $fragments;
			}
		}
		add_filter( 'woocommerce_add_to_cart_fragments', 'galaxis_woocommerce_cart_link_fragment' );

		if ( ! function_exists( 'galaxis_woocommerce_cart_link' ) ) {
			/**
			 * Cart Link.
			 *
			 * Display a link to the cart including the number of items present and the cart total.
			 *
			 * @return void
			 */
			function galaxis_woocommerce_cart_link() {
				?>
				<a class="cart-contents cart-link" href="<?php echo esc_url( wc_get_cart_url() ); ?>" title="<?php esc_attr_e( 'View your shopping cart', 'galaxis' ); ?>">
					<?php
					$item_count_text = sprintf(
						/* translators: number of items in the mini cart. */
						_n( '%d item', '%d items', WC()->cart->get_cart_contents_count(), 'galaxis' ),
						WC()->cart->get_cart_contents_count()
					);
					?>
					<span class="amount"><?php echo wp_kses_data( WC()->cart->get_cart_subtotal() ); ?></span> <span class="count"><?php echo esc_html( $item_count_text ); ?></span>
				</a>
				<?php
			}
		}

		if ( ! function_exists( 'galaxis_woocommerce_header_cart' ) ) {
			/**
			 * Display Header Cart.
			 *
			 * @return void
			 */
			function galaxis_woocommerce_header_cart() {
				if ( is_cart() ) {
					$class = 'current-menu-item';
				} else {
					$class = '';
				}
				?>
				<ul id="site-header-cart" class="site-header-cart">
					<li class="<?php echo esc_attr( $class ); ?>">
						<?php galaxis_woocommerce_cart_link(); ?>
					</li>
					<li>
						<?php
						$instance = array(
							'title' => '',
						);

						the_widget( 'WC_Widget_Cart', $instance );
						?>
					</li>
				</ul>
				<?php
			}
		}

		if ( ! function_exists( 'galaxis_woocommerce_account_links' ) ) {
			/**
			 * Account Links.
			 *
			 * Display links for login, logout and my account.
			 *
			 * @return void
			 */
			function galaxis_woocommerce_account_links() {
				if ( is_user_logged_in() ) {
					?>
					<li>
						<a href="<?php echo esc_url( wp_logout_url( get_permalink( get_option( 'woocommerce_myaccount_page_id' ) ) ) ); ?>" class="site-logout-link text--secondary">
							<?php esc_html_e( 'Logout', 'galaxis' ); ?>
						</a>
					</li>
					<li>
						<a href="<?php the_permalink( get_option( 'woocommerce_myaccount_page_id' ) ); ?>" class="site-account-link">
							<?php esc_html_e( 'My Account', 'galaxis' ); ?>
						</a>
					</li>
					<?php
				} else {
					?>
					<li>
						<a href="<?php the_permalink( get_option( 'woocommerce_myaccount_page_id' ) ); ?>" class="site-login-link">
							<?php esc_html_e( 'Login | Register', 'galaxis' ); ?>
						</a>
					</li>
					<?php
				}
			}
		}
	}
}
add_action( 'wp', 'galaxis_woocommerce_modify' );
