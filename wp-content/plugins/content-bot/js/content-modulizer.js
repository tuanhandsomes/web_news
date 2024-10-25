/**
 * This is used from contentbot.ai
*/

function CbaiContentModulizer(){

    let _this = this;

    let $ = jQuery;

    const containerTags = [
        'ARTICLE',
        'ASIDE',
        'DIV',
        'FOOTER',
        'HEAD',
        'HEADER',
        'MAIN',
        'NAV',
        'SECTION'
    ];

    const headingTags = [
        'H1',
        'H2',
        'H3',
        'H4',
        'H5',
        'H6'
    ];

    const listTags = [
        'UL',
        'OL'
    ];

    const scriptTags = [
        'SCRIPT',
        'NOSCRIPT',
        'LINK',
        'META'
    ];

    let groupedContent = [];
    let extractedHTML = [];
    let groupCounter = 0;
    let shadowDom = '';



    /**
     * 
     * @param object originalHTML 
     * @param string newContent
     * 
     * @return object html
     */
    this.getMatchingHTMLOutput = (originalHTML, newContent) => {

        let newElement;
        originalHTML = $(originalHTML);

        let nodeName = (originalHTML.prop('nodeName')).toLowerCase();
        newElement = $(`<${nodeName}>`);


        if(nodeName == 'ul' || nodeName == 'ol'){
            let newListContent = '';
            let listItems = newContent.split('- ');

            listItems = _this.removeEmptyItems(listItems);

            for (let item of listItems) {
                item = item.replace('\n', '');
                newListContent += `<li>${item}</li>`;
            }

            newElement.html(newListContent);
        } else {

            newElement.html(newContent);
            
        }


        return newElement;

    }



    /**
     * Removes all tags excepted specified tags from HTML
     * 
     * If no tags are specified, will remove all HTML tags
     * 
     * @param string html
     * @param array keepTags 
     * 
     * @return string html
     */
    this.stripTags = (html, keepTags = false) => {
        var regex;
        if(keepTags != false){
            let regexPattern = '(<(?!';
            for (let tag of keepTags) {
                regexPattern += `\\/?(${tag})`;
    
                if(keepTags[keepTags.length-1] != tag){
                    regexPattern += '|'
                }
            }
            
            regexPattern += '(?=>|\s.*>))\\/?.*?>)';
            
            regex = new RegExp(regexPattern, 'g');
        } else {
            regex = /(<[^>]*>)/gm;
        }

        let strippedContent = ''; 
        if(typeof html == 'string'){
            strippedContent = html.replace(regex, "").trim();
        }

        strippedContent = _this.cleanElements(strippedContent);

        return strippedContent;
    }

    /**
     * Originally this was just a nested method, attached to the core on the fly, that's just a little messy (my fault D.A) but it's moving into a more incorped flow. 
     * 
     * As part of that we can also improve the base of the logic 
     * 
     * @param Element element The element being split up 
     * 
     * @returns void 
     */
    this.autoSplitElement = (element) => {
        const splitConfig = {
            words : 70,
            nesting : {
                roots : ['p', 'div'],
                collapsible : ['span']
            }
        }

        /* Nesting logic
         *
         * In some cases, a span will be within a paragrpaph, this can cause breaks in the splitting logic that are not expected.
         * 
         * We fix this by collpasing those nested elements into root, as they add not other value to the content being pushed through the request loops 
         * 
         * It's expanded here, so it's a little more intelligent over all 
        */ 
        if(element.children.length > 0){
            if(splitConfig.nesting.roots.indexOf(element.tagName.toLowerCase()) !== -1){
                for(let collapse of splitConfig.nesting.collapsible){
                    /* By traversing until the tag is nullified, we improve the overall separation tech substantially */
                    while($(element).find(collapse).length){
                        $(element).find(collapse).each((i, nested) => {
                            /* Collapse the node so that it becomes a part of the outer node */
                            nested.outerHTML = nested.innerHTML;
                        });
                    }
                }
            }
        }

        /* Splitting logic */
        if(element.textContent.trim().length && element.children.length === 0){
            /* Root node with no children, we can split this one up */

            let splitElem = $(element);
            let approxWordCount = this.countWords(element.textContent);
            if(approxWordCount > splitConfig.words){
                let sentences = element.textContent.split('.');
                sentences = sentences.map((value) => {return value.trim().length ? `${value}.` : ''});

                /* Grouping sentences and counting words as we go to build multiple sections */
                let splitGroups = [];
                let activeGroup = "";
                for(let sentence of sentences){                           
                    if(activeGroup.length && this.countWords(activeGroup + sentence) > splitConfig.words){
                        splitGroups.push(activeGroup);
                        activeGroup = "";
                    } 

                    activeGroup += sentence;
                }

                if(activeGroup.length){
                    splitGroups.push(activeGroup);
                    activeGroup = "";
                }

                if(splitGroups.length){
                    /* We have to split up these groups */
                    let splitI = 0;
                    let lastInsert = splitElem;
                    for(let splitter of splitGroups){
                        if(splitI === 0){
                            /* First iteration, this replaces the original root node */
                            splitElem.text(splitter.trim());
                        } else {
                            /* For the others, clone and replace the content of the root */
                            const splitClone = splitElem.clone();
                            splitClone.text(splitter.trim());

                            /* Insert */
                            lastInsert.after(splitClone);
                            lastInsert = splitClone;
                        }
                        splitI ++;
                    }
                }
            }
        } else if (element.children.length > 0){
            /* Traverse the child */
            for(let child of element.children){
                this.autoSplitElement(child);
            }
        }
    };

    /**
     * A new post processor which enforce a specific HTML structure to some content received from an editor 
     * 
     * It does a few things:
     * - Walks the HTML and removes any tags not in the list of allowed tags 
     * - Walks children recursively to improve the overall structures of Content
     * - Strips attributes from elements, by dynamically rebuilding the content in a temporary shadow traversal document 
     * - Enforces a root node policy, which means only valid root tags are allowed to be in he absolute 'root'
     * 
     * Consider this the successor to 'stripTags' - It achieves the same result, but goes a bit further 
     * 
     * Returns the roo
     * 
     * @param string html The HTML to be enforced upon 
     * @param array allowedTags Optionally, an array of allowed tags. If none are provided, we use a default
     * @param array rootTags Optionally, an array of root tags. If none are provided, we use a default 
     * 
     * @returns string
     */
    this.enforceStructurePolicy = (html, allowedTags, rootTags) => {
        /* Check allowed tags, and set default if not passed */
        if(!allowedTags || !(allowedTags instanceof Array) || !(allowedTags.length)){
            allowedTags = ['p', 'span', 'ul', 'ol', 'li', 'h*', 'div'];
        }

        /* Check root tags, and set default if not passed */
        if(!rootTags || !(rootTags instanceof Array) || !(rootTags.length)){
            rootTags = ['p', 'ul', 'ol', 'h*'];
        }

        /* Check the content, if empty, let's return standard empty string */
        if(!html || !html.length){
            return "";
        }


        /* Setup two shadow doms, one for the dirty state, and another for the clean state */
        const states = {
            dirty : document.createElement('div'), 
            clean : document.createElement('div')
        }

        /* Parse the dirty state, some surface validation will happen at this stage */
        states.dirty.innerHTML = html;

        /* Recusrive walker */
        this.cloneNodes(states.clean, states.dirty, allowedTags);

        const rootHotswaps = ['div']; //These will not be grouped and wrapped, they are just swapped 
        const defaultRootTag = rootTags[0];
        if(states.clean.childNodes){
            const rootGrouping = {
                tag : false,
                nodes : []
            };

            for(let rootNode of states.clean.childNodes){
                /* Before we continue, let's make sure we are wrapping up any groups that might need to be pushed */
                if(rootNode.nodeType === Node.TEXT_NODE || (rootNode.nodeType === Node.ELEMENT_NODE && rootGrouping.tag !== rootNode.tagName)){
                    if(rootGrouping.nodes.length){
                        /* This element is either: 
                         * - Element with mismatching tag from current group
                         * - Text node, which means we need to sort the group first 
                         * 
                         * Let's go ahead and clear the stack, reset things, and also push the content into the DOM. 
                        */

                        const group = document.createElement(defaultRootTag);
                        for(let groupNode of rootGrouping.nodes){
                            group.appendChild(groupNode.cloneNode(true));
                        }

                        let lastChild = rootGrouping.nodes[rootGrouping.nodes.length - 1];
                        lastChild.parentElement.replaceChild(group, lastChild);

                        for(let groupNode of rootGrouping.nodes){
                            if(groupNode !== lastChild){
                                groupNode.remove();
                            }
                        }
                        
                        rootGrouping.tag = false;
                        rootGrouping.nodes = [];
                    }
                }

                if(rootNode.nodeType === Node.ELEMENT_NODE) {
                    if(!this.validateTagName(rootNode.tagName, rootTags)){
                        /* We have a node that doesn't fit into the root policy */
                        if(rootHotswaps.indexOf(rootNode.tagName.toLowerCase()) !== -1){
                            /* This node is a known hot-swap definition */
                            const hotswap = document.createElement(defaultRootTag);
                            hotswap.innerHTML = rootNode.innerHTML;

                            rootNode.parentElement.replaceChild(hotswap, rootNode);
                        } else {
                            /* 
                             * At this point, we know this tag is not allowed,
                             * and we know it's not hot-swappable, so we must begin grouping elements 
                            */
                            if(rootGrouping.tag !== rootNode.tagName){
                                /* Create the new grouping */
                                rootGrouping.tag = rootNode.tagName;
                                rootGrouping.nodes = [];
                                rootGrouping.nodes.push(rootNode);
                            } else {
                                /* This matches the last grouping we worked on, so let's deal with it now */
                                rootGrouping.nodes.push(rootNode);
                            }
                            
                        }
                    }
                } else if (rootNode.nodeType === Node.TEXT_NODE){
                    /* Text node, needs to be tethered */
                    const tether = document.createElement(defaultRootTag);
                    tether.appendChild(document.createTextNode(rootNode.textContent));
                    rootNode.parentNode.replaceChild(tether, rootNode);
                }
            }

            /* Not dry, but we need to do a final run on any grouping nodes */
            if(rootGrouping.nodes.length){
                const group = document.createElement(defaultRootTag);
                for(let groupNode of rootGrouping.nodes){
                    group.appendChild(groupNode.cloneNode(true));
                }

                let lastChild = rootGrouping.nodes[rootGrouping.nodes.length - 1];
                lastChild.parentElement.replaceChild(group, lastChild);

                for(let groupNode of rootGrouping.nodes){
                    if(groupNode !== lastChild){
                        groupNode.remove();
                    }
                }
                
                rootGrouping.tag = false;
                rootGrouping.nodes = [];
            }
        }
        
        return states.clean.innerHTML;
    }

    /**
     * Clones nodes recursively to a target, while respecting a list of tags 
     * 
     * @param Element target The target element to clone to 
     * @param Element reference The reference element to clone from 
     * @param array allowedTags
     */
    this.cloneNodes = (target, reference, allowedTags) => {
        if(reference.childNodes){
            for(let child of reference.childNodes){
                if(child.nodeType === Node.ELEMENT_NODE) {
                    /* Element, needs to be curated */
                    const tagName = this.validateTagName(child.tagName, allowedTags, 'span');
                    const cloned = document.createElement(tagName);
                    target.append(cloned);

                    this.cloneNodes(cloned, child, allowedTags);
                } else if (child.nodeType === Node.TEXT_NODE){
                    /* Text node, just append it, we won't worry about any cleanup */
                    const cloned = child.cloneNode();
                    target.append(cloned);
                }
            }
        }
    }

    /**
     * Validate a node tag name, to a list of allowedTags
     * 
     * This does a deep search on the list, to determine if it should be allowed at all 
     * 
     * Will always return a valid tag name, as a fallback
     * 
     * @param string tag The node tag name 
     * @param array allowedTags The list of valid tags, these can be in any case, and support the "*" wildcard 
     * @param string fallbackTag The tag to return if the validation fails completely
     * 
     * @returns string
     */
    this.validateTagName = (tag, allowedTags, fallbackTag) => {
        if(allowedTags.indexOf(tag) !== -1 || allowedTags.indexOf(tag.toLowerCase()) !== -1){
            return tag.toLowerCase();
        } else {
            const wildcards = allowedTags.filter(
				(wild) => { 
					return wild.indexOf("*") !== -1;
				}
			);

            /* Do a final search for any wild cards */
            for(let deep of wildcards){
                let sL = deep.indexOf("*");
                if(tag.length > sL){
                    let vS = tag.toLowerCase().substring(0, sL);
                    let dS = deep.toLowerCase().substring(0, sL);
                    if(vS === dS){
                        /* Magic match */
                        return tag.toLowerCase();
                    }
                }
            }
        }

        return fallbackTag ? fallbackTag : false;
    }



    /**
     * Groups content that it receives
     * 
     * @param string content 
     * @param boolean newShadowDom
     * @param integer maxPerGroup
     * @param bool autoSplit If enabled will split content every 100 words
     * 
     * @return array groupedContent
     */
    this.getGroupedContent = (content, newShadowDom = true, maxPerGroup = -1, autoSplit) => {
        if(typeof content == 'undefined' || content == null || content.toString().trim() == ''){
            return false;
        }

        if(newShadowDom){
            groupedContent = [];
            extractedHTML = [];
            groupCounter = 0;
            shadowDom = $("<div/>");
            shadowDom.html(content);
        } else {
            shadowDom = content;
        }

        if(autoSplit){
            $(shadowDom).children().each((i, element) => {
                this.autoSplitElement(element);
            });
        }

        let itemCounter = 0;
        
        if($(shadowDom).children().length){
            $(shadowDom).children().each((i, element) => {
                itemCounter++

                element = _this.cleanElement($(element), false);
                
                extractedHTML.push(element);
                
                // let nodeName = element.prop('nodeName');
                let nextNodeName = $(element.next()).prop('nodeName');

                let elementType = _this.getElementType(element);

                // console.log(itemCounter);
                
                // Check if a element is a heading
                if(elementType == 'heading' || (maxPerGroup == itemCounter)){
                    
                    // Create new group because of heading
                    if(elementType == 'heading'){
                        groupCounter++;
                    }
                    
                    // Reset counter
                    let max = false;
                    if((maxPerGroup >= itemCounter)){
                        max = true;
                        itemCounter = 0;
                        // console.log('max');
                    }
                    
                    // Check if next needed group exists
                    if(typeof groupedContent[groupCounter] == 'undefined'){
                        groupedContent[groupCounter] = [];
                    }
                    
                    // Add heading to new group if has content
                    if(element.text().trim() != ''){
                        elementObject = {
                            type : elementType,
                            element : element
                        };
                        
                        groupedContent[groupCounter].push(elementObject);
                    }

                    // Create new heading after the last max item was added
                    if(elementType != 'heading'){
                        groupCounter++;
                    }

                } else {
                    // Not a heading, so its something else

                    if(elementType == 'script'){
                        return;
                    }

                    // Check if current group exists
                    if(typeof groupedContent[groupCounter] == 'undefined'){
                        groupedContent[groupCounter] = [];
                    }

                    // if(listTags.includes(nextNodeName)){
                    //     elementObject = {
                    //         type : 'listHead',
                    //         element : element
                    //     };

                    //     groupedContent[groupCounter].push(elementObject);
                    //     return;
                    // }

                    // Check if element is a container
                    if(elementType == 'container'){ 

                        // Check if container has html or just text
                        let elementInnerHTML = element.prop('innerHTML');
                        elementInnerHTML = elementInnerHTML.replaceAll('<br>', '');
                        elementInnerHTML = elementInnerHTML.replaceAll('</br>', '');

                        let hasHTML = /<\/?[a-z][\s\S]*>/i.test(elementInnerHTML);
                        
                        if(!hasHTML && elementInnerHTML.trim() != ''){
                            element = $(`<p>${elementInnerHTML}</p>`);
                            elementObject = {
                                type : 'other',
                                element : element
                            };

                            groupedContent[groupCounter].push(elementObject);

                            // Create new group as this div only contains 1 piece of text
                            groupCounter++;
                            return;
                        }

                        itemCounter = itemCounter - 1;
                        
                        // console.log(`${itemCounter} -  container`)
                        _this.getGroupedContent(element, false, maxPerGroup);
                        return;
                    }
                    
                    // Check if element is a list
                    if(elementType == 'list'){
                        elementObject = {
                            type : elementType,
                            element : element
                        };

                        groupedContent[groupCounter].push(elementObject);
                        return;
                    }

                    // Not a container or list
                    // Add element to current group if has content
                    if(element.text().trim() != ''){
                        elementObject = {
                            type : 'other',
                            element : element
                        };

                        groupedContent[groupCounter].push(elementObject);
                    }
                }
            });
        }

        groupedContent = _this.removeEmptyItems(groupedContent);

        return(groupedContent);
    }



    /**
     * 
     * Determine's element type
     * 
     * @param object element 
     * 
     * @return string
     */
    this.getElementType =  (element) => {

        let nodeName = element.prop('nodeName');

        if(headingTags.includes(nodeName)){
            return 'heading';
        }

        if(scriptTags.includes(nodeName)){
            return 'script';
        }

        if(containerTags.includes(nodeName)){
            return 'container';
        }

        if(listTags.includes(nodeName)){
            return 'list';
        }

        return 'other';
    }

    

    /**
     * Removes all attributes from an element
     * 
     * @param object element 
     * @param boolean fullObjects
     * 
     * @returns object
     */
    this.cleanElement = (element, fullObject = true) => {

        if(fullObject){ 
            var element = element.element;
        }

        element = $(element);
        let elementType = _this.getElementType(element);
        
        // Remove attributes from this element
        let attributes = element.prop('attributes');
        for(attribute of attributes){
            element.removeAttr(attribute.name);
        }
        
        // Remove all unwanted children from this element
        if(element.children().length > 0){
            element.children().each(function(){
                let child = $(this);

                let skipChild = false;
                
                // if(child.is(':hidden')){
                //     skipChild = true;
                // }

                if(!skipChild){
                    // Remove attributes from child
                    let attributes = child.prop('attributes');
                    for(attributeIndex in attributes){
                        if(typeof attributes[attributeIndex].name == 'undefined'){
                            for(let i = 0; i < attributes.length; i++){
                                element.find(child).removeAttr(attributes[i].name);
                            }
                        } else {
                            element.find(child).removeAttr(attributes[attributeIndex].name);
                        }
                    }
                    
                    // Check if child has children
                    if(child.children().length > 0){
                        _this.cleanElement(child, false);
                        return;
                    }
                    
                    if(elementType == 'script'){
                        element.find(child).remove();
                    }
                } else {
                    element.find(child).remove();
                }
            })
        }
        
        return element;
    }



    /**
     * Removes attributes from all elements
     * 
     * Expects object param, but can give string HTML
     * 
     * @param object elements
     * 
     * @return object cleanedElements
     */
    this.cleanElements = (elements) => {
        let cleanedElements;
        let tempDom;

        if(typeof elements == 'string'){
            tempDom = $("<div/>");
            tempDom.html(elements);
        }

        if($(tempDom).children().length){
            $(tempDom).children().each((i, element) => {
                element = _this.cleanElement(element, false);
            })
        }

        cleanedElements = $(tempDom).html();

        return cleanedElements;
    }



    /**
     * Updates element in the groupedContent array
     * 
     * @param object element 
     * @param integer index
     * 
     * @return void
     */
    this.updateGroupedContentItem = (element, index) => {
        let elementArray = [];
        
        if(element.children().length > 0){
            element.children().each(function(){
                let child = $(this);
                elementArray.push(child);
            });
        } else {
            elementArray.push(element);
        }
        
        groupedContent[index] = elementArray;
    }



    /**
     * Removes empty items from array
     * 
     * @param array array 
     * 
     * @return array newArray
     */
    this.removeEmptyItems = (array) => {
        let cleanedArray = [];

        for (let item of array) {
            if(typeof item != 'undefined' && item.length > 0){
                cleanedArray.push(item);
            }
        }

        return cleanedArray;
    }

    this.countWords = (content) => {
        try{	
            /* New approach accounts for special language characters (As of 2022-11-23) */
            let r1 = new RegExp('[\u3000-\u4DFF]','g');
            let r2 = new RegExp('[\u4E00-\u9FFF]','g');
            let r3 = new RegExp('[\u0E00-\u0E7F]','g');

            content = content.replace(r1,' {PNK} ');
            content = content.replace(r2,' {CJK} ');
            content = content.replace(r3,' {THI} ');
            content = content.replace(/(\(|\)|\*|\||\+|\"|\'|_|;|:|,|\?)/ig," ") ;
            content = content.replace(/\s+/ig," ");

            let a = content.split(/[\s+|\\|\/]/g);
            let count = 0;
            let pnkCounter = 0;
            let thiCounter = 0;
            
            for (let i = 0; i < a.length; i++){
                if (a[i] == '{PNK}'){
                    pnkCounter++;
                } else if(a[i] == '{THI}'){
                    thiCounter++;
                } else if (a[i].length > 0){
                    count++;
                }
            }

            count += Math.ceil(pnkCounter/3) + Math.ceil(thiCounter/4);
            return count;
        } catch (ex){
            /* Older fallback approach */
            const wordCount = (content.trim()).split(' ').length;
            if(wordCount){
                return wordCount;
            }
        }
        return 0;
    }
}