/**
 * Instruct templates
 *
 * Version: 1.0.0
 * 
 * First build: 2023-02-15
 * Last update: 2023-03-14
 * 
 * 1.0.0
 * Debut
*/

class InstructTemplates{
	static API_HOST = 'https://contentbot.ai/app/api/';
	static INSTRUCT_BOT = 'https://contentbot.ai/app/chat';

	/**
	 * Constructor 
	*/
	constructor(options){
		this.init();

		if(typeof $ === 'undefined'){
			console.error("jQuery is not present, article editor could not be initialized");
			return;
		}

		$(document).ready(this.onReady());
	}



	/**
	 * Initialize defaults, state trackers and instance variables
	 * 
	 * @return void
	*/
	init(){

    $ = jQuery;

		this.state = {
			ready: false,
			newPublic : false,
			editPublic : false,
		};

		this.data = {};
		this.data.instructionsSorted = [];
		this.data.categoriesSorted = [];
		this.data.industriesSorted = [];

		this.data.instructions = {};
		this.data.categories = [];
		this.data.industries = [];
		this.data.popular = [];
		this.data.otherInstructions = [];
		this.data.favourites = [];

		this.filterTypes = ['blog_content', 'marketing', 'social_media', 'seo', 'other'];

		this.icons = {};
		this.icons.categories = {
			1 : '<i class="far fa-copy" title="Blog Content"></i>', // Blog Content
			2 : '<i class="far fa-envelope-open" title="Emails"></i>', // Emails
			3 : '<i class="fas fa-mobile-alt" title="Social Media"></i>', // Social Media
			4 : '<i class="fas fa-list-ol" title="Guides"></i>', // Guides
			5 : '<i class="fas fa-book" title="Books"></i>', // Books
			6 : '<i class="fas fa-video" title="Videos"></i>', // Videos
			7 : '<i class="fas fa-laptop" title="Webinar"></i>', // Webinar
			8 : '<i class="far fa-file-alt" title="Case Studies"></i>', // Case Studies
			9 : '<i class="far fa-copy" title="White Papers"></i>', // White Papers
			10 : '<i class="far fa-newspaper" title="Press Releases"></i>', // Press Releases
			11 : '<i class="fas fa-poll" title="Marketing"></i>', // Marketing
			12 : '<i class="fas fa-desktop" title="Website Content"></i>', // Website Content
			13 : '<i class="fas fa-search" title="SEO"></i>', // SEO
			// 14 Other
			15 : '<i class="fas fa-shopping-cart" title="eCommerce"></i>', //eCommerce
			16 : '<i class="fas fa-building" title="Business"></i>', // Business
		}
	}



    /**
	 * OnReady delegate, completes the initialization
	 * 
	 * @return void
	*/
	onReady(){
        this.findElements();
		this.bindEvents();

		this.getAllData();
	}



    /**
	 * Find the relevant elements within the dom
	 * 
	 * @return void
	*/
    findElements(){
		this.elements = {};
		
		this.elements.mainWrapper = $('.instructionsMainWrapper');

		this.elements.newInstructionButton = $('#new-instruction');

		this.elements.search = $('#toolSearch');

		this.elements.filterContainer = $('.instructionFilterContainer');
		this.elements.otherFilterContainer = $('.instructionOtherFilterContainer');

		this.elements.newInstructionModal = $('#newInstructionModal');
		this.elements.newInstructionModalBody = $('#newInstructionModal .modal-body');
		this.elements.newInstructionModalClose = $('#newInstructionModal .close');
		this.elements.newInstructionSubmit = $('#new-instruction-submit');
		this.elements.newInstructionPublicRows = $('#newInstructionModal .publicRows');

		this.elements.editInstructionModal = $('#editInstructionModal');
		this.elements.editInstructionModalBody = $('#editInstructionModal .modal-body');
		this.elements.editInstructionModalClose = $('#editInstructionModal .close');
		this.elements.editInstruction = $('#edit-instruction');
		this.elements.editInstructionPublicRows = $('#editInstructionModal .publicRows');

		this.elements.submissionModal = $('#submissionModal');
		this.elements.submissionModalBody = $('#submissionModal .modal-body');
		this.elements.submissionModalClose = $('#submissionModal .close');

		/* Add new instruction modal inputs */
		this.elements.inputs = {};
		this.elements.inputs.title = $('#inputTitle');
		this.elements.inputs.instruction_description = $('#inputDescription');
		this.elements.inputs.instruction = $('#inputInstruction');
		this.elements.inputs.instruction_example = $('#inputExample');
		this.elements.inputs.category = $('#inputCategory');

		this.elements.inputs.public = $('#inputPublic');
		this.elements.inputs.industry = $('#inputIndustry');

		/* Edit instruction modal inputs */
		this.elements.inputs.edit = {};
		this.elements.inputs.edit.title = $('#inputTitleEdit');
		this.elements.inputs.edit.instruction_description = $('#inputDescriptionEdit');
		this.elements.inputs.edit.instruction = $('#inputInstructionEdit');
		this.elements.inputs.edit.instruction_example = $('#inputExampleEdit');
		this.elements.inputs.edit.category = $('#inputCategoryEdit');

		this.elements.inputs.edit.public = $('#inputPublicEdit');
		this.elements.inputs.edit.industry = $('#inputIndustryEdit');
	}



