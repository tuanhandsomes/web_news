<?php

// Params for the chatbot (front and server)
define( 'MWAI_CHATBOT_FRONT_PARAMS', [ 'id', 'customId',
	'aiName', 'userName', 'guestName',
	'aiAvatar', 'userAvatar', 'guestAvatar',
	'aiAvatarUrl', 'userAvatarUrl', 'guestAvatarUrl',
	'textSend', 'textClear', 'imageUpload', 'fileSearch',
	'textInputPlaceholder', 'textInputMaxLength', 'textCompliance', 'startSentence', 'localMemory',
	'themeId', 'window', 'icon', 'iconText', 'iconTextDelay', 'iconAlt', 'iconPosition', 'iconBubble',
	'fullscreen', 'copyButton'
] );

define( 'MWAI_CHATBOT_SERVER_PARAMS', [ 'id', 'envId', 'scope', 'mode', 'contentAware', 'context',
	'embeddingsEnvId', 'embeddingsIndex', 'embeddingsNamespace', 'assistantId', 'instructions',
	'model', 'temperature', 'maxTokens', 'contextMaxLength', 'maxResults', 'apiKey', 'functions'
] );

// Params for the discussions (front and server)
define( 'MWAI_DISCUSSIONS_FRONT_PARAMS', [ 'themeId', 'textNewChat' ] );
define( 'MWAI_DISCUSSIONS_SERVER_PARAMS', [ 'customId' ] );

class Meow_MWAI_Modules_Chatbot {
	private $core = null;
	private $namespace = 'mwai-ui/v1';
	private $siteWideChatId = null;

	public function __construct() {
		global $mwai_core;
		$this->core = $mwai_core;
		$this->siteWideChatId = $this->core->get_option( 'botId' );

		add_shortcode( 'mwai_chatbot', array( $this, 'chat_shortcode' ) );
		add_shortcode( 'mwai_chatbot_v2', array( $this, 'old_chat_shortcode' ) );
		add_action( 'rest_api_init', array( $this, 'rest_api_init' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'register_scripts' ) );
		if ( $this->core->get_option( 'chatbot_discussions' ) ) {
      add_shortcode( 'mwai_discussions', [ $this, 'chatbot_discussions' ] );
    }
	}

	public function register_scripts() {
		// Load JS
		$physical_file = trailingslashit( MWAI_PATH ) . 'app/chatbot.js';	
		$cache_buster = file_exists( $physical_file ) ? filemtime( $physical_file ) : MWAI_VERSION;
		wp_register_script( 'mwai_chatbot', trailingslashit( MWAI_URL )
			. 'app/chatbot.js', [ 'wp-element' ], $cache_buster, false );

		// Actual loading of the scripts
		$hasSiteWideChat = $this->siteWideChatId && $this->siteWideChatId !== 'none';
		if ( is_admin() || $hasSiteWideChat ) {
			$this->enqueue_scripts();
			if ( $hasSiteWideChat ) {
				// Chatbot Injection
				add_action( 'wp_footer', array( $this, 'inject_chat' ) );
			}
		}
	}

	public function enqueue_scripts() {
		wp_enqueue_script( "mwai_chatbot" );
		if ( $this->core->get_option( 'syntax_highlight' ) ) {
			wp_enqueue_script( "mwai_highlight" );
		}
		$this->core->enqueue_themes();
	}

	public function rest_api_init() {
		register_rest_route( $this->namespace, '/chats/submit', array(
			'methods' => 'POST',
			'callback' => [ $this, 'rest_chat' ],
			'permission_callback' => array( $this->core, 'check_rest_nonce' )
		) );
	}

	public function basics_security_check( $botId, $customId, $newMessage, $newFileId ) {
		if ( !$botId && !$customId ) {
			Meow_MWAI_Logging::warn( "The query was rejected - no botId nor id was specified." );
			return false;
		}

		if ( $newFileId ) {
			return true;
		}

		$length = strlen( empty( $newMessage ) ? "" : $newMessage );
		if ( $length < 1 ) {
			Meow_MWAI_Logging::warn( "The query was rejected - message was too short." );
			return false;
		}
		return true;
	}

