
var cb_HOST = 'https://contentbot.us-3.evennode.com/api/v1/';
var cb_REST = 'https://contentbot.ai/app/api/?api=true&';
var cb_reg_holder = 'hidden';
var cb_usr_holder = '';

var validation = {
    'cbai_input_name' : false,
    'cbai_input_desc' : false,
    'cbai_input_tone' : false,
    'cbai_input_grade' : false,
    'cbai_input_industry' : false,
    'cbai_input_topic' : false,
    'cbai_input_audience' : false,
    'cbai_input_keywords' : false,
    'cbaiSales_Purpose' : false,
    'cbaiSales_Name' : false,
    'cbaiSales_CompanyName' : false,
    'cbaiSales_Industry' : false,
    'cbaiSales_LeadName' : false,
    'cbaiSales_LeadCompanyName' : false,
    'cbaiSales_LeadIndustry' : false,
    'cbaiSales_LeadGoals' : false,
    'cbaiSales_ProductBenefits' : false,
    'cbai_BPE_1' : false,
    'cbai_BPE_2' : false,
    'cbai_BPE_3' : false,
    'cbaiPitch_InputDelivery' : false,
    'cbaiPitch_InputGoal' : false,
    'cbaiPitch_InputHighlights' : false,
    'cbaiPitch_InputExperience' : false,
};  

var googleLanguages = '<option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="am">Amharic</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bn">Bengali</option><option value="bs">Bosnian</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="ceb">Cebuano</option><option value="ny">Chichewa</option><option value="zh">Chinese (Simplified)</option><option value="zh-TW">Chinese (Traditional)</option><option value="co">Corsican</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en" selected="selected">English</option><option value="eo">Esperanto</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="fy">Frisian</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="gu">Gujarati</option><option value="ht">Haitian Creole</option><option value="ha">Hausa</option><option value="haw">Hawaiian</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hmn">Hmong</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="ig">Igbo</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="jw">Javanese</option><option value="kn">Kannada</option><option value="kk">Kazakh</option><option value="km">Khmer</option><option value="rw">Kinyarwanda</option><option value="ko">Korean</option><option value="ku">Kurdish (Kurmanji)</option><option value="ky">Kyrgyz</option><option value="lo">Lao</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="lb">Luxembourgish</option><option value="mk">Macedonian</option><option value="mg">Malagasy</option><option value="ms">Malay</option><option value="ml">Malayalam</option><option value="mt">Maltese</option><option value="mi">Maori</option><option value="mr">Marathi</option><option value="mn">Mongolian</option><option value="my">Myanmar (Burmese)</option><option value="ne">Nepali</option><option value="no">Norwegian</option><option value="or">Odia (Oriya)</option><option value="ps">Pashto</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="pa">Punjabi</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sm">Samoan</option><option value="gd">Scots Gaelic</option><option value="sr">Serbian</option><option value="st">Sesotho</option><option value="sn">Shona</option><option value="sd">Sindhi</option><option value="si">Sinhala</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="so">Somali</option><option value="es">Spanish</option><option value="su">Sundanese</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="tg">Tajik</option><option value="ta">Tamil</option><option value="tt">Tatar</option><option value="te">Telugu</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="tk">Turkmen</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="ug">Uyghur</option><option value="uz">Uzbek</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="xh">Xhosa</option><option value="yi">Yiddish</option><option value="yo">Yoruba</option><option value="zu">Zulu</option>';
var deeplLanguages = '<option value="BG">Bulgarian</option><option value="ZH">Chinese</option><option value="CS">Czech</option><option value="DA">Danish</option><option value="NL">Dutch</option><option value="EN-US" selected>English (US)</option><option value="EN-GB">English (GB)</option><option value="ET">Estonian</option><option value="FI">Finnish</option><option value="FR">French</option><option value="DE">German</option><option value="EL">Greek</option><option value="HU">Hungarian</option><option value="IT">Italian</option><option value="JA">Japanese</option><option value="LV">Latvian</option><option value="LT">Lithuanian</option><option value="PL">Polish</option><option value="PT-PT">Portuguese</option><option value="PT-BR">Portuguese (Brazilian)</option><option value="RO">Romanian</option><option value="RU">Russian</option><option value="SK">Sloak</option><option value="SL">Slovenian</option><option value="ES">Spanish</option><option value="SV">Swedish</option>';
var watsonLanguages = "<option value='ar'>Arabic</option><option value='eu'>Basque</option><option value='bg'>Bulgarian</option><option value='bn'>Bengali</option><option value='bs'>Bosnian</option><option value='ca'>Catalan</option><option value='zh'>Chinese (Simplified)</option><option value='zh-TW'>Chinese (Traditional)</option><option value='hr'>Croatian</option><option value='cs'>Czech</option><option value='da'>Danish</option><option value='nl'>Dutch</option><option value='en' selected>English</option><option value='et'>Estonian</option><option value='fi'>Finnish</option><option value='fr-CA'>French (Canada)</option><option value='fr'>French</option><option value='de'>German</option><option value='el'>Greek</option><option value='gu'>Gujarati</option><option value='he'>Hebrew</option><option value='hi'>Hindi</option><option value='hu'>Hungarian</option><option value='ga'>Irish</option><option value='id'>Indonesian</option><option value='it'>Italian</option><option value='ja'>Japanese</option><option value='ko'>Korean</option><option value='lt'>Lithuanian</option><option value='lv'>Latvian</option><option value='ml'>Malayalam</option><option value='ms'>Malay</option><option value='mt'>Maltese</option><option value='cnr'>Montenegrin</option><option value='ne'>Nepali</option><option value='nb'>Norwegian Bokmal</option><option value='pl'>Polish</option><option value='pt'>Portuguese</option><option value='ro'>Romanian</option><option value='ru'>Russian</option><option value='sr'>Serbian</option><option value='si'>Sinhala</option><option value='sk'>Slovakian</option><option value='sl'>Slovenian</option><option value='es'>Spanish</option><option value='sv'>Swedish</option><option value='ta'>Tamil</option><option value='te'>Telugu</option><option value='th'>Thai</option><option value='tr'>Turkish</option><option value='uk'>Ukrainian</option><option value='ur'>Urdu</option><option value='vi'>Vietnamese</option><option value='cy'>Welsh</option>";

var currentStorageItemsFilledFirstTime = false;

var cbaiLastBlock;

