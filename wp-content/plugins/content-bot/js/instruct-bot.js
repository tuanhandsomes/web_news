/**
 * Dashboard
 *
 * Version: 1.0.21
 * 
 * First build: 2023-06-22
 * Last update: 2023-07-11
 * 
 * 1.0.0
 * Debut
 * 
 * 1.0.1
 * Added first time user input prompt
 * Fixed issue where stored past variables wasn't being populated
 * 
 * 1.0.2
 * Added Exporting chats functionality
 * Added saving chats as documents
*/

class Dashboard{

	static API_HOST = 'https://contentbot.ai/app/api/';
	static cb_HOST = 'https://contentbot.us-3.evennode.com/api/v1/';
	static cb_HOST_BETA = 'https://contentbot-beta.eu-4.evennode.com/api/v1/';
	static EXPORT_LINK = 'https://contentbot.ai/app/document-export.php';


	static cb_icon_url = cbai_instruct_data.location + '/img/cb-icon.svg';

	static variableRegExp = new RegExp('\{[a-z0-9(\\s)]+\}', 'gi');

	/**
	 * Cosntructor 
	*/
	constructor(options){
		this.init();

		if(typeof $ === 'undefined'){
			console.error("jQuery is not present, article editor could not be initialized");
			return;
		}
	}

	/**
	 * Initialize defaults, state trackers and instance variables
	 * 
	 * @return void
	*/
	init(){
        
        $ = jQuery;

		/* 
		* Default states for page load
		*/
		this.state = {
			busy : false,
			started : false,
			failedAttempts : 0
		}
		
		this.data = {};
		this.data.documentID = false;

		this.data.prompt = false;
		this.data.variables = false;
		this.data.amount = 750;
		this.data.keepContext = true;
		this.data.history = [];
		this.data.model = 'open_prompt_v2';

		this.data.previousOutput = false;
		this.data.previousURL = false;
		
		this.data.languageOptions = {
			languageService : 'google',
			languageSource : '',
			languageTarget : '',
			languageFormality : ''
		};

		this.data.languages = {
			googleLanguages : '<option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="am">Amharic</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bn">Bengali</option><option value="bs">Bosnian</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="ceb">Cebuano</option><option value="ny">Chichewa</option><option value="zh">Chinese (Simplified)</option><option value="zh-TW">Chinese (Traditional)</option><option value="co">Corsican</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en" selected="selected">English</option><option value="eo">Esperanto</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="fy">Frisian</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="gu">Gujarati</option><option value="ht">Haitian Creole</option><option value="ha">Hausa</option><option value="haw">Hawaiian</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hmn">Hmong</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="ig">Igbo</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="jw">Javanese</option><option value="kn">Kannada</option><option value="kk">Kazakh</option><option value="km">Khmer</option><option value="rw">Kinyarwanda</option><option value="ko">Korean</option><option value="ku">Kurdish (Kurmanji)</option><option value="ky">Kyrgyz</option><option value="lo">Lao</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="lb">Luxembourgish</option><option value="mk">Macedonian</option><option value="mg">Malagasy</option><option value="ms">Malay</option><option value="ml">Malayalam</option><option value="mt">Maltese</option><option value="mi">Maori</option><option value="mr">Marathi</option><option value="mn">Mongolian</option><option value="my">Myanmar (Burmese)</option><option value="ne">Nepali</option><option value="no">Norwegian</option><option value="or">Odia (Oriya)</option><option value="ps">Pashto</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="pa">Punjabi</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sm">Samoan</option><option value="gd">Scots Gaelic</option><option value="sr">Serbian</option><option value="st">Sesotho</option><option value="sn">Shona</option><option value="sd">Sindhi</option><option value="si">Sinhala</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="so">Somali</option><option value="es">Spanish</option><option value="su">Sundanese</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="tg">Tajik</option><option value="ta">Tamil</option><option value="tt">Tatar</option><option value="te">Telugu</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="tk">Turkmen</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="ug">Uyghur</option><option value="uz">Uzbek</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="xh">Xhosa</option><option value="yi">Yiddish</option><option value="yo">Yoruba</option><option value="zu">Zulu</option>',
			deeplLanguages : '<option value="BG">Bulgarian</option><option value="ZH">Chinese</option><option value="CS">Czech</option><option value="DA">Danish</option><option value="NL">Dutch</option><option value="EN-US" selected>English (US)</option><option value="EN-GB">English (GB)</option><option value="ET">Estonian</option><option value="FI">Finnish</option><option value="FR">French</option><option value="DE">German</option><option value="EL">Greek</option><option value="HU">Hungarian</option><option value="IT">Italian</option><option value="JA">Japanese</option><option value="LV">Latvian</option><option value="LT">Lithuanian</option><option value="PL">Polish</option><option value="PT-PT">Portuguese</option><option value="PT-BR">Portuguese (Brazilian)</option><option value="RO">Romanian</option><option value="RU">Russian</option><option value="SK">Sloak</option><option value="SL">Slovenian</option><option value="ES">Spanish</option><option value="SV">Swedish</option>',
			watsonLanguages : "<option value='ar'>Arabic</option><option value='eu'>Basque</option><option value='bg'>Bulgarian</option><option value='bn'>Bengali</option><option value='bs'>Bosnian</option><option value='ca'>Catalan</option><option value='zh'>Chinese (Simplified)</option><option value='zh-TW'>Chinese (Traditional)</option><option value='hr'>Croatian</option><option value='cs'>Czech</option><option value='da'>Danish</option><option value='nl'>Dutch</option><option value='en' selected>English</option><option value='et'>Estonian</option><option value='fi'>Finnish</option><option value='fr-CA'>French (Canada)</option><option value='fr'>French</option><option value='de'>German</option><option value='el'>Greek</option><option value='gu'>Gujarati</option><option value='he'>Hebrew</option><option value='hi'>Hindi</option><option value='hu'>Hungarian</option><option value='ga'>Irish</option><option value='id'>Indonesian</option><option value='it'>Italian</option><option value='ja'>Japanese</option><option value='ko'>Korean</option><option value='lt'>Lithuanian</option><option value='lv'>Latvian</option><option value='ml'>Malayalam</option><option value='ms'>Malay</option><option value='mt'>Maltese</option><option value='cnr'>Montenegrin</option><option value='ne'>Nepali</option><option value='nb'>Norwegian Bokmal</option><option value='pl'>Polish</option><option value='pt'>Portuguese</option><option value='ro'>Romanian</option><option value='ru'>Russian</option><option value='sr'>Serbian</option><option value='si'>Sinhala</option><option value='sk'>Slovakian</option><option value='sl'>Slovenian</option><option value='es'>Spanish</option><option value='sv'>Swedish</option><option value='ta'>Tamil</option><option value='te'>Telugu</option><option value='th'>Thai</option><option value='tr'>Turkish</option><option value='uk'>Ukrainian</option><option value='ur'>Urdu</option><option value='vi'>Vietnamese</option><option value='cy'>Welsh</option>",
		}

		this.data.limits = {
			open_prompt_v2 : {
				max : 4096, // Tokens
				words : 3050,
				remaining : 3050,
				percent_remaining : 100
				// words : 4096 * 0.75,
				// remaining : 4096 * 0.75
			},

			open_prompt_v4 : {
				max : 8192, // Tokens
				words : 6100,
				remaining : 6100,
				percent_remaining : 100
				// words : 8192 * 0.75,
				// remaining : 8192 * 0.75

			}
		}

		this.data.uploadedData = false;
		this.data.fileDetails = false;
		this.data.useFileData = false;

		this.onReady();
	}