	public function build_final_res( $botId, $newMessage, $newFileId, $params, $reply, $images, $actions, $usage ) {
		$filterParams = [
			'step' => 'reply',
			'botId' => $botId,
			'reply' => $reply,
			'images' => $images,
			'newMessage' => $newMessage,
			'newFileId' => $newFileId,
			'params' => $params,
			'usage' => $usage,
		];
		$actions = apply_filters( 'mwai_chatbot_actions', $actions, $filterParams );
		$blocks = apply_filters( 'mwai_chatbot_blocks', [], $filterParams );
		$shortcuts = apply_filters( 'mwai_chatbot_shortcuts', [], $filterParams );
		$actions = $this->sanitize_actions( $actions );
		$blocks = $this->sanitize_blocks( $blocks );
		$shortcuts = $this->sanitize_shortcuts( $shortcuts );
		return [
			'success' => true,
			'reply' => $reply,
			'images' => $images,
			'actions' => $actions,
			'shortcuts' => $shortcuts,
			'blocks' => $blocks,
			'usage' => $usage
		];
	}

	public function rest_chat( $request ) {
		$params = $request->get_json_params();
		$botId = $params['botId'] ?? null;
		$customId = $params['customId'] ?? null;
		$stream = $params['stream'] ?? false;
		$newMessage = trim( $params['newMessage'] ?? '' );
		$newFileId = $params['newFileId'] ?? null;

		if ( !$this->basics_security_check( $botId, $customId, $newMessage, $newFileId )) {
			return new WP_REST_Response( [ 
				'success' => false, 
				'message' => apply_filters( 'mwai_ai_exception', 'Sorry, your query has been rejected.' )
			], 403 );
		}

		try {
			$data = $this->chat_submit( $botId, $newMessage, $newFileId, $params, $stream );
			$final_res = $this->build_final_res( $botId, $newMessage, $newFileId, $params,
				$data['reply'], $data['images'], $data['actions'], $data['usage'] );
			return new WP_REST_Response( $final_res, 200 );
		}
		catch ( Exception $e ) {
			$message = apply_filters( 'mwai_ai_exception', $e->getMessage() );
			return new WP_REST_Response( [ 
				'success' => false, 
				'message' => $message
			], 500 );
		}
	}

	private function sanitize_items( $items, $supported_types, $type_name ) {
		if ( empty( $items ) ) {
			return $items;
		}
		$sanitized_items = [];
 		foreach ( $items as $item ) {
			if ( isset( $supported_types[$item['type']] ) ) {
				$is_valid = true;
				foreach ( $supported_types[$item['type']] as $param ) {
					if ( !isset( $item['data'][$param] ) ) {
						$is_valid = false;
						Meow_MWAI_Logging::warn( "The query was rejected - missing required parameter '{$param}' for {$type_name} type: {$item['type']}." );
						break;
					}
				}
				if ( $is_valid ) {
					$sanitized_items[] = $item;
				}
			}
			else {
				Meow_MWAI_Logging::warn( "The query was rejected - unsupported {$type_name} type: {$item['type']}." );
			}
		}
		return $sanitized_items;
	}	
	
	public function sanitize_actions( $actions ) {
		$supported_action_types = [
			'function' => ['name', 'args'],
			'javascript' => ['snippet'],
		];
		return $this->sanitize_items( $actions, $supported_action_types, 'action' );
	}
	
	public function sanitize_blocks( $blocks ) {
		$supported_block_types = [
			'content' => ['html'],
		];
		return $this->sanitize_items( $blocks, $supported_block_types, 'block' );
	}	

	public function sanitize_shortcuts( $shortcuts ) {
		$supported_shortcut_types = [
			'message' => ['label', 'message'],
		];
		return $this->sanitize_items( $shortcuts, $supported_shortcut_types, 'shortcut' );
	}