(
    function( blocks, blockEditor, element, richText ) {
        var el = wp.element.createElement;

        var __ = wp.i18n.__;
        var registerBlockType = wp.blocks.registerBlockType;

        var _wp$editor = wp.blockEditor,
            InspectorControls = _wp$editor.InspectorControls,
            BlockControls = _wp$editor.BlockControls;

        var _wp$components = wp.components,
            Dashicon = _wp$components.Dashicon,
            Toolbar = _wp$components.Toolbar,
            ToolbarButton = _wp$components.ToolbarButton,
            Button = _wp$components.Button,
            Tooltip = _wp$components.Tooltip,
            PanelBody = _wp$components.PanelBody,
            TextareaControl = _wp$components.TextareaControl,
            CheckboxControl = _wp$components.CheckboxControl,
            TextControl = _wp$components.TextControl,
            SelectControl = _wp$components.SelectControl;
            
        var RichText = wp.blockEditor.RichText;

        let block = blocks.registerBlockType( 'content-bot/content-block', {
            title: 'AI Content',
            icon: 'smiley',
            category: 'formatting',
            attributes: {
                title: {
                    type: 'string',
                    selector: 'h3'
                },
                pName: {
                    type: 'string'
                },
                pDescription: {
                    type: 'string'
                },
                pBPE1: {
                    type: 'string'
                },
                pBPE2: {
                    type: 'string'
                },
                pBPE3: {
                    type: 'string'
                },
                pSalesPurpose: {
                    type: 'string'
                },
                pSalesName: {
                    type: 'string'
                },
                pSalesCompanyName: {
                    type: 'string'
                },
                pSalesIndustry: {
                    type: 'string'
                },
                pSalesLeadName: {
                    type: 'string'
                },
                pSalesLeadCompanyName: {
                    type: 'string'
                },
                pSalesLeadIndustry: {
                    type: 'string'
                },
                pSalesLeadGoals: {
                    type: 'string'
                },
                pSalesProductBenifits: {
                    type: 'string'
                },
                pGoal: {
                    type: 'string'
                },
                pExperience: {
                    type: 'string'
                },
                pDelivery: {
                    type: 'string'
                },
                pHighlights: {
                    type: 'string'
                },
                pTone: {
                    type: 'string'
                },
                pGrade: {
                    type: 'string',
                },
                pType: {
                    type: 'string'
                },
                pBlogTopic: {
                    type: 'string'
                },
                pIndustry: {
                    type: 'string'
                },
                pAudience: {
                    type: 'string'
                },
                pKeywords: {
                    type: 'string'
                },
                pIncludeIntros: {
                    type: 'string'
                },
                pIncludeTrends: {
                    type: 'string'
                },
                pLoginEmail: {
                    type: 'string'
                },
                pLoginPassword: {
                    type: 'string'
                },
                pApiKey: {
                    type: 'string'
                },
                pOutput: {
                    type: 'string'
                },
                pLanguageService: {
                    type: 'string'
                },
                pLanguageSource: {
                    type: 'string'
                },
                pLanguageTarget: {
                    type: 'string'
                },
                pLanguageFormality: {
                    type: 'string'
                },
                content: {
                    type: 'string',
                    source: 'html',
                    selector: 'div',
                    multiline: 'p',
                }
            },
            edit: function(props) {
                cbaiLastBlock = props;
                
                const $ = jQuery;

                var attributes = props.attributes;

                if (typeof cbai_data.otl === 'undefined' || cbai_data.otl === '') {
                    cb_usr_holder = 'hidden';
                    cb_reg_holder = '';
                }

                // Functions moved to their own files
                
                if ($('#cbai_input_copy_type').length < 1){
                    currentStorageItemsFilledFirstTime = false;
                }

                //LocalStorage handling on page load
                if (currentStorageItemsFilledFirstTime == false){
                    setTimeout(function() {
                        for (k in validation) {
                            if ($('#cbai_input_copy_type').length > 0){
                                var currentStorageItem = localStorage.getItem("cb_"+k);
                                if (currentStorageItem !== null) {
                                    $("#"+k).val(currentStorageItem);
                                    currentStorageItemsFilledFirstTime = true;
                                }
                            }
                        }

                        $('#cbai_input_language_service').trigger('change');  
                        var currentStorageItem_From = localStorage.getItem("cbai_input_language_source");
                        if (currentStorageItem_From !== null) {
                            $("#cbai_input_language_source").val(currentStorageItem_From).trigger('change');
                        }
                        var currentStorageItem_To = localStorage.getItem("cbai_input_language_target");
                        if (currentStorageItem_To !== null) {
                            $("#cbai_input_language_target").val(currentStorageItem_To).trigger('change');
                        }

                        // Disable language settings related to DeepL
                        $("#cbai_input_language_formality").attr('disabled',true);
                        $("#cbai_input_language_formality").attr('readonly',true);
                        $("#FormalityHelperService").show();
                    },250);
                }

                return [

                    el(

                        InspectorControls,
                        {
                            key: "inspector"
                        },

                        React.createElement(
                            PanelBody,
                            { title: __('ContentBot AI') },

                            React.createElement(
                                "div",
                                { "class": "content-bot-block-gutenberg-button-container" },
                                
                                // registration area
                                React.createElement(
                                    "div",
                                    {
                                        "class": "content-bot-registration-holder "+cb_reg_holder,
                                        "id" : "content-bot-registration-holder"
                                    },
                                    
                                    React.createElement(
                                        'div',
                                        { 'id' : 'content-bot-registration-holder-intial' },

                                        React.createElement(
                                            "p",
                                            {
                                                "class": "",
                                                "id" : ""
                                            },

                                            React.createElement(
                                                'img',
                                                {
                                                    'src': cbai_data.location+"img/wave.png",
                                                    'class': 'content-bot-hand-wave'
                                                },
                                            ),

                                            React.createElement(
                                                "strong",
                                                {
                                                    "class": "",
                                                    "id" : ""
                                                },

                                                React.createElement(
                                                    'p',
                                                    {},
                                                    "You need an account to use ContentBot."
                                                )
                                            )
                                            
                                        ),

                                        React.createElement(
                                            "p",
                                            {
                                                "class": "content-bot-end-buttons-container",
                                                "id" : ""
                                            },
                                            
                                            React.createElement(
                                                "button",
                                                {
                                                    "class": "button button-secondary",
                                                    "id" : "content-bot-register",
                                                    onClick: function() {
                                                        registerUser()
                                                    }
                                                },
                                                "Create account"
                                            ),

                                            React.createElement(
                                                "button",
                                                { 
                                                    "class": "button button-secondary",
                                                    "id" : "content-bot-login",
                                                    onClick: function() {
                                                        showLoginArea();
                                                    }
                                                },
                                                "I have an account"
                                            )
                                        ),

                                        React.createElement(
                                            "p",
                                            {},
                                            ''
                                        ),

                                        React.createElement(
                                            "p",
                                            {},
                                            
                                            React.createElement(
                                                'span',
                                                {},

                                                React.createElement(
                                                    'span',
                                                    {},
                                                    'Need help? '
                                                ),

                                                React.createElement(
                                                    'a',
                                                    {
                                                        href:'http://contentbot.ai/#contact',
                                                        target:'_BLANK'
                                                    },
                                                    'Contact us'
                                                ),

                                                React.createElement(
                                                    'span',
                                                    {},
                                                    '.'
                                                )
                                            )
                                        )
                                    ),

                                    React.createElement(
                                        'div',
                                        {
                                            'id': 'content-bot-login-form',
                                            'class' : 'hidden'
                                        },

                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Email'),
                                                "placeholder": "youremail@domain.com",
                                                "class": "components-text-control__input",
                                                "id" : "content-bot-login-form-input-email", 
                                                "value" : attributes.pLoginEmail,
                                                onChange: function () {

                                                }
                                            }
                                        ),

                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Password'),
                                                "placeholder": "",
                                                "class": "components-text-control__input", 
                                                "id" : "content-bot-login-form-input-password", 
                                                "type" : "password",
                                                "value" : attributes.pLoginPassword,
                                                onChange: function () {

                                                }
                                            }
                                        ),

                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('API Key'),
                                                "placeholder": "",
                                                "class": "components-text-control__input", 
                                                "id" : "content-bot-login-form-input-apikey", 
                                                "value" : attributes.pApiKey,
                                                onChange: function () {
                                                    
                                                }
                                            }
                                        ),

                                        React.createElement(
                                            'p',
                                            {'id' : 'apiKeyLoginHelper'},

                                            React.createElement(
                                                'span',
                                                {},
                                                'You may find your API Key '
                                            ),
                                            
                                            React.createElement(
                                                'a',
                                                {
                                                    "href" : 'https://contentbot.ai/app/integrations',
                                                    "target" : '_BLANK'
                                                },
                                                "here"
                                            ),
                                            
                                            React.createElement(
                                                'span',
                                                {},
                                                '.'
                                            )
                                        ),

                                        React.createElement(
                                            'p',
                                            {},

                                            React.createElement(
                                                'a',
                                                {
                                                    "id" : "content-bot-login-method",
                                                    "href" : "javascript:void(0);",
                                                    onClick: function(){
                                                        toggleLoginMethod();
                                                    }
                                                },
                                                "Use API key instead",
                                            ),
                                        ),

                                        React.createElement(
                                            'p',
                                            {},

                                            React.createElement(
                                                'div',
                                                {"class" : "content-bot-end-buttons-container"},
    
                                                React.createElement(
                                                    "button",
                                                    { 
                                                        "class": "button button-secondary",
                                                        "id" : "content-bot-login-back-button",
                                                        onClick: function() {
                                                            loginBack(); 
                                                        }
                                                    },
                                                    "Back"
                                                ),
    
                                                React.createElement(
                                                    "button",
                                                    { 
                                                        "class": "button button-primary",
                                                        "id" : "content-bot-login-button",
                                                        onClick: function() {
                                                            login(); 
                                                        }
                                                    },
                                                    "Login"
                                                ),
                                            ),
                                        ),

                                        React.createElement(
                                            "p",
                                            {},
                                            
                                            React.createElement(
                                                'span',
                                                {},
                                                
                                                React.createElement(
                                                    'span',
                                                    {},
                                                    'Need help? '
                                                ),
                                                
                                                React.createElement(
                                                    'a',
                                                    {href:'http://contentbot.ai/#contact', target:'_BLANK'},
                                                    'Contact us'
                                                ),
                                                
                                                React.createElement(
                                                    'span',
                                                    {},
                                                    '.'
                                                )
                                            )
                                        )

                                    ),

                                    React.createElement(
                                        'div',
                                        { 'id': 'content-bot-register-form' },
                                        ''
                                    ),
                                    
                                ),              


                                // user area
                                React.createElement(
                                    "div",
                                    {
                                        "class": "content-bot-user-holder "+cb_usr_holder,
                                        "id" : "content-bot-user-holder"
                                    },

                                    React.createElement(
                                        "p",
                                        {
                                            class: 'content-bot-limit-remaining hidden',
                                            id: 'content-bot-limit-remaining'
                                        },
                                        
                                        React.createElement(
                                            'span',
                                            {},
                                            __('Limit remaining: ')
                                        ),
                                        
                                        React.createElement(
                                            'span',
                                            { id : 'content-bot-limit-qty' },
                                            '...'
                                        ),
                                        
                                        React.createElement(
                                            'span',
                                            {  },
                                            ' '
                                        ),
                                        
                                        React.createElement(
                                            'a',
                                            {
                                                href: 'https://contentbot.ai/app/login.php?otl='+cbai_data.otl,
                                                'target': '_BLANK'
                                            },
                                            'Upgrade'
                                        )
                                    ),

                                    React.createElement(
                                        "p",
                                        {
                                            class: 'content-bot-message hidden',
                                            id: 'content-bot-message'
                                        },
                                        ''
                                    ),

                                    React.createElement(
                                        SelectControl,
                                        {
                                            label: __('Copy type'),
                                            id: 'cbai_input_copy_type',
                                            options: [
                                                { value: 'instruct', label: 'Instruct'},
                                                { value: 'blog_intro', label: 'Blog Intros' },
                                                { value: 'blog_conclusion', label: 'Blog Conclusions' },
                                                { value: 'generate_paragraph', label: 'Paragraph' },
                                                { value: 'finish_sentence', label: 'Finish the Sentence' },
                                                { value: 'change_tone', label: 'Change Tone' },
                                                { value: 'boutline', label: 'Blog Outline' },
                                                { value: 'blog_topics_v2', label: 'Blog Topic Ideas' },
                                                { value: 'bpe', label: 'Bullet Point Expander' },
                                                { value: 'listicle', label: 'Listicle' },
                                                { value: 'engaging_questions', label: 'Engaging Questions' },
                                                { value: 'pas', label: 'Pain-Agitate-Solution' },
                                                { value: 'pbs', label: 'Pain-Benefit-Solution' },
                                                { value: 'aida', label: 'AIDA' },  
                                                { value: 'summarizer', label: 'Summarizer' },
                                                { value: 'summarizer_long', label: 'Summarizer (Long Form)' },
                                                { value: 'explain_it_to_a_child', label: 'Explain it to a Child' }, 
                                                { value: 'explain_like_professor', label: 'Explain it like a Professor' },
                                                { value: 'rewriter', label: 'Sentence Rewriter' },
                                                { value: 'talking_points', label: 'Talking Points' },
                                                { value: 'youtube_ideas', label: 'Video Ideas' },
                                                { value: 'video_description', label: 'Video Description' },
                                                { value: 'brand_names', label: 'Brand Names' },
                                                { value: 'slogan', label: 'Slogan Generator' },
                                                { value: 'brand_story', label: 'Brand Story' },
                                                { value: 'value_proposition', label: 'Value Proposition' },
                                                { value: 'landing_page', label: 'Landing Page' },
                                                { value: 'headline_ideas', label: 'Page Headlines Ideas' },
                                                { value: 'product_description', label: 'Product Description' },
                                                { value: 'startup_ideas', label: 'Startup Ideas' },
                                                { value: 'marketing_ideas', label: 'Marketing Ideas' },
                                                { value: 'instagram_caption', label: 'Photo Captions' },
                                                { value: 'pitch_yourself', label: 'Pitch Yourself' },
                                                { value: 'answers', label: 'Quora Answers' },                
                                            ],
                                            onChange:function( copyTypeSelected ) {

                                                currentStorageItemsFilledFirstTime = false;

                                                // Set validation
                                                validation = {
                                                    'cbai_input_name' : false,
                                                    'cbai_input_desc' : false,
                                                    'cbai_input_tone' : false,
                                                    'cbai_input_industry' : false,
                                                    'cbai_input_topic' : false,
                                                    'cbai_input_audience' : false,
                                                    'cbai_input_keywords' : false,
                                                    'cbaiSales_Purpose' : false,
                                                    'cbaiSales_Name' : false,
                                                    'cbaiSales_CompanyName' : false,
                                                    'cbaiSales_Industry' : false,
                                                    'cbaiSales_LeadName' : false,
                                                    'cbaiSales_LeadCompanyName' : false,
                                                    'cbaiSales_LeadIndustry' : false,
                                                    'cbaiSales_LeadGoals' : false,
                                                    'cbaiSales_ProductBenefits' : false,
                                                    'cbai_BPE_1' : false,
                                                    'cbai_BPE_2' : false,
                                                    'cbai_BPE_3' : false,
                                                    'cbaiPitch_InputDelivery' : false,
                                                    'cbaiPitch_InputGoal' : false,
                                                    'cbaiPitch_InputHighlights' : false,
                                                    'cbaiPitch_InputExperience' : false,
                                                };

                                                for (k in validation) {
                                                    var currentStorageItem = localStorage.getItem("cb_"+k);
                                                    if (currentStorageItem !== null) {
                                                        $("#"+k).val(currentStorageItem);
                                                        
                                                    }
                                                }
                                                
                                                setTimeout(function() {
                                                    $('#cbai_input_language_service').trigger('change');  
                                                    var currentStorageItem_From = localStorage.getItem("cbai_input_language_source");
                                                    if (currentStorageItem_From !== null) {
                                                        $("#cbai_input_language_source").val(currentStorageItem_From).trigger('change');
                                                    }
                                                    var currentStorageItem_To = localStorage.getItem("cbai_input_language_target");
                                                    if (currentStorageItem_To !== null) {
                                                        $("#cbai_input_language_target").val(currentStorageItem_To).trigger('change');
                                                    }
                                                },250);
                                                

                                                props.setAttributes({pType: copyTypeSelected});

                                                $("#cbaiIncludeIntros").addClass('hidden');

                                                $('#cbai_input_desc ').attr('placeholder','Selling and Delivering gadgets');
                                                
                                                if (copyTypeSelected == 'blog_intro') {

                                                    $("#cbaiBlogTopic").removeClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").addClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").removeClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $("#cbaiBlogTopic label").html("Topic");
                                                    
                                                    validation.cbai_input_topic = true;
                                                    validation.cbai_input_tone = true;

                                                } else if (copyTypeSelected == 'blog_conclusion') {

                                                    $("#cbaiBlogTopic").removeClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").addClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $("#cbaiBlogTopic label").html("Topic");

                                                    validation.cbai_input_topic = true;

                                                } else if (copyTypeSelected == 'generate_paragraph') {
                                                    
                                                    $("#cbaiBlogTopic").removeClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").addClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").removeClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $("#cbaiBlogTopic label").html("Topic");
                                                    $("#cbaiKeywords label").html("Keywords");

                                                    validation.cbai_input_topic = true;
                                                    validation.cbai_input_keywords = true;

                                                }  else if (copyTypeSelected == 'finish_sentence') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Sentence');
                                                    $('#cbai_input_desc ').attr('placeholder', 'Albert Einstein was a great');
                                                    validation.cbai_input_desc = true;

                                                }  else if (copyTypeSelected == 'change_tone') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").removeClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Paragraph');
                                                    
                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_tone = true;

                                                }  else if (copyTypeSelected == 'boutline') {

                                                    $("#cbaiBlogTopic").removeClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiBlogTopic label').html('Topic');
                                                    $('#cbaiProductDescription label').html('Description');

                                                    validation.cbai_input_topic = true;
                                                    validation.cbai_input_desc = true;

                                                } else if (copyTypeSelected == 'blog_topics_v2') {

                                                    $("#cbaiBlogTopic").removeClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").addClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").removeClass('hidden');
                                                    $("#cbaiIncludeTrends").removeClass('hidden');

                                                    $('#cbaiBlogTopic label').html('Topic');

                                                    validation.cbai_input_topic = true;                                                         

                                                }  else if (copyTypeSelected == 'bpe') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").addClass('hidden');
                                                    $("#cbaiRowBPEFields").removeClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    validation.cbai_BPE_1 = true;
                                                    validation.cbai_BPE_2 = true;
                                                    validation.cbai_BPE_3 = true;

                                                } else if (copyTypeSelected == 'listicle') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');                  

                                                    $('#cbaiProductDescription label').html('Short Description');

                                                    validation.cbai_input_desc = true;

                                                } else if (copyTypeSelected == 'engaging_questions') {
                                                    
                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").removeClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');                  

                                                    $('#cbaiProductDescription label').html('Short Description');

                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_audience = true;
                                                    
                                                }  else if (copyTypeSelected == 'pas' || copyTypeSelected == 'pbs') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").removeClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $("#cbaiProductName label").html('Product Name');
                                                    $('#cbaiProductDescription label').html('Short Description');
                                                    
                                                    validation.cbai_input_name = true;
                                                    validation.cbai_input_desc = true;

                                                }  else if (copyTypeSelected == 'aida') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").removeClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $("#cbaiProductName label").html('Product Name');
                                                    $('#cbaiProductDescription label').html('Short Description');

                                                    validation.cbai_input_name = true;
                                                    validation.cbai_input_desc = true;

                                                }  else if (copyTypeSelected == 'summarizer' || copyTypeSelected == 'summarizer_long') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Paragraph');

                                                    validation.cbai_input_desc = true;

                                                }  else if (copyTypeSelected == 'explain_it_to_a_child') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").removeClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Paragraph');
                                                    
                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_grade = true;

                                                }  else if (copyTypeSelected == 'explain_like_professor') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Paragraph');
                                                    
                                                    validation.cbai_input_desc = true;

                                                }  else if (copyTypeSelected == 'rewriter') {
                                                    
                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").removeClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Copy');

                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_tone = true;

                                                }  else if (copyTypeSelected == 'talking_points') {
                                                    
                                                    $("#cbaiBlogTopic").removeClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiBlogTopic label').html('Topic');
                                                    $('#cbaiProductDescription label').html('Short Description');

                                                    validation.cbai_input_topic = true;
                                                    validation.cbai_input_desc = true;

                                                }  else if (copyTypeSelected == 'youtube_ideas') {
                                                    
                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").removeClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Short Description');
                                                    
                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_keywords = true;
                                                    
                                                }  else if ( copyTypeSelected == 'video_description') {
                                                    
                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").removeClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Video Topic');
                                                    
                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_keywords = true;

                                                }  else if (copyTypeSelected == 'brand_names') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").removeClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Short Description');
                                                    
                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_keywords = true;
                                                    
                                                }  else if (copyTypeSelected == 'slogan') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").removeClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").removeClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductName label').html('Product Name');
                                                    $('#cbaiProductDescription label').html('Short Description');

                                                    validation.cbai_input_name = true;
                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_keywords = true;

                                                }  else if (copyTypeSelected == 'brand_story') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").removeClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Short Description');
                                                    
                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_keywords = true;

                                                }  else if (copyTypeSelected == 'value_proposition') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").removeClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductName label').html('Product Name');
                                                    $('#cbaiProductDescription label').html('Short Description');

                                                    validation.cbai_input_name = true;
                                                    validation.cbai_input_desc = true;

                                                }  else if (copyTypeSelected == 'landing_page') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").removeClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").removeClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductName label').html('Product Name');
                                                    $('#cbaiProductDescription label').html('Short Description');
                                                    
                                                    validation.cbai_input_name = true;
                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_keywords = true;
                                                    
                                                } else if (copyTypeSelected == 'headline_ideas') {
                                                    
                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").removeClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").removeClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductName label').html('Product Name');
                                                    $('#cbaiProductDescription label').html('Short Description');
                                                    validation.cbai_input_name = true;
                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_tone = true;

                                                } else if (copyTypeSelected == 'product_description') {
                                                    
                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").removeClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").removeClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductName label').html('Product Name');
                                                    $('#cbaiProductDescription label').html('Short Description');

                                                    validation.cbai_input_name = true;
                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_tone = true;                            

                                                }  else if (copyTypeSelected == 'startup_ideas') {

                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Short Description');

                                                    validation.cbai_input_desc = true;
                                                    
                                                }  else if (copyTypeSelected == 'marketing_ideas') {
                                                    
                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").removeClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").removeClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductName label').html('Product Name');
                                                    $('#cbaiProductDescription label').html('Short Description');

                                                    validation.cbai_input_name = true;
                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_industry = true;                                           
                                                
                                                }  else if (copyTypeSelected == 'instagram_caption') {
                                                    
                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").removeClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Photo Description');
                                                    $('#cbai_input_desc ').attr('placeholder', 'Going to the beach');
                                                    
                                                    validation.cbai_input_desc = true;
                                                    validation.cbai_input_tone = true;   

                                                }  else if (copyTypeSelected == 'instruct') {
                                                    
                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Instruction');
                                                    $('#cbai_input_desc ').attr('placeholder', 'Write me a story about space travel');
                                                    
                                                    validation.cbai_input_desc = true;

                                                }  else if (copyTypeSelected == 'pitch_yourself') {
                                                    
                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").removeClass('hidden');
                                                    $("#cbaiProductDescription").addClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").removeClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").removeClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductName label').html('Client');
                                                    
                                                    validation.cbai_input_name = true;
                                                    validation.cbaiPitch_InputDelivery = true;
                                                    validation.cbaiPitch_InputExperience = true;
                                                    validation.cbaiPitch_InputGoal = true;
                                                    validation.cbaiPitch_InputHighlights = true;
                                                    validation.cbai_input_industry = true;
                                                
                                                }  else if (copyTypeSelected == 'answers') {
                                                    
                                                    $("#cbaiBlogTopic").addClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").removeClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").addClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $('#cbaiProductDescription label').html('Question');
                                                    $('#cbai_input_desc ').attr('placeholder', 'How can content marketing help my business?');

                                                    validation.cbai_input_desc = true;

                                                } else { // Default to blog intro

                                                    $("#cbaiBlogTopic").removeClass('hidden');
                                                    $("#cbaiProductName").addClass('hidden');
                                                    $("#cbaiProductDescription").addClass('hidden');
                                                    $("#cbaiRowBPEFields").addClass('hidden');
                                                    $("#cbaiRowSalesEmailFields").addClass('hidden');
                                                    $("#cbaiRowPitchYourselfFields").addClass('hidden');
                                                    $("#cbaiRowAudience").addClass('hidden');
                                                    $("#cbaiKeywords").addClass('hidden');
                                                    $("#cbaiIndustry").addClass('hidden');
                                                    $("#cbaiTone").removeClass('hidden');
                                                    $("#cbaiGrade").addClass('hidden');
                                                    $("#cbaiIncludeIntros").addClass('hidden');
                                                    $("#cbaiIncludeTrends").addClass('hidden');

                                                    $("#cbaiBlogTopic label").html("Topic");
                                                    
                                                    validation.cbai_input_topic = true;
                                                    validation.cbai_input_tone = true;

                                                }

                                                var feedbackSent = localStorage.getItem("feedbackSent");
                                                if (feedbackSent == '1') {
                                                    $("#feedbackPrompt").hide();
                                                } else {
                                                    $("#feedbackPrompt").show();
                                                }


                                                $("body").on("click", "#feedbackPrompt", function() {
                                                    localStorage.setItem("feedbackSent", "1");
                                                    $("#feedbackPrompt").hide();
                                                    $(".fdbcktoggleBtn6525two").click();
                                                })
                                                
                                            }
                                        }
                                    ),   
                                    
                                    React.createElement(
                                        "p",
                                        { 
                                            "class": "content-bot-block-gutenberg-button-container hidden",
                                            "id": "cbaiBlogTopic"
                                        },
                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Article Topic'),
                                                "placeholder": "Example: selling live chat software",
                                                id: 'cbai_input_topic',
                                                "class": "components-text-control__input", 
                                                "value" : attributes.pBlogTopic,
                                                onChange: function (newName) {
                                                    props.setAttributes({ pBlogTopic: newName })
                                                }
                                            }
                                            
                                        )
                                    ),

                                    React.createElement(
                                        "p",
                                        { 
                                            "class": "content-bot-block-gutenberg-button-container hidden",
                                            "id": "cbaiIncludeIntros"
                                        },
                                        
                                        React.createElement(
                                            CheckboxControl,
                                            { 
                                                "label": __('Include Intros?'),
                                                "class": "",
                                                id: 'cbai_input_intros',
                                                "value" : props.attributes.pIncludeIntros,
                                                onChange: function (state) {
                                                    props.setAttributes({ pIncludeIntros: state })
                                                }
                                            },
                                            
                                            
                                        ),

                                        React.createElement(
                                            "em",
                                            { 
                                                "class": "content-bot-block-gutenberg-button-container",
                                                "id": "cbaiIncludeIntrosMsg"
                                            },
                                            "(Each topic idea will include a short paragraph for the article. Will result in a slightly longer wait time for the results to appear)."
                                        ),
                                    ),

                                    // React.createElement(
                                    //     "p",
                                    //     { 
                                    //         "class": "content-bot-block-gutenberg-button-container hidden",
                                    //         "id": "cbaiIncludeTrends"
                                    //     },
                                        
                                    //     React.createElement(
                                    //         CheckboxControl,
                                    //         { 
                                    //             "label": __('Include Trends?'),
                                    //             "class": "",
                                    //             id: 'cbai_input_trends',
                                    //             "value" : props.attributes.pIncludeTrends,
                                    //             onChange: function (stateTrend) {
                                    //                 props.setAttributes({ pIncludeTrends: stateTrend })
                                    //             }
                                    //         },
                                    //     ),

                                    //     React.createElement(
                                    //         "em",
                                    //         { 
                                    //             "class": "content-bot-block-gutenberg-button-container",
                                    //             "id": "cbaiIncludeTrendsMsg"
                                    //         },
                                    //         "(We will identify the latest trends in your industry and generate unique blog topic ideas based on those trends.)."
                                    //     ),
                                    // ),
                                    
                                    React.createElement(
                                        "p",
                                        { 
                                            "class": "content-bot-block-gutenberg-button-container hidden",
                                            "id": "cbaiProductName"
                                        },
                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Product Name'),
                                                "class": "components-text-control__input", 
                                                "placeholder": "Acme Labs",
                                                id: 'cbai_input_name',
                                                "value" : props.attributes.pName,
                                                onChange: function (newName) {
                                                    props.setAttributes({ pName: newName })
                                                }
                                            }
                                            
                                        )
                                    ),

                                    React.createElement(
                                        "p",
                                        { 
                                            "class": "content-bot-block-gutenberg-button-container",
                                            "id": "cbaiProductDescription"
                                        },
                                        
                                        React.createElement(
                                            TextareaControl,
                                            { 
                                                "label": __('Instruction'),
                                                "class": "components-text-control__input",
                                                id: 'cbai_input_desc',
                                                "value" : props.attributes.pDescription,
                                                "placeholder" : "Write me a story about space travel",
                                                onChange: function (newDescription) {
                                                    props.setAttributes({ pDescription: newDescription })
                                                }
                                            },
                                        )
                                    ),

                                    React.createElement(
                                        "p",
                                        { 
                                            "class": "content-bot-block-gutenberg-button-container hidden",
                                            "id": "cbaiRowBPEFields"
                                        },
                                        
                                        React.createElement(
                                            TextareaControl,
                                            { 
                                                "label": __('Bullet Point 1'),
                                                "class": "components-text-control__input",
                                                id: 'cbai_BPE_1',
                                                "value" : props.attributes.pBPE1,
                                                "placeholder" : "eg. Content is super important for new startups",
                                                onChange: function (newBullet1) {
                                                    props.setAttributes({ pBPE1: newBullet1 })
                                                }
                                            },
                                        ),

                                        React.createElement(
                                            TextareaControl,
                                            { 
                                                "label": __('Bullet Point 2'),
                                                "class": "components-text-control__input",
                                                id: 'cbai_BPE_2',
                                                "value" : props.attributes.pBPE2,
                                                "placeholder" : "eg. Great content can increase sales",
                                                onChange: function (newBullet2) {
                                                    props.setAttributes({ pBPE2: newBullet2 })
                                                }
                                            },
                                        ),

                                        React.createElement(
                                            TextareaControl,
                                            { 
                                                "label": __('Bullet Point 3'),
                                                "class": "components-text-control__input",
                                                id: 'cbai_BPE_3',
                                                "value" : props.attributes.pBPE3,
                                                "placeholder" : "eg. Without content, you leave yourself",
                                                onChange: function (newBullet3) {
                                                    props.setAttributes({ pBPE3: newBullet3 })
                                                }
                                            },
                                        )
                                    ),

                                    React.createElement(
                                        "p",
                                        { 
                                            "class": "content-bot-block-gutenberg-button-container hidden",
                                            "id": "cbaiRowSalesEmailFields"
                                        },
                                        
                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Sales Purpose'),
                                                "class": "components-text-control__input",
                                                id: 'cbaiSales_Purpose',
                                                "value" : props.attributes.pSalesPurpose,
                                                "placeholder" : "eg. Sales introduction or Sales follow up",
                                                onChange: function (newSalesPurpose) {
                                                    props.setAttributes({ pSalesPurpose: newSalesPurpose })
                                                }
                                            },
                                        ),

                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Your Name'),
                                                "class": "components-text-control__input",
                                                id: 'cbaiSales_Name',
                                                "value" : props.attributes.pSalesName,
                                                "placeholder" : "",
                                                onChange: function (newSalesName) {
                                                    props.setAttributes({ pSalesName: newSalesName })
                                                }
                                            },
                                        ),

                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Your Company Name'),
                                                "class": "components-text-control__input",
                                                id: 'cbaiSales_CompanyName',
                                                "value" : props.attributes.pSalesCompanyName,
                                                "placeholder" : "",
                                                onChange: function (newSalesCompanyName) {
                                                    props.setAttributes({ pSalesCompanyName: newSalesCompanyName })
                                                }
                                            },
                                        ),

                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Your Industry'),
                                                "class": "components-text-control__input",
                                                id: 'cbaiSales_Industry',
                                                "value" : props.attributes.pSalesIndustry,
                                                "placeholder" : "",
                                                onChange: function (newSalesIndustry) {
                                                    props.setAttributes({ pSalesIndustry: newSalesIndustry })
                                                }
                                            },
                                        ),

                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Lead Name'),
                                                "class": "components-text-control__input",
                                                id: 'cbaiSales_LeadName',
                                                "value" : props.attributes.pSalesLeadName,
                                                "placeholder" : "",
                                                onChange: function (newSalesLeadName) {
                                                    props.setAttributes({ pSalesLeadName: newSalesLeadName })
                                                }
                                            },
                                        ),

                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Lead Company Name'),
                                                "class": "components-text-control__input",
                                                id: 'cbaiSales_LeadCompanyName',
                                                "value" : props.attributes.pSalesLeadCompanyName,
                                                "placeholder" : "",
                                                onChange: function (newSalesLeadCompanyName) {
                                                    props.setAttributes({ pSalesLeadCompanyName: newSalesLeadCompanyName })
                                                }
                                            },
                                        ),

                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Lead Industry'),
                                                "class": "components-text-control__input",
                                                id: 'cbaiSales_LeadIndustry',
                                                "value" : props.attributes.pSalesLeadIndustry,
                                                "placeholder" : "",
                                                onChange: function (newSalesLeadIndustry) {
                                                    props.setAttributes({ pSalesLeadIndustry: newSalesLeadIndustry })
                                                }
                                            },
                                        ),

                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Lead Goals'),
                                                "class": "components-text-control__input",
                                                id: 'cbaiSales_LeadGoals',
                                                "value" : props.attributes.pSalesLeadGoals,
                                                "placeholder" : "eg. Increase copy output through blog topic ideas, product descriptions and other AI content with a 40% off coupon",
                                                onChange: function (newSalesLeadGoals) {
                                                    props.setAttributes({ pSalesLeadGoals: newSalesLeadGoals })
                                                }
                                            },
                                        ),

                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Product Benifits'),
                                                "class": "components-text-control__input",
                                                id: 'cbaiSales_ProductBenifits',
                                                "value" : props.attributes.pSalesProductBenifits,
                                                "placeholder" : "eg. reduce time spent on ideation",
                                                onChange: function (newSalesProductBenifits) {
                                                    props.setAttributes({ pSalesProductBenifits: newSalesProductBenifits })
                                                }
                                            },
                                        )
                                    ),
                                    
                                    React.createElement(
                                        "p",
                                        { 
                                            "class": "content-bot-block-gutenberg-button-container hidden",
                                            "id": "cbaiRowPitchYourselfFields"
                                        },
                                        
                                        React.createElement(
                                            TextareaControl,
                                            { 
                                                "label": __('Your Goal'),
                                                "class": "components-text-control__input",
                                                id: 'cbaiPitch_InputGoal',
                                                "value" : props.attributes.pGoal,
                                                "placeholder" : "eg. Create an HR platform",
                                                onChange: function (newGoal) {
                                                    props.setAttributes({ pGoal: newGoal })
                                                }
                                            },
                                        ),

                                        React.createElement(
                                            TextareaControl,
                                            { 
                                                "label": __('Your Experience'),
                                                "class": "components-text-control__input",
                                                id: 'cbaiPitch_InputExperience',
                                                "value" : props.attributes.pExperience,
                                                "placeholder" : "eg. Great content can increase sales",
                                                onChange: function (newExperience) {
                                                    props.setAttributes({ pExperience: newExperience })
                                                }
                                            },
                                        ),

                                        React.createElement(
                                            TextareaControl,
                                            { 
                                                "label": __('Expected Delivery'),
                                                "class": "components-text-control__input",
                                                id: 'cbaiPitch_InputDelivery',
                                                "value" : props.attributes.pDelivery,
                                                "placeholder" : "eg. About 2 weeks",
                                                onChange: function (newDelivery) {
                                                    props.setAttributes({ pDelivery: newDelivery })
                                                }
                                            },
                                        ),

                                        React.createElement(
                                            TextareaControl,
                                            { 
                                                "label": __('Your Background'),
                                                "class": "components-text-control__input",
                                                id: 'cbaiPitch_InputHighlights',
                                                "value" : props.attributes.pHighlights,
                                                "placeholder" : "eg. Senior Developer",
                                                onChange: function (newHighlights) {
                                                    props.setAttributes({ pHighlights: newHighlights })
                                                }
                                            },
                                        )
                                    ),

                                    React.createElement(
                                        "p",
                                        { 
                                            "class": "content-bot-block-gutenberg-button-container hidden",
                                            "id": "cbaiIndustry"
                                        },
                                        
                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Industry'),
                                                "class": "components-text-control__input",
                                                "value" : props.attributes.pIndustry,
                                                "placeholder" : "live chat",
                                                id: 'cbai_input_industry',
                                                onChange: function (newIndustry) {
                                                    props.setAttributes({ pIndustry: newIndustry })
                                                }
                                            },                 
                                        )
                                    ),       

                                    React.createElement(
                                        "p",
                                        { 
                                            "class": "content-bot-block-gutenberg-button-container hidden",
                                            "id": "cbaiRowAudience"
                                        },
                                        
                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Audience'),
                                                "class": "components-text-control__input",
                                                "value" : props.attributes.pAudience,
                                                "placeholder" : "live chat, chat, support",
                                                id: 'cbai_input_audience',
                                                onChange: function (newAudience) {
                                                    props.setAttributes({ pAudience: newAudience })
                                                }
                                            }, 
                                        )
                                    ),

                                    React.createElement(
                                        "p",
                                        { 
                                            "class": "content-bot-block-gutenberg-button-container hidden",
                                            "id": "cbaiKeywords"
                                        },
                                        
                                        React.createElement(
                                            TextControl,
                                            { 
                                                "label": __('Keywords'),
                                                "class": "components-text-control__input",
                                                "value" : props.attributes.pKeywords,
                                                "placeholder" : "live chat, chat, support",
                                                id: 'cbai_input_keywords',
                                                onChange: function (newKeywords) {
                                                    props.setAttributes({ pKeywords: newKeywords })
                                                }
                                            }, 
                                        )
                                    ),

                                    React.createElement(
                                        "p",
                                        { 
                                            "class": "content-bot-block-gutenberg-button-container hidden", 
                                            "id": "cbaiTone"
                                        },
                                        
                                        React.createElement(
                                            SelectControl,
                                            {
                                                label: __('Tone'),
                                                id: 'cbai_input_tone',
                                                options: [
                                                    { value: 'professional', label: 'Professional' },
                                                    { value: 'bold', label: 'Bold' },
                                                    { value: 'playful', label: 'Playful' },
                                                    { value: 'dramatic', label: 'Dramatic' },
                                                    { value: 'sarcastic', label: 'Sarcastic'},
                                                    { value: 'excited', label: 'Excited'},
                                                    { value: 'funny', label: 'Funny'}
                                                ],
                                                onChange:function( content ) {
                                                    props.setAttributes({pTone: content});
                                                }
                                            }
                                        )   
                                    ),

                                    React.createElement(
                                        "p",
                                        { 
                                            "class": "content-bot-block-gutenberg-button-container hidden", 
                                            "id": "cbaiGrade"
                                        },
                                        
                                        React.createElement(
                                            SelectControl,
                                            {
                                                label: __('Grade (1-12)'),
                                                id: 'cbai_input_grade',
                                                options: [
                                                    { value: '1', label: '1' },
                                                    { value: '2', label: '2' },
                                                    { value: '3', label: '3' },
                                                    { value: '4', label: '4' },
                                                    { value: '5', label: '5'},
                                                    { value: '6', label: '6'},
                                                    { value: '7', label: '7'},
                                                    { value: '8', label: '8'},
                                                    { value: '9', label: '9'},
                                                    { value: '10', label: '10'},
                                                    { value: '11', label: '11'},
                                                    { value: '12', label: '12'}
                                                ],
                                                onChange:function( content ) {
                                                    props.setAttributes({ pGrade: content });
                                                }
                                            }
                                        )    
                                    ),

                                    React.createElement(
                                        "p",
                                        { 
                                            "class": "content-bot-block-gutenberg-button-container", 
                                            "id": "cbaiLanguagesOptionsLink"
                                        },

                                        React.createElement(
                                            "a",
                                            {
                                                href: "javascript:void(0)",
                                                onClick:function(){
                                                    $(function($){
                                                        if($('#cbaiLanguagesOptions').hasClass('hidden')){
                                                            $('#cbaiLanguagesOptions').removeClass('hidden');
                                                        } else {
                                                            $('#cbaiLanguagesOptions').addClass('hidden');
                                                        }                       
                                                    })
                                                }
                                            },
                                            "Language Options", 
                                        )
                                    ),

                                    React.createElement(
                                        "div",
                                        {
                                            "class": "content-bot-block-gutenberg-button-container hidden",
                                            "id": "cbaiLanguagesOptions"
                                        },

                                        React.createElement(
                                            "p",
                                            { 
                                                "class": "content-bot-block-gutenberg-button-container", 
                                                "id": "cbaiLangService"
                                            },
                                            
                                            React.createElement(
                                                SelectControl,
                                                {
                                                    label: __('Translation Service'),
                                                    id: 'cbai_input_language_service',
                                                    options: [                       
                                                        { value: 'google', label: 'Google Translate' },
                                                        { value: 'deepl', label: 'DeepL' },
                                                        { value: 'watson', label: 'Watson' }
                                                    ],
                                                    onChange:function( languageService ) {
                                                        props.setAttributes({pLanguageService: languageService});
                                
                                                        if (languageService == 'deepl') {
                                                            $("#cbai_input_language_formality").attr('disabled',false);
                                                            $("#cbai_input_language_formality").attr('readonly',false);
                                                            $("#FormalityHelperService").hide();
                                                            $("#cbai_input_language_source").html(deeplLanguages); 
                                                            $("#cbai_input_language_target").html(deeplLanguages); 
                                                
                                                        } else {
                                                            $("#cbai_input_language_formality").attr('disabled',true);
                                                            $("#cbai_input_language_formality").attr('readonly',true);
                                                            $("#FormalityHelperService").show();
                                                
                                                            if (languageService == 'watson') {
                                                                $("#cbai_input_language_source").html(watsonLanguages);
                                                                $("#cbai_input_language_target").html(watsonLanguages);
                                                            }
                                                            else if (languageService == 'google') {
                                                                $("#cbai_input_language_source").html(googleLanguages);
                                                                $("#cbai_input_language_target").html(googleLanguages);
                                                            }
                                                            else {
                                                                $("#cbai_input_language_source").html(googleLanguages);  
                                                                $("#cbai_input_language_target").html(googleLanguages);  
                                                            }
                                                        }
                                                    }
                                                }
                                            )
                                        ),

                                        React.createElement(
                                            "p",
                                            { 
                                                "class": "content-bot-block-gutenberg-button-container", 
                                                "id": "cbaiLangSource"
                                            },
                                            
                                            React.createElement(
                                                SelectControl,
                                                {
                                                    label: __('Language - Source'),
                                                    id: 'cbai_input_language_source',
                                                    options: [
                                                        { value: 'en', label: 'English' },
                                                        { value: 'af', label: 'Afrikaans' },
                                                        { value: 'sq', label: 'Albanian' },
                                                        { value: 'am', label: 'Amharic' },
                                                        { value: 'ar', label: 'Arabic' },
                                                        { value: 'hy', label: 'Armenian' },
                                                        { value: 'az', label: 'Azerbaijani' },
                                                        { value: 'eu', label: 'Basque' },
                                                        { value: 'be', label: 'Belarusian' },
                                                        { value: 'bn', label: 'Bengali' },
                                                        { value: 'bs', label: 'Bosnian' },
                                                        { value: 'bg', label: 'Bulgarian' },
                                                        { value: 'ca', label: 'Catalan' },
                                                        { value: 'ceb', label: 'Cebuano' },
                                                        { value: 'ny', label: 'Chichewa' },
                                                        { value: 'zh', label: 'Chinese (Simplified)' },
                                                        { value: 'zh-TW', label: 'Chinese (Traditional)' },
                                                        { value: 'co', label: 'Corsican' },
                                                        { value: 'hr', label: 'Croatian' },
                                                        { value: 'cs', label: 'Czech' },
                                                        { value: 'da', label: 'Danish' },
                                                        { value: 'nl', label: 'Dutch' },
                                                        { value: 'eo', label: 'Esperanto' },
                                                        { value: 'et', label: 'Estonian' },
                                                        { value: 'tl', label: 'Filipino' },
                                                        { value: 'fi', label: 'Finnish' },
                                                        { value: 'fr', label: 'French' },
                                                        { value: 'fy', label: 'Frisian' },
                                                        { value: 'gl', label: 'Galician' },
                                                        { value: 'ka', label: 'Georgian' },
                                                        { value: 'de', label: 'German' },
                                                        { value: 'el', label: 'Greek' },
                                                        { value: 'gu', label: 'Gujarati' },
                                                        { value: 'ht', label: 'Haitian Creole' },
                                                        { value: 'ha', label: 'Hausa' },
                                                        { value: 'haw', label: 'Hawaiian' },
                                                        { value: 'iw', label: 'Hebrew' },
                                                        { value: 'hi', label: 'Hindi' },
                                                        { value: 'hmn', label: 'Hmong' },
                                                        { value: 'hu', label: 'Hungarian' },
                                                        { value: 'is', label: 'Icelandic' },
                                                        { value: 'ig', label: 'Igbo' },
                                                        { value: 'id', label: 'Indonesian' },
                                                        { value: 'ga', label: 'Irish' },
                                                        { value: 'it', label: 'Italian' },
                                                        { value: 'ja', label: 'Japanese' },
                                                        { value: 'jw', label: 'Javanese' },
                                                        { value: 'kn', label: 'Kannada' },
                                                        { value: 'kk', label: 'Kazakh' },
                                                        { value: 'km', label: 'Khmer' },
                                                        { value: 'rw', label: 'Kinyarwanda' },
                                                        { value: 'ko', label: 'Korean' },
                                                        { value: 'ku', label: 'Kurdish (Kurmanji)' },
                                                        { value: 'ky', label: 'Kyrgyz' },
                                                        { value: 'lo', label: 'Lao' },
                                                        { value: 'la', label: 'Latin' },
                                                        { value: 'lv', label: 'Latvian' },
                                                        { value: 'lt', label: 'Lithuanian' },
                                                        { value: 'lb', label: 'Luxembourgish' },
                                                        { value: 'mk', label: 'Macedonian' },
                                                        { value: 'mg', label: 'Malagasy' },
                                                        { value: 'ms', label: 'Malay' },
                                                        { value: 'ml', label: 'Malayalam' },
                                                        { value: 'mt', label: 'Maltese' },
                                                        { value: 'mi', label: 'Maori' },
                                                        { value: 'mr', label: 'Marathi' },
                                                        { value: 'mn', label: 'Mongolian' },
                                                        { value: 'my', label: 'Myanmar (Burmese)' },
                                                        { value: 'ne', label: 'Nepali' },
                                                        { value: 'no', label: 'Norwegian' },
                                                        { value: 'or', label: 'Odia (Oriya)' },
                                                        { value: 'ps', label: 'Pashto' },
                                                        { value: 'fa', label: 'Persian' },
                                                        { value: 'pl', label: 'Polish' },
                                                        { value: 'pt', label: 'Portuguese' },
                                                        { value: 'pa', label: 'Punjabi' },
                                                        { value: 'ro', label: 'Romanian' },
                                                        { value: 'ru', label: 'Russian' },
                                                        { value: 'sm', label: 'Samoan' },
                                                        { value: 'gd', label: 'Scots Gaelic' },
                                                        { value: 'sr', label: 'Serbian' },
                                                        { value: 'st', label: 'Sesotho' },
                                                        { value: 'sn', label: 'Shona' },
                                                        { value: 'sd', label: 'Sindhi' },
                                                        { value: 'si', label: 'Sinhala' },
                                                        { value: 'sk', label: 'Slovak' },
                                                        { value: 'sl', label: 'Slovenian' },
                                                        { value: 'so', label: 'Somali' },
                                                        { value: 'es', label: 'Spanish' },
                                                        { value: 'su', label: 'Sundanese' },
                                                        { value: 'sw', label: 'Swahili' },
                                                        { value: 'sv', label: 'Swedish' },
                                                        { value: 'tg', label: 'Tajik' },
                                                        { value: 'ta', label: 'Tamil' },
                                                        { value: 'tt', label: 'Tatar' },
                                                        { value: 'te', label: 'Telugu' },
                                                        { value: 'th', label: 'Thai' },
                                                        { value: 'tr', label: 'Turkish' },
                                                        { value: 'tk', label: 'Turkmen' },
                                                        { value: 'uk', label: 'Ukrainian' },
                                                        { value: 'ur', label: 'Urdu' },
                                                        { value: 'ug', label: 'Uyghur' },
                                                        { value: 'uz', label: 'Uzbek' },
                                                        { value: 'vi', label: 'Vietnamese' },
                                                        { value: 'cy', label: 'Welsh' },
                                                        { value: 'xh', label: 'Xhosa' },
                                                        { value: 'yi', label: 'Yiddish' },
                                                        { value: 'yo', label: 'Yoruba' },
                                                        { value: 'zu', label: 'Zulu' }
                                                    ],
                                                    onChange:function( languageSource ) {
                                                        props.setAttributes({pLanguageSource: languageSource});
                                                    }
                                                }
                                            )
                                        ),  
                    
                                        React.createElement(
                                            "p",
                                            { 
                                                "class": "content-bot-block-gutenberg-button-container", 
                                                "id": "cbaiLangTarget"
                                            },
                                            
                                            React.createElement(
                                                SelectControl,
                                                {
                                                    label: __('Language - Target'),
                                                    id: 'cbai_input_language_target',
                                                    options: [
                                                        { value: 'en', label: 'English' },
                                                        { value: 'af', label: 'Afrikaans' },
                                                        { value: 'sq', label: 'Albanian' },
                                                        { value: 'am', label: 'Amharic' },
                                                        { value: 'ar', label: 'Arabic' },
                                                        { value: 'hy', label: 'Armenian' },
                                                        { value: 'az', label: 'Azerbaijani' },
                                                        { value: 'eu', label: 'Basque' },
                                                        { value: 'be', label: 'Belarusian' },
                                                        { value: 'bn', label: 'Bengali' },
                                                        { value: 'bs', label: 'Bosnian' },
                                                        { value: 'bg', label: 'Bulgarian' },
                                                        { value: 'ca', label: 'Catalan' },
                                                        { value: 'ceb', label: 'Cebuano' },
                                                        { value: 'ny', label: 'Chichewa' },
                                                        { value: 'zh', label: 'Chinese (Simplified)' },
                                                        { value: 'zh-TW', label: 'Chinese (Traditional)' },
                                                        { value: 'co', label: 'Corsican' },
                                                        { value: 'hr', label: 'Croatian' },
                                                        { value: 'cs', label: 'Czech' },
                                                        { value: 'da', label: 'Danish' },
                                                        { value: 'nl', label: 'Dutch' },
                                                        { value: 'eo', label: 'Esperanto' },
                                                        { value: 'et', label: 'Estonian' },
                                                        { value: 'tl', label: 'Filipino' },
                                                        { value: 'fi', label: 'Finnish' },
                                                        { value: 'fr', label: 'French' },
                                                        { value: 'fy', label: 'Frisian' },
                                                        { value: 'gl', label: 'Galician' },
                                                        { value: 'ka', label: 'Georgian' },
                                                        { value: 'de', label: 'German' },
                                                        { value: 'el', label: 'Greek' },
                                                        { value: 'gu', label: 'Gujarati' },
                                                        { value: 'ht', label: 'Haitian Creole' },
                                                        { value: 'ha', label: 'Hausa' },
                                                        { value: 'haw', label: 'Hawaiian' },
                                                        { value: 'iw', label: 'Hebrew' },
                                                        { value: 'hi', label: 'Hindi' },
                                                        { value: 'hmn', label: 'Hmong' },
                                                        { value: 'hu', label: 'Hungarian' },
                                                        { value: 'is', label: 'Icelandic' },
                                                        { value: 'ig', label: 'Igbo' },
                                                        { value: 'id', label: 'Indonesian' },
                                                        { value: 'ga', label: 'Irish' },
                                                        { value: 'it', label: 'Italian' },
                                                        { value: 'ja', label: 'Japanese' },
                                                        { value: 'jw', label: 'Javanese' },
                                                        { value: 'kn', label: 'Kannada' },
                                                        { value: 'kk', label: 'Kazakh' },
                                                        { value: 'km', label: 'Khmer' },
                                                        { value: 'rw', label: 'Kinyarwanda' },
                                                        { value: 'ko', label: 'Korean' },
                                                        { value: 'ku', label: 'Kurdish (Kurmanji)' },
                                                        { value: 'ky', label: 'Kyrgyz' },
                                                        { value: 'lo', label: 'Lao' },
                                                        { value: 'la', label: 'Latin' },
                                                        { value: 'lv', label: 'Latvian' },
                                                        { value: 'lt', label: 'Lithuanian' },
                                                        { value: 'lb', label: 'Luxembourgish' },
                                                        { value: 'mk', label: 'Macedonian' },
                                                        { value: 'mg', label: 'Malagasy' },
                                                        { value: 'ms', label: 'Malay' },
                                                        { value: 'ml', label: 'Malayalam' },
                                                        { value: 'mt', label: 'Maltese' },
                                                        { value: 'mi', label: 'Maori' },
                                                        { value: 'mr', label: 'Marathi' },
                                                        { value: 'mn', label: 'Mongolian' },
                                                        { value: 'my', label: 'Myanmar (Burmese)' },
                                                        { value: 'ne', label: 'Nepali' },
                                                        { value: 'no', label: 'Norwegian' },
                                                        { value: 'or', label: 'Odia (Oriya)' },
                                                        { value: 'ps', label: 'Pashto' },
                                                        { value: 'fa', label: 'Persian' },
                                                        { value: 'pl', label: 'Polish' },
                                                        { value: 'pt', label: 'Portuguese' },
                                                        { value: 'pa', label: 'Punjabi' },
                                                        { value: 'ro', label: 'Romanian' },
                                                        { value: 'ru', label: 'Russian' },
                                                        { value: 'sm', label: 'Samoan' },
                                                        { value: 'gd', label: 'Scots Gaelic' },
                                                        { value: 'sr', label: 'Serbian' },
                                                        { value: 'st', label: 'Sesotho' },
                                                        { value: 'sn', label: 'Shona' },
                                                        { value: 'sd', label: 'Sindhi' },
                                                        { value: 'si', label: 'Sinhala' },
                                                        { value: 'sk', label: 'Slovak' },
                                                        { value: 'sl', label: 'Slovenian' },
                                                        { value: 'so', label: 'Somali' },
                                                        { value: 'es', label: 'Spanish' },
                                                        { value: 'su', label: 'Sundanese' },
                                                        { value: 'sw', label: 'Swahili' },
                                                        { value: 'sv', label: 'Swedish' },
                                                        { value: 'tg', label: 'Tajik' },
                                                        { value: 'ta', label: 'Tamil' },
                                                        { value: 'tt', label: 'Tatar' },
                                                        { value: 'te', label: 'Telugu' },
                                                        { value: 'th', label: 'Thai' },
                                                        { value: 'tr', label: 'Turkish' },
                                                        { value: 'tk', label: 'Turkmen' },
                                                        { value: 'uk', label: 'Ukrainian' },
                                                        { value: 'ur', label: 'Urdu' },
                                                        { value: 'ug', label: 'Uyghur' },
                                                        { value: 'uz', label: 'Uzbek' },
                                                        { value: 'vi', label: 'Vietnamese' },
                                                        { value: 'cy', label: 'Welsh' },
                                                        { value: 'xh', label: 'Xhosa' },
                                                        { value: 'yi', label: 'Yiddish' },
                                                        { value: 'yo', label: 'Yoruba' },
                                                        { value: 'zu', label: 'Zulu' }
                                                    ],
                                                    onChange:function( languageTarget ) {
                                                        props.setAttributes({pLanguageTarget: languageTarget});
                                                    }
                                                }
                                            )
                                        ),
                    
                                        React.createElement(
                                            "p",
                                            { 
                                                "class": "content-bot-block-gutenberg-button-container", 
                                                "id": "cbaiLangFormality"
                                            },
                                            
                                            React.createElement(
                                                SelectControl,
                                                {
                                                    label: __('Formality'),
                                                    id: 'cbai_input_language_formality',
                                                    options: [
                                                        { value: 'default', label: 'Default' },
                                                        { value: 'more', label: 'More Formal' },
                                                        { value: 'less', label: 'Less Formal' }
                                                    ],
                                                    onChange:function( languageFormality ) {
                                                        props.setAttributes({pLanguageFormality: languageFormality});
                                                    }
                                                },
                                            )   
                                        ),
                    
                                        React.createElement(
                                            "p",
                                            { 
                                                "class": "content-bot-block-gutenberg-button-container",
                                                "id": "FormalityHelperServiceLangAvailable"
                                            },
                                            "Formality only available for German, French, Italian, Spanish, Dutch, Polish, Portuguese and Russian."
                                        ),
                        
                                        React.createElement(
                                            "p",
                                            { 
                                                "class": "content-bot-block-gutenberg-button-container",
                                                "id": "FormalityHelperService"
                                            },
                                            "Formality only available for 'DeepL' translations."
                                        ),
                                    ),
                                
                                    React.createElement(
                                        "p",
                                        { "class": "content-bot-block-gutenberg-button-container" },
                                        
                                        React.createElement(
                                            "a",
                                            {
                                                href : "javascript:void(0)",
                                                "class" : "button button-primary",
                                                "id"  : "contentBotGenerate"  ,
                                                onClick: function() {
                                                    props.setAttributes({ content: cbai_data.stringGenerating });

                                                    // props.setAttributes takes a a few ms to actually update and we don't pull the correct values then further down with this code
                                                    // See https://github.com/WordPress/gutenberg/issues/5596
                                                    // 
                                                    // In this case, we should set some local variables to use rather based on what's already been set.
                                        
                                                    //var currentTone = props.attributes.pTone;


                                                    var currentTone = $("#cbai_input_tone").val();
                                                    props.setAttributes({ pTone: currentTone });


                                                    var currentGrade = $("#cbai_input_grade").val();
                                                    props.setAttributes({ pGrade: currentGrade });


                                                    //var currentType = props.attributes.pType;
                                                    var currentType = $("#cbai_input_copy_type").val();
                                                    props.setAttributes({ pType: currentType });
                                                    

                                                    //var currentDescription = props.attributes.pDescription;


                                                    var currentDescription = $("#cbai_input_desc").val();
                                                    props.setAttributes({ pDescription: currentDescription });

                                        
                                                    //var currentBPE1 = props.attributes.pBPE1;


                                                    var currentBPE1 = $("#cbai_BPE_1").val();
                                                    props.setAttributes({ pBPE1: currentBPE1 });
                                                    
                                        
                                                    //var currentBPE2 = props.attributes.pBPE2;


                                                    var currentBPE2 = $("#cbai_BPE_2").val();
                                                    props.setAttributes({ pBPE2: currentBPE2 });
                                                    
                                        
                                                    //var currentBPE3 = props.attributes.pBPE3;


                                                    var currentBPE3 = $("#cbai_BPE_3").val();
                                                    props.setAttributes({ pBPE3: currentBPE3 });

                                                    
                                                    //var currentSalesPurpose = props.attributes.pSalesPurpose;


                                                    var currentSalesPurpose = $("#cbaiSales_Purpose").val();
                                                    props.setAttributes({ pSalesPurpose: currentSalesPurpose });


                                                    //var currentSalesName = props.attributes.pSalesName;


                                                    var currentSalesName = $("#cbaiSales_Name").val();
                                                    props.setAttributes({ pSalesName: currentSalesName });


                                                    //var currentSalesName = props.attributes.pSalesCompanyName;


                                                    var currentSalesCompanyName = $("#cbaiSales_CompanyName").val();
                                                    props.setAttributes({ pSalesCompanyName: currentSalesCompanyName });


                                                    //var currentSalesIndustry = props.attributes.pSalesIndustry;


                                                    var currentSalesIndustry = $("#cbaiSales_Industry").val();
                                                    props.setAttributes({ pSalesIndustry: currentSalesIndustry });


                                                    //var currentLeadName = props.attributes.pSalesLeadName;


                                                    var currentSalesLeadName = $("#cbaiSales_LeadName").val();
                                                    props.setAttributes({ pSalesLeadName: currentSalesLeadName });


                                                    //var currentLeadCompanyName = props.attributes.pSalesLeadCompanyName;


                                                    var currentSalesLeadCompanyName = $("#cbaiSales_LeadCompanyName").val();
                                                    props.setAttributes({ pSalesLeadCompanyName: currentSalesLeadCompanyName });


                                                    //var currentLeadIndustry = props.attributes.pSalesLeadIndustry;


                                                    var currentSalesLeadIndustry = $("#cbaiSales_LeadIndustry").val();
                                                    props.setAttributes({ pSalesLeadIndustry: currentSalesLeadIndustry });


                                                    //var currentLeadGoals = props.attributes.pSalesLeadGoals;


                                                    var currentSalesLeadGoals = $("#cbaiSales_LeadGoals").val();
                                                    props.setAttributes({ pSalesLeadGoals: currentSalesLeadGoals });


                                                    //var currentProductBenifits = props.attributes.pSalesProductBenifits;


                                                    var currentSalesProductBenefits = $("#cbaiSales_ProductBenifits").val();
                                                    props.setAttributes({ pSalesProductBenifits: currentSalesProductBenefits });


                                                    //var currentGoal = props.attributes.pGoal;


                                                    var currentGoal = $("#cbaiPitch_InputGoal").val();
                                                    props.setAttributes({ pGoal: currentGoal });


                                                    //var currentExperience = props.attributes.pExperience;


                                                    var currentExperience = $("#cbaiPitch_InputExperience").val();
                                                    props.setAttributes({ pExperience: currentExperience });


                                                    //var currentDelivery = props.attributes.pDelivery;


                                                    var currentDelivery = $("#cbaiPitch_InputDelivery").val();
                                                    props.setAttributes({ pDelivery: currentDelivery });


                                                    //var currentHighlights = props.attributes.pHighlights;


                                                    var currentHighlights = $("#cbaiPitch_InputHighlights").val();
                                                    props.setAttributes({ pHighlights: currentHighlights });
                                                                            

                                                    //var currentName = props.attributes.pName;


                                                    var currentName = $("#cbai_input_name").val();
                                                    props.setAttributes({ pName: currentName });
                                                                            

                                                    //var currentIndustry = props.attributes.pIndustry;

                                                    var currentIndustry = $("#cbai_input_industry").val();
                                                    props.setAttributes({ pIndustry: currentIndustry });


                                                    //var currentAudience = props.attributes.pAudience;

                                                    var currentAudience = $("#cbai_input_audience").val();
                                                    props.setAttributes({ pAudience: currentAudience });


                                                    //var currentKeywords = props.attributes.pKeywords;

                                                    var currentKeywords = $("#cbai_input_keywords").val();
                                                    props.setAttributes({ pKeywords: currentKeywords });               
                                                    

                                                    //var currentBlogTopic = props.attributes.pBlogTopic;

                                                    var currentBlogTopic = $("#cbai_input_topic").val();
                                                    props.setAttributes({ pBlogTopic: currentBlogTopic });
                                                    

                                                    //var includeIntros = props.attributes.pIncludeIntros;

                                                    var includeIntros = $("#cbai_input_intros").checked;
                                                    props.setAttributes({ pIncludeIntros: includeIntros });

                                                    //var includeTrends = props.attributes.pIncludeIntros;

                                                    var includeTrends = $("#cbai_input_trends").checked;
                                                    props.setAttributes({ pIncludeTrends: includeTrends });


                                                    var currentLangService = $("#cbai_input_language_service").val();
                                                    props.setAttributes({ pLanguageService: currentLangService });
                                                    
                                                    var currentLangSource = $("#cbai_input_language_source").val();
                                                    props.setAttributes({ pLanguageSource: currentLangSource });

                                                    var currentLangTarget = $("#cbai_input_language_target").val();
                                                    props.setAttributes({ pLanguageTarget: currentLangTarget });

                                                    var currentLangFormality = $("#cbai_input_language_formality").val();
                                                    props.setAttributes({ pLanguageFormality: currentLangFormality });

                                                    /*
                                                    console.log('Type:' + currentType);
                                                    console.log('LangService:' + currentLangService);
                                                    console.log('LangSource:' + currentLangSource);
                                                    console.log('LangTarget:' + currentLangTarget);
                                                    console.log('LangFormality:' + currentLangFormality);
                                                    console.log('Tone:' + currentTone);
                                                    console.log('Name:' + currentName);
                                                    console.log('Description:' + currentDescription);
                                                    console.log('BPE1:' + currentBPE1);
                                                    console.log('BPE2:' + currentBPE2);
                                                    console.log('BPE3:' + currentBPE3);
                                                    console.log('SalesPurpose:' + currentSalesPurpose);
                                                    console.log('SalesName:' + currentSalesName);
                                                    console.log('SalesCompanyName:' + currentSalesCompanyName);
                                                    console.log('SalesIndustry:' + currentSalesIndustry);
                                                    console.log('SalesLeadName:' + currentSalesLeadName);
                                                    console.log('SalesLeadCompanyName:' + currentSalesLeadCompanyName);
                                                    console.log('SalesLeadIndustry:' + currentSalesLeadIndustry);
                                                    console.log('SalesLeadGoals:' + currentSalesLeadGoals);
                                                    console.log('SalesProductBenifits:' + currentSalesProductBenefits);
                                                    console.log('Goal:' + currentGoal);
                                                    console.log('Experience:' + currentExperience);
                                                    console.log('Delivery:' + currentDelivery);
                                                    console.log('Highlights:' + currentHighlights);
                                                    console.log('Topic:' + currentBlogTopic);
                                                    console.log('Industry:' + currentIndustry);
                                                    console.log('Audience:' + currentAudience);
                                                    console.log('Keywords:' + currentKeywords);
                                                    */


                                                    // Validation
                                                    var run_continue = true;
                                                    // reset all non-validated styles
                                            
                                                    for (k in validation) {
                                                        $("#"+k).css('border','1px solid #757575');
                                                        $("#"+k).removeClass('error-shake');
                                                        if (validation[k] == true) {
                                                            // validate against this input field
                                                            var currentValue = $("#"+k).val();
                                                            
                                                            if (typeof(currentValue) !== 'undefined') {
                                                                if (currentValue.length < 1) {
                                                    
                                                                    $("#"+k).css('border','1px solid red');
                                                                    $("#"+k).addClass('error-shake');
                                                                    run_continue = false;
                                                                } else {
                                                                    // save to local storage
                                                                    localStorage.setItem("cb_"+k, currentValue);
                                                                }
                                                            }
                                                        }
                                                    }

                                                    if(run_continue){

                                                        if (typeof includeIntros == 'undefined' || includeIntros == '') {
                                                            includeIntros = false;
                                                        }

                                                        if (typeof includeTrends == 'undefined' || includeTrends == '') {
                                                            includeTrends = false;
                                                        }

                                                        if (typeof currentTone == 'undefined' || currentTone == '' || currentTone == 'undefined') {
                                                            currentTone = 'professional';
                                                            props.setAttributes({ pTone: 'professional' });
                                                        }

                                                        if (typeof currentGrade == 'undefined' || currentGrade == '' || currentGrade == 'undefined') {
                                                            currentGrade = '1';
                                                            props.setAttributes({ pGrade: '1' });
                                                        }

                                                        if (typeof currentLangSource == 'undefined' || currentLangSource == '' || currentLangSource == 'undefined') {
                                                            currentLangSource = 'en';
                                                            props.setAttributes({ pLanguageSource: 'en' });
                                                        }

                                                        if (typeof currentType == 'undefined' || currentType == '' || currentType == 'undefined') {
                                                            currentType = 'blog_intro';
                                                            props.setAttributes({ pType: 'blog_intro' });
                                                        }

                                                        
                                                        var cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pname='+currentName+'&pdesc='+currentDescription+'&ptone='+currentTone+'&ptype='+currentType;

                                                        if (currentType == 'blog_topics_v2') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pdesc='+currentBlogTopic+'&ptone='+currentTone+'&ptype='+currentType+"&intros="+includeIntros;
                                                        }
                                                        if (currentType == 'blog_intro') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pdesc='+currentBlogTopic+'&ptone='+currentTone+'&ptype=blog_intro_v4';
                                                        }
                                                        if (currentType == 'blog_conclusion') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pdesc='+currentBlogTopic+'&ptone='+currentTone+'&ptype='+currentType;
                                                        }
                                                        if (currentType == 'marketing_ideas') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pname='+currentName+'&pindustry='+currentIndustry+'&pdesc='+currentDescription+'&ptone='+currentTone+'&ptype='+currentType;
                                                        }
                                                        if (currentType == 'landing_page') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pname='+currentName+'&pdesc='+currentDescription+'&pkeywords='+currentKeywords+'&ptype='+currentType;
                                                        }
                                                        if (currentType == 'value_proposition') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pname='+currentName+'&pdesc='+currentDescription+'&ptype='+currentType;
                                                        }
                                                        if (currentType == 'adwords_ad') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pname='+currentName+'&pdesc='+currentDescription+'&pkeywords='+currentKeywords+'&ptype='+currentType+"&paudience="+currentAudience;
                                                        }
                                                        if (currentType ==  'facebook_ad') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pname='+currentName+'&pdesc='+currentDescription+'&pkeywords='+currentKeywords+'&ptype=facebook_ad_v2&paudience='+currentAudience;
                                                        }
                                                        if (currentType ==  'instagram_caption') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pdesc='+currentDescription+'&ptone='+currentTone+'&ptype='+currentType;
                                                        }
                                                        if (currentType ==  'instruct') {

                                                            let inputDesc = [{
                                                                role : 'user',
                                                                msg : instructionPromptCleaner(currentDescription)
                                                            }];

                                                            let inputPrompts = JSON.stringify({
                                                                history : inputDesc 
                                                            });

                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&prompts='+inputPrompts+'&wc=750&ptype=open_prompt_v2&pcompletions=1';
                                                        }
                                                        if (currentType == 'finish_sentence') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pdesc='+currentDescription+'&ptype='+currentType;
                                                        }
                                                        if (currentType == 'generate_paragraph') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pdesc='+currentBlogTopic+'&pkeywords='+currentKeywords+'&ptone=professional'+'&ptype='+currentType;
                                                        }
                                                        if (currentType == 'summarizer_long') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pdesc='+currentDescription+'&ptype=summarizer_long_bullet';
                                                        }
                                                        if (currentType == 'brand_names') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pdesc='+currentDescription+'&pkeywords='+currentKeywords+'&ptype='+currentType;
                                                        }
                                                        if (currentType == 'slogan') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pdesc='+currentDescription+'&pname='+currentName+'&pkeywords='+currentKeywords+'&ptype='+currentType;
                                                        }
                                                        if (currentType == 'listicle') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pdesc='+currentDescription+'&ptype='+currentType;
                                                        }
                                                        if (currentType == 'pitch_yourself') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pname='+currentName+'&pindustry='+currentIndustry+'&pdesc='+pGoal+'&ptype='+currentType+"&ppitch_delivery="+pDelivery+"&ppitch_highlights="+pHighlights+"&ppitch_experience="+pExperience;
                                                        }
                                                        if (currentType == 'engaging_questions') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pdesc='+currentDescription+'&ptype='+currentType+"&paudience="+currentAudience;
                                                        }
                                                        if (currentType == 'bpe') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&ptype='+currentType+'&pbpe1='+currentBPE1+'&pbpe2='+currentBPE2+'&pbpe3='+currentBPE3;
                                                        }
                                                        if (currentType == 'boutline') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&ptype='+currentType+'&pdesc='+currentDescription+'&ptopic='+currentBlogTopic;
                                                        }
                                                        if (currentType == 'answers') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&ptype='+currentType+'&pdesc='+currentDescription;
                                                        }
                                                        if (currentType == 'change_tone') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&ptype='+currentType+'&pdesc='+currentDescription+'&ptone='+currentTone;
                                                        }
                                                        if (currentType == 'explain_it_to_a_child') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&ptype='+currentType+'&pdesc='+currentDescription+'&pgrade='+currentGrade;
                                                        }
                                                        if (currentType == 'explain_like_professor') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&ptype='+currentType+'&pdesc='+currentDescription;
                                                        }
                                                        if (currentType == 'talking_points') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&ptype='+currentType+'&ptopic='+currentBlogTopic+'&pdesc='+currentDescription;
                                                        }
                                                        if (currentType == 'youtube_ideas' || currentType == 'video_description') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&pdesc='+currentDescription+'&pkeywords='+currentKeywords+'&ptype='+currentType;
                                                        }
                                                        if (currentType == 'brand_story') {
                                                            cb_URL = cb_HOST+'input?hash='+cbai_data.hash+'&ptype='+currentType+'&pdesc='+currentDescription+'&pkeywords='+currentKeywords;
                                                        }

                                                        cb_URL += '&planservice='+currentLangService+'&lang='+currentLangTarget+'&psourcelan='+currentLangSource+'&planformality='+currentLangFormality;

                                                        $(function($){
                                                            var cb_components_panel_height = $('.components-panel').css('height');
                                                            
                                                            $('#contentBotOverlay').css("height", cb_components_panel_height);
                                                        });

                                                        $("#contentBotOverlay").removeClass('hidden');
                                                        $("#contentBotOverlay").addClass('content-bot-overlay');
                                                        $("#content-bot-rating").addClass('hidden');

                                                        $.ajax({
                                                            type: "GET",
                                                            dataType: "json",
                                                            /* the hash here is important because we are required to do rate limiting by OpenAI */
                                                            url: cb_URL,
                                                            success: function(msg){
                                                                
                                                                if (typeof msg.error !== 'undefined') {
                                                                    var output = msg.error;
                                                                } else {
                                                                    var output = msg.output;
                                                                }

                                                                var output_type = 'standard';
                                                                if (typeof msg.output_type !== 'undefined') {
                                                                    output_type = msg.output_type;
                                                                }


                                                                if (typeof msg.limitremaining) {
                                                                    if (parseInt(msg.limitremaining) < 50) {
                                                                        // Don't show it if its too high - people may think it's a target to reach :D
                                                                        // Only show it when its less than 50
                                                                        // This means free users will always see it and only high qty users will see it
                                                                        $("#content-bot-limit-qty").html = parseInt(msg.limitremaining);
                                                                        $("#content-bot-limit-remaining").removeClass('hidden');
                                                                    }
                                                                }
                                                                
                                                                var original_output = output;
                                                                
                                                                if (typeof output == "object") {

                                                                    // multi output

                                                                    var outputHTML = '';                
                                                                    
                                                                    if (output_type == 'blog_topics_and_intros') {
                                                                        var cnter = 0;
                                                                        for (k in output) {
                                                                            cnter++;
                                                                            outputHTML += "<p><strong>Topic #"+cnter+": "+output[k].title+"</strong></p>";
                                                                            outputHTML += "<p>"+output[k].intro+"</p>";
                                                                        }
                                                                    } else {

                                                                        var cnter = 0;
                                                                        for (k in output) {

                                                                            output[k].text = output[k].text.trim();

                                                                            if (typeof output[k].text !== 'undefined' && output[k].text.length > 1) {

                                                                                if (output[k].text.includes('This is a video description generator')) {
                                                                                    continue;
                                                                                }

                                                                                var uidd = genHexString(12);

                                                                                cnter++;
                                                                                outputHTML += '<p><strong>Content #'+cnter+'</strong>'

                                                                                if (
                                                                                        currentType == 'blog_intro' ||
                                                                                        currentType == 'blog_conclusion' ||
                                                                                        currentType == 'generate_paragraph' ||
                                                                                        currentType == 'blog_topics_v2' ||
                                                                                        currentType == 'engaging_questions' ||
                                                                                        currentType == 'summarizer_long' ||
                                                                                        currentType == 'explain_it_to_a_child' ||
                                                                                        currentType == 'explain_like_professor' ||
                                                                                        currentType == 'talking_points' ||
                                                                                        currentType == 'marketing_ideas' ||
                                                                                        currentType == 'startup_ideas' ||
                                                                                        currentType == 'finish_sentence' ||
                                                                                        currentType == 'headline_ideas' ||
                                                                                        currentType == 'listicle' ||
                                                                                        currentType == 'brand_story' ||
                                                                                        currentType == 'product_description' ||
                                                                                        currentType == 'instagram_caption' ||
                                                                                        currentType == 'instruct' ||
                                                                                        currentType == 'pitch_yourself' ||
                                                                                        currentType == 'answers'
                                                                                    ) {

                                                                                    if (currentType == 'blog_intro') {
                                                                                        outputHTML += "<br><strong>" + currentBlogTopic + "</strong>";
                                                                                        //outputHTML += "<textarea class='practicallyHidden' id='content_stripped_" + uidd + "'>" + currentBlogTopic + "\n" + output[k].text.replace(/(<([^>]+)>)/gi, "").replace(/'/g, "\\'") + "</textarea>";
                                                                                        outputHTML += '<br>' + output[k].text;

                                                                                    } else if (currentType == 'blog_topics_v2') {
                                                                                        outputHTML += "<br><strong>" + output[k].text + "</strong>";
                                                                            
                                                                                    } else if (currentType == 'engaging_questions') {
                                                                                        var list_items = output[k].text;
                                                                                        list_items = list_items.split(/\n/);
                                                                                        for (m in list_items) {
                                                                                            if (list_items[m] !== '') {
                                                                                                outputHTML += "<br>- "+list_items[m];
                                                                                            }
                                                                                        }    

                                                                                    } else if (currentType == 'summarizer_long') {
                                                                                        var bullet_points = output[k].text;
                                                                                        bullet_points = bullet_points.split(/\n/);
                                                                                        for (m in bullet_points) {
                                                                                            if (bullet_points[m] !== '') {
                                                                                                outputHTML += "<br>"+bullet_points[m];
                                                                                            }
                                                                                        }   
                                                                                        
                                                                                    } else if (currentType == 'startup_ideas') {
                                                                                        outputHTML += buildStartupFrame(output[k].text);

                                                                                    } else if (currentType == 'headline_ideas') {
                                                                                        outputHTML += buildHeadlineFrame("<br><strong>"+output[k].text+"</strong>");

                                                                                    } else if (currentType == 'listicle' || currentType == 'talking_points') {
                                                                                        var list_items = output[k].text;
                                                                                        list_items = list_items.split(/\n/);
                                                                                        for (m in list_items) {
                                                                                            if (list_items[m] !== '') {
                                                                                                if(currentType == 'talking_points'){
                                                                                                    outputHTML += "<br>" + list_items[m] + "<br>";
                                                                                                } else {
                                                                                                    outputHTML += "<br>- "+list_items[m];
                                                                                                }
                                                                                            }
                                                                                        }                                  
                                                                                    
                                                                                    } else if (currentType == 'product_description') {
                                                                                        outputHTML += buildProductDescriptionFrame("<span>" + highlightPlagiarizedPhrases(output[k].text, output[k], uidd) +"</span>", currentName);
                                                                            
                                                                                    } else if (currentType == 'answers') {
                                                                                        output[k].text = output[k].text.replaceAll("\n","<br>");
                                                                                        //outputHTML += "<br><strong>Answer</strong>";
                                                                                        outputHTML += "<br>"+output[k].text;                                                 

                                                                                    } else if (currentType == 'finish_sentence') {
                                                                                        outputHTML += "<br>"+cleanup(output[k].text);  

                                                                                    } else if (currentType == 'pitch_yourself') {
                                                                                        outputHTML += "<br>Hello "+currentName+",<br><br>"+output[k].text.replaceAll("\n","<br>");                                                    
                                                                                    
                                                                                    } else if (currentType == 'instruct') {
                                                                                        output[k].text = output[k].text.replaceAll("\n","<br>");
                                                                                        outputHTML += "<p>" + output[k].text + "</p>";     

                                                                                    } else {
                                                                                        outputHTML += "<p>" + output[k].text + "</p>";  
                                                                                    }

                                                                                } else {
                                                                                    outputHTML += "<p>" + output[k].text + "</p>";  
                                                                                }

                                                                                outputHTML += '</p>';

                                                                            } else {

                                                                                cnter++;
                                                                                outputHTML += '<p><strong>Content #'+cnter+'</strong>'

                                                                                // this is an array of arrays
                                                                                if (currentType == 'landing_page') {
                                                                                    outputHTML += buildLandingPageFrame(output[k]);
                                                                                }
                                                                                if (currentType == 'pas') {
                                                                                    outputHTML += buildPASFrame(output[k]);
                                                                                }
                                                                                if (currentType == 'pbs') {
                                                                                    outputHTML += buildPBSFrame(output[k]);
                                                                                }
                                                                                if (currentType == 'answers') {
                                                                                    outputHTML += buildAnswersFrame(output[k]);                                     
                                                                                }
                                                                                if (currentType == 'aida') {
                                                                                    outputHTML += buildAIDAFrame(output[k]);                            
                                                                                }
                                                                                if (currentType == 'boutline') {
                                                                                    outputHTML += buildBlogOutlineFrame(output[k], output.additional);                                                                  
                                                                                }
                                                                                if (currentType == 'brand_names') {
                                                                                    outputHTML += buildBrandNamesFrame(output[k]);
                                                                                } 
                                                                                if (currentType == 'youtube_ideas') {
                                                                                    outputHTML += buildYouTubeIdeas(output[k]);
                                                                                } 

                                                                                outputHTML += '</p>';

                                                                            } 

                                                                        }
                                                                        
                                                                    }

                                                                    props.setAttributes({ pOutput: outputHTML });
                                                                    props.setAttributes({ content: outputHTML });

                                                                } else {
                                                                    // single output
                                                                    output = output.replaceAll("###","<br>");
                                                                    output = output.replaceAll("\n","<br>");

                                                                    var test = original_output.split(/\n/);
                                                                    var new_string = '';
                                                                    for (k in test) {
                                                                        new_string = new_string + '<p>'+test[k]+'</p>';
                                                                    }

                                                                    props.setAttributes({ pOutput: new_string });
                                                                    props.setAttributes({ content: new_string });
                                                                }
                                                                
                                                                $("#contentBotOverlay").addClass('hidden');
                                                                $("#contentBotOverlay").removeClass('content-bot-overlay');
                                                                $("#content-bot-rating").removeClass('hidden');                        
                                                            }
                                                        });
                                                    }
                                                }
                                            },

                                            React.createElement("i", { "class": "fa fa-bolt", "aria-hidden": "true" }),
                                            ' ' + __('Generate Content')
                                        ),

                                        React.createElement(
                                            'p',
                                            {},
                                            ' '
                                        ),

                                        React.createElement(
                                            "p",
                                            { "class": "content-bot-block-gutenberg-button-container" },

                                            React.createElement(
                                                "em",
                                                {},
                                                'Please note all content is generated by AI. Try variations of your input to gain maximum efficacy. If you need help, you can contact us on support@contentbot.ai'  
                                            )
                                        ),

                                        React.createElement(
                                            "div",
                                            {
                                                "id" : "content-bot-rating",
                                                "class": "content-bot-block-gutenberg-button-container content-bot-rating hidden"
                                            },

                                            React.createElement(
                                                "p",
                                                { 'class': 'content-bot-rating-p' },
                                                'Please rate the output you receved:'
                                            ),

                                            React.createElement(  
                                                "ul",
                                                {
                                                    'class': 'content-bot-rating-ul'
                                                },

                                                React.createElement(
                                                    'li',
                                                    { 
                                                        'class': 'content-bot-rating-li content-bot-rating-li-1',
                                                        onClick: function() {
                                                            sendRating(props, 1);
                                                        }
                                                    },
                                                    ''
                                                ),

                                                React.createElement(
                                                    'li',
                                                    { 
                                                        'class': 'content-bot-rating-li content-bot-rating-li-2',
                                                        onClick: function() {
                                                            sendRating(props, 2);
                                                        }
                                                    },
                                                    ''
                                                ),

                                                React.createElement(
                                                    'li',
                                                    { 
                                                        'class': 'content-bot-rating-li content-bot-rating-li-3',
                                                        onClick: function() {
                                                            sendRating(props, 3);
                                                        }
                                                    },
                                                    ''
                                                ),

                                                React.createElement(
                                                    'li',
                                                    { 
                                                        'class': 'content-bot-rating-li content-bot-rating-li-4',
                                                        onClick: function() {
                                                            sendRating(props, 4);
                                                        }
                                                    },
                                                    ''
                                                ),

                                                React.createElement(
                                                    'li',
                                                    {
                                                        'class': 'content-bot-rating-li content-bot-rating-li-5',
                                                        onClick: function() {
                                                            sendRating(props, 5);
                                                        }
                                                    },
                                                    ''
                                                )
                                            )
                                        )
                                    )
                                )
                            ),

                            React.createElement(
                                "div",
                                {
                                    "class": "hidden",
                                    "id" : "contentBotOverlay",
                                },

                                React.createElement(
                                    "img",
                                    { 
                                        class : 'content-bot-overlay-img',
                                        'src' : cbai_data.location+"/img/loader.svg"
                                    },
                                    null
                                )
                            )

                        )
                    ),
                    el(wp.blockEditor.RichText, {
                        label: 'test',
                        className: 'cbai-block-inner',
                        placeholder: __( 'Use the settings on the right to generate content' ),
                        tagName: "div",
                        multiline: true,
                        value: props.attributes.content,

                        onChange: function(newText) {
                            props.setAttributes({content: newText});
                        }
                    })

                ]

                
                    
            },
            save: function( props ) {
                return el( wp.blockEditor.RichText.Content, {
                    tagName: 'div',
                    multiline: 'p',
                    value: props.attributes.content,
                });
            },
        });

    }(

        window.wp.blocks,
        window.wp.element,
        window.wp.blockEditor,
        window.wp.richText

    )

);