	/**
	 * Bind all the events
	 * 
	 * @return void
	*/
	bindEvents(){
		this.elements.inputs.public.on('change', (event) => {
			if(this.elements.inputs.public.prop('checked')){
				this.state.newPublic = true;
				this.elements.newInstructionPublicRows.show();
			} else {
				this.state.newPublic = false;
				this.elements.newInstructionPublicRows.hide()
			}
		})

		this.elements.inputs.edit.public.on('change', (event) => {

			if((this.elements.inputs.edit.public).hasClass('disabled')){
				return;
			}
			
			if(this.elements.inputs.edit.public.prop('checked')){
				this.state.editPublic = true;
				this.elements.editInstructionPublicRows.show();
			} else {
				this.state.editPublic = false;
				this.elements.editInstructionPublicRows.hide()
			}
		})
		
		this.elements.newInstructionSubmit.on('click', (event) => {
			this.submitInstruction();
		})

		this.elements.search.on('click keyup', (event) => {
			this.search();
		});

		$(document.body).on('click', '.open-add-modal', (event) => {
			this.elements.newInstructionButton.click();
		})

		$(document.body).on('click', '.automation-view-more', (event) => {
			let button = $(event.currentTarget);
			let type = button.attr('data-category');
			this.toggleViewMore(button, type);
		})

		$(document.body).on('click', '.filter', (event) => {
			if(!this.state.ready){
				return;
			}
			
			let filter = $(event.currentTarget);
			let type = filter.attr('ftype');

			let otherFilter = false;
			if(filter.hasClass('other-filter')){
				otherFilter = true;
			}
			this.filterSection(type, otherFilter);
		})

		$(document.body).on('mouseover', '.instructionContainer', (event) => {
			let container = $(event.currentTarget);

			let buttonContainer = container.find('.instructionButtons');
			buttonContainer.addClass('show');
		})

		$(document.body).on('mouseout', '.instructionContainer', (event) => {
			let container = $(event.currentTarget);

			let buttonContainer = container.find('.instructionButtons');
			buttonContainer.removeClass('show');
		})

		$(document.body).on('click', '.instructionBtn', (event) => {
			let button = $(event.currentTarget);

			this.onButtonClick(button);
		})

		this.elements.editInstruction.on('click', (event) => {
			let button = $(event.currentTarget);
			let id = button.attr('data-id');
			this.submitEdit(id);
		})

		// $(document.body).on('click', '.favourite-icon', (event) => {
		// 	let button = $(event.currentTarget);
		// 	let id = button.attr('data-id');
		// 	this.favourite(id);
		// })
	}



	/**
	 * Favourites a prompt
	 * 
	 * @param int id 
	 * 
	 * @return void
	 */
	favourite(id){

		let button = $(`.instructionContainer .favourite-icon[data-id="${id}"]`);
		button.addClass('blinking');

		var data = {
			action : 'favourite_instruction',
			id : id,
			uid : cbai_instruct_data.uid
		};

		const params = new URLSearchParams(data);
		const url = InstructTemplates.API_HOST + '?' + params.toString();

		$.ajax({
			type : "GET",
			dataType : "json",
			url : url,
			success : (response) => {

				if(response.added){
					$(`.instructionContainer .card[data-id="${id}"]`).parent().addClass('favourited');
					
					this.data.favourites.push(id);
				} else {
					$(`.instructionContainer .card[data-id="${id}"]`).parent().removeClass('favourited');

					const index = this.data.favourites.indexOf(id);
					if (index > -1) {
						this.data.favourites.splice(index, 1);
					}
				}

				// this.buildFavouritesSection(true);
				button.removeClass('blinking');

			},
			error : (xhr, status, error) => {
				window.alert(error);
			}
		})
	}

	

	/**
	 * Submits the edited instruction for review
	 * 
	 * @return void
	 */
	submitEdit(id){
		
		let inputKeys = ['title', 'instruction_description', 'instruction', 'instruction_example', 'category'];

		if(this.state.editPublic){
			let publicKeys = ['industry'];

			for(let key of publicKeys){
				inputKeys.push(key);
			}
		}

		if(!this.validateInputs(inputKeys, 'edit')){
			alert("Please ensure that you have a title, description, instruction, example output and selected category for your prompt.");
			return;
		}

		let title = this.elements.inputs.edit.title.val();
		let description = this.elements.inputs.edit.instruction_description.val();
		let instruction = this.elements.inputs.edit.instruction.val();
		let example = this.elements.inputs.edit.instruction_example.val();
		let category =  this.elements.inputs.edit.category.val();
		let makePublic = this.elements.inputs.edit.public.prop('checked');
		let industry = this.elements.inputs.edit.industry.val();

		const data = {
			action : 'update_instruction',
			id : id,
			title : title,
			description : description,
			instruction : instruction,
			example : example,
			category : category,

			industry : industry,
			public : makePublic,
			userid : cbai_instruct_data.uid,
		};

		this.insertMainLoader();

		var tm = $.post(InstructTemplates.API_HOST, data, (response) => {

			if(response == 1){
				this.getAllData();
				this.resetFilters();
			} else {
				alert("Something went wrong, please try again");
			}
		}, 'json');

		this.elements.editInstructionModalClose.click();
	}