	public function chat_submit( $botId, $newMessage, $newFileId = null, $params = [], $stream = false ) {
		try {
			$chatbot = null;
			$customId = $params['customId'] ?? null;

			// Custom Chatbot
			if ( $customId ) {
				$chatbot = get_transient( 'mwai_custom_chatbot_' . $customId );
			}
			// Registered Chatbot
			if ( !$chatbot && $botId ) {
				$chatbot = $this->core->get_chatbot( $botId );
			}

			if ( !$chatbot ) {
				Meow_MWAI_Logging::warn( "The query was rejected - no chatbot was found." );
				throw new Exception( 'Sorry, your query has been rejected.' );
			}

			$textInputMaxLength = $chatbot['textInputMaxLength'] ?? null;
			if ( $textInputMaxLength && $this->core->safe_strlen( $newMessage ) > (int)$textInputMaxLength ) {
				Meow_MWAI_Logging::warn( "The query was rejected - message was too long." );
				throw new Exception( 'Sorry, your query has been rejected.' );
			}
			
			// Create QueryText
			$context = null;
			$mode = $chatbot['mode'] ?? 'chat';

			if ( $mode === 'images' ) {
				$query = new Meow_MWAI_Query_Image( $newMessage );

				// Handle Params
				$newParams = [];
				foreach ( $chatbot as $key => $value ) {
					$newParams[$key] = $value;
				}
				foreach ( $params as $key => $value ) {
					$newParams[$key] = $value;
				}
				$params = apply_filters( 'mwai_chatbot_params', $newParams );
				$params['scope'] = empty( $params['scope'] ) ? 'chatbot' : $params['scope'];
				$query->inject_params( $params );
			}
			else {
				$query = $mode === 'assistant' ? new Meow_MWAI_Query_Assistant( $newMessage ) : 
					new Meow_MWAI_Query_Text( $newMessage, 1024 );
				$streamCallback = null;

				// Handle Params
				$newParams = [];
				foreach ( $chatbot as $key => $value ) {
					$newParams[$key] = $value;
				}
				foreach ( $params as $key => $value ) {
					$newParams[$key] = $value;
				}
				$params = apply_filters( 'mwai_chatbot_params', $newParams );
				$params['scope'] = empty( $params['scope'] ) ? 'chatbot' : $params['scope'];
				$query->inject_params( $params );

				$storeId = null;
				if ( $mode === 'assistant' ) {
					$chatId = $params['chatId'] ?? null;
					if ( !empty( $chatId ) ) {
						$discussion = $this->core->discussions->get_discussion( $query->botId, $chatId );
						if ( isset( $discussion['storeId'] ) ) {
							$storeId = $discussion['storeId'];
							$query->setStoreId( $storeId );
						}	
					}
				}

				// Support for Uploaded Image
				if ( !empty( $newFileId ) ) {

					// Get extension and mime type
					$isImage = $this->core->files->is_image( $newFileId );			

					if ( $mode === 'assistant' && !$isImage ) {
						$url = $this->core->files->get_path( $newFileId );
						$data = $this->core->files->get_data( $newFileId );
						$openai = Meow_MWAI_Engines_Factory::get_openai( $this->core, $query->envId );
						$filename = basename( $url );

						// Upload the file
						$file = $openai->upload_file( $filename, $data, 'assistants' );

						// Create a store
						if ( empty( $storeId ) ) {
							$chatbotName = 'mwai_' . strtolower( !empty( $chatbot['name'] ) ? $chatbot['name'] : 'default' );
							if ( !empty( $query->chatId ) ) {
								$chatbotName .= "_" . $query->chatId;
							}
							$metadata = [];
							if ( !empty( $chatbot['assistantId'] ) ) {
								$metadata['assistantId'] = $chatbot['assistantId'];
							}
							if ( !empty( $query->chatId ) ) {
								$metadata['chatId'] = $query->chatId;
							}
							$expiry = $this->core->get_option( 'image_expires' );
							$storeId = $openai->create_vector_store( $chatbotName, $expiry, $metadata );
							$query->setStoreId( $storeId );
						}	

						// Add the file to the store
						$storeFileId = $openai->add_vector_store_file( $storeId, $file['id'] );

						// Update the local file with the OpenAI RefId, StoreId and StoreFileId
						$openAiRefId = $file['id'];
						$internalFileId = $this->core->files->get_id_from_refId( $newFileId );
        		$this->core->files->update_refId( $internalFileId, $openAiRefId );
						$this->core->files->update_envId( $internalFileId, $query->envId );
						$this->core->files->update_purpose( $internalFileId, 'assistant-in' );
						$this->core->files->add_metadata( $internalFileId, 'assistant_storeId', $storeId );
						$this->core->files->add_metadata( $internalFileId, 'assistant_storeFileId', $storeFileId );
						$newFileId = $openAiRefId;
						$scope = $params['fileSearch'];
						if ( $scope === 'discussion' || $scope === 'user' || $scope === 'assistant' ) {
							$id = $this->core->files->get_id_from_refId( $newFileId );
							$this->core->files->add_metadata( $id, 'assistant_scope', $scope );
						}
					}
					else {
						$url = $this->core->files->get_url( $newFileId );
						$mimeType = $this->core->files->get_mime_type( $newFileId );
						$query->set_file( Meow_MWAI_Query_DroppedFile::from_url( $url, 'vision', $mimeType ) );
						$fileId = $this->core->files->get_id_from_refId( $newFileId );
						$this->core->files->update_envId( $fileId, $query->envId );
						$this->core->files->update_purpose( $fileId, 'vision' );
						$this->core->files->add_metadata( $fileId, 'query_envId', $query->envId );
						$this->core->files->add_metadata( $fileId, 'query_session', $query->session );
					}
				}

				// Takeover
				$takeoverAnswer = apply_filters( 'mwai_chatbot_takeover', null, $query, $params );
				if ( !empty( $takeoverAnswer ) ) {
					return [
						'reply' => $takeoverAnswer,
						'images' => null,
						'usage' => null
					];
				}

				// Moderation
				$moderationEnabled = $this->core->get_option( 'module_moderation' ) &&
					$this->core->get_option( 'shortcode_chat_moderation' );
				if ( $moderationEnabled ) {
					global $mwai;
					$isFlagged = $mwai->moderationCheck( $query->get_message() );
					if ( $isFlagged ) {
						throw new Exception( 'Sorry, your message has been rejected by moderation.' );
					}
				}

				// Awareness & Embeddings
				$context = $this->core->retrieve_context( $params, $query );
				if ( !empty( $context ) ) {
					$query->set_context( $context['content'] );
				}

				// Function Aware
				$query = apply_filters( 'mwai_chatbot_query', $query, $params );
			}

			// Process Query
			if ( $stream ) { 
				$streamCallback = function( $reply ) use ( $query ) {
					$raw = $reply;
					$this->core->stream_push( [ 'type' => 'live', 'data' => $raw ], $query );
					// if ( ob_get_level() > 0 ) {
					// 	ob_flush();
					// }
					// flush();
				};
				header( 'Cache-Control: no-cache' );
				header( 'Content-Type: text/event-stream' );
				// This is useful to disable buffering in nginx through headers.
				header( 'X-Accel-Buffering: no' );
				ob_implicit_flush( true );
				ob_end_flush();
			}

			$reply = $this->core->run_query( $query, $streamCallback, true );
			$rawText = $reply->result;
			$extra = [];
			if ( $context ) {
				$extra = [ 'embeddings' => isset( $context['embeddings'] ) ? $context['embeddings'] : null ];
			}
			$rawText = apply_filters( 'mwai_chatbot_reply', $rawText, $query, $params, $extra );

			$actions = [];
			if ( $reply->needClientActions ) {
				foreach ( $reply->needClientActions as $action ) {
					$actions[] = [
						'type' => 'function',
						'data' => [
							'name' => $action['function']->name,
							'args' => $action['arguments']
						]
					];
				}
			}

			$restRes = [
				'reply' => $rawText,
				'chatId' => $this->core->fix_chat_id( $query, $params ),
				'images' => $reply->get_type() === 'images' ? $reply->results : null,
				'actions' => $actions,
				'usage' => $reply->usage
			];

			// Process Reply
			if ( $stream ) {
				$final_res = $this->build_final_res( $botId, $newMessage, $newFileId, $params,
					$restRes['reply'], $restRes['images'], $restRes['actions'], $restRes['usage'] );
				$this->core->stream_push( [ 'type' => 'end', 'data' => json_encode( $final_res ) ], $query );
				die();
			}
			else {
				return $restRes;
			}

		}
		catch ( Exception $e ) {
			$message = apply_filters( 'mwai_ai_exception', $e->getMessage() );
			if ( $stream ) { 
				$this->core->stream_push( [ 'type' => 'error', 'data' => $message ], $query );
				die();
			}
			else {
				throw $e;
			}
		}
	}

