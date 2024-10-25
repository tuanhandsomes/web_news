<?php

class CB_Rewriter {

  function __construct() {
    $this->id = false;;
    $this->post = false;
  }

  function get_id(){
    return $this->id;
  }

  function set_id($id){
    if(!empty($id)){
      $this->id = sanitize_text_field( $id );
    }
  }

  function rewritePost($post_id = false){

    add_filter('http_request_timeout', function ($timeout) {
      $newtimeout = 10;
      return $newtimeout;
    });

    if(!empty($post_id)){
      $post_id = sanitize_text_field( $post_id );
    } else {
      $post_id = sanitize_text_field( $this->id );
    }

    $post = sanitize_post( get_post( $post_id ) );
    if(empty($post)){
       
      wp_die( "Post not found." );
      
    }
  
    $postTitle = $post->post_title;

    $postAuthor = get_current_user_id();
  
    if(empty($postAuthor)){
  
      wp_die( "User not logged in." );
  
    }
  
    $postStatus = 'draft';
    $postType = $post->post_type;
  
   
    $url = $this->buildUrl($postTitle);

    if(!empty($url)){
  
      $response = $this->makeCall($url);
  
      if(!empty($response)){
  
        if (isset($response->output)) {
          
          $title = $response->output[0]->text;
    
        }
  
      } else {
  
        wp_die( "Title - Could not make the call" );
  
      }
  
    } else {
      
      wp_die( "Title - URL missing." );
  
    }
    
    $postSections = preg_split('/<br>|<br\\>|<br \\>|<\br>|<\/p>|\\r\\n|\\n/', $post->post_content);

    $content = '';
    if(!empty($postSections)){

      foreach($postSections as $section){

        if(strlen($section) > 0){
          $rewrittenSection = $this->rewriteContent($section);
  
          if(!empty($rewrittenSection)){
            $content .= "<p>{$rewrittenSection}</p>";
          }
        }

      }

    } else {

      wp_die( "Content - No sections found." );
      
    }
  
    $post_id = wp_insert_post(
      array(
        'post_author' => $postAuthor,
        'post_title' => $title,
        'post_content' => $content,
        'post_status' => $postStatus,
        'post_type' => $postType
      )
    );
  
    if(!empty($post_id)){
  
      echo("<script>location.href = '".admin_url() . "post.php?post={$post_id}&action=edit'</script>");
      // wp_redirect( admin_url() . "post.php?post={$post_id}&action=edit" );
      exit();
      
    } else {
  
      wp_die( "Failed to rewrite post/page." );
  
    }

  }

  function rewriteContent($content) {

    if(!empty($content)){

      $content = wp_strip_all_tags( $content );

      if(trim($content) == ''){
        // Skip because empty
        return false;
      }

      if(strlen($content) > 300){

        $rewrittenContent = '';
        $parts = [];
        $tempContent = $content;

        while(strlen($tempContent) > 300){
          
          $firstPart = substr($tempContent, 0, 300);
          $tempContent = substr($tempContent, 300);
  
          $endSentencePos = strpos($tempContent, '.');
          $continuedFirstPart = substr($tempContent, 0, $endSentencePos);

          array_push($parts, trim($firstPart) . ' ' . trim($continuedFirstPart));
  
          $tempContent = substr($tempContent, $endSentencePos+1);
          
        }

        foreach($parts as $part){

          $url = $this->buildUrl($part);
    
          if(!empty($url)){
        
            $response = $this->makeCall($url);
            
            if(!empty($response)){
        
              if (isset($response->output)) {
                
                $rewrittenContent .= $response->output[0]->text . ' ';
          
              }
        
            } else {

              wp_die( "Failed to rewrite the following content: {$part}");
        
            }

          }

        }

        return $rewrittenContent;

      } else {

        $url = $this->buildUrl($content);
        
        if(!empty($url)){
      
          $response = $this->makeCall($url);
          
          if(!empty($response)){
      
            if (isset($response->output)) {
              
              $rewrittenContent = $response->output[0]->text;
              return $rewrittenContent;
        
            }
      
          } else {

            wp_die( "Failed to rewrite the following content: {$content}");
      
          }

        } else {

          wp_die( "Content - URL missing." );

        }
    
      }
      
    } else {
      return false;
    }

  }
  
  function makeCall($url) {
  
    // $cURLConnection = curl_init();
  
    // curl_setopt($cURLConnection, CURLOPT_URL, $url);
    // curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);
  
    // $data = curl_exec($cURLConnection);
    // curl_close($cURLConnection);
  
    if(empty($url)){
      return false;
    }
    
    $response = wp_remote_get( $url );

    if(is_wp_error( $response )){
      
      wp_die( $response->get_error_message() );

    }
    
    $body = wp_remote_retrieve_body( $response );
    
    $jsonArrayResponse = json_decode($body);
    
    return $jsonArrayResponse;
  
  }
  
  function buildUrl($content) {

    $hash = get_option( 'cbai_hash' );
    if(empty($content) || empty($hash)){
      return false;
    }

    $data = array(
      'hash' => $hash,
      'ptype' => 'paraphrase_v3',
      'psubtype' => 1,
      'pcblock' => 'other',
      'pignoreratelimiting' => 1,
      'pcompletions' => 1,
      'pdesc' => $content,
    );
      
    $params = http_build_query($data);

    $url = "https://contentbot.us-3.evennode.com/api/v1/input?" . $params;
  
    return $url;
    
  }
  
}