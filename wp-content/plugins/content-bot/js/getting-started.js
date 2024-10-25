jQuery(function($){
    $(document).on('click', '#cbaiConnect', function(event){
        let button = $(event.target);
        
        let key = $('#cbaiApiKey').val();
        let website = $('#cbaiWebsite').val();

        if(key.trim() == '' || website.trim() == ''){
            alert('Please ensure that you have entered your API Key and the link to your website.');
            return;
        }

        button.html('Connecting...');
        
        cbai_data.hash = key;
        cbai_data.website = website;

        // Link to their account in CB
        const data = {
            action : 'linkIntegrationWordpress',
            apikey : key,
            website : website
        };

        $.ajax({
            type : "POST",
            // dataType : "json",
            data : data,
            url : cbai_data.rest,
            success : (response) => {
                response = JSON.parse(response);

                if(response.linked){
                    button.html("Connected!");
                    button.addClass('linked');

                    // store key in WP
                    jQuery.ajax(cbai_data.ajaxurl, {
                        method: 'POST',
                        data: {
                            action: 'contentbot_save_apikey',
                            apikey: key,
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

                    setTimeout(function(){
                        window.location.href = './admin.php?page=wp-content-bot-menu&action=welcome';
                    }, 500);
                } else {
                    let errorMessage = "Unable to connect to your account, please ensure that your API Key is correct.";

                    if(response.error){
                        errorMessage = response.error;
                    }
                    alert(errorMessage);
                    $('input#cbaiApiKey').focus();

                    button.html('Connect');
                }
                
            },
            error : (xhr, status, error) => {
                window.alert(error);
            }
        });

        
    })
})