	public function inject_chat() {
		$params = $this->core->get_chatbot( $this->siteWideChatId );
		$clean_params = [];
		if ( !empty( $params ) ) {
			$clean_params['window'] = true;
			$clean_params['id'] = $this->siteWideChatId;
			echo $this->chat_shortcode( $clean_params );
		}
		return null;
	}

	public function build_front_params( $botId, $customId ) {
		$frontSystem = [
			'botId' => $customId ? null : $botId,
			'customId' => $customId,
			'userData' => $this->core->get_user_data(),
			'sessionId' => $this->core->get_session_id(),
			'restNonce' => $this->core->get_nonce(),
			'contextId' => get_the_ID(),
			'pluginUrl' => MWAI_URL,
			'restUrl' => untrailingslashit( get_rest_url() ),
			'stream' => $this->core->get_option( 'ai_streaming' ),
			'debugMode' => $this->core->get_option('module_devtools') && $this->core->get_option( 'debug_mode' ),
			'speech_recognition' => $this->core->get_option( 'speech_recognition' ),
			'speech_synthesis' => $this->core->get_option( 'speech_synthesis' ),
			'typewriter' => $this->core->get_option( 'chatbot_typewriter' ),
			'virtual_keyboard_fix' => $this->core->get_option( 'virtual_keyboard_fix' )
		];
		return $frontSystem;
	}

