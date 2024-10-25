function showLoginArea() {
    jQuery("#content-bot-login-form").show();
    jQuery("#content-bot-registration-holder-intial").hide();

    jQuery('#content-bot-login-button').attr('date-type', 'email');
    jQuery("#content-bot-login-form-input-email").parent().parent().show();
    jQuery("#content-bot-login-form-input-password").parent().parent().show();
    jQuery("#content-bot-login-form-input-apikey").parent().hide();
    jQuery("#apiKeyLoginHelper").hide();
}

function loginBack() {
    jQuery("#content-bot-registration-holder-intial").show();
    jQuery("#content-bot-login-form").hide();
}

function toggleLoginMethod() {
    if(jQuery("#content-bot-login-form-input-apikey").is(":visible")){
        jQuery("#content-bot-login-form-input-email").parent().parent().show();
        jQuery("#content-bot-login-form-input-password").parent().parent().show();
        jQuery("#content-bot-login-form-input-apikey").parent().hide();
        jQuery("#apiKeyLoginHelper").hide();
        
        jQuery('#content-bot-login-method').html("Use API Key instead");

        jQuery('#content-bot-login-button').attr('date-type', 'email')
    } else {
        jQuery("#content-bot-login-form-input-email").parent().parent().hide();
        jQuery("#content-bot-login-form-input-password").parent().parent().hide();
        jQuery("#content-bot-login-form-input-apikey").parent().show();
        jQuery("#apiKeyLoginHelper").show();
        
        jQuery('#content-bot-login-method').html("Use Email instead");

        jQuery('#content-bot-login-button').attr('date-type', 'apikey')
    }
}

function registerUser() {
    jQuery("#content-bot-login-form").hide();

    jQuery("#content-bot-login").attr('disabled', true);
    jQuery("#content-bot-register").attr('disabled', true);

    jQuery.ajax({
        type: "GET",
        dataType: "json",
        url: cb_REST+"action=register&u="+cbai_data.uemail,
        success: function(msg){
            if (typeof msg.apikey !== 'undefined') {
                jQuery("#content-bot-register").removeAttr('disabled');
                jQuery("#content-bot-login").removeAttr('disabled');
                jQuery("#content-bot-user-holder").removeClass('hidden');
                jQuery("#content-bot-registration-holder").addClass('hidden');

                jQuery("#content-bot-message").removeClass('hidden');
                jQuery("#content-bot-message").addClass('content-bot-message-green');
                jQuery("#content-bot-message").html('You\'re account has been created. You will receive an email (to '+cbai_data.uemail+') with log in details for future reference.');

                setTimeout(function() {
                    jQuery("#content-bot-message").fadeOut('slow');
                },30000);

                cbai_data.hash = msg.apikey; 
                cbai_data.otl = msg.otl;

                // store this in WP
                jQuery.ajax(cbai_data.ajaxurl, {
                    method: 'POST',
                    data: {
                        action: 'contentbot_save_apikey',
                        apikey: msg.apikey,
                        nonce: cbai_data.nonce
                    }         
                });

                // store OTL in WP
                jQuery.ajax(cbai_data.ajaxurl, {
                    method: 'POST',
                    data: {
                        action: 'contentbot_save_otl',
                        otl: msg.otl,
                        nonce: cbai_data.nonce
                    }         
                });

            } else if (typeof msg.error !== 'undefined') {
                alert(msg.error);
                jQuery("#content-bot-register").removeAttr('disabled');
                jQuery("#content-bot-login").removeAttr('disabled');
            } else {
                alert("There was an error creating your account. Please contact ContentBot");
            }
    
        }
    });
}

