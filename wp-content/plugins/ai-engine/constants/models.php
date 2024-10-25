<?php

// Price as of June 2024: https://openai.com/api/pricing/

define( 'MWAI_OPENAI_MODELS', [
  // Base models:
	[
		"model" => "gpt-4o",
		"name" => "GPT-4o",
		"family" => "gpt4",
		"features" => ['completion'],
		"price" => [
			"in" => 5.00,
			"out" => 15.00,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"maxCompletionTokens" => 16384,
		"maxContextualTokens" => 128000,
		"finetune" => false,
		"tags" => ['core', 'chat', 'vision', 'functions', 'json', 'finetune']
	],
	[
		"model" => "gpt-4o-mini",
		"name" => "GPT-4o Mini",
		"family" => "gpt4",
		"features" => ['completion'],
		"price" => [
			"in" => 0.15,
			"out" => 0.60,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"maxCompletionTokens" => 16384,
		"maxContextualTokens" => 128000,
		"finetune" => [
			"in" => 0.30,
			"out" => 1.20,
			"train" => 3.00
		],
		"tags" => ['core', 'chat', 'vision', 'functions', 'json', 'finetune']
	],
	[
		"model" => "o1-preview",
		"name" => "o1 Preview",
		"family" => "o1",
		"features" => ['completion'],
		"price" => [
			"in" => 15.00,
			"out" => 60.00,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"maxCompletionTokens" => 32768,
		"maxContextualTokens" => 128000,
		"tags" => ['core', 'chat', 'o1-model']
	],
	[
		"model" => "o1-mini",
		"name" => "o1 Mini",
		"family" => "o1",
		"features" => ['completion'],
		"price" => [
			"in" => 3.00,
			"out" => 12.00,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"maxCompletionTokens" => 65536,
		"maxContextualTokens" => 128000,
		"tags" => ['core', 'chat', 'o1-model']
	],
	[
		"model" => "gpt-4-turbo",
		"name" => "GPT-4 Turbo",
		"family" => "gpt4",
		"features" => ['completion'],
		"price" => [
			"in" => 10.00,
			"out" => 30.00,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"maxCompletionTokens" => 4096,
		"maxContextualTokens" => 128000,
		"finetune" => false,
		"tags" => ['core', 'chat', 'vision', 'functions', 'json']
	],
	[ 
		"model" => "gpt-4",
		"name" => "GPT-4",
		"family" => "gpt4",
		"features" => ['completion'],
		"price" => [
			"in" => 30.00,
			"out" => 60.00,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"maxTokens" => 8192,
		"finetune" => false,
		"tags" => ['core', 'chat', 'functions']
	],
	[ 
		"model" => "gpt-4-32k",
		"name" => "GPT-4 32k",
		"family" => "gpt4-32k",
		"features" => ['completion'],
		"price" => [
			"in" => 60.00,
			"out" => 120.00,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"maxTokens" => 32768,
		"finetune" => false,
		"tags" => ['core', 'chat']
	],
	[ 
		"model" => "gpt-3.5-turbo",
		"name" => "GPT-3.5 Turbo",
		"family" => "turbo",
		"features" => ['completion'],
		"price" => [
			"in" => 0.50,
			"out" => 1.50,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"maxTokens" => 4096,
		"finetune" => [
			"in" => 3.00,
			"out" => 6.00,
			"train" => 8.00
		],
		"tags" => ['core', 'chat', '4k', 'finetune', 'functions']
	],
	[ 
		"model" => "gpt-3.5-turbo-16k",
		"description" => "Offers 4 times the context length of gpt-3.5-turbo at twice the price.",
		"name" => "GPT-3.5 Turbo 16k",
		"family" => "turbo",
		"features" => ['completion'],
		"price" => [
			"in" => 30.00,
			"out" => 40.0,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"maxTokens" => 16385,
		"finetune" => false,
		"tags" => ['core', 'chat', '16k']
	],
	[
		"model" => "gpt-3.5-turbo-instruct",
		"name" => "GPT-3.5 Turbo Instruct",
		"family" => "turbo-instruct",
		"features" => ['completion'],
		"price" => [
			"in" => 0.50,
			"out" => 2.00,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"finetune" => [
			"in" => 0.03,
			"out" => 0.06,
		],
		"maxTokens" => 4096,
		"tags" => ['core', 'chat', '4k']
	],
  // Image models:
  [
		"model" => "dall-e",
		"name" => "DALL-E 2",
		"family" => "dall-e",
		"features" => ['text-to-image'],
		"resolutions" => [
			[
				"name" => "256x256",
				"label" => "256x256",
				"price" => 0.016
			],
			[
				"name" => "512x512",
				"label" => "512x512",
				"price" => 0.018
			],
			[
				"name" => "1024x1024",
				"label" => "1024x1024",
				"price" => 0.020
			]
		],
		"type" => "image",
		"unit" => 1,
		"finetune" => false,
		"tags" => ['core', 'image', 'deprecated']
  ],
	[
		"model" => "dall-e-3",
		"name" => "DALL-E 3",
		"family" => "dall-e",
		"features" => ['text-to-image'],
		"resolutions" => [
			[
				"name" => "1024x1024",
				"label" => "1024x1024",
				"price" => 0.040
			],
			[
				"name" => "1024x1792",
				"label" => "1024x1792",
				"price" => 0.080
			],
			[
				"name" => "1792x1024",
				"label" => "1792x1024",
				"price" => 0.080
			]
		],
		"type" => "image",
		"unit" => 1,
		"finetune" => false,
		"tags" => ['core', 'image']
  ],
	[
		"model" => "dall-e-3-hd",
		"name" => "DALL-E 3 (HD)",
		"family" => "dall-e",
		"features" => ['text-to-image'],
		"resolutions" => [
			[
				"name" => "1024x1024",
				"label" => "1024x1024",
				"price" => 0.080
			],
			[
				"name" => "1024x1792",
				"label" => "1024x1792",
				"price" => 0.120
			],
			[
				"name" => "1792x1024",
				"label" => "1792x1024",
				"price" => 0.120
			]
		],
		"type" => "image",
		"unit" => 1,
		"finetune" => false,
		"tags" => ['core', 'image']
  ],
	// Embedding models:
	[
		"model" => "text-embedding-3-small",
		"name" => "Embedding 3-Small",
		"family" => "text-embedding",
		"features" => ['embedding'],
		"price" => 0.02,
		"type" => "token",
		"unit" => 1 / 1000000,
		"finetune" => false,
		"dimensions" => [ 512, 1536 ],
		"tags" => ['core', 'embedding'],
	],
	[
		"model" => "text-embedding-3-large",
		"name" => "Embedding 3-Large",
		"family" => "text-embedding",
		"features" => ['embedding'],
		"price" => 0.13,
		"type" => "token",
		"unit" => 1 / 1000000,
		"finetune" => false,
		"dimensions" => [ 256, 1024, 3072 ],
		"tags" => ['core', 'embedding'],
	],
	[
		"model" => "text-embedding-ada-002",
		"name" => "Embedding Ada-002",
		"family" => "text-embedding",
		"features" => ['embedding'],
		"price" => 0.10,
		"type" => "token",
		"unit" => 1 / 1000000,
		"finetune" => false,
		"dimensions" => [ 1536 ],
		"tags" => ['core', 'embedding'],
	],
	// Audio Models:
	[
		"model" => "whisper-1",
		"name" => "Whisper",
		"family" => "whisper",
		"features" => ['speech-to-text'],
		"price" => 0.006,
		"type" => "second",
		"unit" => 1,
		"finetune" => false,
		"tags" => ['core', 'audio'],
	]
]);

define ( 'MWAI_ANTHROPIC_MODELS', [
	[
		"model" => "claude-3-5-sonnet-20240620",
		"name" => "Claude-3.5 Sonnet",
		"family" => "claude",
		"features" => ['completion'],
		"price" => [
			"in" => 3.00,
			"out" => 15.00,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"maxCompletionTokens" => 4096,
		"maxContextualTokens" => 200000,
		"finetune" => false,
		"tags" => ['core', 'chat', 'vision', 'functions']
	],
	[
		"model" => "claude-3-opus-20240229",
		"name" => "Claude-3 Opus",
		"family" => "claude",
		"features" => ['completion'],
		"price" => [
			"in" => 15.00,
			"out" => 75.00,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"maxCompletionTokens" => 4096,
		"maxContextualTokens" => 200000,
		"finetune" => false,
		"tags" => ['core', 'chat', 'vision', 'functions']
	],
	[
		"model" => "claude-3-sonnet-20240229",
		"name" => "Claude-3 Sonnet",
		"family" => "claude",
		"features" => ['completion'],
		"price" => [
			"in" => 3.00,
			"out" => 15.00,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"maxCompletionTokens" => 4096,
		"maxContextualTokens" => 200000,
		"finetune" => false,
		"tags" => ['core', 'chat', 'vision', 'functions', 'deprecated']
	],
	[
		"model" => "claude-3-haiku-20240307",
		"name" => "Claude-3 Haiku",
		"family" => "claude",
		"features" => ['completion'],
		"price" => [
			"in" => 0.25,
			"out" => 1.25,
		],
		"type" => "token",
		"unit" => 1 / 1000000,
		"maxCompletionTokens" => 4096,
		"maxContextualTokens" => 200000,
		"finetune" => false,
		"tags" => ['core', 'chat', 'vision', 'functions']
	],
]);