  public function resolveBotInfo( &$atts )
  {
    $chatbot = null;
    $botId = $atts['id'] ?? null;
    $customId = $atts['custom_id'] ?? null;
    if (!$botId && !$customId) {
      $botId = "default";
    }
    if ( $botId ) {
      $chatbot = $this->core->get_chatbot( $botId );
      if (!$chatbot) {
        $botId = $botId ?: 'N/A';
        return [
          'error' => "AI Engine: Chatbot '{$botId}' not found. If you meant to set an ID for your custom chatbot, please use 'custom_id' instead of 'id'.",
        ];
      }
    }
    $chatbot = $chatbot ?: $this->core->get_chatbot( 'default' );
    if ( !empty( $customId ) ) {
      $botId = null;
    }
		unset( $atts['id'] );
    return [
      'chatbot' => $chatbot,
      'botId' => $botId,
      'customId' => $customId,
    ];
  }

	// TODO: After January 2025, remove this.
	public function old_chat_shortcode( $atts ) {
		Meow_MWAI_Logging::deprecated( "The shortcode 'mwai_chatbot_v2' is deprecated. Please use 'mwai_chatbot' instead." );
		return $this->chat_shortcode( $atts );
	}

	public function chat_shortcode( $atts ) {
		$atts = empty( $atts ) ? [] : $atts;

		// Let the user override the chatbot params
		$atts = apply_filters( 'mwai_chatbot_params', $atts );

    // Resolve the bot info
		$resolvedBot = $this->resolveBotInfo( $atts, 'chatbot' );
    if ( isset( $resolvedBot['error'] ) ) {
      return $resolvedBot['error'];
    }
    $chatbot = $resolvedBot['chatbot'];
    $botId = $resolvedBot['botId'];
    $customId = $resolvedBot['customId'];

		// Rename the keys of the atts into camelCase to match the internal params system.
		$atts = array_map( function( $key, $value ) {
			$key = str_replace( '_', ' ', $key );
			$key = ucwords( $key );
			$key = str_replace( ' ', '', $key );
			$key = lcfirst( $key );
			return [ $key => $value ];
		}, array_keys( $atts ), $atts );
		$atts = array_merge( ...$atts );

		$frontParams = [];
		foreach ( MWAI_CHATBOT_FRONT_PARAMS as $param ) {
			// Let's go through the overriden or custom params first (the ones passed in the shortcode)
			if ( isset( $atts[$param] ) ) {
				if ( $param === 'localMemory' ) {
					$frontParams[$param] = $atts[$param] === 'true';
				}
				else {
					$frontParams[$param] = $atts[$param];
				}
			}
			// If not, let's use the chatbot's default values
			else if ( isset( $chatbot[$param] ) ) {
				$frontParams[$param] = $chatbot[$param];
			}

			// Apply the placeholders
			if ( in_array( $param, ['startSentence', 'iconText'] ) ) {
				$frontParams[$param] = $this->core->do_placeholders( $frontParams[$param] );
			} 
		}

		// Server Params
		// NOTE: We don't need the server params for the chatbot if there are no overrides, it means
		// we are using the default or a specific chatbot.
		$isSiteWide = $this->siteWideChatId && $botId === $this->siteWideChatId;
		$hasServerOverrides = count( array_intersect( array_keys( $atts ), MWAI_CHATBOT_SERVER_PARAMS ) ) > 0;
		$hasFrontOverrides = count( array_intersect( array_keys( $atts ), MWAI_CHATBOT_FRONT_PARAMS ) ) > 0;
		$hasOverrides = !$isSiteWide && ( $hasServerOverrides || $hasFrontOverrides );

		$serverParams = [];
		if ( $hasOverrides ) {
			foreach ( MWAI_CHATBOT_SERVER_PARAMS as $param ) {
				if ( isset( $atts[$param] ) ) {
					$serverParams[$param] = $atts[$param];
				}
				else {
					$serverParams[$param] = $chatbot[$param] ?? null;
				}
			}
		}

		// Front Params
		$frontSystem = $this->build_front_params( $botId, $customId );

		// Clean Params
		$frontParams = $this->clean_params( $frontParams );
		$frontSystem = $this->clean_params( $frontSystem );
		$serverParams = $this->clean_params( $serverParams );

		// Server-side: Keep the System Params
		if ( $hasOverrides ) {
			if ( empty( $customId ) ) {
				$customId = md5( json_encode( $serverParams ) );
				$frontSystem['customId'] = $customId;
			}
			set_transient( 'mwai_custom_chatbot_' . $customId, $serverParams, 60 * 60 * 24 );
		}

		// Retrieve the actions, shortcuts, and blocks we want to inject at the beginning
		$filterParams = [
			'step' => 'init',
			'botId' => $botId,
			'params' => array_merge( $frontParams, $frontSystem, $serverParams )
		];
		$actions = apply_filters( 'mwai_chatbot_actions', [], $filterParams );
		$blocks = apply_filters( 'mwai_chatbot_blocks', [], $filterParams );
		$shortcuts = apply_filters( 'mwai_chatbot_shortcuts', [], $filterParams );
		$frontSystem['actions'] = $this->sanitize_actions( $actions );
		$frontSystem['blocks'] = $this->sanitize_blocks( $blocks );
		$frontSystem['shortcuts'] = $this->sanitize_shortcuts( $shortcuts );

		// Client-side: Prepare JSON for Front Params and System Params
		$theme = isset( $frontParams['themeId'] ) ? $this->core->get_theme( $frontParams['themeId'] ) : null;
		$jsonFrontParams = htmlspecialchars( json_encode( $frontParams ), ENT_QUOTES, 'UTF-8' );
		$jsonFrontSystem = htmlspecialchars( json_encode( $frontSystem ), ENT_QUOTES, 'UTF-8' );
		$jsonFrontTheme = htmlspecialchars( json_encode( $theme ), ENT_QUOTES, 'UTF-8' );
		//$jsonAttributes = htmlspecialchars(json_encode($atts), ENT_QUOTES, 'UTF-8');

		$this->enqueue_scripts();

		return "<div class='mwai-chatbot-container' data-params='{$jsonFrontParams}' data-system='{$jsonFrontSystem}' data-theme='{$jsonFrontTheme}'></div>";
	}

