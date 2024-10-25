/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

function galaxis_colors_live_update( id, selector, property, default_value, get_value ) {
	default_value = typeof default_value !== 'undefined' ? default_value : 'initial';
	get_value = typeof get_value !== 'undefined' ? get_value : '';

	wp.customize( 'galaxis_colors[' + id + ']', function( value ) {
		value.bind( function( newval ) {
			default_value = ( '' !== get_value ) ? wp.customize.value('galaxis_colors[' + get_value + ']')() : default_value;
			newval = ( '' !== newval ) ? newval : default_value;

			if ( jQuery( 'style#' + id ).length ) {
				jQuery( 'style#' + id ).html( selector + '{' + property + ':' + newval + ';}' );
			} else {
				jQuery( 'head' ).append( '<style id="' + id + '">' + selector + '{' + property + ':' + newval + '}</style>' );
				setTimeout(function() {
					jQuery( 'style#' + id ).not( ':last' ).remove();
				}, 1000);
			}
		} );
	} );
}

( function( $ ) {
	// Site title and description.
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title > a' ).html( to );
		} );
	} );
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	} );

	// Colors.
	var galaxisDefaultColors = galaxis['default_colors'];

	galaxis_colors_live_update( 'topbar_bg_color', '.site-topbar', 'background-color', galaxisDefaultColors['topbar_bg_color'] );

	galaxis_colors_live_update( 'back_to_top_bg_color', '.back-to-top', 'background-color', galaxisDefaultColors['back_to_top_bg_color'] );

	galaxis_colors_live_update( 'back_to_top_hover_bg_color', '.back-to-top:hover', 'background-color', galaxisDefaultColors['back_to_top_hover_bg_color'] );

	galaxis_colors_live_update( 'footer_bg_color', '.site-footer__text', 'background-color', galaxisDefaultColors['footer_bg_color'] );

	galaxis_colors_live_update( 'selection_bg_color', '::selection', 'background', galaxisDefaultColors['selection_bg_color'] );

} )( jQuery );