	/**
	 * OnReady delegate, completes the initialization
	 * 
	 * @return void
	*/
	onReady(){
		this.findElements();
		this.bindEvents();

		this.populateLanguageOptions();

		// this.bindInstructTemplates();

		// $('[data-toggle="tooltip"]').tooltip({
		// 	html : true
		// });

		this.checkPreFill();

		this.elements.model.val('open_prompt_v2');

		this.elements.input.focus();
	}



	/**
	 * Find the relevant elements within the dom
	 * 
	 * @return void
	*/
	findElements(){

		this.elements = {};

		this.elements.main = $('#cbaiInstructPage');

		this.elements.inputSection = $('#cbaiInstructInput');

		this.elements.libraryClose = $('#cbaiLibraryClose');
		this.elements.library = $('#cbaiLibrary');
		
		
		this.elements.inputPromptNotice = $('#inputPromptNotice');
		
		this.elements.regenerateButton = $('#regenerate');
        
		this.elements.instructButton = $('#cbaiInstruct');
		this.elements.input = $('#cbaiInstructInputField');
        
		this.elements.limitWarning = $('.limitWarning');
		this.elements.limitWarningValue = $('.limitWarning .limit');

		this.elements.libraryInputButton = $('#cbaiLibraryButton');

		this.elements.advancedOptionsButton = $('#cbaiAdvancedOptions');
		this.elements.advancedOptionsClose = $('#cbaiInstructAdvancedOptionsModalClose');
		this.elements.advancedOptions = $('.cbaiInstructAdvancedOptionsContainer');
		this.elements.keepContext = $('#keepContext');
		this.elements.outputLengthSlider = $('input#outputLengthSlider');
		this.elements.outputLengthSliderNote = $('#outputLengthSliderUpdate');
		this.elements.model = $('#cbaiInstructModel');

		this.elements.variablesButton = $('#cbaiVariables');
		this.elements.variablesClose = $('#cbaiInstructInputExtrasClose');
		this.elements.variablesContainer = $('.cbaiInstructInputExtras');

		// this.elements.startOver = $('#startOver');

		// this.elements.uploadForm = $('form#chatUploadForm');
		// this.elements.uploadFormSubmit = $('#chatUploadFile');
		// this.elements.fileInput = $('input#file');
		// this.elements.fileTypeAccepts = $('.fileTypeAccepts');
		// this.elements.uploadFileButton = $('#uploadFile');
		// this.elements.uploadFileModal = $('#uploadFileModalCenter');
		// this.elements.uploadFileModalClose = $('#uploadFileModalCenter .close');
		
		this.elements.languageSelected = $('#languageSelected');
		this.elements.languageService = $('#cbaiLanguageService');
		this.elements.languageSource = $('#cbaiLanguageSource');
		this.elements.languageTarget = $('#cbaiLanguageTarget');
		this.elements.languageFormality = $('#cbaiLanguageFormality');
		this.elements.formalityHelper = $('#cbaiLanguageFormalityHelper');

		this.elements.instructDisplay = $('.cbaiInstructDisplay');

		this.elements.thinkingRow = $(`
			<div class="cbaiInstructRow cbaiInstructThinkingRow" data-type="assistant">
				<div class="cbaiInstructRowInner col-xl-6 col-lg-8 col-md-10 col-sm-11">
					<div class="cbaiInstructRowIcon">
						<img src="https://contentbot.ai/assets/img/contentbotnewwhite.svg">
					</div>
					<div class="cbaiInstructRowOutput">
						<div class="ml-1 cbia-snippet" data-title="cbai-dot-flashing">
							<div class="cbia-stage">
								<div class="cbai-dot-flashing"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`)

	}