function login() {
    jQuery("#content-bot-login-form-input-email").attr('disabled', true);
    jQuery("#content-bot-login-form-input-password").attr('disabled', true);
    jQuery("#content-bot-login-button").attr('disabled', true);
    
    var loginMethod = jQuery('#content-bot-login-button').attr('date-type');
    var user = jQuery("#content-bot-login-form-input-email").val();
    var pass = jQuery("#content-bot-login-form-input-password").val();
    var apikey = jQuery('#content-bot-login-form-input-apikey').val();
    var website = cbai_data.website;

    if(loginMethod == 'email'){

        jQuery.ajax({
            type: "GET",
            dataType: "json",
            url: cb_REST+"action=login&u="+user+"&p="+pass,
            success: function(msg){

                console.log(msg);

                if (typeof msg.error !== 'undefined') {
                    if (msg.error == 'Error_103' || msg.error == 'Error_104') {
                        alert('Incorrect email or password');
                    }
                } else {
                    // Link to their account in CB
                    const data = {
                        action : 'linkIntegrationWordPress',
                        apikey : msg.apikey,
                        website : cbai_data.website,
                        nonce : cbai_data.nonce
                    };

                    jQuery.ajax({
                        type : "POST",
                        // dataType : "json",
                        data : data,
                        url : cb_REST,
                        success : (response) => {
                            response = JSON.parse(response);

                            if(response.linked){
                                cbai_data.hash = msg.apikey;  
                                cbai_data.otl = response.otl;
    
                                // store this in WP
                                jQuery.ajax(cbai_data.ajaxurl, {
                                    method: 'POST',
                                    data: {
                                        action: 'contentbot_save_apikey',
                                        apikey: cbai_data.hash,
                                        nonce: cbai_data.nonce
                                    }         
                                });
    
                                // store website link in WP
                                jQuery.ajax(cbai_data.ajaxurl, {
                                    method: 'POST',
                                    data: {
                                        action: 'contentbot_save_website',
                                        website: cbai_data.website,
                                        nonce: cbai_data.nonce
                                    }         
                                });
                                
                                // store OTL in WP
                                jQuery.ajax(cbai_data.ajaxurl, {
                                    method: 'POST',
                                    data: {
                                        action: 'contentbot_save_otl',
                                        otl: cbai_data.otl,
                                        nonce: cbai_data.nonce
                                    }         
                                });

                                cb_usr_holder = '';
                                cb_reg_holder = 'hidden';
                                jQuery("#content-bot-user-holder").removeClass('hidden');
                                jQuery("#content-bot-registration-holder").addClass('hidden');
                                
                            } else {
                                alert("Failed to connect to your ContentBot Account");
                                return;
                            }

                        },
                        error : (xhr, status, error) => {
                            window.alert(error);
                        }
                        
                    });
                }
            
                jQuery("#content-bot-login-form-input-email").removeAttr('disabled');
                jQuery("#content-bot-login-form-input-password").removeAttr('disabled');
                jQuery("#content-bot-login-button").removeAttr('disabled');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error(xhr.status);
                console.error(thrownError);
                alert('Error logging in. Please contact ContentBot');
                jQuery("#content-bot-login-form-input-email").removeAttr('disabled');
                jQuery("#content-bot-login-form-input-password").removeAttr('disabled');
                jQuery("#content-bot-login-button").removeAttr('disabled');
            }
        });
        
    } else {

        if(typeof apikey == 'undefined' || apikey.trim() == ''){
            alert('Please ensure you have entered an API key');
            jQuery("#content-bot-login-button").removeAttr('disabled');
            return;
        }
        
        cbai_data.hash = apikey;
        cbai_data.website = website;
        cbai_data.otl = '';

        // Link to their account in CB
        const data = {
            action : 'linkIntegrationWordPress',
            apikey : apikey,
            website : website,
            nonce : cbai_data.nonce
        };

        jQuery.ajax({
            type : "POST",
            // dataType : "json",
            data : data,
            url : cb_REST,
            success : (response) => {
                response = JSON.parse(response);

                console.log(response);

                debugger;

                if(response.linked){
                    // store key in WP
                    jQuery.ajax(cbai_data.ajaxurl, {
                        method: 'POST',
                        data: {
                            action: 'contentbot_save_apikey',
                            apikey: apikey,
                            nonce: cbai_data.nonce
                        }         
                    });

                    // store website link in WP
                    jQuery.ajax(cbai_data.ajaxurl, {
                        method: 'POST',
                        data: {
                            action: 'contentbot_save_website',
                            website: website,
                            nonce: cbai_data.nonce
                        }         
                    });

                    // store OTL in WP
                    jQuery.ajax(cbai_data.ajaxurl, {
                        method: 'POST',
                        data: {
                            action: 'contentbot_save_otl',
                            otl: response.otl,
                            nonce: cbai_data.nonce
                        }         
                    });

                    cb_usr_holder = '';
                    cb_reg_holder = 'hidden';
                    jQuery("#content-bot-user-holder").removeClass('hidden');
                    jQuery("#content-bot-registration-holder").addClass('hidden');

                } else {
                    alert("Unable to connect to your account, please ensure that your API Key is correct.");
                    jQuery('input#content-bot-login-form-input-apikey').focus();

                    jQuery("#content-bot-login-form-input-email").attr('disabled', false);
                    jQuery("#content-bot-login-form-input-password").attr('disabled', false);
                    jQuery("#content-bot-login-button").attr('disabled', false);
                }
                
            },
            error : (xhr, status, error) => {
                window.alert(error);
            }
        });

    }

}

function uncapitalizeFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function cleanup(string) {
    string = string.replace(/^\s+/g, ''); //trim left white space      
    if (string.charAt(0) == '.') {
        string = string.substring(1, string.length);
    }
    string = string.replace(/^\s+/g, ''); //trim left white space      
    return string;
}

function generateLoremIpsum(length = 300) {
    var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor lobortis lacus eget tempor. Sed luctus porttitor porttitor. Nullam lorem augue, congue vel nisi eu, luctus faucibus sapien. Duis tortor lectus, porttitor quis maximus vel, viverra nec augue. Maecenas vel nisi vel orci tincidunt tincidunt ut vel eros. Fusce rhoncus scelerisque pretium. In a porttitor lectus. Sed mollis efficitur tincidunt. Vestibulum ut odio sit amet ligula viverra sagittis eu et lorem. Donec elit justo, varius sed ullamcorper non, aliquet in erat. Mauris dictum porttitor lorem, in gravida purus auctor sed.";
    var rand = Math.floor(Math.random() * length);
    var trimmedString = lorem.substring(0, rand);
    return trimmedString+". ";
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function formatMonthName() {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const d = new Date();
    return monthNames[d.getMonth()];
}

function CopyToClipboard(containerid) {
    jQuery("#"+containerid).select();
    document.execCommand('copy');
}

function sendRating(rating) {
    currentData.source = 'webapp';
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        data : {
            hash: cbai_data.hash,
            feedbackData : JSON.stringify(currentData),
            feedbackRating: rating
        },
        url: cb_HOST+"feedback",
        success: function(msg){
            
        }
    });

    document.querySelector("#content-bot-rating").classList.add('hidden');
    alert("Feedback sent");
}

function cbFavToggleHandler(fav, data, complete){
    var rel = atob(data);
    rel = cbHashCodeFromString(rel);

    var action = fav ? 'fav' : 'unfav';
    var url = "https://contentbot.ai/app/api/";

    var query = "?action=" + action + "&apikey=" + cbai_data.hash + "&rel=" + rel;

    jQuery.get(url + query).always(function( data ) {
        if(typeof complete === 'function'){
            complete();
        }
    });
}

function cbOutputDeleteHandler(outputId, complete){
    outputId = parseInt(outputId);

    var url = "https://contentbot.ai/app/api/";
    var query = "?action=delete_output&apikey=" + cbai_data.hash + "&output=" + outputId;

    jQuery.get(url + query).always(function( data ) {
        if(typeof complete === 'function'){
        complete();
        }
    });
}