jQuery(function ($) {

    $("body").on("mouseover", ".content-bot-rating-li-1", function(e) {
        $('.content-bot-rating-li-1').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-2').css("background-image", "url("+cbai_data.location+"/img/star-grey.png)");  
        $('.content-bot-rating-li-3').css("background-image", "url("+cbai_data.location+"/img/star-grey.png)");  
        $('.content-bot-rating-li-4').css("background-image", "url("+cbai_data.location+"/img/star-grey.png)");  
        $('.content-bot-rating-li-5').css("background-image", "url("+cbai_data.location+"/img/star-grey.png)");  
    })
    
    $("body").on("mouseover", ".content-bot-rating-li-2", function(e) {
        $('.content-bot-rating-li-1').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-2').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-3').css("background-image", "url("+cbai_data.location+"/img/star-grey.png)");  
        $('.content-bot-rating-li-4').css("background-image", "url("+cbai_data.location+"/img/star-grey.png)");  
        $('.content-bot-rating-li-5').css("background-image", "url("+cbai_data.location+"/img/star-grey.png)");  
    })

    $("body").on("mouseover", ".content-bot-rating-li-3", function(e) {
        $('.content-bot-rating-li-1').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-2').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-3').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-4').css("background-image", "url("+cbai_data.location+"/img/star-grey.png)");  
        $('.content-bot-rating-li-5').css("background-image", "url("+cbai_data.location+"/img/star-grey.png)");  
    })

    $("body").on("mouseover", ".content-bot-rating-li-4", function(e) {
        $('.content-bot-rating-li-1').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-2').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-3').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-4').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-5').css("background-image", "url("+cbai_data.location+"/img/star-grey.png)");  
    })

    $("body").on("mouseover", ".content-bot-rating-li-5", function(e) {
        $('.content-bot-rating-li-1').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-2').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-3').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-4').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
        $('.content-bot-rating-li-5').css("background-image", "url("+cbai_data.location+"/img/star-black.png)");  
    })
                
});