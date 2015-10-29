/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _distSuggestibleInputJs = __webpack_require__(3);

	var _distSuggestibleInputJs2 = _interopRequireDefault(_distSuggestibleInputJs);

	// Example custom callback triggered when a suggestion is selected from the list.
	// The properties on the `suggestion` parameter are determined by the objects
	// which are constructed in the `suggestions` array. `name` and `class` are
	// built-in properties with special functionality, whereas `customProperty` is
	// a made-up property which has no special functionality. Custom properties may
	// be convenient when using a callback like this if some extra bit of data would
	// need to be accessed here, relative the the suggestion that was selected.
	function onChooseSuggestion(suggestion) {
	  if (suggestion.customProperty) {
	    console.log('Chosen suggestion: ' + suggestion.name + ', Custom Property: ' + suggestion.customProperty);
	  } else {
	    console.log('Chosen suggestion: ' + suggestion.name);
	  }
	}

	// This is an example of a "complex" set of suggestions which are constructed
	// as a series of objects, rather than simply strings (see "basic" example). An
	// array of plain strings would be the same as an array of objects which only
	// contain the `name` property. Beyond the name, a `class` can be defined, which
	// will be added to the <li> element within which the suggestion's name will be
	// rendered in the DOM in the drop-down list. Additionally, custom properties
	// may be added as necessary without affecting any of the underlying
	// functionality of the SuggestibleInput itself, but simply passed through
	// (e.g., to a callback).
	var suggestions = [{ name: 'Toronto', 'class': 'my-custom-class', customProperty: 'my-custom-property' }, { name: 'Montreal' }, { name: 'Vancouver' }, { name: 'Ottawa', 'class': 'my-custom-class' }, { name: 'Edmonton', 'class': 'my-custom-class' }, { name: 'Calgary', customProperty: 'my-custom-property' }, { name: 'Winnipeg' }, { name: 'Halifax' }, { name: 'St. John\'s' }, { name: 'Quebec City', 'class': 'my-custom-class', customProperty: 'my-custom-property' }, { name: 'Fredericton', customProperty: 'my-custom-property' }, { name: 'Charlottetown' }, { name: 'Regina' }, { name: 'Yellowknife' }, { name: 'Iqaluit', 'class': 'my-custom-class' }, { name: 'Whitehorse' }, { name: 'Victoria' }];

	_reactDom2['default'].render(_react2['default'].createElement(_distSuggestibleInputJs2['default'], {
	  suggestions: suggestions,
	  placeholder: 'Find cities...',
	  onChoose: onChooseSuggestion }), document.getElementById('example'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var enterKeyCode = 13;

	// Based on https://github.com/bevacqua/fuzzysearch
	// This algorithm could definitely be made more accurate and flexible.
	// Possibly consider full-text search like https://github.com/olivernn/lunr.js
	function fuzzysearch(needle, haystack) {
	  var hlen = haystack.length;
	  var nlen = needle.length;

	  if (nlen > hlen) {
	    return false;
	  }
	  if (nlen === hlen) {
	    return needle === haystack;
	  }

	  // `outer` is a label for the for loop referenced by continue. This is an
	  // optimization for the V8 interpreter. This is *not* a "good part" of JS.
	  // See Vyacheslav Egorov's graph: https://cloud.githubusercontent.com/assets/934293/6550014/d3a86174-c5fc-11e4-8334-b2e2b0d38fad.png.
	  /*eslint no-labels: 0*/
	  outer: for (var i = 0, j = 0; i < nlen; i++) {
	    var nch = needle.charCodeAt(i);

	    while (j < hlen) {
	      if (haystack.charCodeAt(j++) === nch) {
	        continue outer;
	      }
	    }

	    return false;
	  }

	  return true;
	}

	// Return the Levenstein distance between two given strings.
	// This is a modification based on https://gist.github.com/andrei-m/982927
	// What is the Levenstein distance? https://en.wikipedia.org/wiki/Levenshtein_distance
	function getEditDistance(a, b) {
	  var matrix = [];
	  var arrayA = a.split(''); // Convert string 'a' to an array of characters.
	  var arrayB = b.split(''); // Convert string 'b' to an array of characters.

	  if (arrayA.length === 0) {
	    return arrayB.length;
	  }
	  if (arrayB.length === 0) {
	    return arrayA.length;
	  }

	  // Increment along the first column of each row.
	  for (var i = 0; i <= arrayB.length; i += 1) {
	    matrix[i] = [i];
	  }

	  // Increment each column in the first row.
	  for (var j = 0; j <= arrayA.length; j += 1) {
	    matrix[0][j] = j;
	  }

	  arrayB.forEach(function (charB, i) {
	    arrayA.forEach(function (charA, j) {
	      if (charB === charA) {
	        matrix[i + 1][j + 1] = matrix[i][j];
	      } else {
	        matrix[i + 1][j + 1] = Math.min(matrix[i][j] + 1, // substitution
	        Math.min(matrix[i + 1][j] + 1, // insertion
	        matrix[i][j + 1] + 1 // deletion
	        ));
	      }
	    });
	  });

	  return matrix[arrayB.length][arrayA.length];
	}

	// Compare `query` to the values in the array of suggestions and return an array
	// of strings that contain `query` as a substring or partially matching substring.
	function matches(query, suggestions) {
	  if (query) {
	    return suggestions.filter(function (suggestion) {
	      return fuzzysearch(query.toLowerCase(), suggestion.name.toLowerCase());
	    });
	  } else {
	    return []; // if input is empty, return no results
	  }
	}

	// Map an array of strings to an array of objects that contain both the original
	// string along with an associated distance which is the levenshtein distance
	// between `query` and the string.
	//
	// This is an optimization so that the distance calculation is only ever done
	// once per string so that the byDistance() sorting coparator (below) doesn't
	// go crazy and lag the user's input.
	function distanceToQuery(query) {
	  return function (suggestion) {
	    return {
	      distance: getEditDistance(query.toLowerCase(), suggestion.name.toLowerCase()),
	      suggestion: suggestion
	    };
	  };
	}

	// Sort an array of objects created by distanceToQuery based on their distances.
	// Ordered from lowest to highest (i.e., the bigger the number, the further from
	// a match, the greater the distance, the string is).
	function byDistance(a, b) {
	  return a.distance - b.distance;
	}

	// Take an array of plain suggestion strings and return an array of those
	// strings in object format.
	function suggestionStringsToObjects(suggestionStrings) {
	  var suggestions = [];

	  suggestionStrings.forEach(function (suggestionString) {
	    suggestions.push({ name: suggestionString });
	  });

	  return suggestions;
	}

	/**
	 * A React component that quacks like an HTML <input> but which includes a
	 * selectable list of suggestions for filling in its value.
	 * @param {string[]|object[]} suggestions - An array of suggestions from which to
	 *   match user input. Can be either a set of plain strings, or a set of objects
	 *   which use the following object properties.
	 * @param {string} suggestions[].name - The name of the suggestion (same meaning
	 *   as a plain string value which is used instead of objects).
	 * @param {string} [suggestions[].class] - An optional class name which will be
	 *   added to the <li> element within which the suggestion name is rendered.
	 * @param {string} [value=undefined] - The initial/default value of the input.
	 * @param {string} [placeholder=""] - A string to display inside the <input> when it is empty.
	 * @param {boolean} [clearOnSelect=false] - If true, input value is set to ""
	 *   whenever a selection is made.
	 * @param {number} [maxSuggestions=10] - Maximum suggestions to display in dropdown.
	 * @callback {function} [onChoose] - Triggered when a selection is made.
	 * @callback {function} [onChange] - Triggered any time the value of the input changes.
	 * @callback {function} [onKeyDown] - Triggered by key presses inside input.
	 */
	var SuggestibleInput = _react2['default'].createClass({
	  displayName: 'SuggestibleInput',

	  // The initial state of the component.
	  // suggestions - An array of suggestion objects used throughout the components
	  //   (plain strings are converted to objects before being stored here). This
	  //   ensures that throughout the component, all suggestions can be assumed to be
	  //   objects with at least one property "name".
	  // input - The actual value of the input, can be updated through typing, or
	  //   selecting a suggestion.
	  // recentlyChoseSuggestion - A flag to determine if a suggestion was just
	  //   chosen, or not (helps optimize rendering).
	  getInitialState: function getInitialState() {
	    return {
	      suggestions: [],
	      input: '',
	      recentlyChoseSuggestion: false
	    };
	  },

	  propTypes: {
	    suggestions: _react2['default'].PropTypes.array,

	    value: _react2['default'].PropTypes.string,
	    placeholder: _react2['default'].PropTypes.string,
	    clearOnSelect: _react2['default'].PropTypes.bool,
	    maxSuggestions: _react2['default'].PropTypes.number,

	    onChoose: _react2['default'].PropTypes.func,
	    onChange: _react2['default'].PropTypes.func,
	    onKeyDown: _react2['default'].PropTypes.func
	  },

	  // Example suggestion object. The elements of the suggestions array can be
	  // either a set of objects (like the following), or plain strings.
	  // {
	  //   name: 'my suggestion',
	  //   class: 'suggestion-class',
	  //   customAttribute: 'could be a primitive or an object or an array'
	  // }
	  getDefaultProps: function getDefaultProps() {
	    return {
	      suggestions: [],
	      value: undefined, // If no value is defined, then don't set a value.
	      placeholder: '',
	      maxSuggestions: 10,
	      clearOnSelect: false
	    };
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return nextProps.value === '' || nextProps.value !== this.props.value || nextState.input !== this.state.input || nextState.recentlyChoseSuggestion !== this.state.recentlyChoseSuggestion;
	  },

	  componentWillMount: function componentWillMount() {
	    this.componentWillReceiveProps(this.props);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var firstSuggestion = nextProps.suggestions[0];

	    // If the first element of `suggestions` exists, and it is an object that has
	    // a property `name`, then simply store those objects in the state's suggestions.
	    if (firstSuggestion && firstSuggestion.hasOwnProperty('name')) {
	      this.setState({ suggestions: nextProps.suggestions });
	    }

	    // If the first element of `suggestions` exists, and it is a plain string,
	    // then convert those strings to objects before storing them in the state's
	    // suggestions array.
	    if (firstSuggestion && typeof firstSuggestion === 'string') {
	      this.setState({ suggestions: suggestionStringsToObjects(nextProps.suggestions) });
	    }

	    // If an explicit value is passed to the component, set `input` as the value.
	    if (nextProps.value !== undefined) {
	      this.setState({ input: nextProps.value });
	    }
	  },

	  // Whenever the text in the input changes, update the state's input and reset
	  // recentlyChoseSuggestion to false so that the suggestions show up again.
	  // Finally, if there was an onChange() callback passed in the props, call
	  // that at the end so that the parent can update as expected.
	  onChange: function onChange(e) {
	    var inputValue = this.refs.inputField.value;

	    this.setState({
	      input: inputValue,
	      recentlyChoseSuggestion: false
	    });

	    if (this.props.onChange) {
	      this.props.onChange(e);
	    }
	  },

	  // Simply call props.onKeyDown if it was defined, otherwise this component
	  // doesn't do anything onKeyDown itself.
	  onKeyDown: function onKeyDown(e) {
	    if (e.keyCode === enterKeyCode) {
	      this.clearInput();
	    }

	    if (this.props.onKeyDown) {
	      this.props.onKeyDown(e);
	    }
	  },

	  // When clicking outside the suggestion box area, force the component to
	  // behave *as if* a suggestion had recently been chosen (i.e., hide the
	  // suggestion drop-down selection).
	  closeSuggestions: function closeSuggestions(e) {
	    this.setState({ recentlyChoseSuggestion: true });
	    e.preventDefault();
	  },

	  clearInput: function clearInput(e) {
	    this.setState({
	      input: '',
	      recentlyChoseSuggestion: true
	    });
	  },

	  chooseSuggestion: function chooseSuggestion(e) {
	    var suggestion = JSON.parse(e.target.dataset.suggestion);

	    e.preventDefault();

	    if (this.props.clearOnSelect) {
	      this.clearInput();
	    } else {
	      this.setState({
	        input: suggestion.name,
	        recentlyChoseSuggestion: true
	      });
	    }

	    // If the caller has specified a callback for onChoose, call that after
	    // selecting a new suggestion, otherwise, focus on the input field with
	    // the newly populated suggestion.
	    if (this.props.onChoose) {
	      this.props.onChoose(suggestion);
	    }
	  },

	  // Show "x" for clearing search field only if it isn't currently blank.
	  clearIsDisabled: function clearIsDisabled() {
	    return this.state.input ? '' : 'disabled';
	  },

	  // Return an array of JSX elements based on any matches in this.props.suggestions to the value of input.
	  // Sort by simple heuristic: if input is closer to the beginning of the suggestion string
	  // (e.g., "Toronto" should be more relevant than "Victoria" for the input "tor").
	  renderSuggestions: function renderSuggestions(input) {
	    var clickHandler = this.chooseSuggestion;

	    return matches(input, this.state.suggestions).map(distanceToQuery(input)).sort(byDistance).slice(0, this.props.maxSuggestions).map(function (suggestionWithDistance, i) {
	      var suggestion = suggestionWithDistance.suggestion;

	      return _react2['default'].createElement(
	        'li',
	        {
	          onClick: clickHandler,
	          key: i,
	          className: suggestion['class'] ? suggestion['class'] : '',
	          'data-suggestion': JSON.stringify(suggestion) },
	        suggestion.name
	      );
	    });
	  },

	  render: function render() {
	    var suggestionsMarkup = '';

	    if (!this.state.recentlyChoseSuggestion) {
	      var suggestionsList = this.renderSuggestions(this.state.input);

	      if (suggestionsList.length > 0) {
	        suggestionsMarkup = _react2['default'].createElement(
	          'div',
	          { className: 'suggestible-input-suggestions' },
	          _react2['default'].createElement(
	            'ul',
	            null,
	            suggestionsList
	          ),
	          _react2['default'].createElement('div', {
	            onClick: this.closeSuggestions,
	            className: 'suggestible-input-bg' })
	        );
	      }
	    }

	    return _react2['default'].createElement(
	      'div',
	      { className: 'suggestible-input' },
	      _react2['default'].createElement('input', {
	        type: 'text',
	        className: this.props.className,
	        ref: 'inputField',
	        onChange: this.onChange,
	        onKeyDown: this.onKeyDown,
	        value: this.state.input,
	        placeholder: this.props.placeholder }),
	      _react2['default'].createElement('button', {
	        className: 'suggestible-input-clear ' + this.clearIsDisabled(),
	        onClick: this.clearInput }),
	      suggestionsMarkup
	    );
	  }
	});

	exports['default'] = SuggestibleInput;
	module.exports = exports['default'];

/***/ }
/******/ ]);