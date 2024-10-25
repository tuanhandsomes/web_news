<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;
/**
 * Theme functions and definitions
 *
 * @package Newsblogs
 */

if ( ! function_exists( 'newsblogs_enqueue_styles' ) ) :
	/**
	 * @since 0.1
	*/
	function newsblogs_enqueue_styles() {
	wp_enqueue_style( 'newspaperup-style-parent', get_template_directory_uri() . '/style.css' );
	wp_enqueue_style( 'newsblogs-style', get_stylesheet_directory_uri() . '/style.css', array( 'newspaperup-style-parent' ), '1.0' );
	wp_enqueue_style( 'newsblogs-default-css', get_stylesheet_directory_uri()."/css/colors/default.css" );

	if(is_rtl()){
		wp_enqueue_style( 'newspaperup_style_rtl', trailingslashit( get_template_directory_uri() ) . 'style-rtl.css' );
	}
		
}

endif;
add_action( 'wp_enqueue_scripts', 'newsblogs_enqueue_styles', 9999 );

function newsblogs_theme_setup() {
	//Load text domain for translation-ready
	load_theme_textdomain('newsblogs', get_stylesheet_directory() . '/languages');
	require( get_stylesheet_directory() . '/customizer-options.php' );
	require( get_stylesheet_directory() . '/hooks/header-hook.php' );
	require( get_stylesheet_directory() . '/hooks/main-featured-slider-hook.php' );
	require( get_stylesheet_directory() . '/font.php' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
} 
add_action( 'after_setup_theme', 'newsblogs_theme_setup' );

function newsblogs_customizer_styles() {	?>
	<style>
		body #accordion-section-newspaperup_pro_upsell h3.accordion-section-title .button-secondary {
			background: linear-gradient(276deg, #f22d3a 0%, #150264 100%) !important; 
			border: 2px solid #f22d3a; 
		}
		body #accordion-section-newspaperup_pro_upsell h3.accordion-section-title .button-secondary:hover{
			color: #f22d3a !important;
			border-color: currentcolor;
		}
	</style>
	<?php
}
add_action('customize_controls_enqueue_scripts', 'newsblogs_customizer_styles');

/* Retrieve post's related content like, title, description, categories, meta  */
if (!function_exists('newspaperup_post_title_content')) :
    function newspaperup_post_title_content() {

        echo '<article class="small col">';
            if ((newspaperup_get_option('newspaperup_post_category') == true) && get_theme_mod('blog_post_layout','list-layout') == 'list-layout') {
                newspaperup_post_categories();
            } 
            if (get_theme_mod('blog_post_layout','list-layout') !== 'list-layout') { ?>
                <div class="title-wrap">
                    <h4 class="entry-title title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                    <div class="btn-wrap">
                        <a href="<?php the_permalink(); ?>"><i class="fas fa-arrow-right"></i></a>
                    </div>
                </div> 
            <?php } else { ?>
                <h4 class="entry-title title"><a href="<?php the_permalink(); ?>"><?php the_title();?></a></h4><?php
            }
            newspaperup_posted_content(); wp_link_pages( ); 
            $newspaperup_enable_post_meta = newspaperup_get_option('newspaperup_enable_post_meta');
            if ($newspaperup_enable_post_meta == true) {
                newspaperup_post_meta();
            }
        echo '</article>'; 
    }
endif;