	/**
	 * Calls the methods to populate the edit modal inputs
	 * 
	 * @param object instruction
	 * 
	 * @return void
	 */
	prepEditInstructionModal(instruction){
		console.log(instruction);

		this.elements.editInstruction.attr('data-id', instruction.id);

		let isPublic = false;
		if(instruction.public == '1'){
			isPublic = true;
		}

		Object.entries(this.elements.inputs.edit).forEach(([key, value]) => {
			let input = $(value);
			let val = instruction[key];

			val = val.replace(/\\&/g, "&");
			
			val = decodeURI(val);
			
			val = this.fixLineBreaks(val);

			input.val(val);

			if(value.attr('type') == 'checkbox'){
				if(parseInt(val) == 0){
					input.prop('checked', false).change();
				} else {
					input.prop('checked', 'checked').change();
				}

				if(key == 'public' && parseInt(val) == 1){
					input.addClass('disabled');
					input.parent().addClass('disabled');
				}
			}

			if(!isPublic && input.parent().hasClass('publicInputRow')){
				switch(key){
					case 'industry':
						input.val(70); // 70 is the "None" industry
						break;
				}
			}

			if(value.prop('nodeName') == "SELECT"){
				input.change();
			}
		});
	}

	

	/**
	 * Handles the action related to the button that was clicked
	 * 
	 * @param element button
	 * 
	 * @returns void
	 */
	onButtonClick(button){
		const type = button.attr('data-type');
		const id = button.attr('data-id');

		const instruction = this.data.instructions[id];

		switch(type){
			case 'delete':
				// Double check the instruction belongs to the user
				if(!this.instructionBelongsToUser(instruction)){
					return;
				}

				if(this.instructionIsPublic(instruction)){
					let confirmation = confirm('Are you sure you want to delete this prompt as it will also be deleted from the Community Prompts?');
					if(!confirmation){
						return;
					}
				}

				button.html("Deleting");

				var deleteData = {
					action : 'delete_instruction',
					id : instruction.id
				};
		
				const deleteParams = new URLSearchParams(deleteData);
				const deleteUrl = InstructTemplates.API_HOST + '?' + deleteParams.toString();
		
				$.ajax({
					type : "GET",
					dataType : "json",
					url : deleteUrl,
					success : (response) => {

						if(response != false){
							this.getAllData();
							this.resetFilters()
						} else {
							alert("Something went wrong... Please try again.");
						}
		
					},
					error : (xhr, status, error) => {
						window.alert(error);
					}
				})
				break;

			case 'edit': 
				this.prepEditInstructionModal(instruction);
				this.elements.editInstructionModal.modal('show');
				break;

			case 'run':
				let link = InstructTemplates.INSTRUCT_BOT + '?id=' + instruction.id;
				window.location.href = link;
				break;

			default:
				console.log("Not sure what action to do...");
		}
	}



	/**
	 * Resets the filters and sections
	 */
	resetFilters(){
		let searchContainer = $(`.searchContainer`);
		searchContainer.hide();
		this.filterSection('top');
	}



	/**
	 * Searches and displays the relevant instruction cards
	 * 
	 * @return void
	 */
	search(){
		let searchContainer = $(`.searchContainer`);

		let searchString = this.elements.search.val();
		let searchLength = searchString.length;
		

		if(searchLength <= 1){ // Cleared search
			this.resetFilters();
			return;
		} else {
			let found = 0;

			$('.filter').each(function(){
				$(this).removeClass('selected');
			})
			
			$('.categorySection').hide();
			
			searchContainer.show();
			$('#searchString').html(searchString);

			searchContainer.find('.filterCard').each(function(){
				let instructionCard = $(this);
				let instructionTitle = instructionCard.find('.instructionTitle').text();

				let searchExp = new RegExp(`${searchString}`, "i");
				
				if(instructionTitle.search(searchExp) >= 0){
					instructionCard.show();
					found++;
				} else {
					instructionCard.hide();
				}
			})

			if(found <= 0){
				$('.searchStringLabel').html(`No results found for "${searchString}"...`);
			} else {
				let resultsText = "Results";
				if(found == 1){
					resultsText = "Result";
				}
				$('.searchStringLabel').html(`${found} ${resultsText} found for "${searchString}"...`);
			}
		}
	}



