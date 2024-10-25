<?php
if (!function_exists('newsblogs_front_page_banner_section')) :
  /**
   *
   * @since newspaperup
   *
   */
  function newsblogs_front_page_banner_section() {
    if (is_front_page() || is_home()) {

      do_action('newsblogs_action_main_banner');
      do_action('newsblogs_action_banner_two');

    }
  }
endif;
add_action('newsblogs_action_front_page_main_section_1', 'newsblogs_front_page_banner_section', 40);

if (!function_exists('newsblogs_main_banner')) :

    function newsblogs_main_banner() {
        $newspaperup_slider_category = newspaperup_get_option('select_slider_news_category');
        $newspaperup_number_of_post = 5;
        $newspaperup_all_posts_main = newspaperup_get_posts($newspaperup_number_of_post, $newspaperup_slider_category);
        ?>
        <!--row-->
        <div class="col-lg-6">
        <div class="mb-0">
            <div class="homemain bs swiper-container">
            <div class="swiper-wrapper">
                <?php
                if ($newspaperup_all_posts_main->have_posts()) :
                while ($newspaperup_all_posts_main->have_posts()) : $newspaperup_all_posts_main->the_post(); 
                    newspaperup_slider_default_section();   
                endwhile;
                endif;
                wp_reset_postdata(); ?>
            </div>
            <!-- Add Arrows -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <!-- <div class="swiper-pagination"></div> -->
            </div>
            <!--/swipper-->
        </div>
        </div>
        <!--/col-12-->
        <?php
    }
endif;
add_action('newsblogs_action_main_banner', 'newsblogs_main_banner', 40);

if (!function_exists('newsblogs_banner_two')) :

    function newsblogs_banner_two() {
        ?>
        <div class="col-lg-6">
            <div class="multi-post-widget mb-0 mt-3 mt-lg-0">
                <div class="inner_columns two">
                    <?php do_action('newsblogs_action_banner_trending'); do_action('newsblogs_action_banner_editor');?>
                </div>
            </div>
        </div>
    <?php
    }
endif;
add_action('newsblogs_action_banner_two', 'newsblogs_banner_two', 40);


if (!function_exists('newsblogs_banner_editor')) :

    function newsblogs_banner_editor() {
        $slider_meta_enable = get_theme_mod('slider_meta_enable','true');
        // Editor
        $select_editor_news_category = newspaperup_get_option('select_editor_news_category');
        $editor_off = 0;
        $featured_editor_posts = newspaperup_get_posts( 2, $select_editor_news_category); 
        echo '<div class="d-grid">';
        if ($featured_editor_posts->have_posts()) :
        while ($featured_editor_posts->have_posts()) : $featured_editor_posts->the_post();
        if($editor_off >= 2){
            break;
        }
        global $post;
        $newspaperup_url = newspaperup_get_freatured_image_url($post->ID, 'newspaperup-slider-full');
        ?>
            <div class="bs-blog-post three bsm back-img bshre mb-0" <?php if (!empty($newspaperup_url)): ?>
                style="background-image: url('<?php echo esc_url($newspaperup_url); ?>');"
                <?php endif; ?>>
                <a class="link-div" href="<?php the_permalink(); ?>"> </a>
                <?php if($slider_meta_enable == true) { ?><?php newspaperup_post_categories(); ?> <?php } ?>
                <div class="inner">
                    <h4 class="title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                    <?php if($slider_meta_enable == true) { newspaperup_post_meta(); } ?>
                </div>
            </div>
        <?php endwhile;
            endif;
            wp_reset_postdata(); 
            echo "</div>";
    }
endif;
add_action('newsblogs_action_banner_editor', 'newsblogs_banner_editor', 40);

if (!function_exists('newsblogs_banner_trending')) :

    function newsblogs_banner_trending() {
        $slider_meta_enable = get_theme_mod('slider_meta_enable','true');
        // trending
        $select_trending_news_category = newspaperup_get_option('select_trending_news_category');
        $trending_off = 0;
        $featured_trending_posts = newspaperup_get_posts( 1, $select_trending_news_category); 
        if ($featured_trending_posts->have_posts()) :
        while ($featured_trending_posts->have_posts()) : $featured_trending_posts->the_post();
        if($trending_off >= 1){
            break;
        }
        global $post;
        $newspaperup_url = newspaperup_get_freatured_image_url($post->ID, 'newspaperup-slider-full');
        ?>
            <div class="bs-blog-post three lg back-img bshre mb-0" <?php if (!empty($newspaperup_url)): ?>
                style="background-image: url('<?php echo esc_url($newspaperup_url); ?>');"
                <?php endif; ?>>
                <a class="link-div" href="<?php the_permalink(); ?>"> </a>
                <?php if($slider_meta_enable == true) { ?><?php newspaperup_post_categories(); ?> <?php } ?>
                <div class="inner">
                    <h4 class="title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                    <?php if($slider_meta_enable == true) { newspaperup_post_meta(); } ?>
                </div>
            </div>
        <?php endwhile;
            endif;
            wp_reset_postdata();
    }
endif;
add_action('newsblogs_action_banner_trending', 'newsblogs_banner_trending', 40);