<?php if (!function_exists('newsblogs_header_type_section')) :
/**
 *  Header
 *
 * @since Newsblogs
 *
 */
function newsblogs_header_type_section(){

  do_action('newspaperup_action_header_image_section'); ?>
  <!--header-->
  <header class="bs-headfive">
    <!-- Header Top -->
  <div class="bs-header-main">  
    <div class="inner">
      <div class="container">
        <div class="row align-center">
          <div class="col-lg-4 d-none d-lg-block">
            <?php if(get_theme_mod('social_icon_header_enable', true) == true) { do_action('newspaperup_action_social_section'); } ?>           
          </div>
          <div class="logo col-lg-4 col-6 d-flex justify-center">
            <!-- logo Area-->
            <?php do_action('newspaperup_action_header_logo_section'); ?>
            <!-- /logo Area-->
          </div>
          <!--col-lg-4-->
          <div class="col-lg-4 col-6 d-flex justify-end">
          <!-- Right Area-->
            <?php do_action('newspaperup_action_header_right_menu_section'); ?>
          <!-- Right-->
          </div>
          <!--/col-lg-6-->
        </div>
      </div>
    </div>
  </div>
  <!-- /Header Top -->         
    <!-- Header bottom -->
  <?php $sticky_header_toggle = get_theme_mod('sticky_header_toggle', false);
  if ($sticky_header_toggle == true) { $sticky_header = get_theme_mod('sticky_header_option', 'default') == 'default' ? ' sticky-header' : ' scroll-up'; } else { $sticky_header =''; } ?>
  <div class="bs-menu-full<?php echo esc_attr($sticky_header); ?>">
    <div class="container">
      <div class="main-nav d-flex align-center"> 
        <!-- Main Menu Area-->
        <?php do_action('newspaperup_action_header_menu_section'); ?>
        <!-- /Main Menu Area-->
      </div>
    </div>
  </div><!-- /Header bottom -->
  </header><?php
}
endif;
add_action('newsblogs_action_header_type_section', 'newsblogs_header_type_section', 6);