	/**
	 * Hides and displays the respective section
	 * 
	 * @param string type
	 * @param boolean otherFilter
	 * 
	 * @return void
	 */
	filterSection(type, otherFilter = false){
		let currentFilter = $(`.filter[ftype="${type}"]`);

		if(type == 'other'){
			this.elements.otherFilterContainer.show();
		} else {
			if(!currentFilter.hasClass('other-filter')){
				this.elements.otherFilterContainer.hide();
			}
		}

		if(type != 'top'){
			let currentSection = $(`.categorySection[data-type="${type}"]`);

			$('.categorySection').each(function(){
				let section = $(this);
				let sectionType = section.attr('data-type');

				if(sectionType == 'search'){
					return;
				}

				if(type == 'other'){
					if(!section.hasClass('mainCategorySection')){
						section.show();
						if(sectionType != 'other'){
							section.addClass('mt-6');
						} else {
							section.removeClass('mt-6');
						}
						return;
					}
				}
	
				section.hide();
				section.removeClass('mt-6');
			})

			$('.filter').each(function(){
				let filter = $(this);
				filter.removeClass('selected');
			})
	
			if(type != 'other'){
				currentSection.show();
			}
			
			currentFilter.addClass('selected');

			if(otherFilter){
				$(`.filter[ftype="other"]:not('.other-filter')`).addClass('selected');
			}

			let moreSection = currentSection.find('.automation-view-more-container');
			if(moreSection.hasClass('open')){
				let moreButton = currentSection.find('.automation-view-more');
				instructTemplates.toggleViewMore(moreButton, type);
			}

			$('.searchContainer').hide();
		} else {
			$('.categorySection').each(function(){	
				let section = $(this);

				let sectionType = section.attr('data-type');

				let specialTypes = ['search', 'private', 'public'];
				if(specialTypes.includes(sectionType)){
					section.hide();
					return;
				}

				// if(!instructTemplates.filterTypes.includes(sectionType) && sectionType != 'popular'){
				// 	section.hide();
				// 	return;
				// }
	
				if(!section.hasClass('mainCategorySection') && sectionType == 'other'){
					section.hide();
					return;
				}

				section.show();

				if(section.attr('data-type') != 'popular'){
					section.addClass('mt-6');
				}

				let moreSection = section.find('.automation-view-more-container');
				if(moreSection.hasClass('open')){
					let moreButton = section.find('.automation-view-more');
					instructTemplates.toggleViewMore(moreButton, sectionType);
				}
			})

			$('.filter').each(function(){
				let filter = $(this);
				filter.removeClass('selected');
			})

			currentFilter.addClass("selected");

			$('.searchContainer').hide();
		}
	}



	/**
	 * toggles the view more section for the category
	 * 
	 * @param element button
	 * @param string type 
	 * 
	 * @return void
	 */
	toggleViewMore(button, type){
		let container = $(`.automation-view-more-container[data-category="${type}"]`);
		if(container.hasClass('open')){
			container.removeClass('open');
			container.hide();
			button.html("View More");
		} else {
			container.addClass('open');
			container.show();
			button.html("Hide More");
		}
	}



	/**
	 * Inserts the main loader
	 * 
	 * @return void
	 */
	insertMainLoader(){
		let loader = $('<div class="instruction-loader"></div>');
		this.elements.mainWrapper.html(loader);
	}



	/**
	 * Gets all the data and populates the class variables
	 * 
	 * @return void
	 */
	getAllData(){
		this.state.ready = false;
		this.insertMainLoader();

		const data = {
			action : 'get_all_instruction_data',
		};

		const params = new URLSearchParams(data);
		const url = InstructTemplates.API_HOST + '?api=true&' + params.toString();

		$.ajax({
			type : "GET",
			dataType : "json",
			url : url,
			success : (response) => {
				
				this.data.instructionsSorted = response.instructions;
				this.data.categoriesSorted = response.categories;
				this.data.industriesSorted = response.industries;


				for(let instruction of response.instructions){
					this.data.instructions[instruction.id] = instruction;
				}

				for(let category of response.categories){
					this.data.categories[category.id] = category;
				}

				for(let industry of response.industries){
					this.data.industries[industry.id] = industry;
				}

				this.data.popular = response.popular;

				this.prepNewInstructionModal();

				this.populateInstructions();

				this.state.ready = true;

			},
			error : (xhr, status, error) => {
				window.alert(error);
			}
		})
	}



	/**
	 * Populates the insructions on the page
	 * 
	 * @return void
	 */
	populateInstructions(){
		this.elements.mainWrapper.empty();

		this.buildPopularSection();

		

		for(let title of this.filterTypes){
			let category;
			for(let c of this.data.categories){
				if(typeof c !== 'undefined'){
					if(title == c.category_title){
						category = c;
						continue;
					}
				}
			}

			this.buildCategorySection(category);
		}

		this.appendOtherInstructionSections();

		this.buildMineSection();
		this.buildCommunitySection();

		this.buildSearchSection();

		// this.buildFavouritesSection();

		$('[data-toggle="tooltip"]').tooltip({
            html : true
        });

		this.resetFilters();
	}



