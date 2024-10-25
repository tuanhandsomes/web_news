<?php
/**
 * Galaxis Theme Customizer
 *
 * @package Galaxis
 */

/**
 * Add theme options and postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function galaxis_customize_register( $wp_customize ) {
	if ( method_exists( $wp_customize, 'register_control_type' ) ) {
		$wp_customize->register_control_type( Galaxis_Upsell_Control::class );
	}

	if ( method_exists( $wp_customize, 'register_section_type' ) ) {
		$wp_customize->register_section_type( Galaxis_Upsell_Section::class );
	}

	$wp_customize->add_section(
		new Galaxis_Upsell_Section(
			$wp_customize,
			'galaxis_premium',
			array(
				'title'       => esc_html__( 'Premium Available', 'galaxis' ),
				'button_text' => esc_html__( 'Get Premium', 'galaxis' ),
				'button_url'  => esc_url( galaxis_upsell_buy_url() ),
				'priority'    => 1,
			)
		)
	);

	/**
	 * Get an array of pattern-blocks formatted as [ ID => Title ].
	 */
	$pattern_blocks = get_posts(
		array(
			'post_type'   => 'wp_block',
			'numberposts' => 100,
		)
	);

	$pattern_blocks_choices = array( 0 => esc_html__( 'Select a block', 'galaxis' ) );
	foreach ( $pattern_blocks as $block ) {
		$pattern_blocks_choices[ $block->ID ] = $block->post_title;
	}

	$wp_customize->get_setting( 'blogname' )->transport        = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport = 'postMessage';

	$wp_customize->selective_refresh->add_partial(
		'blogname',
		array(
			'selector'            => '.site-title > a',
			'container_inclusive' => false,
			'render_callback'     => 'galaxis_customize_partial_blogname',
		)
	);

	$wp_customize->selective_refresh->add_partial(
		'blogdescription',
		array(
			'selector'            => '.site-description',
			'container_inclusive' => false,
			'render_callback'     => 'galaxis_customize_partial_blogdescription',
		)
	);

	// Setting: Show site title.
	$wp_customize->add_setting(
		'set_show_site_title',
		array(
			'type'              => 'theme_mod',
			'default'           => galaxis_show_site_title_default(),
			'transport'         => 'postMessage',
			'sanitize_callback' => 'galaxis_sanitize_checkbox',
		)
	);

	// Control: Show site title.
	$wp_customize->add_control(
		'set_show_site_title',
		array(
			'section' => 'title_tagline',
			'type'    => 'checkbox',
			'label'   => esc_html__( 'Show Site Title', 'galaxis' ),
		)
	);

	// Selective refresh: Show site title.
	$wp_customize->selective_refresh->add_partial(
		'set_show_site_title',
		array(
			'selector'            => '.site-menu-content',
			'container_inclusive' => true,
			'render_callback'     => function () {
				get_template_part( 'template-parts/header/main-menu' );
			},
		)
	);

	// Setting: Show site tagline.
	$wp_customize->add_setting(
		'set_show_site_tagline',
		array(
			'type'              => 'theme_mod',
			'default'           => galaxis_show_site_tagline_default(),
			'transport'         => 'postMessage',
			'sanitize_callback' => 'galaxis_sanitize_checkbox',
		)
	);

	// Control: Show site tagline.
	$wp_customize->add_control(
		'set_show_site_tagline',
		array(
			'section' => 'title_tagline',
			'type'    => 'checkbox',
			'label'   => esc_html__( 'Show Site Tagline', 'galaxis' ),
		)
	);

	// Selective refresh: Show site tagline.
	$wp_customize->selective_refresh->add_partial(
		'set_show_site_tagline',
		array(
			'selector'            => '.site-menu-content',
			'container_inclusive' => true,
			'render_callback'     => function () {
				get_template_part( 'template-parts/header/main-menu' );
			},
		)
	);

	// Setting: Branding area minimum width.
	$wp_customize->add_setting(
		'set_branding_area_width_lg',
		array(
			'type'              => 'theme_mod',
			'default'           => galaxis_branding_area_width_lg_default(),
			'transport'         => 'refresh',
			'sanitize_callback' => 'absint',
		)
	);

	// Control: Branding area minimum width.
	$wp_customize->add_control(
		'set_branding_area_width_lg',
		array(
			'section'     => 'title_tagline',
			'type'        => 'number',
			'label'       => esc_html__( 'Branding Area Minimum Width', 'galaxis' ),
			'description' => esc_html__( 'Set minimum width in % for the branding area on large screen devices.', 'galaxis' ),
			'input_attrs' => array(
				'min'  => 0,
				'max'  => 100,
				'step' => 1,
			),
		)
	);

	// Section: General Options.
	$wp_customize->add_section(
		'sec_general',
		array(
			'title'       => esc_html__( 'General Options', 'galaxis' ),
			'description' => esc_html__( 'You can customize the general options in here.', 'galaxis' ),
			'priority'    => 155,
		)
	);

	// Setting: Blog content archive.
	$wp_customize->add_setting(
		'set_blog_content',
		array(
			'type'              => 'theme_mod',
			'default'           => 'summary',
			'transport'         => 'refresh',
			'sanitize_callback' => 'galaxis_sanitize_select',
		)
	);

	// Control: Blog content archive.
	$wp_customize->add_control(
		'set_blog_content',
		array(
			'section'     => 'sec_general',
			'type'        => 'radio',
			'choices'     => array(
				'full'    => esc_html__( 'Full text', 'galaxis' ),
				'summary' => esc_html__( 'Summary', 'galaxis' ),
			),
			'label'       => esc_html__( 'Blog Content Archive', 'galaxis' ),
			'description' => esc_html__( 'You can choose what to show in blog archive posts and pages.', 'galaxis' ),
		)
	);

	// Setting: Blog posts sidebar.
	$wp_customize->add_setting(
		'set_blog_sidebar',
		array(
			'type'              => 'theme_mod',
			'default'           => 'right',
			'transport'         => 'refresh',
			'sanitize_callback' => 'galaxis_sanitize_select',
		)
	);

	// Control: Blog posts sidebar.
	$wp_customize->add_control(
		'set_blog_sidebar',
		array(
			'section'     => 'sec_general',
			'type'        => 'radio',
			'choices'     => array(
				'left'  => esc_html__( 'Left Sidebar', 'galaxis' ),
				'right' => esc_html__( 'Right Sidebar', 'galaxis' ),
			),
			'label'       => esc_html__( 'Blog Posts Sidebar', 'galaxis' ),
			'description' => esc_html__( 'You can set the sidebar layout for the blog posts.', 'galaxis' ),
		)
	);

	// Setting: Sticky sidebar.
	$wp_customize->add_setting(
		'set_sticky_sidebar',
		array(
			'type'              => 'theme_mod',
			'default'           => galaxis_sticky_sidebar_default(),
			'transport'         => 'refresh',
			'sanitize_callback' => 'galaxis_sanitize_checkbox',
		)
	);

	// Control: Sticky sidebar.
	$wp_customize->add_control(
		'set_sticky_sidebar',
		array(
			'section'     => 'sec_general',
			'type'        => 'checkbox',
			'label'       => esc_html__( 'Enable Sticky / Floating Sidebar', 'galaxis' ),
			'description' => esc_html__( 'You can enable sticky sidebar that floats with the blog posts on scroll.', 'galaxis' ),
		)
	);

	// Control: General Options Addon.
	$wp_customize->add_control(
		new Galaxis_Upsell_Control(
			$wp_customize,
			'addon_sec_general',
			array(
				'section'     => 'sec_general',
				'type'        => 'galaxis-addon',
				'label'       => esc_html__( 'Learn More', 'galaxis' ),
				'description' => esc_html__( 'Multiple front page sections with many advanced options, call to action buttons, and custom Google fonts are available in our premium version.', 'galaxis' ),
				'url'         => esc_url( galaxis_upsell_detail_url() ),
				'priority'    => 999,
				'settings'    => ( isset( $wp_customize->selective_refresh ) ) ? array() : 'blogname',
			)
		)
	);

	// Section: Header Options.
	$wp_customize->add_section(
		'sec_header',
		array(
			'title'       => esc_html__( 'Header Options', 'galaxis' ),
			'description' => esc_html__( 'You can customize the header options in here.', 'galaxis' ),
			'priority'    => 156,
		)
	);

	// Setting: Top bar text.
	$wp_customize->add_setting(
		'set_topbar_text',
		array(
			'type'              => 'theme_mod',
			'default'           => '',
			'transport'         => 'postMessage',
			'sanitize_callback' => 'galaxis_sanitize_site_info_text',
		)
	);

	// Control: Top bar text.
	$wp_customize->add_control(
		'set_topbar_text',
		array(
			'section'     => 'sec_header',
			'type'        => 'textarea',
			'label'       => esc_html__( 'Top Bar Text', 'galaxis' ),
			'description' => esc_html__( 'You can enter the text to be shown on the left side of the top bar.', 'galaxis' ),
		)
	);

	// Selective refresh: Top bar text.
	$wp_customize->selective_refresh->add_partial(
		'set_topbar_text',
		array(
			'selector'            => '.site-topbar-text',
			'container_inclusive' => true,
			'render_callback'     => function () {
				get_template_part( 'template-parts/header/topbar-text' );
			},
		)
	);

	// Setting: Sticky main menu.
	$wp_customize->add_setting(
		'set_sticky_main_menu',
		array(
			'type'              => 'theme_mod',
			'default'           => true,
			'transport'         => 'refresh',
			'sanitize_callback' => 'galaxis_sanitize_checkbox',
		)
	);

	// Control: Sticky main menu.
	$wp_customize->add_control(
		'set_sticky_main_menu',
		array(
			'section'     => 'sec_header',
			'type'        => 'checkbox',
			'label'       => esc_html__( 'Sticky Main Menu', 'galaxis' ),
			'description' => esc_html__( 'You can enable or disable sticky main menu in the header when scrolling to the bottom.', 'galaxis' ),
		)
	);

	// Setting: Boxed header.
	$wp_customize->add_setting(
		'set_boxed_header',
		array(
			'type'              => 'theme_mod',
			'default'           => false,
			'transport'         => 'refresh',
			'sanitize_callback' => 'galaxis_sanitize_checkbox',
		)
	);

	// Control: Boxed header.
	$wp_customize->add_control(
		'set_boxed_header',
		array(
			'section'     => 'sec_header',
			'type'        => 'checkbox',
			'label'       => esc_html__( 'Boxed Header', 'galaxis' ),
			'description' => esc_html__( 'You can enable or disable boxed header.', 'galaxis' ),
		)
	);

	// Setting: Back to top button.
	$wp_customize->add_setting(
		'set_back_to_top',
		array(
			'type'              => 'theme_mod',
			'default'           => true,
			'transport'         => 'refresh',
			'sanitize_callback' => 'galaxis_sanitize_checkbox',
		)
	);

	// Control: Back to top button.
	$wp_customize->add_control(
		'set_back_to_top',
		array(
			'section'     => 'sec_header',
			'type'        => 'checkbox',
			'label'       => esc_html__( 'Back To Top Button', 'galaxis' ),
			'description' => esc_html__( 'You can enable or disable back to top button when scrolling to the bottom.', 'galaxis' ),
		)
	);

	// Control: Header Options Addon.
	$wp_customize->add_control(
		new Galaxis_Upsell_Control(
			$wp_customize,
			'addon_sec_header',
			array(
				'section'     => 'sec_header',
				'type'        => 'galaxis-addon',
				'label'       => esc_html__( 'Learn More', 'galaxis' ),
				'description' => esc_html__( 'Conditional header block area with multiple options is available in our premium version.', 'galaxis' ),
				'url'         => esc_url( galaxis_upsell_detail_url() ),
				'priority'    => 999,
				'settings'    => ( isset( $wp_customize->selective_refresh ) ) ? array() : 'blogname',
			)
		)
	);

	// Section: Footer Options.
	$wp_customize->add_section(
		'sec_footer',
		array(
			'title'       => esc_html__( 'Footer Options', 'galaxis' ),
			'description' => esc_html__( 'You can customize the footer options in here.', 'galaxis' ),
			'priority'    => 157,
		)
	);

	// Setting: Boxed footer.
	$wp_customize->add_setting(
		'set_boxed_footer',
		array(
			'type'              => 'theme_mod',
			'default'           => false,
			'transport'         => 'refresh',
			'sanitize_callback' => 'galaxis_sanitize_checkbox',
		)
	);

	// Control: Boxed footer.
	$wp_customize->add_control(
		'set_boxed_footer',
		array(
			'section'     => 'sec_footer',
			'type'        => 'checkbox',
			'label'       => esc_html__( 'Boxed Footer', 'galaxis' ),
			'description' => esc_html__( 'You can enable or disable boxed footer.', 'galaxis' ),
		)
	);

	$footer_block_defaults = galaxis_footer_block_defaults();

	// Setting: Footer block area.
	$wp_customize->add_setting(
		'set_footer_block[post_id]',
		array(
			'type'              => 'theme_mod',
			'default'           => esc_html( $footer_block_defaults['post_id'] ),
			'transport'         => 'refresh',
			'sanitize_callback' => function ( $post_id ) {
				$post_id = absint( $post_id );
				if ( $post_id && 'wp_block' === get_post_type( $post_id ) ) {
					return $post_id;
				}
				return 0;
			},
		)
	);

	// Control: Footer block area.
	$wp_customize->add_control(
		'set_footer_block[post_id]',
		array(
			'section'     => 'sec_footer',
			'type'        => 'select',
			'label'       => esc_html__( 'Footer Block Area', 'galaxis' ),
			'description' => wp_kses(
				sprintf(
					/* translators: %s: URL to the pattern-blocks admin page. */
					__( 'This is the content of the footer block area. You can create or edit the footer block area in the <a href="%s" target="_blank">Pattern Blocks Manager (opens in a new window)</a>.<br>After creating the pattern block, you may need to refresh this customizer page and then select the newly created block.<br>The selected block content will appear on the footer block area.', 'galaxis' ),
					esc_url( admin_url( 'edit.php?post_type=wp_block' ) )
				),
				array(
					'a'  => array(
						'href'   => array(),
						'target' => array(),
					),
					'br' => array(),
				)
			),
			'choices'     => $pattern_blocks_choices,
		)
	);

	// Setting: Footer block area full width.
	$wp_customize->add_setting(
		'set_footer_block[full_width]',
		array(
			'type'              => 'theme_mod',
			'default'           => $footer_block_defaults['full_width'],
			'transport'         => 'postMessage',
			'sanitize_callback' => 'galaxis_sanitize_checkbox',
		)
	);

	// Control: Footer block area full width.
	$wp_customize->add_control(
		'set_footer_block[full_width]',
		array(
			'section' => 'sec_footer',
			'type'    => 'checkbox',
			'label'   => esc_html__( 'Full Width (If Not Boxed Footer)', 'galaxis' ),
		)
	);

	// Selective refresh: Footer block area full width.
	$wp_customize->selective_refresh->add_partial(
		'set_footer_block[full_width]',
		array(
			'selector'            => '.gx-footer-block-area',
			'container_inclusive' => true,
			'render_callback'     => function () {
				get_template_part( 'template-parts/footer/block-area' );
			},
		)
	);

	// Setting: Show footer block area on front page.
	$wp_customize->add_setting(
		'set_footer_block[show_on_front_page]',
		array(
			'type'              => 'theme_mod',
			'default'           => $footer_block_defaults['show_on_front_page'],
			'transport'         => 'refresh',
			'sanitize_callback' => 'galaxis_sanitize_checkbox',
		)
	);

	// Control: Show footer block area on front page.
	$wp_customize->add_control(
		'set_footer_block[show_on_front_page]',
		array(
			'section' => 'sec_footer',
			'type'    => 'checkbox',
			'label'   => esc_html__( 'Show Footer Block Area On Front Page', 'galaxis' ),
		)
	);

	// Setting: Show footer block area on blog page.
	$wp_customize->add_setting(
		'set_footer_block[show_on_blog_page]',
		array(
			'type'              => 'theme_mod',
			'default'           => $footer_block_defaults['show_on_blog_page'],
			'transport'         => 'refresh',
			'sanitize_callback' => 'galaxis_sanitize_checkbox',
		)
	);

	// Control: Show footer block area on blog page.
	$wp_customize->add_control(
		'set_footer_block[show_on_blog_page]',
		array(
			'section' => 'sec_footer',
			'type'    => 'checkbox',
			'label'   => esc_html__( 'Show Footer Block Area On Blog Page', 'galaxis' ),
		)
	);

	// Setting: Show footer block area on archives.
	$wp_customize->add_setting(
		'set_footer_block[show_on_archives]',
		array(
			'type'              => 'theme_mod',
			'default'           => $footer_block_defaults['show_on_archives'],
			'transport'         => 'refresh',
			'sanitize_callback' => 'galaxis_sanitize_checkbox',
		)
	);

	// Control: Show footer block area on archives.
	$wp_customize->add_control(
		'set_footer_block[show_on_archives]',
		array(
			'section' => 'sec_footer',
			'type'    => 'checkbox',
			'label'   => esc_html__( 'Show Footer Block Area On Archives', 'galaxis' ),
		)
	);

	// Setting: Show footer block area on posts.
	$wp_customize->add_setting(
		'set_footer_block[show_on_posts]',
		array(
			'type'              => 'theme_mod',
			'default'           => $footer_block_defaults['show_on_posts'],
			'transport'         => 'refresh',
			'sanitize_callback' => 'galaxis_sanitize_checkbox',
		)
	);

	// Control: Show footer block area on posts.
	$wp_customize->add_control(
		'set_footer_block[show_on_posts]',
		array(
			'section' => 'sec_footer',
			'type'    => 'checkbox',
			'label'   => esc_html__( 'Show Footer Block Area On Posts', 'galaxis' ),
		)
	);

	// Setting: Show footer block area on pages.
	$wp_customize->add_setting(
		'set_footer_block[show_on_pages]',
		array(
			'type'              => 'theme_mod',
			'default'           => $footer_block_defaults['show_on_pages'],
			'transport'         => 'refresh',
			'sanitize_callback' => 'galaxis_sanitize_checkbox',
		)
	);

	// Control: Show footer block area on pages.
	$wp_customize->add_control(
		'set_footer_block[show_on_pages]',
		array(
			'section' => 'sec_footer',
			'type'    => 'checkbox',
			'label'   => esc_html__( 'Show Footer Block Area On Pages', 'galaxis' ),
		)
	);

	// Setting: Copyright text.
	$wp_customize->add_setting(
		'set_copyright',
		array(
			'type'              => 'theme_mod',
			'default'           => galaxis_copyright_default(),
			'transport'         => 'postMessage',
			'sanitize_callback' => 'galaxis_sanitize_site_info_text',
		)
	);

	// Control: Copyright text.
	$wp_customize->add_control(
		'set_copyright',
		array(
			'section'     => 'sec_footer',
			'type'        => 'textarea',
			'label'       => esc_html__( 'Copyright Text', 'galaxis' ),
			'description' => esc_html__( 'You can enter the copyright text to be shown in the footer.', 'galaxis' ),
		)
	);

	// Selective refresh: Copyright text.
	$wp_customize->selective_refresh->add_partial(
		'set_copyright',
		array(
			'selector'            => '.copyright',
			'container_inclusive' => true,
			'render_callback'     => function () {
				get_template_part( 'template-parts/footer/copyright' );
			},
		)
	);

	// Control: Footer Options Addon.
	$wp_customize->add_control(
		new Galaxis_Upsell_Control(
			$wp_customize,
			'addon_sec_footer',
			array(
				'section'     => 'sec_footer',
				'type'        => 'galaxis-addon',
				'label'       => esc_html__( 'Learn More', 'galaxis' ),
				'description' => esc_html__( 'Multiple footer widgets area with custom columns and advanced options are available in our premium version.', 'galaxis' ),
				'url'         => esc_url( galaxis_upsell_detail_url() ),
				'priority'    => 999,
				'settings'    => ( isset( $wp_customize->selective_refresh ) ) ? array() : 'blogname',
			)
		)
	);

	$default_colors = galaxis_get_color_defaults();

	// Setting: Top bar background color.
	$wp_customize->add_setting(
		'galaxis_colors[topbar_bg_color]',
		array(
			'default'           => $default_colors['topbar_bg_color'],
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);

	// Control: Top bar background color.
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'galaxis_colors[topbar_bg_color]',
			array(
				'section' => 'colors',
				'label'   => esc_html__( 'Top Bar Background Color', 'galaxis' ),
			)
		)
	);

	// Setting: Back to top background color.
	$wp_customize->add_setting(
		'galaxis_colors[back_to_top_bg_color]',
		array(
			'default'           => $default_colors['back_to_top_bg_color'],
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);

	// Control: Back to top background color.
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'galaxis_colors[back_to_top_bg_color]',
			array(
				'section' => 'colors',
				'label'   => esc_html__( 'Back to Top Background Color', 'galaxis' ),
			)
		)
	);

	// Setting: Back to top hover background color.
	$wp_customize->add_setting(
		'galaxis_colors[back_to_top_hover_bg_color]',
		array(
			'default'           => $default_colors['back_to_top_hover_bg_color'],
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);

	// Control: Back to top hover background color.
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'galaxis_colors[back_to_top_hover_bg_color]',
			array(
				'section' => 'colors',
				'label'   => esc_html__( 'Back to Top Hover Background Color', 'galaxis' ),
			)
		)
	);

	// Setting: Footer background color.
	$wp_customize->add_setting(
		'galaxis_colors[footer_bg_color]',
		array(
			'default'           => $default_colors['footer_bg_color'],
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);

	// Control: Footer background color.
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'galaxis_colors[footer_bg_color]',
			array(
				'section' => 'colors',
				'label'   => esc_html__( 'Footer Background Color', 'galaxis' ),
			)
		)
	);

	// Setting: Selection background color.
	$wp_customize->add_setting(
		'galaxis_colors[selection_bg_color]',
		array(
			'default'           => $default_colors['selection_bg_color'],
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);

	// Control: Selection background color.
	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'galaxis_colors[selection_bg_color]',
			array(
				'section' => 'colors',
				'label'   => esc_html__( 'Selection Background Color', 'galaxis' ),
			)
		)
	);

	// Control: Colors Addon.
	$wp_customize->add_control(
		new Galaxis_Upsell_Control(
			$wp_customize,
			'addon_colors',
			array(
				'section'     => 'colors',
				'type'        => 'galaxis-addon',
				'label'       => esc_html__( 'Learn More', 'galaxis' ),
				'description' => esc_html__( 'Over 40+ color options for buttons, links, site title, tagline, menu, cards, widgets, etc. are available in our premium version.', 'galaxis' ),
				'url'         => esc_url( galaxis_upsell_detail_url() ),
				'priority'    => 999,
				'settings'    => ( isset( $wp_customize->selective_refresh ) ) ? array() : 'blogname',
			)
		)
	);
}
add_action( 'customize_register', 'galaxis_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function galaxis_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function galaxis_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function galaxis_customize_preview() {
	wp_enqueue_script( 'galaxis-customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview', 'jquery' ), GALAXIS_VERSION, true );

	wp_localize_script(
		'galaxis-customizer',
		'galaxis',
		array(
			'default_colors' => galaxis_get_color_defaults(),
		)
	);
}
add_action( 'customize_preview_init', 'galaxis_customize_preview' );

/**
 * Sanitize site info text.
 *
 * @param string $input Input text.
 * @return string
 */
function galaxis_sanitize_site_info_text( $input ) {
	$allowed = galaxis_site_info_allowed_tags();
	return wp_kses( $input, $allowed );
}

/**
 * Checkbox sanitization.
 *
 * Sanitization callback for 'checkbox' type controls. This callback sanitizes `$checked`
 * as a boolean value, either TRUE or FALSE.
 *
 * @param bool $checked Whether the checkbox is checked.
 * @return bool Whether the checkbox is checked.
 */
function galaxis_sanitize_checkbox( $checked ) {
	return ( isset( $checked ) && true === $checked ) ? true : false;
}

/**
 * Sanitize select.
 *
 * @param string $input The input from the setting.
 * @param object $setting The selected setting.
 *
 * @return string $input|$setting->default The input from the setting or the default setting.
 */
function galaxis_sanitize_select( $input, $setting ) {
	$input   = sanitize_key( $input );
	$choices = $setting->manager->get_control( $setting->id )->choices;
	return ( array_key_exists( $input, $choices ) ? $input : $setting->default );
}
