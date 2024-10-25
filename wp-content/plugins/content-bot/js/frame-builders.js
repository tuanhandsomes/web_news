function buildStartupFrame(content) {
    var outputHTML = '';
    outputHTML += '<br><strong>Startup Idea</strong>';
    outputHTML += '<br><span>' + content + '</span>';
    return outputHTML;
}

function buildHeadlineFrame(content) {
    var outputHTML = '';
    outputHTML += content;
    /*
    outputHTML += '<h4 class="blurtext mt-4">Get inspiration for blog topics, blog intros, ad copy, brand names, and more!</h4>';
    outputHTML += '<a href="javascript:void(0)" class="mt-4 blurtext btn contentBotGenerate btn-primary"><i class="fa fa-bolt" aria-hidden="true"></i> Demo Button</a>';
    outputHTML += '<p class="blurtext mt-5" style="font-size: 15px;">Join <span class="pink">999 content creators</span> who have been inspired with <strong>AI Content</strong> <span class="pink">99,999 times</span> so far.</p>';
    */
    return outputHTML;
}

function buildProductDescriptionFrame(content, productName) {
    var outputHTML = '';
    outputHTML +=     '<br><strong>' + productName + '</strong>';
    outputHTML +=     '<br>'+content;
    return outputHTML
}

function buildLandingPageFrame(content) { 
    var relData = JSON.stringify(content);
    relData = relData.replaceAll('’', "'");
    relData = relData.replaceAll('‘', "'");
    relData = relData.replaceAll('“', '"');
    relData = relData.replaceAll('”', '"');
    rel = cbHashCodeFromString(relData);
    var outputHTML = '';

    if (typeof content.header == 'undefined') { content.header = '...' }
    if (typeof content.header_copy == 'undefined') { content.header_copy = '...' }
    if (typeof content.sub_header == 'undefined') { content.sub_header = '...' }
    if (typeof content.sub_header_copy == 'undefined') { content.sub_header_copy = '...' }
    if (typeof content.reinforcing == 'undefined') { content.reinforcing = '...' }

    //Link
    outputHTML += "<br><span><a href='https://contentbot.ai/app/page-preview.php?rel=" + rel + "' target='_BLANK' class='btn btn-primary btn-sm'>Preview Page</a></span>";
    
    //Header
    outputHTML += "<p>";  
    outputHTML += "<br><strong>-- Header --</strong>";
    outputHTML += "<br><strong>"+content.header+"</strong>";
    outputHTML += "<br><<span>"+content.header_copy+"</span>";
    outputHTML += '</p>';

    //Sub Header
    outputHTML += "<p>";  
    outputHTML += "<br><strong>-- Sub-header --</strong>";
    outputHTML += "<br><strong>"+content.sub_header+"</strong>";
    outputHTML += "<br><span>"+content.sub_header_copy+"</span>";
    outputHTML += '</p>';

    //Reinforcing
    outputHTML += "<p>";  
    outputHTML += "<br><strong>-- Reinforcing --</strong>";
    outputHTML += "<br><span>"+content.reinforcing+"</span>";
    outputHTML += '</p>';   

    //Feature 1
    if (typeof content.feature_1_title !== 'undefined' && typeof content.feature_1_desc !== 'undefined') {
        outputHTML += "<p>";  
        outputHTML += "<strong>-- Feature 1 --</strong>";
        outputHTML += "<br><strong>"+content.feature_1_title+"</strong>";
        outputHTML += "<br><span>"+content.feature_1_desc+"</span>";
        outputHTML += '</p>';
    }    

    //Feature 2
    if (typeof content.feature_2_title !== 'undefined' && typeof content.feature_2_desc !== 'undefined') {
    outputHTML += "<p>";  
    outputHTML += "<strong>-- Feature 2 --</strong>";
    outputHTML += "<br><strong>"+content.feature_2_title+"</strong>";
    outputHTML += "<br><span>"+content.feature_2_desc+"</span>";
    outputHTML += '</p>';
    }   

    //Feature 3
    if (typeof content.feature_3_title !== 'undefined' && typeof content.feature_3_desc !== 'undefined') {
        outputHTML += "<p>";  
        outputHTML += "<strong>-- Feature 3 --</strong>";
        outputHTML += "<br><strong>"+content.feature_3_title+"</strong>";
        outputHTML += "<br><span>"+content.feature_3_desc+"</span>";
        outputHTML += '</p>'; 
    }   

    //Benifit 1
    if (typeof content.benefit_1_title !== 'undefined' && typeof content.benefit_1_desc !== 'undefined') {
        outputHTML += "<p>";  
        outputHTML += "<strong>-- Benifit 1 --</strong>";
        outputHTML += "<br><strong>"+content.benefit_1_title+"</strong>";
        outputHTML += "<br><span>"+content.benefit_1_desc+"</span>";
        outputHTML += '</p>';
    }    

    //Benifit 2
    if (typeof content.benefit_2_title !== 'undefined' && typeof content.benefit_2_desc !== 'undefined') {
        outputHTML += "<p>";  
        outputHTML += "<strong>-- Benifit 2 --</strong>";
        outputHTML += "<br><strong>"+content.benefit_2_title+"</strong>";
        outputHTML += "<br><span>"+content.benefit_2_desc+"</span>";
        outputHTML += '</p>';
    }   

    //Benifit 3
    if (typeof content.benefit_3_title !== 'undefined' && typeof content.benefit_3_desc !== 'undefined') {
        outputHTML += "<p>";  
        outputHTML += "<strong>-- Benifit 3 --</strong>";
        outputHTML += "<br><strong>"+content.benefit_3_title+"</strong>";
        outputHTML += "<br><span>"+content.benefit_3_desc+"</span>";
        outputHTML += '</p>'; 
    }       

    return outputHTML;
}