	/**
	 * Builds and outputs the HTML for the community section (public)
	 * 
	 * @return void
	 */
	buildCommunitySection(){
		let cardsHtml = '';
		let count = 0;

		for(let instruction of this.data.instructionsSorted){
			if(typeof instruction !== 'undefined'){
				if(this.instructionIsPublic(instruction) && this.instructionIsApproved(instruction)){
					cardsHtml += this.buildInstructionCard(instruction);
					count++;
				}
			}
		}

		let html = `
			<div class='row categorySection mainCategorySection' data-type="public" style="display: none;">
				<div class='col-md-12'>
					<h2 class='contentBoxSectionHeader'>Community (<span class="sectionCount" data-value="${count}">${count}</span>)</h2>
				</div>
				<div class="col-12 categorySectionInstructions">
					<div class="row">
						${cardsHtml}
					</div>
				</div>
			</div>
		`;

		this.elements.mainWrapper.append(html);
	}



	/**
	 * Builds and outputs the HTML for the mine section (private)
	 * 
	 * @return void
	 */
	buildMineSection(){
		let cardsHtml = '';
		let count = 0;

		for(let instruction of this.data.instructionsSorted){
			if(typeof instruction !== 'undefined'){
				if(this.instructionBelongsToUser(instruction)){
					cardsHtml += this.buildInstructionCard(instruction);
					count++;
				}
			}
		}

		let html = `
			<div class='row categorySection mainCategorySection' data-type="private" style="display: none;">
				<div class='col-md-12'>
					<h2 class='contentBoxSectionHeader'>My Prompts (<span class="sectionCount" data-value="${count}">${count}</span>)</h2>
				</div>
				<div class="col-12 categorySectionInstructions">
					<div class="row">
						${cardsHtml}
					</div>
				</div>
			</div>
		`;

		this.elements.mainWrapper.append(html);
	}



	/**
	 * Builds and outputs the HTML for the favourite section
	 * 
	 * @param boolean update
	 * 
	 * @return void
	 */
	buildFavouritesSection(update = false){
		let cardsHtml = '';
		let count = 0;

		let favourites = (this.data.favourites).reverse();
		
		for(let id of favourites){
			let instruction = this.data.instructions[id];

			if(typeof instruction == 'undefined' || instruction == null){
				continue;
			}
			
			cardsHtml += this.buildInstructionCard(instruction, true);
			count++;

			$(`.instructionContainer .card[data-id="${id}"]`).parent().addClass('favourited');
		}

		if(update){
			let container = $('.categorySection[data-type="favourites"] .categorySectionInstructions .row');

			container.empty();
			container.append(cardsHtml);
			
			let counter = $('.categorySection[data-type="favourites"] .sectionCount');
			counter.html(count);
		} else {
			let html = `
				<div class='row categorySection' data-type="favourites" style="display: none;">
					<div class='col-md-12'>
						<h2 class='contentBoxSectionHeader'>Favourites (<span class="sectionCount" data-value="${count}">${count}</span>)</h2>
					</div>
					<div class="col-12 categorySectionInstructions">
						<div class="row">
							${cardsHtml}
						</div>
					</div>
				</div>
			`;
	
			this.elements.mainWrapper.append(html);
		}
	}



	/**
	 * Appends the other instruction sections to the other section
	 * 
	 * @return void
	 */
	appendOtherInstructionSections(){
		// 14 is the "Other" category
		let otherCategories = [14];
		
		let cardsHtml = '';
		for(let instruction of (this.data.otherInstructions)){
			if(!otherCategories.includes(instruction.category)){
				otherCategories.push(instruction.category);
			}
		}

		this.elements.otherFilterContainer.find(".filter").remove();

		for(let categoryID of otherCategories){
			let category = this.data.categories[categoryID];

			this.appendOtherSectionFilters(category);
			this.buildCategorySection(category, true);
		}
	}



	/**
	 * Builds and appends the filter for the "Other" section 
	 * 
	 * @param object category 
	 * 
	 * @return void
	 */
	appendOtherSectionFilters(category){
		let displayTitle = this.camelCase(category.display_title);
		let type = category.category_title;

		if(type == 'other'){
			displayTitle = "Others";
		}

		let html = `<span class='filter other-filter badge badge-pill bg-white p-2 mx-1 border' ftype='${type}'>${displayTitle}</span>`;

		this.elements.otherFilterContainer.append(html);
	}



	/**
	 * Builds and outputs the HTML for the popular section
	 * 
	 * @return void
	 */
	buildPopularSection(){
		let cardsHtml = '';

		for(let instruction of this.data.popular){
			if(typeof instruction !== 'undefined'){
				if(this.instructionIsApproved(instruction)){
					cardsHtml += this.buildInstructionCard(instruction);
				}
			}
		}

		let html = `
			<div class='row categorySection mainCategorySection' data-type="popular">
				<div class='col-md-12'>
					<h2 class='contentBoxSectionHeader'>Popular</h2>
				</div>
				<div class="col-12 categorySectionInstructions">
					<div class="row">
						${cardsHtml}
					</div>
				</div>
			</div>
		`;

		this.elements.mainWrapper.append(html);
	}



