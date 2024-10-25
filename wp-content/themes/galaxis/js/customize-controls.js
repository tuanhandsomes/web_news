wp.customize.sectionConstructor['galaxis-button'] = wp.customize.Section.extend( {
	// No events for this type of section.
	attachEvents: function() {},

	// Always make the section active.
	isContextuallyActive: function() { return true; }
} );
