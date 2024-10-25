(
    function( wp ) {

        var rephraseButton = function( props ) {
            return wp.element.createElement(
                wp.blockEditor.RichTextToolbarButton, 
                {
                    icon: 'edit-large', 
                    title: 'Rephrase',
                    onClick: function() {
                        let cm = new CbaiContentModulizer;

                        const host_url = 'https://contentbot.us-3.evennode.com/api/v1/';

                        console.log(props);

                        let content = props.value.text;
                        let rawContent = content;
                        let blockElement = jQuery(props.contentRef.current);
                        let block = wp.data.select( 'core/block-editor' ).getSelectedBlock();

                        let aiBlock = false;

                        if(blockElement.hasClass('cbai-block-inner')){
                            aiBlock = true;
                        }

                        content = cm.stripTags(content, ['p', 'span', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5']);

                        let hasHTML = /<\/?[a-z][\s\S]*>/i.test(content);
                        if(!hasHTML){
                            content = `<p>${content}</p>`;
                        }

                        let groups = cm.getGroupedContent(content, true, -1, true);
                        groups = groups[0];

                        let totalGroups = groups.length;

                        let placeholdersHtml = '';
                        
                        for (let i = 0; i < totalGroups; i++) {
                            
                            let group = groups[i];

                            let groupContent = jQuery(group.element).text();
                            let groupType = group.type;

                            placeholdersHtml += getPlaceholdersHtml(groupContent, i);

                            let url = host_url + `input?hash=${cbai_data.hash}&ptype=paraphrase_v2&pcblock=${groupType}&psubtype=1&pdesc=${groupContent}`;
                            
                            rephraseAndOutput(url, i, groupContent, block, blockElement, aiBlock);

                        }

                        if(aiBlock){
                            cbaiLastBlock.setAttributes(
                                {
                                    content : `<p>${rawContent}<br><br><strong>Rephrased Content</strong>${placeholdersHtml}</p>`
                                }
                            );
                        } else {
                            wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes(
                                block.clientId,
                                {
                                    content: `${content}<strong>Rephrased Content</strong>${placeholdersHtml}`
                                }
                            )
                        }

                    }
                }
            );
        }

        wp.richText.registerFormatType(
            'content-bot/rephrase', {
                title: 'Rephrase',
                tagName: 'span',
                className: 'cbai-rephrase-action',
                edit: rephraseButton
            }
        );

        /**
         * Builds the HTML code for the loading placeholders
         * 
         * @param string content 
         * @param int index
         * 
         * @returns string html
         */
        function getPlaceholdersHtml(content, index){
            let html = '';
            let placeholders = '';
            
            let emptyStateContainers = content.length / 65;
            emptyStateContainers = Math.ceil(emptyStateContainers);
                
            for (let i = 0; i < emptyStateContainers; i++) {
                placeholders += "<span class='cbai-loading-placeholder'></span>";
            }

            html += `<span class="cbai-loader-container" data-index="${index}">${placeholders}</span>`;

            return html
        }

        /**
         * Calculates the levenshtein distance between the original text and the rephrased content and returns the best output's index
         * 
         * @param string currentText 
         * @param object outputs 
         * 
         * @returns integer bestOptionIndex
         */
        function getBestOption(currentText, outputs) {
            //set the default in case none of them have a high variability. If that is the case, we will call the server again.
            var bestOption = outputs[1].text;
            var bestVariability = 0;
            var bestOptionIndex = 1;
            for (k in outputs) {
                var currentOutput = outputs[k];
                var levDistance = levenshteinDistance(currentText, outputs[k].text);
                if (levDistance.percentage > bestVariability) {
                    // this is the highest so far.
                    bestVariability = levDistance.percentage;
                    bestOption = outputs[k].text;
                    bestOptionIndex = k;
                }
            }
        
            // once we've run through all options, serve the best.
            return bestOptionIndex;
        }

        /**
         * Calculate the levensthein distance between two strings
         * 
         * @param string str1 
         * @param string str2 
         * 
         * @returns object 
         */
        const levenshteinDistance = (str1 = '', str2 = '') => {
            const track = Array(str2.length + 1).fill(null).map(() =>
            Array(str1.length + 1).fill(null));
    
            var str1_length = str1.length;
            var str2_length = str2.length;
    
            for (var i = 0; i <= str1.length; i += 1) {
               track[0][i] = i;
            }
            for (let j = 0; j <= str2.length; j += 1) {
               track[j][0] = j;
            }
            for (let j = 1; j <= str2.length; j += 1) {
               for (let i = 1; i <= str1.length; i += 1) {
                  const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                  track[j][i] = Math.min(
                     track[j][i - 1] + 1, // deletion
                     track[j - 1][i] + 1, // insertion
                     track[j - 1][i - 1] + indicator, // substitution
                  );
               }
            }
            return {
                'distance' : track[str2.length][str1.length],
                'percentage' : (track[str2.length][str1.length] / str1_length) * 100
            }
        };

        /**
         * Makes AI call and outputs the rephrased content
         * 
         * @param string url 
         * @param int index 
         * @param string originalContent
         * @param object block
         * @param element blockElement
         * @param boolean isAIBlock
         * 
         * @return void
         */
        function rephraseAndOutput(url, index, originalContent, block, blockElement, isAIBlock){
    
            jQuery.ajax({
                type: "GET",
                dataType: "json",
                /* the hash here is important because we are required to do rate limiting by OpenAI */
                url: url,
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

                    var original_output = output;
                    
                    if (typeof output == "object") {
                        let bestOption = getBestOption(originalContent, output);
                        let rephrasedContent = output[bestOption].text;

                        // debugger;

                        console.log(`Index ${index}: ${rephrasedContent}`);

                        console.log(blockElement.html());

                        if(isAIBlock){
                            jQuery(`<br><em class="cbai-rephrased-content" data-index="${index}">${rephrasedContent}</em><br>`).insertBefore(blockElement.find(`.cbai-loader-container[data-index="${index}"]`));
                        } else {
                            jQuery(`<p class="cbai-rephrased-content" data-index="${index}"><em>${rephrasedContent}</em></p>`).insertBefore(blockElement.find(`.cbai-loader-container[data-index="${index}"]`));
                        }

                        blockElement.find(`.cbai-loader-container[data-index="${index}"]`).remove();

                        let htmlContent = blockElement.html();

                        console.log(htmlContent);

                        if(isAIBlock){

                            cbaiLastBlock.setAttributes(
                                {
                                    // content: `<p>${content}<strong>Rephrased Content</strong><br><em>${rephrasedContent}</em></p>`
                                    content : htmlContent
                                }
                            );
                            
                        } else {
                            
                            wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes(
                                block.clientId,
                                {
                                    // content: `${content}<strong>Rephrased Content</strong><br><em>${rephrasedContent}</em>`
                                    content : htmlContent
                                }
                            )

                        }
                    }
                },
                error: function(msg){
                    if(isAIBlock){
                        cbaiLastBlock.setAttributes(
                            {
                                content: `<p>${originalContent}<br><br><br><em>Something went wrong with rephrasing your content, please try again or reach out to us at <a href="https://contentbot.ai/#contact" target="_BLANK">https://contentbot.ai/#contact</a>.</em></p>`
                            }
                        );
                    } else {
                        
                        wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes(
                            block.clientId,
                            {
                                content: `${originalContent}<br><br><em>Something went wrong with rephrasing your content, please try again or reach out to us at <a href="https://contentbot.ai/#contact" target="_BLANK">https://contentbot.ai/#contact</a>.</em>`
                            }
                        )

                    }
                }
            });
        }

    }
    
)( window.wp );