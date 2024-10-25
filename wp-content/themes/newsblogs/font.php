<?php
/*--------------------------------------------------------------------*/
/*     Register Google Fonts
/*--------------------------------------------------------------------*/
function newsblogs_fonts_url() {
	
    $fonts_url = '';
		
    $font_families = array();
 
	$font_families = array('Libre Baskerville:300,400,500,600,700,800,900|Epilogue:400,500,700');
 
        $query_args = array(
            'family' => urlencode( implode( '|', $font_families ) ),
            'subset' => urlencode( 'latin,latin-ext' ),
        );
 
        $fonts_url = add_query_arg( $query_args, '//fonts.googleapis.com/css' );

    return $fonts_url;
}
function newsblogs_scripts_styles() {
    wp_enqueue_style( 'newsblogs-fonts', newsblogs_fonts_url(), array(), null );
}
add_action( 'wp_enqueue_scripts', 'newsblogs_scripts_styles' );