	/**
	 * Bind all the events
	 * 
	 * @return void
	*/
	bindEvents(){

		this.elements.libraryInputButton.on('click', (event) => {
			window.open('https://contentbot.ai/chatgpt-prompts', '_BLANK');
			// this.toggleLibrary();
		})

		$(document).on('click', '.navigator-card-body .card', (event) => {
			let el = $(event.currentTarget).find('.navigator-action');

			if(el[0] == this.elements.libraryButton[0]){
				this.toggleLibrary();
				return;
			}

			let link = el.attr('data-link');
			if(typeof link != 'undefined' && link != null && link.trim() != ''){
				window.location.href = link;
			} else {
				let text = el.attr('data-text');
				this.elements.input.val(text).focus();
			}	
		})

		this.elements.instructButton.on('click', (event) => {
			this.instruct();
		})

		this.elements.input.on('focus', (event) => {
			if(this.elements.advancedOptions.hasClass('show')){
				this.elements.advancedOptionsClose.click();
			}
		})

		this.elements.input.keydown((event) => {			
			let keycode = (event.keyCode ? event.keyCode : event.which);

			if(keycode == 13 && !event.ctrlKey){
				if($(event.target).val().trim() == ''){
					return;
				}

				event.preventDefault();
				this.instruct(); 
			} else if(keycode == 13 && event.ctrlKey){
				this.elements.input.val(function(i,val){
					return val + "\n";
				});
			}
		})

		this.elements.input.keyup((event) => {
			let element = $(event.currentTarget)
			element.attr('style', '');
			element.attr('style', `height: ${Math.min(element.prop("scrollHeight"), 300)+3}px`);

			let offset = 20 + Math.min(element.prop("scrollHeight"), 300)+3;
			this.elements.variablesContainer.css('bottom', `${offset}px`);

			this.checkVariables();
		})

		this.elements.advancedOptionsButton.on('click', (event) => {
			let options = this.elements.advancedOptions;

			options.toggle();

			this.populateLanguageOptions();
		})

		this.elements.advancedOptionsClose.on('click', (event) => {
			this.elements.advancedOptions.hide();
		})

		this.elements.outputLengthSlider.on('change mousemove', (event) => {
			let slider = this.elements.outputLengthSlider;
			let note = "Somewhere inbetween";

			switch (slider.val()) {
				case '1':
					note = "A little";
					slider.attr('data-value', 50);
					break;
				case '2':
					note = "A bit more";
					slider.attr('data-value', 200);
					break;
				case '3':
					note = "Somewhere inbetween";
					slider.attr('data-value', 750);
					break;
				case '4':
					note = "Quite a bit";
					slider.attr('data-value', 1500);
					break;
			}

			this.elements.outputLengthSliderNote.html(note);
		})

		this.elements.languageService.on("change", (event) => {
			let target = $(event.currentTarget).val();
			
			if (target == 'deepl') {
				this.elements.languageFormality.attr('disabled',false);
				this.elements.languageFormality.attr('readonly',false);
				this.elements.formalityHelper.hide();

				this.elements.languageSource.html(this.data.languages.deeplLanguages); 
				this.elements.languageSource.val('EN-US');
				this.data.languageOptions.languageSource = 'EN-US';
				
				this.elements.languageTarget.html(this.data.languages.deeplLanguages); 
				this.elements.languageTarget.val('EN-US');
				this.data.languageOptions.languageTarget = 'EN-US';
				
			} else {
				this.elements.languageFormality.attr('disabled',true);
				this.elements.languageFormality.attr('readonly',true);
				this.elements.formalityHelper.show();

				if (target == 'watson') {
					this.elements.languageSource.html(this.data.languages.watsonLanguages);
					this.elements.languageTarget.html(this.data.languages.watsonLanguages);
				}
				else if (target == 'google') {
					this.elements.languageSource.html(this.data.languages.googleLanguages);
					this.elements.languageTarget.html(this.data.languages.googleLanguages);
				}
				else {
					$(this).val('google');
					this.elements.languageSource.html(this.data.languages.googleLanguages);  
					this.elements.languageTarget.html(this.data.languages.googleLanguages);  
				}
				
				this.elements.languageSource.val('en');
				this.data.languageOptions.languageSource = 'en';
				
				this.elements.languageTarget.val('en');
				this.data.languageOptions.languageTarget = 'en';
			}
		});	

		this.elements.languageTarget.on("change", (event) => {
			let target = $(event.currentTarget).val();

			if (target == 'DE' || target == 'FR' || target == 'IT' || target == 'ES' || target == 'NL' || target == 'PL' || target == 'PT-PT' || target == 'PT-BR' || target == 'RU') {
				this.elements.languageFormality.attr('disabled',false);
				this.elements.languageFormality.attr('readonly',false);
				$("#FormalityHelper").hide();
			} else {
				this.elements.languageFormality.attr('disabled',true);
				this.elements.languageFormality.attr('readonly',true);
				$("#FormalityHelper").show();
			}

			let langName = this.getLanguageName(target);
			this.elements.languageSelected.html(langName);
		});

		this.elements.variablesButton.on('click', (event) => {
			let options = this.elements.variablesContainer;

			options.toggle();
		})

		this.elements.variablesClose.on('click', (event) => {

            this.elements.variablesContainer.hide()

		})

		$(document).on('keyup', '.variablesContainer input', (event) => {
			let input = $(event.currentTarget);

			input.removeClass('empty');
		})

		$(document).on('keydown', '.variablesContainer input', (event) => {
			let keycode = (event.keyCode ? event.keyCode : event.which);

			if(keycode == 13 && !event.ctrlKey){
				if($(event.target).val().trim() == ''){
					return;
				}

				event.preventDefault();
				this.instruct(); 
			}
		})

		// this.elements.startOver.on('click', (event) => {
		// 	if(this.state.busy){
		// 		return;
		// 	}
			
		// 	this.elements.instructDisplay.find('.cbaiInstructRow').remove();

		// 	this.data.history = [];
			
		// 	let rowObject = this.buildRow("What would you like me to do?", false, true);
		// 	this.elements.instructDisplay.append(rowObject.row);

		// 	//Store the prompt in history
		// 	let historyObject = {
		// 		role : 'assistant',
		// 		msg : "What would you like me to do?",
		// 		rel : false
		// 	};
	
		// 	this.data.history.push(historyObject);

		// 	this.state.started = false;

		// 	this.allowRegenerate(false);
		// })

		// this.elements.uploadFileButton.on('click', (event) => {

		// 	let button = this.elements.uploadFileButton;
		// 	button.attr('data-clicked', event.originalEvent.detail);

		// 	setTimeout(function(){
		// 		if(button.attr('data-clicked') != 2){
		// 			dashboard.elements.uploadFileModal.modal("show");
		// 		}
		// 	}, 250);

		// })

		// this.elements.uploadFileButton.on('dblclick', (event) => {
		// 	let button = this.elements.uploadFileButton;

		// 	if(!button.hasClass('fileLoaded')){
		// 		button.attr('data-active', false);
		// 		return;
		// 	}

		// 	if(button.attr('data-active') == 'false'){
		// 		button.attr('data-active', true);
		// 		button.attr('data-original-title', `${dashboard.data.fileDetails.name} <br><br>Using File Contents: True <br><small><em>Double-Click to Toggle</em></small>`);
		// 	} else {
		// 		button.attr('data-active', false);
		// 		button.attr('data-original-title', `${dashboard.data.fileDetails.name} <br><br>Using File Contents: False <br><small><em>Double-Click to Toggle</em></small>`);
		// 	}

		// 	button.tooltip('hide');
		// })

		// this.elements.fileInput.on('change', (event) => {
		// 	let input = $(event.currentTarget);
		// 	const fileDetails = input.prop('files')[0];
			
		// 	if(fileDetails.type != 'application/pdf'){
		// 		alert("Please ensure that you have selected a valid file type.");
		// 		this.elements.fileTypeAccepts.addClass('invalid');
		// 		return;
		// 	} else if(fileDetails.size > 10000000) {
		// 		alert("Please upload a smaller file (Max file size: 10Mb).");
		// 		return;
		// 	}
			
		// 	input.next('.custom-file-label').html("<span class='blinking'>Uploading and Processing...</span>");
			
		// 	this.data.fileDetails = fileDetails;
		// 	this.elements.uploadForm.submit();
				
		// })

		// this.elements.uploadForm.submit((event) => {
		// 	event.preventDefault();

		// 	let formData = new FormData(this.elements.uploadForm[0]);
		// 	formData.append('file', this.elements.fileInput.prop('files')[0]);
		// 	formData.append('action', 'chatUploadFile');

		// 	$.ajax({
		// 		url: Dashboard.API_HOST,
		// 		data: formData,
		// 		contentType: false,
		// 		processData: false,
		// 		method: 'POST',
		// 		success: function(response){
		// 			if(response != 'false'){
		// 				dashboard.elements.fileInput.next('.custom-file-label').html(dashboard.data.fileDetails.name);

		// 				dashboard.data.uploadedData = response;
		// 				dashboard.data.useFileData = true;

		// 				dashboard.elements.uploadFileButton.addClass("fileLoaded");
		// 				dashboard.elements.uploadFileButton.attr('data-active', true);
		// 				dashboard.elements.uploadFileButton.attr('data-original-title', `${dashboard.data.fileDetails.name} <br><br>Using File Contents: True <br><small><em>Double-Click to Toggle</em></small>`);
		// 			} else {
		// 				dashboard.data.uploadedData = false;
		// 				dashboard.data.useFileData = false;

		// 				dashboard.elements.uploadFileButton.removeClass("fileLoaded");
		// 				dashboard.elements.uploadFileButton.attr('data-active', false);
		// 				dashboard.elements.uploadFileButton.attr('data-original-title', `Upload File`);
		// 				alert("No content was found");
		// 			}

		// 			setTimeout(function(){
		// 				dashboard.elements.uploadFileModalClose.click();
		// 			}, 1000);
		// 		}
		// 	});
		// })

		this.elements.regenerateButton.on('click', (event) => {
			this.regenerate();
		})

		this.elements.inputPromptNotice.find('.dismissInputPrompt').on('click', (event) => {
			this.elements.inputPromptNotice.hide()
			
			const data = {
				action : 'dismiss_first_time_chat_prompt',
				user : cbai_instruct_data.userid
			};
	
			const params = new URLSearchParams(data);
			const url = Dashboard.API_HOST + '?' + params.toString();
	
			$.ajax({
				type : "GET",
				dataType : "json",
				url : url,
				success : (response) => {
					console.log(response);
				},
				error : (xhr, status, error) => {
					console.log(response);
				}
			})
		})
	}