	/**
	 * Builds and outputs the HTML for the section that is used for searching
	 * 
	 * @return void
	 */
	buildSearchSection(){
		let cardsHtml = '';

		for(let instruction of this.data.instructionsSorted){
			if(typeof instruction !== 'undefined'){
				if(this.instructionIsApproved(instruction)){
					if((instruction.public == 1) || (this.instructionBelongsToUser(instruction))){
						cardsHtml += this.buildInstructionCard(instruction);
					}
				} else {
					if(this.instructionBelongsToUser(instruction)){
						cardsHtml += this.buildInstructionCard(instruction);
					}
				}
			}
		}

		let html = `
			<div class='row searchContainer' data-type="search" style="display: none;">
				<div class='col-md-12'>
					<h2 class='contentBoxSectionHeader searchStringLabel'>Results Found...</h2>
				</div>
				<div class="col-12 categorySectionInstructions">
					<div class="row">
						${cardsHtml}
					</div>
				</div>
			</div>
		`;

		this.elements.mainWrapper.append(html);
	}



	/**
	 * Builds and outputs the HTML for the main category section
	 * 
	 * @param object category
	 * @param boolean other
	 * @param boolean autoAppend
	 * 
	 * @return void
	 * OR
	 * @return string html
	 */
	buildCategorySection(category, other = false, autoAppend = true){
		let displayTitle = this.camelCase(category.display_title);
		
		let count = 0;
		let viewMoreCap = 10;
		let cardsHtml = '';
		let cardsMoreHtml = '';

		for(let instruction of this.data.instructionsSorted){
			if(typeof instruction !== 'undefined'){
				if(this.instructionIsApproved(instruction) || (!this.instructionIsApproved(instruction) && this.instructionBelongsToUser(instruction))){ // Check approved
					if(instruction.category == category.id){ // Check category
						if(this.instructionIsPublic(instruction)){ // Check public
							if(count < viewMoreCap){
								cardsHtml += this.buildInstructionCard(instruction);
							} else {
								cardsMoreHtml += this.buildInstructionCard(instruction);
							}
							
							count++;
						} else {
							if(this.instructionBelongsToUser(instruction)){ // Check belongs to user
								if(count < viewMoreCap){
									cardsHtml += this.buildInstructionCard(instruction);
								} else {
									cardsMoreHtml += this.buildInstructionCard(instruction);
								}
								
								count++;
							}
						}
					} else {
						// Now check if part of main categories -> if not, add to other list
						if(!((this.filterTypes).includes(this.data.categories[instruction.category].category_title))){
							if(!(this.data.otherInstructions).includes(instruction)){
								
								if(this.instructionBelongsToUser(instruction) || (this.instructionIsApproved(instruction) && this.instructionIsPublic(instruction))){
									
									(this.data.otherInstructions).push(instruction);
								}
							}
						}
					}
				}
			}
		}

		if(cardsHtml == ''){
			return;
			cardsHtml = `<div class="px-4 col-12"><p><em>There are currently no available Prompts for this category... If you have one in mind, you may submit one <a href="javascript:void(0);" class="open-add-modal">here</a></em></p></div>`;
		}

		let sectionClass = 'categorySection';
		let style = '';
		// let style = 'style="display: none;"';
		if(!other){
			sectionClass += ' mainCategorySection';
			style = '';
		}

		let html = `
			<div class='row mt-6 ${sectionClass}' data-type="${category.category_title}" ${style}>
				<div class='col-md-12'>
					<h2 class='contentBoxSectionHeader'>${displayTitle} (<span class="sectionCount" data-value="${count}">${count}</span>)</h2>
				</div>
				<div class="col-12 categorySectionInstructions">
					<div class="row">
						${cardsHtml}
					</div>
				</div>
		`;

		if(count > viewMoreCap){
			html += `
				<div class="col-12 categorySectionInstructionsMore">
					<a href="javascript:void(0);" class="automation-view-more" data-category="${category.category_title}">View More</a>
					<div class="row automation-view-more-container" data-category="${category.category_title}" style="display: none;">
						${cardsMoreHtml}
					</div>
				</div>
			`;
		}

				
		html +=	`</div>`;

		if(autoAppend){
			this.elements.mainWrapper.append(html);
		} else {
			return html;
		}
	}




