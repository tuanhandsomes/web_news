<?php
/**
 * Instruct Bot - submenu page
 */

if(!defined('ABSPATH')){
	exit;
}

$user = wp_get_current_user();

?>

<div class="cbaiPageWrapper" id="cbaiInstructPage">

    <div class="cbaiPageHead">
        <div class="cbaiPageHeading">
            <img src="<?php echo CBAI_PLUGIN_DIR_URL.'img/instruct-icon.png'?>" alt="ContentBot">
            <h1><?php _e("Chat", "wp-content-bot"); ?></h1>
        </div>
        <div>
            <a href="https://contentbot.ai/app/chat" class="button-primary"><?php _e("Use in ContentBot", "wp-content-bot"); ?></a>
        </div>
    </div>

    <div class="cbaiInstructMainContainer">

        <div class="cbaiLibrary border " id="cbaiLibrary">
			<div class="cbaiLibraryInner">
				<div class="cbaiLibraryHead border-bottom">
					<h5>Prompt Library</h5>
					<div id="cbaiLibraryClose">
						<i class="far fa-times-circle"></i>
					</div>
				</div>
				<div class="cbaiLibraryBody">
                    <div class="row">
                        <div class='col-12 d-flex flex-row-reverse align-items-center mb-5 h-100 cbaiLibraryFilterRow'>
                            <div class="col-xl-4 col-lg-12 col-md-12 col-sm-12 p-0 tool-search-container">
                                <div class="d-flex justify-content-end tool-search">
                                    <i class="fas fa-search"></i>
                                    <input class="form-control w-100" type="text" id="toolSearch" placeholder="Search Prompts" data-value=""  onkeyup="" style="max-width: 350px; text-align: left;">
                                    <!-- <i class="fas fa-times clearSearch"></i> -->
                                </div>
                                
                            </div>

                            <div class="col-xl-8 col-lg-12 col-md-12 col-sm-12 p-0">
                                <p class="instructionFilterContainer mb-3">
                                    <strong class="pr-2">Filters: </strong>
                                    <span class='cbaiFilterPill selected' ftype='top'>All</span>  
                                    <span class='cbaiFilterPill' ftype='blog_content'>Blog Content</span>  
                                    <span class='cbaiFilterPill' ftype='marketing'>Marketing</span>  
                                    <span class='cbaiFilterPill' ftype='social_media'>Social Media</span>
                                    <span class='cbaiFilterPill' ftype='seo'>SEO</span>  
                                    <span class='cbaiFilterPill' ftype='other'>Other</span>
                                    <span class='filterSeparator'>|</span> 
                                    <span class='cbaiFilterPill' ftype='private'>Mine</span>
                                    <span class='cbaiFilterPill' ftype='public'>Community</span>
                                    <span class='cbaiFilterPill' ftype='favourites'>Favourites</span>
                                </p>

                                <p class="instructionOtherFilterContainer mb-0" style="display: none;">
                                    <strong class="pr-2">Other Filters: </strong>
                                    <!-- Populated with JS -->
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="row instructionsMainRowWrapper">
                        <div class='col-xl-12 instructionsMainWrapper'>        
                            <!-- <div class="instruction-loader"></div> -->
                            <!-- Populated with JS -->
                        </div>
                    </div>
				</div>
			</div>
		</div>

        <div class="cbaiInstructAdvancedOptionsContainer" style="display: none;">
            <div class="cbaiInstructAdvancedOptionsModal">
                <div class="cbaiInstructAdvancedOptionsModalHead">
                    <strong><span class="dashicons dashicons-admin-generic"></span> Advanced Options</strong>
                    <span id="cbaiInstructAdvancedOptionsModalClose" class="dashicons dashicons-no"></span>
                </div>

                <div class="cbaiOptionGroup">
                    <label class="cbaiLabelPill" for="cbaiInstructModel">Model</label>
                    <select id="cbaiInstructModel">
                        <option value="open_prompt_v2">GPT-4o-mini</option>
                        <option value="open_prompt_v4">GPT-4o</option>
                    </select>
                </div>
                
                <div class="cbaiOptionGroup">
                    <label class="cbaiLabelPill" for="">Language</label>

                    <div class="cbaiOptionGroup">
                        <label for="cbaiLanguageService">Translation Service</label>
                        <select name="cbaiLanguageService" id="cbaiLanguageService">
                            <option value="google" selected>Google Translate</option>
                            <option value="watson">Watson</option>
                            <option value="deepl">DeepL</option>
                        </select>
                    </div>

                    <div class="cbaiOptionGroup">
                        <label for="cbaiLanguageSource">Language Source</label>
                        <select name="cbaiLanguageSource" id="cbaiLanguageSource"><option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="am">Amharic</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bn">Bengali</option><option value="bs">Bosnian</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="ceb">Cebuano</option><option value="ny">Chichewa</option><option value="zh">Chinese (Simplified)</option><option value="zh-TW">Chinese (Traditional)</option><option value="co">Corsican</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en" selected="selected">English</option><option value="eo">Esperanto</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="fy">Frisian</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="gu">Gujarati</option><option value="ht">Haitian Creole</option><option value="ha">Hausa</option><option value="haw">Hawaiian</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hmn">Hmong</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="ig">Igbo</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="jw">Javanese</option><option value="kn">Kannada</option><option value="kk">Kazakh</option><option value="km">Khmer</option><option value="rw">Kinyarwanda</option><option value="ko">Korean</option><option value="ku">Kurdish (Kurmanji)</option><option value="ky">Kyrgyz</option><option value="lo">Lao</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="lb">Luxembourgish</option><option value="mk">Macedonian</option><option value="mg">Malagasy</option><option value="ms">Malay</option><option value="ml">Malayalam</option><option value="mt">Maltese</option><option value="mi">Maori</option><option value="mr">Marathi</option><option value="mn">Mongolian</option><option value="my">Myanmar (Burmese)</option><option value="ne">Nepali</option><option value="no">Norwegian</option><option value="or">Odia (Oriya)</option><option value="ps">Pashto</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="pa">Punjabi</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sm">Samoan</option><option value="gd">Scots Gaelic</option><option value="sr">Serbian</option><option value="st">Sesotho</option><option value="sn">Shona</option><option value="sd">Sindhi</option><option value="si">Sinhala</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="so">Somali</option><option value="es">Spanish</option><option value="su">Sundanese</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="tg">Tajik</option><option value="ta">Tamil</option><option value="tt">Tatar</option><option value="te">Telugu</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="tk">Turkmen</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="ug">Uyghur</option><option value="uz">Uzbek</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="xh">Xhosa</option><option value="yi">Yiddish</option><option value="yo">Yoruba</option><option value="zu">Zulu</option></select>
                    </div>

                    <div class="cbaiOptionGroup">
                        <label for="cbaiLanguageTarget">Language Target</label>
                        <select name="cbaiLanguageTarget" id="cbaiLanguageTarget"><option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="am">Amharic</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bn">Bengali</option><option value="bs">Bosnian</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="ceb">Cebuano</option><option value="ny">Chichewa</option><option value="zh">Chinese (Simplified)</option><option value="zh-TW">Chinese (Traditional)</option><option value="co">Corsican</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en" selected="selected">English</option><option value="eo">Esperanto</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="fy">Frisian</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="gu">Gujarati</option><option value="ht">Haitian Creole</option><option value="ha">Hausa</option><option value="haw">Hawaiian</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hmn">Hmong</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="ig">Igbo</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="jw">Javanese</option><option value="kn">Kannada</option><option value="kk">Kazakh</option><option value="km">Khmer</option><option value="rw">Kinyarwanda</option><option value="ko">Korean</option><option value="ku">Kurdish (Kurmanji)</option><option value="ky">Kyrgyz</option><option value="lo">Lao</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="lb">Luxembourgish</option><option value="mk">Macedonian</option><option value="mg">Malagasy</option><option value="ms">Malay</option><option value="ml">Malayalam</option><option value="mt">Maltese</option><option value="mi">Maori</option><option value="mr">Marathi</option><option value="mn">Mongolian</option><option value="my">Myanmar (Burmese)</option><option value="ne">Nepali</option><option value="no">Norwegian</option><option value="or">Odia (Oriya)</option><option value="ps">Pashto</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="pa">Punjabi</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sm">Samoan</option><option value="gd">Scots Gaelic</option><option value="sr">Serbian</option><option value="st">Sesotho</option><option value="sn">Shona</option><option value="sd">Sindhi</option><option value="si">Sinhala</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="so">Somali</option><option value="es">Spanish</option><option value="su">Sundanese</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="tg">Tajik</option><option value="ta">Tamil</option><option value="tt">Tatar</option><option value="te">Telugu</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="tk">Turkmen</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="ug">Uyghur</option><option value="uz">Uzbek</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="xh">Xhosa</option><option value="yi">Yiddish</option><option value="yo">Yoruba</option><option value="zu">Zulu</option></select>
                    </div>

                    <div class="cbaiOptionGroup">
                        <label for="cbaiLanguageFormality">Formality</label>
                        <select name="cbaiLanguageFormality" id="cbaiLanguageFormality">
                            <option value="default" selected="selected">Default</option>
                            <option value="more">More formal</option>
                            <option value="less">Less formal</option>
                        </select>
                        <p style="" class="helperText mb-0" id="cbaiLanguageFormalityHelper">Formality is only available for DeepL translations and for the following language: German, French, Italian, Spanish, Dutch, Polish, Portuguese and Russian</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="cbaiInstructDisplayWrapper">
            <div class="cbaiInstructDisplay">

            <!-- Populated with JS -->
                
            </div>
        </div>

        <div class="cbaiInstructBottomRow">

            <div class="cbaiInstructInput">
                <a href="javascript:void(0);" class="cbaiInstructButtonIcon" id="cbaiVariables" style="display: none;"><span class="dashicons dashicons-editor-code"></span></a>
                <textarea class="cbai-input" id="cbaiInstructInputField" placeholder="What do you want me to do?" value=""></textarea>
                <a href="javascript:void(0);" class="cbaiInstructButtonIcon" id="cbaiLibraryButton"><span class="dashicons dashicons-book"></span></a>
                <a href="javascript:void(0);" class="cbaiInstructButtonIcon" id="cbaiInstruct"><span class="dashicons dashicons-arrow-right-alt2"></span></a>
                <a href="javascript:void(0);" class="cbaiInstructButtonIcon" id="cbaiAdvancedOptions"><span class="dashicons dashicons-admin-generic"></span></a>
            </div>
            <div class="cbaiInstructInputExtras" style="display: none;">
                <div class="cbaiInstructInputExtrasHead">
                    <strong><span class="dashicons dashicons-editor-code"></span> Variable Fields</strong>
                    <span id="cbaiInstructInputExtrasClose" class="dashicons dashicons-no"></span>
                </div>
                
                <p>Variable Inputs will replace your variables in your instruction respectively.</p>
                <!-- Populated with JS -->
            </div>

        </div>

       
    </div>

</div>