function buildPASFrame(content) {
    var outputHTML = '';
    if (typeof content.pain !== 'undefined' && typeof content.agitate !== 'undefined' && typeof content.solution !== 'undefined') {      
        outputHTML += "<br><strong>Pain: </strong>"+content.pain+"<br><strong>Agitate: </strong>"+content.agitate+"<br><strong>Solution: </strong>"+content.solution;
    }
    return outputHTML;
}

function buildPBSFrame(content) {
    var outputHTML = '';
    if (typeof content.pain !== 'undefined' && typeof content.benefit !== 'undefined' && typeof content.solution !== 'undefined') {
        outputHTML += "<br><strong>Pain: </strong>"+content.pain+"<br><strong>Benefit: </strong>"+content.benefit+"<br><strong>Solution: </strong>"+content.solution;
    }
    return outputHTML;
}

function buildAnswersFrame(content) {
    var outputHTML = '';
    content.text = content.text.replaceAll("\n","<br>");
    outputHTML += "<br>"+content.text;
    return outputHTML;
}

function buildAIDAFrame(content) {
    var outputHTML = '';
    if (typeof content.attention !== 'undefined' && typeof content.interest !== 'undefined' && typeof content.desire !== 'undefined' &&  typeof content.action !== 'undefined') {
        outputHTML += "<br><strong>Attention: </strong>"+content.attention;
        outputHTML += "<br><strong>Interest: </strong>"+content.interest;
        outputHTML += "<br><strong>Desire: </strong>"+content.desire;
        outputHTML += "<br><strong>Action: </strong>"+content.action;
    }
    return outputHTML;
}

function buildBlogOutlineFrame(content, topic = false) {
    var outputHTML = '';
    if (topic) {
        outputHTML += "<br><strong>"+topic+"</strong>";
    }

    for (k in content) {
        if (typeof content[k].text !== 'undefined' && content[k].text !== '') {
            let stoprun = false;
            let sectionClass = '';
            
            if (content[k].sectionType == 'Section') {
                sectionClass = 'outlineSection';
            }

            if (content[k].sectionType == 'Subsection') {
                sectionClass = 'outlineSubSection';
            }

            if (content[k].sectionType == 'Takeaway') {
                sectionClass = 'outlineTakeaway'; stoprun = true;
            }

            outputHTML += "<br><span>- "+content[k].text+"</span>";
            
            if (stoprun) {
                break;
            }
        }  
    }
    return outputHTML;
}

function buildBrandNamesFrame(content) {
    var outputHTML = '';
    var currentSlogan = content.slogan;
    var brandNameHtml = '';
    var brandNameAlternativesHtml = '';
    var cn = 0;

    for (k in content) {
        cn++;
        if (typeof content[k].brand_name !== 'undefined' && content[k].brand_name !== '') {
            if (cn == 1) {
                // first brand name, use this as the main name and use the others as alternatives
                brandNameHtml = content[k].brand_name;
            } else {
                brandNameAlternativesHtml += "<span><em>"+content[k].brand_name+'</em></span>';
            }
        }
    }
    outputHTML += "<br><strong>"+brandNameHtml+"</strong>";
    outputHTML += "<br><strong>Alternatives: </strong>"+brandNameAlternativesHtml;
    outputHTML += "<br><strong>Slogan: </strong><span><em>"+currentSlogan+"</em></span>";
    return outputHTML;
}

function buildYouTubeIdeas(content) {
    var outputHTML = '';
    if (typeof content.video_idea !== 'undefined' && typeof content.description !== 'undefined' && content.video_idea !== '' && content.description !== '') {
        /*
        if (typeof content.image !== 'undefined' && content.image !== '') {
            outputHTML +=     "<img src='"+content.image_still+"' width='200' id='giphy_"+uidd+"' gif='"+content.image+"' still='"+content.image_still+"' />";
        } else {
            outputHTML +=     "<img src='https://contentbot.ai/app/assets/img/youtube_placeholder.jpg' width='200' />"; 
        }
        */
        outputHTML += '<br><strong>'+content.video_idea+'</strong>';
        outputHTML += '<br><span>'+content.description+'</span>';
    }
    return outputHTML;
}