	/**
	 * Toggles the library
	 * 
	 * @return void
	 */
	toggleLibrary(){
		if(this.elements.library.hasClass('open')){
			this.elements.library.removeClass('open');
		} else {
			this.elements.library.addClass('open');
		}
	}



	/**
	 * Fetches the respective instruction and populates the prompt input
	 * 
	 * @param int id 
	 * 
	 * @return void
	 */
	useInstruction(id){
		let instruction = this.instructTemplates.data.instructions[id];
		let instructionText = this.unEscapeText(instruction.instruction);
		this.elements.input.html(instructionText);
		this.elements.input.val(instructionText);
		this.elements.input.trigger('keyup');
	}



	/**
	 * Populates the library with the instruct templates
	 * 
	 * @return void
	 */
	bindInstructTemplates(){
		this.instructTemplates = typeof instructTemplates !== 'undefined' ? instructTemplates : false;

		if(this.instructTemplates){

			/* We have the instance, so we can do a few things with this to help it along */
			/* Override the default instruction card behaviour */
			this.instructTemplates._buildInstructionCard = this.instructTemplates.buildInstructionCard;
			this.instructTemplates.buildInstructionCard = (instruction, fav = false) => {
					let html = this.instructTemplates._buildInstructionCard(instruction, fav);
					html = html.replaceAll(/([</]*)(button)/g, '$1div');
					html = html.replace('Run &raquo;', 'Use &raquo;');
					html = html.replace('col-md-6 col-sm-6 col-lg-4 col-xl-3', 'col-12');

					let shadowEl = $(html);
					shadowEl.find('.btn[data-type="delete"]').remove();
					shadowEl.find('.btn[data-type="edit"]').remove();

					html = shadowEl.prop('outerHTML');

					html = html.replace('instructionBtn', 'useInstructionBtn');

					return html;
			}

		}
	}



	checkPreFill(){
		/* Check first time user */
		if(this.elements.inputPromptNotice.length > 0){
			this.elements.inputPromptNotice.show();
		}
	}



	/**
	 * Populates the language options
	 * 
	 * @return void
	 */
	populateLanguageOptions(){
		if(localStorage.getItem("cb_cbaiLanguageService") != null){
			let storedService = localStorage.getItem("cb_cbaiLanguageService");
			let storedFormality = localStorage.getItem("cb_cbaiLanguageFormality");
			let storedSource = localStorage.getItem("cb_cbaiLanguage");
			let storedTarget = localStorage.getItem("cb_cbaiLanguageTo");

			this.elements.languageService.change();
			
			this.data.languageOptions.languageService = storedService;
			this.elements.languageService.val(this.data.languageOptions.languageService);

			this.data.languageOptions.languageFormality = storedFormality;
			this.elements.languageFormality.val(this.data.languageOptions.languageFormality);

			this.data.languageOptions.languageSource = storedSource;
			this.elements.languageSource.val(this.data.languageOptions.languageSource);

			this.data.languageOptions.languageTarget = storedTarget;
			this.elements.languageTarget.val(this.data.languageOptions.languageTarget);
		} else {
			this.elements.languageService.change();
			// this.elements.languageTo.change();
		}

		// Go ahead and populate the model too
		let model = localStorage.getItem('cb_variable_instruct_model');
		if(typeof model != 'undefined' && model != null && model.trim() != ''){
			this.elements.model.val(model);
		}
	}



	/**
	 * Gets the respective name for the language code
	 * 
	 * Makes use of the language options on the page
	 * 
	 * @param string code 
	 * 
	 * @return string
	 */
	getLanguageName(code){
		let option = this.elements.languageSource.find(`option[value="${code}"]`);
		return option.text();
	}




	/**
	 * Gets the last prompt in the history
	 * 
	 * @returns string last
	 */
	getLastPrompt(){
		let last = '';
		for(let item of this.data.history){
			if(item.role == 'user'){
				last = item.msg;
			}
		}

		return last;
	}



