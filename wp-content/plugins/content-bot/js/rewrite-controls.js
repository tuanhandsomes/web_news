jQuery(function($){
  $('a#cb_rewrite_post').on('click', function(){
    $(this).html("Rewriting...");
    alert("Your content is being rewritten, please be patient while the AI is generating content.");
    $('body').css('pointer-events', 'none');
  })
})