<?php /*** Footer Option Panel
 *
 * @package Newspaperup
 */

$newspaperup_default = newspaperup_get_default_theme_options();

/**
 * Create a Radio-Image control
 * 
 * This class incorporates code from the Kirki Customizer Framework and from a tutorial
 * written by Otto Wood.
 * 
 * The Kirki Customizer Framework, Copyright Aristeides Stathopoulos (@aristath),
 * is licensed under the terms of the GNU GPL, Version 2 (or later).
 * 
 * @link https://github.com/reduxframework/kirki/
 * @link http://ottopress.com/2012/making-a-custom-control-for-the-theme-customizer/
 */
     
/**
* Layout options section
*
* @package newspaperup
*/

//You Missed seciton
Newspaperup_Customizer_Control::add_section(
	'you_missed_section',
	array(
		'title' => esc_html__( 'You Missed', 'newspaperup' ),  
        'priority' => 24,
        'capability' => 'edit_theme_options',
	)
);
// you missed heading
Newspaperup_Customizer_Control::add_field(
	array(
		'type'     => 'hidden', 
        'settings'  => 'newspaperup_you_missed_settings',
        'label' => esc_html__('You Missed', 'newspaperup'),
		'section'  => 'you_missed_section',
        'sanitize_callback' => 'newspaperup_sanitize_text',
	)
);
// you missed toggle
Newspaperup_Customizer_Control::add_field( 
	array(
		'type'     => 'toggle', 
        'settings'  => 'you_missed_enable',
        'label' => esc_html__('Hide/Show', 'newspaperup'),
		'section'  => 'you_missed_section',
        'default' => $newspaperup_default['you_missed_enable'], 
        'sanitize_callback' => 'newspaperup_sanitize_checkbox',
	)
);
// you missed title
Newspaperup_Customizer_Control::add_field(
	array(
		'type'     => 'text', 
        'settings'  => 'you_missed_title',
        'label' => esc_html__('Title', 'newspaperup'),
		'section'  => 'you_missed_section',
		'transport'  => 'postMessage',
        'default' => $newspaperup_default['you_missed_title'],
        'sanitize_callback' => 'sanitize_text_field',
	)
);
// Add Footer Option Section
Newspaperup_Customizer_Control::add_section(
	'footer_options',
	array(
		'title' => esc_html__( 'Footer', 'newspaperup' ),  
        'priority' => 25,
        'capability' => 'edit_theme_options',
	)
);
//Footer logo Section 
Newspaperup_Customizer_Control::add_field(
	array(
		'type'     => 'hidden',
        'settings'  => 'footer_logo_title',
        'label' => esc_html__('Logo', 'newspaperup'),
		'section'  => 'footer_options',
        'sanitize_callback' => 'newspaperup_sanitize_text',
	)
);
//Footer Custom logo width 
Newspaperup_Customizer_Control::add_field( 
	array(
		'type'     => 'newspaperup-range', 
        'settings'  => 'newspaperup_footer_main_logo_width',
        'label' => esc_html__('Width', 'newspaperup'),
		'section'  => 'footer_options', 
        'transport'   => 'postMessage',
        'media_query'   => true,
        'input_attr'    => array(
            'mobile'  => array(
                'min'           => 0,
                'max'           => 300,
                'step'          => 1,
                'default_value' => 130,
            ),
            'tablet'  => array(
                'min'           => 0,
                'max'           => 300,
                'step'          => 1,
                'default_value' => 170,
            ),
            'desktop' => array(
                'min'           => 0,
                'max'           => 300,
                'step'          => 1,
                'default_value' => 210,
            ),
        ),
    ),
);
Newspaperup_Customizer_Control::add_field( 
	array(
		'type'     => 'newspaperup-range', 
        'settings'  => 'newspaperup_footer_main_logo_height',
        'label' => esc_html__('Height', 'newspaperup'),
		'section'  => 'footer_options', 
        'transport'   => 'postMessage',
        'media_query'   => true,
        'input_attr'    => array(
            'mobile'  => array(
                'min'           => 0,
                'max'           => 300,
                'step'          => 1,
                'default_value' => 40,
            ),
            'tablet'  => array(
                'min'           => 0,
                'max'           => 300,
                'step'          => 1,
                'default_value' => 50,
            ),
            'desktop' => array(
                'min'           => 0,
                'max'           => 300,
                'step'          => 1,
                'default_value' => 70,
            ),
        ),
    ),
);
//Footer Content
Newspaperup_Customizer_Control::add_field(
	array(
		'type'     => 'hidden',
        'settings'  => 'footer_content_title',
        'label' => esc_html__('Content', 'newspaperup'),
		'section'  => 'footer_options',
        'sanitize_callback' => 'newspaperup_sanitize_text',
	)
);
//Footer Background image
Newspaperup_Customizer_Control::add_field( 
	array(
		'type'     => 'cropped_image', 
        'settings'  => 'newspaperup_footer_bg_img',
        'label' => esc_html__('Background Image', 'newspaperup'),
        'section'  => 'footer_options',
        'transport'  => 'postMessage',
        'default' => $newspaperup_default['newspaperup_footer_bg_img'], 
        'flex_width' => true,
        'flex_height' => true,
        'width' => 1600,
        'height' => 700,
	)
);
//Background Overlay
Newspaperup_Customizer_Control::add_field( 
	array(
		'type'     => 'color-alpha', 
        'settings'  => 'newspaperup_footer_overlay_color',
        'label' => esc_html__('Overlay Color', 'newspaperup'),
		'section'  => 'footer_options',
		'transport'  => 'postMessage', 
        'default' => '',
        'sanitize_callback' => 'newspaperup_sanitize_alpha_color',
	)
);
//Text Color 
Newspaperup_Customizer_Control::add_field( 
	array(
		'type'     => 'color-alpha', 
        'settings'  => 'newspaperup_footer_text_color',
        'label' => esc_html__('Text Color', 'newspaperup'),
		'section'  => 'footer_options',
		'transport'  => 'postMessage', 
        'default' => '',
        'sanitize_callback' => 'newspaperup_sanitize_alpha_color',
	)
);
// footer column layout
Newspaperup_Customizer_Control::add_field( 
	array(
		'type'     => 'select', 
        'settings'  => 'newspaperup_footer_column_layout',
        'transport'   => 'postMessage',
        'label' => esc_html__('Select Column Layout', 'newspaperup'),
		'section'  => 'footer_options', 
        'default' => '3',
        'is_text' => true, 
        'choices'   => array(
            '1' => '1',
            '2' => '2',
            '3' => '3',
            '4' => '4',
        ),
        'sanitize_callback' => 'newspaperup_sanitize_select',
	)
);
//Footer Copyright Section
Newspaperup_Customizer_Control::add_section(
	'footer_copyright',
	array(
		'title' => esc_html__( 'Copyright', 'newspaperup' ),  
        'priority' => 27,
        'capability' => 'edit_theme_options',
	)
);
//Enable and disable copyright
Newspaperup_Customizer_Control::add_field( 
	array(
		'type'     => 'toggle', 
        'settings'  => 'hide_copyright',
        'label' => esc_html__('Hide/Show', 'newspaperup'),
		'section'  => 'footer_copyright',
        'default' => true,
        'sanitize_callback' => 'newspaperup_sanitize_checkbox',
	)
); 
// Copyright Text
Newspaperup_Customizer_Control::add_field(
	array(
		'type'     => 'textarea', 
        'settings'  => 'newspaperup_footer_copyright',
        'label' => esc_html__('Copyright', 'newspaperup'),
		'section'  => 'footer_copyright',    
        'default' => $newspaperup_default['newspaperup_footer_copyright'],
        'sanitize_callback' => 'wp_kses_post',
	)
);
// Copyright bg color 
Newspaperup_Customizer_Control::add_field( 
	array(
		'type'     => 'color-alpha', 
        'settings'  => 'newspaperup_footer_copy_bg',
        'label' => esc_html__('Background Color', 'newspaperup'),
		'section'  => 'footer_copyright',
        'default' => $newspaperup_default['newspaperup_footer_copy_bg'],
        'sanitize_callback' => 'newspaperup_sanitize_alpha_color',
	)
);
// Copyright text color
Newspaperup_Customizer_Control::add_field( 
	array(
		'type'     => 'color-alpha', 
        'settings'  => 'newspaperup_footer_copy_text',
        'label' => esc_html__('Text Color', 'newspaperup'),
		'section'  => 'footer_copyright',
        'default' => $newspaperup_default['newspaperup_footer_copy_text'],
        'sanitize_callback' => 'newspaperup_sanitize_alpha_color',
	)
);