	/**
	 * Validates the inputs
	 * 
	 * @return boolean
	 */
	validateInputs(){
		let prompt = this.elements.input.val();
		if(typeof prompt == 'undefined' || prompt == null || prompt.trim() == ''){
			this.elements.input.focus();
			return false;
		}

		if(this.data.variables.length > 0){
			let variablesValid = true;
			this.elements.variablesContainer.find('.cbaiVariableGroup').each(function(){
				let input = $(this).find('input');
				let val = input.val();

				if(typeof val == 'undefined' || val == null || val.trim() == ''){
					input.addClass('empty');
					variablesValid = false;
				}
			})

			if(!variablesValid){
				alert('Please ensure all of your variable fields have been entered.');
				
				this.elements.variablesContainer.show();

				return false;
			}
		}

		return true;
	}



	/**
	 * Starts the instruct state
	 * 
	 * @return void
	 */
	startInstruct(){
		this.elements.instructDisplay.empty();
		
		this.elements.main.addClass('started');

		this.state.started = true;
		this.state.failedAttempts = 0;

		this.data.documentID = false;

		this.data.prompt = false;
		// this.data.variables = false;
		this.data.history = [];

		this.data.previousOutput = false;

		dashboard.allowRegenerate(false);

		// this.elements.startOver.show();
	}



	/**
	 * Instructs
	 * 
	 * @return void
	 */
	instruct(){
		if(this.state.busy){
			return;
		}
		
		if(!this.validateInputs()){
			return;
		}
		
		if(!this.state.started){
			this.startInstruct();
		}

        this.elements.advancedOptionsClose.click();
		
		let prompt = this.elements.input.val();
		let tempPrompt = prompt;
		let instructionHtml = prompt;

		if(this.data.variables.length > 0){
			for(let variable of this.data.variables){
				variable = variable.replace('{', '');
				variable = variable.replace('}', '');
				let rawVariable = variable;
				
				variable = variable.replaceAll(' ', '_');

				let input = $(`#variable_${variable}`);
				let val = input.val().trim();

				// variablesValues.push(val);

				localStorage.setItem(`cb_variable_${variable}`, val);
				
				let currentRegex = new RegExp(`{${rawVariable}}`, 'g');
				tempPrompt = tempPrompt.replace(currentRegex, val);

				instructionHtml = instructionHtml.replace(currentRegex, `<strong class="variable">${val}</strong>`);
			}
		}
		
		tempPrompt = tempPrompt.charAt(0).toUpperCase() + tempPrompt.slice(1);
		
		//Store the prompt in history
		let historyObject = {
			role : 'user',
			msg : tempPrompt
		};
		
		this.data.history.push(historyObject);

		/* We now allow longer chats but use the checkLimits method to do this */
		if(!this.checkLimits()){
			let rowObject = this.buildRow('Error - This process cannot be completed as there is too many words in the context window. Please create a new chat or clear the chat.', false, true);
									
			setTimeout(function(){
				dashboard.elements.instructDisplay.append(rowObject.row);

				dashboard.scrollBottom();
			}, 500); 
			
			return;
		}
		
		let rowObject = this.buildRow(instructionHtml, true);

		this.elements.instructDisplay.append(rowObject.row);
		this.elements.input.val('');
		this.elements.input.trigger('keyup');

		dashboard.allowRegenerate(false);
		setTimeout(function(){
			dashboard.elements.instructDisplay.append(dashboard.elements.thinkingRow);
			dashboard.showGPT4SlowNote(false);
			
			dashboard.scrollBottom();
		}, 250);

		this.updateInputOptions();

		this.state.failedAttempts = 0;
		this.processInstruction(prompt);
	}



