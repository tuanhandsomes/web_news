<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @package Newsblogs
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="https://gmpg.org/xfn/11">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?> >
<?php wp_body_open(); ?>
<div id="page" class="site">
<a class="skip-link screen-reader-text" href="#content">
<?php _e( 'Skip to content', 'newsblogs' ); ?></a>
<div class="wrapper" id="custom-background-css">
  <!--header--> 
  <?php
  $newsblogs_main_banner_section_background_image = get_theme_mod('newsblogs_main_banner_section_background_image', '');
  function newsblogs_main_banner_section_background_image_url() {
    if ( get_theme_mod( 'newsblogs_main_banner_section_background_image' ) > 0 ) {
      return wp_get_attachment_url( get_theme_mod( 'newsblogs_main_banner_section_background_image' ) );
    }
  } 
  do_action('newsblogs_action_header_type_section');
  $newspaperup_enable_main_slider = newspaperup_get_option('show_main_banner_section');
  if(is_home() || is_front_page()) {
    if($newspaperup_enable_main_slider){ ?>
      <!--mainfeatured start-->
      <div class="mainfeatured two<?php if (!empty($newsblogs_main_banner_section_background_image)) { echo' over mt-0'; }?>" style="background-image: url('<?php echo esc_attr( newsblogs_main_banner_section_background_image_url() ); ?>')">
        <div class="featinner">
          <div class="container">
            <!--row-->  
            <div class="row">
              <?php do_action('newsblogs_action_front_page_main_section_1'); ?>
            </div><!--/row-->
          </div>
        </div>
      </div>
      <!--mainfeatured end-->
      <?php
    }
  }
?>