function cbHashCodeFromString(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

function cleanString(input) {
    var output = "";
    for (var i=0; i<input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    return output;
}

function removeNumbers(string) {
    string = string.replace("1.", "");
    string = string.replace("2.", "");
    string = string.replace("3.", "");
    string = string.replace("4.", "");
    string = string.replace("5.", "");
    string = string.replace("6.", "");
    string = string.replace("7.", "");
    return string.replace(/^\s+/g, ''); //trim left white space
}

function genHexString(len) {
    const hex = '0123456789ABCDEF';
    let output = '';
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
}

function addWordCount(id, output) {
    if (typeof output == 'object') {
        if (typeof output.wordCount !== 'undefined') {
            return '<span class="wordCount cb-word-count">'+output.wordCount+' words</span>';
        }
    }
    return "";
}

function addReadingScore(id, output) {
    if (typeof output == 'object') {
        if (typeof output.en_fleschReadingEase_score !== 'undefined') {
            var score = parseInt(output.en_fleschReadingEase_score);
            var color = 'pastel-green';

            /*
            if (score > 0 && score <= 25) {
            color = 'pastel-red';
            } else if (score > 25 && score <= 50) {
            color = 'pastel-orange';
            } else if (score > 50 && score <= 75) {
            color = 'pastel-yellow';
            } else {
            color = 'pastel-green';
            }
            */
            return '<span class="readingScore cb-reading-score '+color+'" title="Reading Ease Score"><i class="fa fa-book"></i> '+output.en_fleschReadingEase_score+'</span>';
        }
    }
    return "";
}

function addUniquenessScore(id, output){
    if(typeof output === 'object' && typeof output.plagiarismData !== 'undefined'){
        if(typeof output.plagiarismData.score !== 'undefined'){
            var color = 'pastel-green';
            var title = "Uniqueness: " + output.plagiarismData.score.uniqueness.toFixed(0) + "% || Plagiarism: " + output.plagiarismData.score.plagiarism.toFixed(0) + "%";

            var urls = [];
            if(output.plagiarismData.outputs){
                for(var outputI in output.plagiarismData.outputs){
                    var outputData = output.plagiarismData.outputs[outputI];
                    for(var queryI in outputData.details){
                        var details = outputData.details[queryI];
                        if(details.matched_urls.length > 0){
                            for(var urlI in details.matched_urls){
                                urls.push(details.matched_urls[urlI]);
                            }
                        }
                    }
                }
            }

            var dataAttributes = 'data-uniqueness="' + output.plagiarismData.score.uniqueness.toFixed(0) + '" ';
            dataAttributes += 'data-plagiarism="' + output.plagiarismData.score.plagiarism.toFixed(0) + '" ';
            dataAttributes += 'data-urls="' + urls.join(',') + '" ';

            var html = '<span class="uniquenessScore cb-uniqueness-score '+color+'" title="' + title + '" ' + dataAttributes + '>';
            html += '<i class="fa fa-eye"></i> ' + output.plagiarismData.score.uniqueness.toFixed(0) + '%';
            html += "</span>";
            
            return html;
        }
    }
    return "";
}

function addDropdown(id) {
    var html = '';
    html += '<div class="dropdown">';
    html += '  <button onclick="" bid="'+id+'" class="dropbtn cb-ellipsis"><i class="fa fa-chevron-down"></i></button>';
    html += '  <div id="dropdown_'+id+'" class="dropdown-content">';
    html += '    <a href="javascript:void(0);" bid="'+id+'" class="actionCopy">Copy to Clipboard</a>';
    html += '  </div>';
    html += '</div>';
    return html;
}

function addFavorite(data){
    data = JSON.stringify(data);
    data = btoa(unescape(encodeURIComponent(data)));
    var html = '';
    html += "<div class='cb-fav-toggle cb-fav-editor' data-json='" + data + "'>";
    html +=   "<i class='fa fa-heart'></i>";
    html += "</div>";
    return html;
}

function buildSettingsQueryParam(){
    var query = "";
    if(typeof cbai_settings !== 'undefined'){
        for(var i in cbai_settings){
            var setting = cbai_settings[i];
            if(setting === "on"){
                setting = 1;
            }
            query += "&_" + i + "=" + setting;
        }
    }
    return query;
}

function uniquenessScoreModal(uniqueness, plagiarism, urls){
    if(urls.trim() !== ''){
        urls = urls.split(',');  
    }

    var modalHtml = '<div class="uniquenessModal modal fade" tabindex="-1">';
    modalHtml +=        '<div class="modal-dialog">';
    modalHtml +=          '<div class="modal-content">';
    
    modalHtml +=            '<div class="modal-header">';
    modalHtml +=              '<h5 class="modal-title">Uniqueness Score</h5>';
    modalHtml +=              '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    modalHtml +=                '<span aria-hidden="true">&times;</span>';
    modalHtml +=              '</button>';
    modalHtml +=            '</div>';
    
    modalHtml +=            '<div class="modal-body">';
    modalHtml +=              '<div class="row">';

    modalHtml +=                '<div class="col-6">';
    modalHtml +=                  '<h6>Uniqueness</h6>';
    modalHtml +=                  '<h4>' + uniqueness + '%</h4>';
    modalHtml +=                '</div>';

    modalHtml +=                '<div class="col-6">';
    modalHtml +=                  '<h6>Plagiarism</h6>';
    modalHtml +=                  '<h4>' + plagiarism + '%</h4>';
    modalHtml +=                '</div>';

    modalHtml +=              '</div>';

    if(urls.length > 0){
        modalHtml +=            '<div class="row">';
        modalHtml +=              '<div class="col-12">';
        modalHtml +=              '<h6>Sources</h6>';

        for(var i in urls){
            var label = urls[i];
            if(label.length > 60){
                label = label.substring(0, 30) + '...' + label.substring(label.length - 30);
            }
            modalHtml +=              '<small> â€¢ <a href="' + urls[i] + '" target="_BLANK">' + label + "</a></small><br>";
        }

        modalHtml +=              '</div>';
        modalHtml +=            '</div>';
    }
    modalHtml +=            '</div>';
    modalHtml +=          '</div>';
    modalHtml +=        '</div>';
    modalHtml +=    '</div>';

    jQuery('#wrapper').find('.uniquenessModal').remove();
    jQuery('#wrapper').append(modalHtml);
    jQuery('.uniquenessModal').modal('show');
}

function highlightPlagiarizedPhrases(outputHTML, data, id){
    if(data.plagiarismData){
        if(data.plagiarismData.score && data.plagiarismData.score.plagiarism > 0){
            var plagiarizedPhrases = [];

            if(data.plagiarismData.outputs){
                for(var i in data.plagiarismData.outputs){
                    var output = data.plagiarismData.outputs[i];
                    if(output.details){
                        for(var dI in output.details){
                            var query = output.details[dI];
                            if(query.totalMatches !== 0){
                                plagiarizedPhrases.push(query.query);
                            }
                        }
                    }
                }

                if(plagiarizedPhrases.length > 0){
                    for(var i in plagiarizedPhrases){
                        if(outputHTML.indexOf(plagiarizedPhrases[i]) !== -1){
                            outputHTML = outputHTML.replace(plagiarizedPhrases[i], "<mark title='Plagiarism Detected'>" + plagiarizedPhrases[i] + '</mark>');
                        } else {
                            /* Something else is up with this, we know the phrase exists, so let's split the phrase a bit more to make sure it does get highlighted to some degree */
                            var subPhrases = chunkPhraseToWords(plagiarizedPhrases[i], 3);
                            for(var phraseSubI in subPhrases){
                                var subPhrase = subPhrases[phraseSubI];
                                if(subPhrase.length > 0){
                                    outputHTML = outputHTML.replace(subPhrase, "<mark title='Plagiarism Detected'>" + subPhrase + '</mark>');
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return outputHTML;
}

function chunkPhraseToWords(phrase, wordsPerChunk){
    var phrasedWords = phrase.split(" ");
    var chunks = [];
    var chunkCount = Math.ceil(phrasedWords.length / wordsPerChunk);
    for(var i = 0; i < chunkCount; i++){
        var chunk = [];
        for(var wI = 0; wI < wordsPerChunk && phrasedWords.length > 0; wI++){
            chunk.push(phrasedWords.shift());
        }

        chunks.push(chunk.join(" "));
    }

    return chunks;
}

function sendRating(props, rating) {
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        data : {
            hash: cbai_data.hash,
            feedbackData : JSON.stringify(props),
            feedbackRating: rating
        },
        url: cb_HOST+"feedback",
        success: function(msg){
            
        }
    });
    alert("Feedback sent");
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
function instructionPromptCleaner(content){
    const charset = [
        "\\", '"',
    ];

    /* Replace all known problem characters, first remove any escaped versions, then replace the standard versions with escaped versions */
    for(let char of charset){
        content = content.replaceAll(`\\${char}`, char);
        content = content.replaceAll(char, `\\${char}`);
    }

    content = content.replaceAll("\n", "\\n");

    /* Encode the URI component, for the single message only */
    content = encodeURIComponent(content);

    return content;
}