	/**
	 * Builds the HTML code of the row
	 * 
	 * @param string content 
	 * @param boolean user 
	 * @param boolean error
	 * 
	 * @return object
	 */
	buildRow(content, user = false, error = false){
		let id = this.genHexString(12);
		
		let icon = Dashboard.cb_icon_url;
		let type = 'assistant';

		if(user){
			icon = cbai_instruct_data.uicon;
			type = 'user';
		}

		let errorClass = '';
		if(error){
			errorClass = 'output-error';
		}

		content = content.trim().replace(/(?:\r\n|\r|\n)/g, '<br>');
		content = content.replaceAll(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
		
		let rowHTML = `<div class="cbaiInstructRow" data-type="${type}" data-id="${id}">
										<div class="cbaiInstructRowInner col-xl-6 col-lg-8 col-md-10 col-sm-11">
											<div class="cbaiInstructRowIcon">
												<img src="${icon}">
											</div>
											<div class="cbaiInstructRowOutput">
												<p class="output ${errorClass}">${content}</p>
											</div>
										</div>
									</div>`;
		

		return {
			id : id,
			row : rowHTML
		};
	}



	/**
	 * Updates the input options such as amount, keep context and language options
	 * 
	 * @return void
	 */
	updateInputOptions(){
		this.data.prompt = this.elements.input.val();
		// this.data.keepContext = this.elements.keepContext.prop('checked');
		// this.data.amount = this.elements.outputLengthSlider.attr('data-value');
		this.data.model = this.elements.model.val();

		localStorage.setItem(`cb_variable_instruct_model`, this.data.model);

		this.data.languageOptions.languageService = this.elements.languageService.val();
		this.data.languageOptions.languageSource = this.elements.languageSource.val();
		this.data.languageOptions.languageTarget = this.elements.languageTarget.val();
		this.data.languageOptions.languageFormality = this.elements.languageFormality.val();

		localStorage.setItem("cb_cbaiLanguageService", this.data.languageOptions.languageService);
		localStorage.setItem("cb_cbaiLanguageFormality", this.data.languageOptions.languageFormality);
		localStorage.setItem("cb_cbaiLanguage", this.data.languageOptions.languageSource);
		localStorage.setItem("cb_cbaiLanguageTo", this.data.languageOptions.languageTarget);
	}



	regenerate(){
		if(this.data.history[this.data.history.length-1].role == 'assistant'){
			this.data.history.pop();
		}
		this.processInstruction(this.data.prompt);

		let lastRow = this.elements.instructDisplay.find('.cbaiInstructRow[data-type="assistant"]:last-of-type');
		lastRow.remove();

		this.allowRegenerate(false);
		setTimeout(function(){
			dashboard.elements.instructDisplay.append(dashboard.elements.thinkingRow);
			
			dashboard.scrollBottom();
		}, 250);

		this.updateInputOptions();

		this.state.failedAttempts = 0;
	}



	/**
	 * Makes the AI call and outputs on the page
	 * 
	 * @param string prompt
	 * 
	 * @return void
	 */
	processInstruction(prompt){
		this.state.busy = true;
		this.data.prompt = prompt;

		this.elements.instructDisplay.addClass('busy');

		// const url = this.buildUrl(prompt);
		const url = Dashboard.cb_HOST_BETA + 'input';

		const dataObject = this.buildDataObject(prompt);

		if(this.data.model == 'open_prompt_v4'){
			/* We handle the GPT-4 call differently */

			$.ajax({
				type: 'POST',
				data: dataObject,
				// dataType: 'json',
				url: url,
				success: function(response){

					let pendingToken = response.replace('pending:', '');
					pendingToken = pendingToken.replace('{', '');
					pendingToken = pendingToken.replace('}', '');

					let totalTime = 0;
					const endpoint = `${Dashboard.cb_HOST}pendingcontent?hash=${cbai_instruct_data.hash}&processToken=${pendingToken}`;

					let pingInterval = setInterval(function(){
						// console.log(`Checking for content: ${totalTime}`);
						totalTime += 5000;
						dashboard.showGPT4SlowNote();

						$.ajax({
							type: 'GET',
							dataType: 'json',
							url: endpoint,
							success: function(response){
								if(typeof response == 'object'){
									clearInterval(pingInterval);
									dashboard.processOutput(response);
								}
							},
							error : (xhr, status, error) => {
								// Trying again do nothing...
								// console.log(error);

								/* This outputs "SyntaxError: Unexpected token 'x', "x_pending" is not valid JSON" because the response is a string, but we are looking for an object */
							}
						})

					}, 5000);

				},
				error : (xhr, status, error) => {
					dashboard.processOutput(false, true);
				}
			})
			
		} else {
			$.ajax({
				type: 'POST',
				dataType: 'json',
				data : dataObject,
				url: url,
				success: function(msg){
					dashboard.processOutput(msg);
				},
				error : (xhr, status, error) => {
					dashboard.processOutput(false, true);
				}
			});
		}
	}



	/**
	 * Shows the GPT 4 slow notice
	 * 
	 * @return void
	 */
	showGPT4SlowNote(show = true){
		let row = this.elements.instructDisplay.find('.cbaiInstructThinkingRow');
		let note = row.find('.cbaiGpt4SlowNote');

		if(!show){
			note.remove();
			return;
		}

		if(note.length <= 0){
			$(row.find('.cbaiInstructRowOutput')).append('<p class="cbaiGpt4SlowNote" style="display: none;">The AI is generating your content. This can take up to 3 minutes. Although highly capable, GPT-4 can sometimes be quite slow...</p>');

			note = row.find('.cbaiGpt4SlowNote');
			note.show();
		}
		
		
	}



	/**
	 * Processing and outputs the output
	 * 
	 * @param object msg 
	 * @param boolean error 
	 * 
	 * @return void
	 */
	processOutput(msg, error = false){
		if(!error){
			if (typeof msg.error !== 'undefined') {
				var output = msg.error;
			} else {
				var output = msg.output;
			}
	
			var output_type = 'standard';
			if (typeof msg.output_type !== 'undefined') {
				output_type = msg.output_type;
			} else {
				let rowObject = dashboard.buildRow(output, false, true);
	
				setTimeout(function(){
					dashboard.elements.instructDisplay.find('.cbaiInstructThinkingRow').remove();
					dashboard.elements.instructDisplay.append(rowObject.row);

					dashboard.allowRegenerate();

					dashboard.scrollBottom();
					dashboard.state.busy = false;
					dashboard.elements.instructDisplay.removeClass('busy');
				}, 500);

				return;
			}
			
			if (typeof output == 'object') {
	
				if(typeof output[0].text !== 'undefined' && output[0].text.trim() != ''){
					dashboard.state.failedAttempts = 0;
					dashboard.data.previousOutput = output[0].text;
	
					var reg = new RegExp("(%0A)", "g");
					dashboard.data.previousOutput = dashboard.data.previousOutput.replace(reg,"%0D$1");

					let rowObject = dashboard.buildRow(output[0].text);

					let rel = this.createRelString(output[0]);
	
					let historyObject = {
						role : 'assistant',
						msg : output[0].text,
						rel : rel,
					};
					
					dashboard.data.history.push(historyObject);
	
					/* Dispatch to flow events */
					dashboard.dispatchFlowEvent('InstructComplete');
	
					setTimeout(function(){
						dashboard.elements.instructDisplay.find('.cbaiInstructThinkingRow').remove();
						dashboard.elements.instructDisplay.append(rowObject.row);

						let lastRow = dashboard.elements.instructDisplay.find('.cbaiInstructRow:last-of-type');
						// dashboard.insertActionButtons(lastRow, rowObject.id, rel);

						dashboard.allowRegenerate();
						dashboard.checkLimits();

						dashboard.scrollBottom();
						dashboard.state.busy = false;
						dashboard.elements.instructDisplay.removeClass('busy');

						// dashboard.saveAsDocument();
					}, 500);
	
				} else {
					// Error Handling if output isn't there or empty output
					dashboard.state.failedAttempts++;
	
					if(dashboard.state.failedAttempts < 3){
						console.log("Retrying: " + dashboard.state.failedAttempts); 
						dashboard.processInstruction(dashboard.data.prompt);
					} else {
						let rowObject = dashboard.buildRow('Error - Failed to complete your instruct request. Please change your input and try again.', false, true);
						dashboard.elements.instructDisplay.append(rowObject.row);

						dashboard.allowRegenerate();

						dashboard.scrollBottom();
						dashboard.state.busy = false;
						dashboard.elements.instructDisplay.removeClass('busy');
					}
				}
	
			}
		} else {
			let rowObject = dashboard.buildRow("Error - There was an error with your request. Please try again", false, true);
	
			setTimeout(function(){
				dashboard.elements.instructDisplay.find('.cbaiInstructThinkingRow').remove();
				dashboard.elements.instructDisplay.append(rowObject.row);

				dashboard.allowRegenerate();

				dashboard.scrollBottom();
				dashboard.state.busy = false;
				dashboard.elements.instructDisplay.removeClass('busy');
			}, 500);
		}
	}



	/**
	 * Builds the data object for the POST call
	 * 
	 * @param string prompt 
	 * 
	 * @return object dataObject
	 */
	buildDataObject(prompt){
		let dataObject = {};

		dataObject['hash'] = cbai_instruct_data.hash;
		dataObject['ptype'] = this.data.model;
		dataObject['pcompletions'] = 1;

		if(this.data.keepContext){
			const historyClone = [];
			for(let item of this.data.history){
				/* Clone the item */
				let clone = Object.assign({}, item);
				if(clone.msg){
					clone.msg = this.promptCleaner(clone.msg);
				}

				/* Push to the history clone, we clone so that we don't alter the "raw" data */
				historyClone.push(clone);
			}

			let prompts = {
				history : historyClone 
			};
			
			dataObject['prompts'] = JSON.stringify(prompts);
		} else {
			let prompts = {
				history : [{role : 'user', msg : this.promptCleaner(prompt)}] 
			};
				
			dataObject['prompts'] = JSON.stringify(prompts);
		}
		
		dataObject['planservice'] = this.data.languageOptions.languageService;
		dataObject['lang'] = this.data.languageOptions.languageTarget;
		dataObject['psourcelan'] = this.data.languageOptions.languageSource;
		dataObject['planformality'] = this.data.languageOptions.languageFormality;

		if(this.data.useFileData && this.data.uploadedData != false){
			dataObject['fileData'] = this.data.uploadedData;
		}

		return dataObject;
	}



	/**
	 * Builds the URL for the AI call
	 * 
	 * @param string prompt 
	 * @param int amount 
	 * @param boolean keepContext 
	 * 
	 * @return string url 
	 */
	buildUrl(prompt){
		let host = '';

		// if(this.data.model == 'open_prompt_v4'){
		// 	host = Dashboard.cb_HOST_BETA;
		// } else {
		// 	host = Dashboard.cb_HOST;
		// }

		host = Dashboard.cb_HOST;

		let url = host+'input?hash='+cbai_instruct_data.hash;
        
		if(this.data.keepContext){
			const historyClone = [];
			for(let item of this.data.history){
				/* Clone the item */
				let clone = Object.assign({}, item);
				if(clone.msg){
					clone.msg = this.promptCleaner(clone.msg);
				}

				/* Push to the history clone, we clone so that we don't alter the "raw" data */
				historyClone.push(clone);
			}

			let prompts = {
				history : historyClone 
			};
			
			url += '&prompts=' + JSON.stringify(prompts);
		} else {
			let prompts = {
				history : [{role : 'user', msg : this.promptCleaner(prompt)}] 
			};
				
			url += '&prompts=' + JSON.stringify(prompts);
		}

		// url += '&wc='+this.data.amount;
		url += '&ptype='+this.data.model;
		url += '&pcompletions=1';

		url += '&planservice='+this.data.languageOptions.languageService+'&lang='+this.data.languageOptions.languageTarget+'&psourcelan='+this.data.languageOptions.languageSource+'&planformality='+this.data.languageOptions.languageFormality;

		return url;
	}




	/**
	 * As instruct sends objects (JSON) we've found that in some cases it may break due to incorrect escaping of JSON data
	 * 
	 * This is usually a result of either the input prompt, or the output from the AI containing these characters. Visually, 
	 * they are absolutely fine, but the receiving server has a hard time parsing these datasets, which means they can become 
	 * mutated to the point where the server fails and gets stuck in a restart loop 
	 * 
	 * This method resolves this by cleaning up the content we are about to send, using various conditions 
	 * 
	 * It's made modular so it can be reused as we need it 
	 * 
	 * @param string content The content to clean
	 * 
	 * @returns string
	 */
	promptCleaner(prompt){
		const charset = [
			"\\", '"',
		];

		/* Replace all known problem characters, first remove any escaped versions, then replace the standard versions with escaped versions */
		for(let char of charset){
			prompt = prompt.replaceAll(`\\${char}`, char);
			prompt = prompt.replaceAll(char, `\\${char}`);
		}

		prompt = prompt.replaceAll("\n", "\\n");

		/* Encode the URI component, for the single message only */
		// prompt = encodeURIComponent(prompt);

		return prompt;
	}



	/**
	 * Checks for and populates the variables
	 * 
	 * @return void
	 */
	checkVariables(){
		let inputEl = this.elements.input;
		let instruction = inputEl.val();
		let tempInstruction = instruction;

		this.data.variables = [];

		while (tempInstruction.search(Dashboard.variableRegExp) >= 0) {
			let varStart = tempInstruction.indexOf('{');
			let varEnd = tempInstruction.indexOf('}');
			let varName = tempInstruction.substring(varStart, varEnd+1);
			
			if(!this.data.variables.includes(varName)){
				this.data.variables.push(varName);
			}

			tempInstruction = tempInstruction.substring(varEnd+1);
		}

		this.elements.variablesContainer.find('.cbaiVariableGroup').remove();

		if(this.data.variables.length >= 1){
			for(let variable of this.data.variables){
				this.insertVariableGroup(variable);
			}
			
			this.elements.variablesButton.show();
			this.elements.variablesContainer.show();

		} else {
			this.elements.variablesButton.hide();

			this.elements.variablesClose.click();
		}
	}



	/**
	 * Insert a variable group
	 * 
	 * @params string rawVariableName
	 * 
	 * @return void
	 */
	insertVariableGroup(rawVariableName){
		let variableName = rawVariableName.replace('{', '');
		variableName = variableName.replace('}', '');

		variableName = variableName.replaceAll(' ', '_');

		let val = localStorage.getItem(`cb_variable_${variableName}`);
		if(typeof val == 'undefined' || val == null){
			val = '';
		}

		let groupHtml = `<div class="form-group cbaiVariableGroup">
			<label for="variable_${variableName}" class="cbaiLabelPill">${variableName}</label>
			<input type="text" class="form-control cbai-input" id="variable_${variableName}" name="variable_${variableName}" placeholder="${rawVariableName}" value="${val}">
		</div>`;

		this.elements.variablesContainer.append(groupHtml);
	}



	/**
	 * Formats the history content into HTML text
	 *
	 * @return string html
	*/
	formatHistoryIntoHTMLText(){
		let html = '';

		for(let historyItem of this.data.history){
			let role = '';
			switch (historyItem.role) {
				case 'user':
					role = 'Me';
					break;

				default:
					role = (historyItem.role).charAt(0).toUpperCase() + (historyItem.role).slice(1);
					break;
			}

			let content = (historyItem.msg).trim().replace(/(?:\r\n|\r|\n)/g, '<br>');
			html += `<p><strong>${role}: </strong>${content}</p>` ;   
		}

		return html;
	}



	/**
	 * Dispatches the instruction to the flow system
	 * 
	 * For users that do have flows setup to trigger on instruction, for example, this fires off those events 
	 * 
	 * @param string Event The name of the event to dispatch 
	 * 
	 * @returns void
	 */
	dispatchFlowEvent(event){
		const len = this.data.history.length;
		if(len && len > 1){
			if(this.data.history[len - 1] && this.data.history[len - 2]){
				const assistant = this.data.history[len - 1];
				const user = this.data.history[len - 2];

				if(assistant instanceof Object && user instanceof Object){
					if(assistant.msg && user.msg){
						const data = {
							action : 'dispatchFlowEvent',
							_event : event,
							prompt : user.msg,
							content : assistant.msg,
						};
						
						try{
							$.post(Dashboard.API_HOST, data, (response) => {});
						} catch (ex){}
					}
				}
			}    
		}
	}



	/**
	 * Changes from a section to another
	 * 
	 * @param element from 
	 * @param element to 
	 * 
	 * @return void
	 */
	changeSection(from, to){
		from.hide();
		to.show();
	}



	/**
	 * Scrolls to the bottom of the page
	 * 
	 * @return void
	 */
	scrollBottom(){
		// $("#content-wrapper").animate({ scrollTop: document.body.scrollHeight }, 2000);
		$(".cbaiInstructDisplayWrapper").animate({ scrollTop: $(".cbaiInstructDisplayWrapper").prop('scrollHeight') }, 1000);
	}



	/**
	 * Unescapes a string
	 * 
	 * @param string text 
	 * 
	 * @return string text 
	 */
	unEscapeText(text){
		text = text.replace(/&lt;/g , "<");	 
		text = text.replace(/&gt;/g , ">");     
		text = text.replace(/&quot;/g , "\""); 
		text = text.replace(/&#39;/g , "\'");   
		text = text.replace(/&amp;/g , "&");
		text = text.replace(/\\\\n/g , "\\n");
		text = text.replace(/\\\\'/g , "'");
		text = text.replace(/\\'/g , "'");
		text = text.replace(/\\"/g , '\"'); 
		return text;
	}



	/** 
	 * Adds a regenerate button to the page
	 * 
	 * @param boolean override
	 * 
	 * @return void
	 */
	allowRegenerate(allow = true){
		if(allow){
			this.elements.regenerateButton.show();
		} else {
			this.elements.regenerateButton.hide();
		}
	}



	/**
	 * Checks limits
	 * 
	 * @return boolean
	 */
	checkLimits(){
		let totalWords = 0;
		for(let item of this.data.history){
			totalWords += this.countWords(item.msg);
		}

		let remaining = this.data.limits[this.data.model].words - totalWords;
		this.data.limits[this.data.model].remaining = remaining;

		let percentRemaining = ((this.data.limits[this.data.model].remaining/this.data.limits[this.data.model].words) * 100).toFixed(2);

		this.data.limits[this.data.model].percent_remaining = percentRemaining;

		// console.log("Chat Percentage Remaining: " + percentRemaining + '%');

		if(percentRemaining < 30){
			this.showLimitWarning(remaining);
		}

		if(percentRemaining <= 2.5){
			return false;
		} else {
			return true;
		}
	}


	
	/**
	 * Shows the limit warning
	 * 
	 * @param int limit 
	 * @param boolean show 
	 * 
	 * @return void
	 */
	showLimitWarning(limit, show = true){
		if(show){
			this.elements.limitWarningValue.html(limit);
			this.elements.limitWarning.show();
		} else {
			this.elements.limitWarning.hide();
		}
	}



	/**
	 * Inserts the action buttons HTML into the row
	 * 
	 * @param element row 
	 * @param int id
	 * @param string rel
	 * 
	 * @return void
	 */
	insertActionButtons(row, id, rel){
		let buttonsHTML = `
			<div class="cbaiActionButtons" display: none;>
				<div class="cbaiActionButtonGroup">
					<div class="cbaiActionButton" data-type="favourite" data-id="${id}" title="Add to Favourites" data-json="" data-rel="${rel}"><i class="fa fa-heart"></i></div>
					<div class="cbaiActionButton" data-type="copy" data-id="${id}" title="Copy to Clipboard"><i class="fas fa-clipboard"></i></div>
				</div>
				<div class="cbaiActionButtonGroup">
					<div class="cbaiActionButton cbaiLongActionButton" data-type="save" data-id="${id}">Save as Document</div>
					<span class="cbaiActionButtonSeparator">|</span>
					<div class="cbaiActionButton" data-type="up" data-id="${id}" data-rel="${rel}"><i class="fas fa-thumbs-up"></i></div>
					<div class="cbaiActionButton" data-type="down" data-id="${id}" data-rel="${rel}"><i class="fas fa-thumbs-down"></i></div>
					<div class="cbaiActionButton" data-type="delete" data-id="${id}" title="Delete this output"><i class="fa fa-trash"></i></div>
				</div>
			</div>
		`;

		$('cbaiActionButtons').removeClass('show');
		setTimeout(function(){
			$('cbaiActionButtons').remove();

			$(`.cbaiInstructRow`).removeClass('current');

			row.addClass('current');
			
			$(row.find('.cbaiInstructRowOutput')).prepend(buttonsHTML);
		}, 250);

		setTimeout(function(){
			$(row).find('cbaiActionButtons').addClass('show');
		}, 500);   
	}



	/**
	 * Counts the number of words of string
	 * 
	 * @param string content 
	 * 
	 * @return int
	 */
	countWords(content){
		return content.split(' ').length;
	}



	/**
	 * Creates a unique hex ID string
	 * 
	 * @param int len 
	 * 
	 * @returns string output
	 */
	genHexString(len) {
		const hex = '0123456789ABCDEF';
		var output = '';
		for (var i = 0; i < len; ++i) {
			output += hex.charAt(Math.floor(Math.random() * hex.length));
		}
		return output;
	}



	/**
	 * Creates the rel string
	 * 
	 * @param object dataObject 
	 * 
	 * @returns string rel
	 */
	createRelString(dataObject){
		let data = JSON.stringify(dataObject);
		data = btoa(unescape(encodeURIComponent(data)));

		let rel = atob(data);
		rel = this.cbHashCodeFromString(rel);

		return rel;
	}



	/**
	 * Builds the hash code for rel string
	 * 
	 * @param string s 
	 * 
	 * @return string 
	 */
	cbHashCodeFromString(s){
		return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
	}



	/**
	 * Set cursor to the end of element
	 * 
	 * @param element contentEditableElement 
	 */
	setEndOfContenteditable(contentEditableElement){
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
			range = document.createRange();//Create a range (a range is a like the selection but invisible)
			range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
			range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
			selection = window.getSelection();//get the selection object (allows you to change selection)
			selection.removeAllRanges();//remove any selections already made
			selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
			range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
			range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
			range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
			range.select();//Select the range (make it the visible selection
    }
	}

}

let dashboard = false;
jQuery(function($){
	/**
	 * Constructed in jQuery wrapper to allow the $ instance to be available in class
	 *
	 * The actual variable is defined globally, to expose it in the DOM
	*/
	dashboard = new Dashboard();
});	