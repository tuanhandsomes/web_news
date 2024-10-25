<?php
/**
 * The template for displaying the content.
 * @package Newspaperup
 */
$layout = esc_attr(newspaperup_get_option('newspaperup_archive_page_layout')) == 'full-width-content' ? '3': '2';
?>
<div id="grid" class="d-grid column<?php echo esc_attr($layout)?>">
    <?php while(have_posts()){ the_post(); ?>
        <?php get_template_part('sections/content','dataGrid'); ?>
    <?php } ?> 
</div>
<?php newspaperup_post_pagination();