	function chatbot_discussions( $atts ) {
    $atts = empty($atts) ? [] : $atts;

    // Resolve the bot info
		$resolvedBot = $this->resolveBotInfo( $atts );
    if ( isset( $resolvedBot['error'] ) ) {
      return $resolvedBot['error'];
    }
    $chatbot = $resolvedBot['chatbot'];
    $botId = $resolvedBot['botId'];
    $customId = $resolvedBot['customId'];

		// Rename the keys of the atts into camelCase to match the internal params system.
		$atts = array_map( function( $key, $value ) {
			$key = str_replace( '_', ' ', $key );
			$key = ucwords( $key );
			$key = str_replace( ' ', '', $key );
			$key = lcfirst( $key );
			return [ $key => $value ];
		}, array_keys( $atts ), $atts );
		$atts = array_merge( ...$atts );

		// Front Params
		$frontParams = [];
		foreach ( MWAI_DISCUSSIONS_FRONT_PARAMS as $param ) {
			if ( isset( $atts[$param] ) ) {
				$frontParams[$param] = $atts[$param];
			}
			else if ( isset( $chatbot[$param] ) ) {
				$frontParams[$param] = $chatbot[$param];
			}
		}

		// Server Params
		$serverParams = [];
		foreach ( MWAI_DISCUSSIONS_SERVER_PARAMS as $param ) {
			if ( isset( $atts[$param] ) ) {
				$serverParams[$param] = $atts[$param];
			}
		}

		// Front System
		$frontSystem = $this->build_front_params( $botId, $customId );

    // Clean Params
		$frontParams = $this->clean_params( $frontParams );
		$frontSystem = $this->clean_params( $frontSystem );
		$serverParams = $this->clean_params( $serverParams );

    $theme = isset( $frontParams['themeId'] ) ? $this->core->get_theme( $frontParams['themeId'] ) : null;
		$jsonFrontParams = htmlspecialchars( json_encode( $frontParams ), ENT_QUOTES, 'UTF-8' );
		$jsonFrontSystem = htmlspecialchars( json_encode( $frontSystem ), ENT_QUOTES, 'UTF-8' );
		$jsonFrontTheme = htmlspecialchars( json_encode( $theme ), ENT_QUOTES, 'UTF-8' );

    return "<div class='mwai-discussions-container' data-params='{$jsonFrontParams}' data-system='{$jsonFrontSystem}' data-theme='{$jsonFrontTheme}'></div>";
  }

	function clean_params( &$params ) {
		foreach ( $params as $param => $value ) {
			if ( $param === 'restNonce' ) {
				continue;
			}
			if ( empty( $value ) || is_array( $value ) ) {
				continue;
			}
			$lowerCaseValue = strtolower( $value );
			if ( $lowerCaseValue === 'true' || $lowerCaseValue === 'false' || is_bool( $value ) ) {
				$params[$param] = filter_var( $value, FILTER_VALIDATE_BOOLEAN );
			}
			else if ( is_numeric( $value ) ) {
				$params[$param] = filter_var( $value, FILTER_VALIDATE_FLOAT );
			}
		}
		return $params;
	}
	
}
