<?php

function newsblogs_customize_register( $wp_customize ) {

	$wp_customize->remove_control('header_text_center');
	$wp_customize->get_setting('sticky_header_toggle')->default = false;
	$wp_customize->remove_control('newspaperup_menu_search');
	$wp_customize->remove_control('newspaperup_lite_dark_switcher');
	$wp_customize->remove_section('header_top_bar');

	$wp_customize->remove_control('newspaperup_main_banner_section_background_image');
	
	$wp_customize->get_control('tren_edit_section_title')->label = esc_html__('Editor Post Section', 'newsblogs');
	Newspaperup_Customizer_Control::add_field( 
		array(
			'type'     => 'cropped_image', 
			'settings'  => 'newsblogs_main_banner_section_background_image',
			'label' => esc_html__('Background image', 'newsblogs'),
			'description' => sprintf(esc_html__('Recommended Size %1$s px X %2$s px', 'newsblogs'), 1200, 720),
			'section'  => 'frontpage_main_banner_section_settings',
			'default' => '',
			'width' => 1200,
			'height' => 720,
			'flex_width' => true,
			'flex_height' => true,
			'sanitize_callback' => 'absint', 
			'active_callback' => 'newspaperup_main_banner_section_status'
		)
	);

}
add_action( 'customize_register', 'newsblogs_customize_register',999 );