	/**
	 * Builds the html code for the instruction card
	 * 
	 * @param object instruction
	 * @param boolean favourite
	 * 
	 * @return string html 
	 */
	buildInstructionCard(instruction, favourite = false){
		let privateNote = '';
		if(instruction.public == '0'){
			privateNote = '<span class="smallNote privateNote">Private</span>';
		}

		let instructionTitle = instruction.title;
		instructionTitle = instructionTitle.replace(/\\&/g, "&");
		

		let instructionDescription = instruction.instruction_description;
		let descriptionPreviewLength = 180;	
		if(instructionDescription.length > descriptionPreviewLength){
			instructionDescription = instructionDescription.substr(0, descriptionPreviewLength) + '...';
		}

		instructionDescription = instructionDescription.replace(/\\&/g, "&");
		instructionDescription = this.fixLineBreaks(instructionDescription);

		let instructionPreview = instruction.instruction;
		let instructionPreviewLength = 100;
		if(instructionPreview.length > instructionPreviewLength){
			instructionPreview = instructionPreview.substr(0, instructionPreviewLength) + '...';
		}

		instructionPreview = instructionPreview.replace(/\\&/g, "&");
		instructionPreview = this.fixLineBreaks(instructionPreview);

		let link = InstructTemplates.INSTRUCT_BOT + '?id=' + instruction.id;

		let timesText = 'times';
		if(instruction.upvotes == 1){
			timesText = 'time';
		}

		let upvotesText = this.formatToShortVersion(parseInt(instruction.upvotes));

		let categoryIcon = this.icons.categories[instruction.category];
		if(typeof categoryIcon == 'undefined'){
			categoryIcon = `<img src="${cbai_instruct_data.location + '/img/cb-icon-instruct.png'}" title="Other">`;
		}

		let deleteButton = '';
		if(this.instructionBelongsToUser(instruction) && (!this.instructionIsPublic(instruction) || (this.instructionIsPublic(instruction) && !this.instructionIsApproved(instruction)))){
			deleteButton = `<button data-id="${instruction.id}" class="btn btn-danger instructionBtn" data-type="delete">Delete</button>`;
		}
		let editButton = '';
		if(this.instructionBelongsToUser(instruction)){
			editButton = `<button data-id="${instruction.id}" class="btn btn-secondary instructionBtn" data-type="edit">Edit</button>`;
		}


		let html = `
			<div class='col-md-6 col-sm-6 col-lg-4 col-xl-3 mt-4 filterCard cbaiInstructionContainer'>
				<div class='contentBox card border' data-id="${instruction.id}">

					${privateNote}
				
					<div class='contentBoxHeader border-0'>
						<div class="cbaiInstructionCardIconContainer">
							<span class="cbaiInstructionCardIcon">${categoryIcon}</span>
						</div>
						<h4><a href='${link}' class="instructionTitle" title='${instructionTitle}'>${instructionTitle}</a></h4>
					</div>		

					<div class='contentBoxBody border-0'>
						<p class='mt-2 cbaiInstructionDescription'>${instructionDescription}</p>
						<p class='mt-2 cbaiInstructionPreview'><strong>Preview: </strong>${instructionPreview}</p>
					</div>
					
					<span class="upvotes" data-toggle="tooltip" data-placement="top" title="This prompt template has been used <strong>${instruction.upvotes}</strong> ${timesText} by you and the community">
						<i class="fas fa-user mr-1"></i>${upvotesText}
					</span>
					
					<div class="cbaiInstructionButtons fade">
						${deleteButton}
						${editButton}
						<button data-id="${instruction.id}" class="btn btn-primary cbaiInstructionBtn" data-type="run">Run &raquo;</button>
					</div>

				</div>
			</div>
		`;

		return html;
	}



	/**
	 * Calls the methods to populate the new modal inputs
	 * 
	 * @return void
	 */
	prepNewInstructionModal(){
		this.prepModalCategories();
		this.prepModalIndustries();
	}



	/**
	 * Clears and resets the inputs for the new instruction modal
	 * 
	 * @return void
	 */
	resetNewInstructionModal(){
		Object.entries(this.elements.inputs).forEach(([key, value]) => {
			if(key == 'edit'){
				return;
			}

			if(value.prop('nodeName') == 'SELECT'){
				switch (key) {
					case 'category':
						value.val(0);
						break;
					case 'industry':
						value.val(70);
						break;
				}
				return;
			}

			if(value.prop('id') == 'inputPublic'){
				value.prop('checked', false);
				value.change();
				return;
			}

			value.val("");
		});

		this.elements.newInstructionSubmit.html("Submit");
	}



	/**
	 * Populates the instruction categories to the new and edit modal
	 * 
	 * @return void
	 */
	prepModalCategories(){
		this.elements.inputs.category.empty();

		let optionHTML = `<option value="0" selected disabled>Please select...</option>`;
		for(let category of this.data.categoriesSorted){
			if(typeof category !== 'undefined'){
				optionHTML += `<option value="${category.id}" data-title="${category.category_title}">${category.display_title}</option>`;
			}
		}

		this.elements.inputs.category.append(optionHTML);
		this.elements.inputs.edit.category.append(optionHTML);
	}



	/**
	 * Populates the instruction industries to the new and edit modal
	 * 
	 * @return void
	 */
	prepModalIndustries(){
		this.elements.inputs.industry.empty();

		let optionHTML = '';
		for(let industry of this.data.industriesSorted){
			if(typeof industry !== 'undefined'){
				let selected = '';
				if(industry.id == 70){ // 70 is the id of "None"
					selected = "selected";
				}
				optionHTML += `<option value="${industry.id}" data-title="${industry.industry_title}" ${selected}>${industry.display_title}</option>`;
			}
		}

		this.elements.inputs.industry.append(optionHTML);
		this.elements.inputs.edit.industry.append(optionHTML);
	}



