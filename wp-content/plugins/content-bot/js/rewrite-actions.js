/**
 * ContentBot Rewrite Post/Page Action Handler
 *
 * Version: 1.0.1
 * 
 * First build: 2023-07-12
 * Last update: 2023-07-12
 * 
 * 1.0.0
 * Debut
*/

class CBRewriteActions{
  
	/**
	 * Cosntructor 
	*/
	constructor(options){
		this.init();

		if(typeof jQuery === 'undefined'){
			console.error("jQuery is not present, ContentBot Integration Handler could not be initialized");
			return;
		}
	}

	/**
	 * Initialize defaults, state trackers and instance variables
	 * 
	 * @return void
	*/
	init(){

		this.state = {

		}

		this.data = {};
		this.data.postRows = [];
		this.data.postRowsSorted = {};

		this.data.pageRows = [];
		this.data.pageRowsSorted = {};
		
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
    
	}

	/**
	 * Find the relevant elements within the dom
	 * 
	 * @return void
	*/
	findElements(){

		this.elements = {};

		this.elements.postsTable = jQuery('.post-type-post table.posts');
		this.elements.postsTableList = jQuery('.post-type-post table.posts tbody#the-list');

		this.elements.pagesTable = jQuery('.post-type-page table.pages');
		this.elements.pagesTableList = jQuery('.post-type-page table.pages tbody#the-list');

	}

	/**
	 * Bind all the events
	 * 
	 * @return void
	*/
	bindEvents(){

		jQuery(document).ready(function(){

			cbRewriteActions.findRows();

			cbRewriteActions.insertActions();

		})

		jQuery(document).on('click', '.cb_rewrite_as_draft', (event) => {

			let link = jQuery(event.currentTarget);

			link.html(' | Rewriting... This may take a moment');

		})

  	}

  	insertActions(){

		for(let row of this.data.postRows){

			if(row.find('.cb_rewrite_as_draft').length > 0){
				// Already has action, or is acf field
				continue;
			}
			
			let id = row.attr('id');
			let raw_id = id.replace('post-', '');
		
			let actionRow = row.find('.row-actions');

			if(actionRow.length > 0){

				let actionElement = jQuery(`
				<span class="cb_rewrite_as_draft">
					| <a href="${cbai_data.website}/wp-admin/admin.php?action=cb_rewrite_draft_with_ai&post=${raw_id}&wpnonce=${cbai_data.nonce}" aria-label="" data-cb-type="post">Rewrite Draft with AI</a>
				</span>`);

				actionRow.append(actionElement);
				
			}
		
		}

		for(let row of this.data.pageRows){

			if(row.find('.cb_rewrite_as_draft').length > 0){
				// Already has action, or is acf field
				continue;
			}
			
			let id = row.attr('id');
			let raw_id = id.replace('post-', '');
		
			let actionRow = row.find('.row-actions');

			if(actionRow.length > 0){

				let actionElement = jQuery(`
				<span class="cb_rewrite_as_draft">
					| <a href="${cbai_data.website}/wp-admin/admin.php?action=cb_rewrite_draft_with_ai&post=${raw_id}&wpnonce=${cbai_data.nonce}" aria-label="" data-cb-type="page">Rewrite Draft with AI</a>
				</span>`);

				actionRow.append(actionElement);
			
			}

		}

	}

	findRows(){

		if(this.elements.postsTable.length > 0){

			this.elements.postsTableList.find('tr').each(function(){
				
				let row = jQuery(this);
	
				cbRewriteActions.data.postRows.push(row);
	
				let id = row.attr('id');
				cbRewriteActions.data.postRowsSorted[id] = row;
	
			})
			
		}

		if(this.elements.pagesTable.length > 0){
			this.elements.pagesTableList.find('tr').each(function(){
	
				let row = jQuery(this);
	
				cbRewriteActions.data.pageRows.push(row);
	
				let id = row.attr('id');
				cbRewriteActions.data.pageRowsSorted[id] = row;
	
			})
		}

	}
}

let cbRewriteActions = false;
jQuery(function(){

	/**
	 * Constructed in jQuery wrapper to allow the $ instance to be available in class
	 *
	 * The actual variable is defined globally, to expose it in the DOM
	*/
	cbRewriteActions = new CBRewriteActions();

});	