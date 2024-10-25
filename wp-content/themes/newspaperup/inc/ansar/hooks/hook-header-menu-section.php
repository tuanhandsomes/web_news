<?php if (!function_exists('newspaperup_header_menu_section')) :
/**
 *  Header
 *
 * @since newspaperup
 *
 */
  function newspaperup_header_menu_section() {
    
    $home_icon_disable = get_theme_mod('newspaperup_home_icon',true); ?> 
    <div class="navbar-wp">
      <button class="menu-btn">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <nav id="main-nav" class="nav-wp justify-start">
        <?php newspaperup_target_element('panel', 'nav_menus', 'Click To Edit Menus.'); ?>
        <!-- Sample menu definition -->
        <?php 
          if(is_rtl()) { $smRTL = ' sm-rtl'; } else { $smRTL = ''; }
            wp_nav_menu( array(
              'theme_location' => 'primary',
              'container'  => '',
              'menu_class' =>'sm sm-clean'.$smRTL.'',
              'fallback_cb' => 'newspaperup_fallback_page_menu',
              'walker' => new newspaperup_nav_walker()
            ) ); 
          ?>
      </nav> 
    </div>
  <?php }
endif;
add_action('newspaperup_action_header_menu_section', 'newspaperup_header_menu_section', 6);


if (!function_exists('newspaperup_header_image_section')) :
  /**
   *  Header
   *
   * @since newspaperup
   *
   */
  function newspaperup_header_image_section() {
    $background_image = get_theme_support( 'custom-header', 'default-image' );
    $newspaperup_header_overlay_color = get_theme_mod('newspaperup_header_overlay_color');
    $remove_header_image_overlay = get_theme_mod('remove_header_image_overlay',false);
    if ( has_header_image() ) {
      $background_image = get_header_image(); 
      if($remove_header_image_overlay !== true) {
        $over_color = 'background-color:'.$newspaperup_header_overlay_color.'';
      } else { $over_color = ''; } ?>
      <div class="header-image-section" style="background:url('<?php echo esc_url( $background_image ); ?>') no-repeat center/cover;">
        <div class="overlay" style="<?php echo esc_attr( $over_color ); ?>">
        </div>
      </div>
    <?php } 
  }
endif;
add_action('newspaperup_action_header_image_section', 'newspaperup_header_image_section', 6);