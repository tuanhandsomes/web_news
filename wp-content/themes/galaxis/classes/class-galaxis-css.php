<?php
/**
 * Builds our dynamic CSS.
 *
 * @package Galaxis
 */

if ( ! class_exists( 'Galaxis_CSS' ) ) {
	/**
	 * Creates minified css via PHP.
	 */
	class Galaxis_CSS {
		/**
		 * The css selector that you're currently adding rules to.
		 *
		 * @access protected
		 * @var string
		 */
		protected $selector = '';

		/**
		 * Stores the final css output with all of its rules for the current selector.
		 *
		 * @access protected
		 * @var string
		 */
		protected $selector_output = '';

		/**
		 * Stores all of the rules that will be added to the selector.
		 *
		 * @access protected
		 * @var string
		 */
		protected $css = '';

		/**
		 * The string that holds all of the css to output.
		 *
		 * @access protected
		 * @var string
		 */
		protected $output = '';

		/**
		 * Stores media queries
		 *
		 * @var null
		 */
		protected $media_query = null;

		/**
		 * The string that holds all of the css to output inside of the media query.
		 *
		 * @access protected
		 * @var string
		 */
		protected $media_query_output = '';

		/**
		 * Sets a selector to the object and changes the current selector to a new one.
		 *
		 * @access public
		 *
		 * @param  string $selector - the css identifier of the html that you wish to target.
		 * @return $this
		 */
		public function set_selector( $selector = '' ) {
			// Render the css in the output string everytime the selector changes.
			if ( '' !== $this->selector ) {
				$this->add_selector_rules_to_output();
			}

			$this->selector = $selector;
			return $this;
		}

		/**
		 * Adds a css property with value to the css output.
		 *
		 * @access public
		 *
		 * @param  string $property - the css property.
		 * @param  string $value - the value to be placed with the property.
		 * @param  string $og_default - check to see if the value matches the default.
		 * @param  string $unit - the unit for the value (px).
		 * @return $this
		 */
		public function add_property( $property, $value, $og_default = false, $unit = false ) {
			// Add our unit to our value if it exists.
			if ( $unit && '' !== $unit ) {
				$value = $value . $unit;
				if ( '' !== $og_default ) {
					$og_default = $og_default . $unit;
				}
			}

			// If we don't have a value or our value is the same as our og default, bail.
			if ( empty( $value ) || $og_default === $value ) {
				return false;
			}

			$this->css .= $property . ':' . $value . ';';
			return $this;
		}

		/**
		 * Sets a media query in the class.
		 *
		 * @param  string $value Media query value.
		 * @return $this
		 */
		public function start_media_query( $value ) {
			// Add the current rules to the output.
			$this->add_selector_rules_to_output();

			// Add any previous media queries to the output.
			if ( ! empty( $this->media_query ) ) {
				$this->add_media_query_rules_to_output();
			}

			// Set the new media query.
			$this->media_query = $value;
			return $this;
		}

		/**
		 * Stops using a media query.
		 *
		 * @see    start_media_query()
		 *
		 * @return $this
		 */
		public function stop_media_query() {
			return $this->start_media_query( null );
		}

		/**
		 * Adds the current media query's rules to the class' output variable.
		 *
		 * @return $this
		 */
		private function add_media_query_rules_to_output() {
			if ( ! empty( $this->media_query_output ) ) {
				$this->output .= sprintf( '@media %1$s{%2$s}', $this->media_query, $this->media_query_output );

				// Reset the media query output string.
				$this->media_query_output = '';
			}

			return $this;
		}

		/**
		 * Adds the current selector rules to the output variable.
		 *
		 * @access private
		 *
		 * @return $this
		 */
		private function add_selector_rules_to_output() {
			if ( ! empty( $this->css ) ) {
				$this->selector_output = $this->selector;
				$selector_output       = sprintf( '%1$s{%2$s}', $this->selector_output, $this->css );

				// Add our CSS to the output.
				if ( ! empty( $this->media_query ) ) {
					$this->media_query_output .= $selector_output;
					$this->css                 = '';
				} else {
					$this->output .= $selector_output;
				}

				// Reset the css.
				$this->css = '';
			}

			return $this;
		}

		/**
		 * Returns the minified css in the $output variable.
		 *
		 * @access public
		 *
		 * @return string
		 */
		public function css_output() {
			// Add current selector's rules to output.
			$this->add_selector_rules_to_output();

			// Output minified css.
			return $this->output;
		}
	}
}