	/**
	 * Submits the new instruction for review
	 * 
	 * @return void
	 */
	submitInstruction(){

		let inputKeys = ['title', 'instruction_description', 'instruction', 'instruction_example', 'category'];

		if(this.state.newPublic){
			let publicKeys = ['industry'];

			for(let key of publicKeys){
				inputKeys.push(key);
			}
		}

		if(!this.validateInputs(inputKeys)){
			alert("Please ensure that you have entered the title, description, instruction, example output and selected a category for your submission.");

			this.elements.inputs.title.focus();
			return;
		}

		this.elements.newInstructionSubmit.html("Submitting");

		let title = this.elements.inputs.title.val();
		let description = this.elements.inputs.instruction_description.val();
		let instruction = this.elements.inputs.instruction.val();
		let example = this.elements.inputs.instruction_example.val();
		let category = this.elements.inputs.category.val();

		let makePublic = this.elements.inputs.public.prop('checked');

		if(!makePublic){
			this.insertMainLoader();
		}

		let industry = this.elements.inputs.industry.val();

		const submitData = {
			action : 'submit_instruction_new',
			title : title,
			description : description,
			instruction : instruction,
			example : example,
			category : category,
			
			public : makePublic,
			industry : industry,
			uid : cbai_instruct_data.uid,
		};

		const submitParams = new URLSearchParams(submitData);
		const submitUrl = InstructTemplates.API_HOST + '?' + submitParams.toString();

		$.ajax({
			type : "GET",
			dataType : "json",
			url : submitUrl,
			success : (response) => {

				console.log(response);

				if(makePublic){
					instructTemplates.elements.submissionModal.modal("show");
				}

				this.getAllData();
				this.resetFilters();

				this.resetNewInstructionModal();

			},
			error : (xhr, status, error) => {
				window.alert(error);
			}
		})
		
		this.elements.newInstructionModalClose.click();
		this.resetNewModal();
	}

	

	/**
	 * Validates the inputs
	 * 
	 * @params array keys
	 * @param string type
	 * 
	 * @return boolean valid
	 */
	validateInputs(keys, type = false){
		let valid = true;
		for(let key of keys){
			let input;
			if(type !== false){
				input = this.elements.inputs[type][key];
			} else {
				input = this.elements.inputs[key];
			}
			let val = input.val();
			
			if(typeof val == 'undefined' || val == null || val.trim() == ''){
				valid = false;
			}

			// Check if a category has been selected
			if(key == 'category' && val == 0){ 
				valid = false;
			}
		}

		return valid;
	}


	 
	/**
	 * Clear modal inputs
	 * 
	 * @return void
	 */
	resetNewModal(){
		this.elements.newInstructionModalBody.find('input').each(function(){
			let input = $(this);
			input.val('');
		})

		this.elements.newInstructionModalBody.find('textarea').each(function(){
			let textarea = $(this);
			textarea.val('');
		})

		this.elements.newInstructionModalBody.find('select').each(function(){
			let select = $(this);
			select.val(select.find("option:first").val());
		})
	}

	

	/**
	 * Camel cases the string
	 * 
	 * @param string text 
	 * 
	 * @return string text
	 */
	camelCase(text){
		text = text.split(" ");

		for (let i = 0; i < text.length; i++) {
			text[i] = text[i][0].toUpperCase() + text[i].substr(1);
		}

		let camelCasedText = text.join(" ");

		return camelCasedText;
	}



	/**
	 * Checks if the instruction belongs to the user
	 * 
	 * @param object instruction 
	 * 
	 * @returns boolean
	 */
	instructionBelongsToUser(instruction){
		if(instruction.uid == cbai_instruct_data.uid){
			return true;
		} else {
			return false;
		}
	}



	/**
	 * Checks if the instruction is approved
	 * 
	 * @param object instruction 
	 * 
	 * @returns boolean
	 */
	instructionIsApproved(instruction){
		if(instruction.approved == '1' || instruction.approved == 1){
			return true;
		} else {
			return false;
		}
	}



	/**
	 * Checks if the instruction is public
	 * 
	 * @param object instruction 
	 * 
	 * @returns boolean
	 */
	instructionIsPublic(instruction){
		if(instruction.public == '1' || instruction.public == 1){
			return true;
		} else {
			return false;
		}
	}



	/**
	 * Formats a number to its short version
	 *  
	 * @param int num 
	 * 
	 * @returns int num
	 */
	formatToShortVersion(num) {
		if (num >= 1000000000) {
		   return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
		}
		if (num >= 1000000) {
		   return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
		}
		if (num >= 1000) {
		   return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
		}
		return num;
   	}



	/**
	 * Converts all '//n' to '/n'
	 * 
	 * @param string text 
	 * @returns 
	 */
	fixLineBreaks(text){
		text = text.replace(/\\n/g, "\n");
		return text;
	}
}



let instructTemplates = false;

jQuery(function($){
	/**
	 * Constructed in jQuery wrapper to allow the $ instance to be available in class
	 *
	 * The actual variable is defined globally, to expose it in the DOM
	*/
	instructTemplates = new InstructTemplates();
});	