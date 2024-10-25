<?php $newspaperup_background_image = get_theme_support( 'custom-header', 'default-image' );
if ( has_header_image() ) { $newspaperup_background_image = get_header_image(); } ?>
<div class="bs-breadcrumb-section">
  <div class="overlay">
    <div class="container">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <?php if( class_exists( 'WooCommerce' ) && is_shop() ) { ?>
              <h1>
                <?php woocommerce_page_title(); ?>
              </h1>
            <?php    
            } elseif(is_archive()) {
              $newspaperup_homelink = home_url('/');
              echo '<li class="breadcrumb-item"><a href="'.esc_url($newspaperup_homelink).'">'.esc_html__('Home','newspaperup').'</a></li>';
              the_archive_title( '<li class="breadcrumb-item active"><a href="'.esc_url($newspaperup_homelink).'">', '</a></li>' );
              the_archive_description( '<div class="archive-description">', '</div>' );
            } else { ?>
              <?php $newspaperup_homelink = home_url('/'); 
              echo '<li class="breadcrumb-item"><a href="'.esc_url($newspaperup_homelink).'">'.esc_html__('Home','newspaperup').'</a></li>'; ?>
              <li class="breadcrumb-item active"><a href="<?php the_permalink();?>"><?php the_title(); ?></a></li>
            <?php } ?>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</div>