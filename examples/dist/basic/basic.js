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

	var _distSuggestibleInputJs = __webpack_require__(2);

	var _distSuggestibleInputJs2 = _interopRequireDefault(_distSuggestibleInputJs);

	var suggestions = ['Toronto', 'Montreal', 'Vancouver', 'Ottawa', 'Edmonton', 'Calgary', 'Winnipeg', 'Halifax', 'St. John\'s', 'Quebec City', 'Fredericton', 'Charlottetown', 'Regina', 'Yellowknife', 'Iqaluit', 'Whitehorse', 'Victoria'];

	_react2['default'].render(_react2['default'].createElement(_distSuggestibleInputJs2['default'], { suggestions: suggestions, placeholder: 'Find cities...' }), document.getElementById('example'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
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

	  // "outer" is a label for the for loop referenced by continue. This is an
	  // optimization for the V8 interpreter (see Vyacheslav Egorov's graph:
	  // https://cloud.githubusercontent.com/assets/934293/6550014/d3a86174-c5fc-11e4-8334-b2e2b0d38fad.png).
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

	// https://en.wikipedia.org/wiki/Levenshtein_distance
	// This is a modification based on https://github.com/Glench/fuzzyset.js
	function levenshtein(str1, str2) {
	  var current = [];
	  var prev = undefined;
	  var value = undefined;

	  str2.split('').forEach(function (str2Char, i) {
	    str1.split('').forEach(function (str1Char, j) {
	      if (str1.charAt(j - 1) === str2.charAt(i - 1)) {
	        value = prev;
	      } else {
	        value = Math.min(current[j], current[j - 1], prev) + 1;
	      }

	      prev = current[j];
	      current[j] = value || 0;
	    });
	  });

	  return current.pop();
	}

	// Return an edit distance from 0 to 1 between str1 and str2.
	function distance(str1, str2) {
	  if (str1 === null && str2 === null) {
	    throw 'Trying to compare two null values';
	  }
	  if (str1 === null || str2 === null) {
	    return 0;
	  }

	  str1 = String(str1);
	  str2 = String(str2);

	  var d = levenshtein(str1, str2);

	  if (str1.length > str2.length) {
	    return 1 - d / str1.length;
	  } else {
	    return 1 - d / str2.length;
	  }
	}

	// Compare `query` to the values in the array of suggestions and return an array
	// of strings that contain `query` as a substring or partially matching substring.
	function matches(query, suggestions) {
	  if (query) {
	    return suggestions.filter(function (suggestion) {
	      return fuzzysearch(query.toLowerCase(), suggestion.toLowerCase());
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
	      distance: distance(query.toLowerCase(), suggestion.toLowerCase()),
	      value: suggestion
	    };
	  };
	}

	// Sort an array of objects created by distanceToQuery based on their distances.
	function byDistance(a, b) {
	  if (a.distance < b.distance) {
	    return 1;
	  }
	  if (a.distance > b.distance) {
	    return -1;
	  }

	  return 0;
	}

	var SuggestibleInput = _react2['default'].createClass({
	  displayName: 'SuggestibleInput',

	  getInitialState: function getInitialState() {
	    return {
	      input: '',
	      recentlyChoseSuggestion: false
	    };
	  },

	  propTypes: {
	    suggestions: _react2['default'].PropTypes.array,
	    maxSuggestions: _react2['default'].PropTypes.number,
	    onChange: _react2['default'].PropTypes.func,
	    value: _react2['default'].PropTypes.string,
	    placeholder: _react2['default'].PropTypes.string,
	    clearOnSelect: _react2['default'].PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      suggestions: [],
	      maxSuggestions: 10,
	      value: undefined, // If no value is defined, then don't set a value.
	      placeholder: '',
	      clearOnSelect: false
	    };
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return nextProps.value === '' || nextProps.value !== this.props.value || nextState.input !== this.state.input || nextState.recentlyChoseSuggestion !== this.state.recentlyChoseSuggestion;
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.value !== undefined) {
	      this.setState({
	        input: nextProps.value
	      });
	    }
	  },

	  // Whenever the text in the input changes, update the state's input and reset
	  // recentlyChoseSuggestion to false so that the suggestions show up again.
	  // Finally, if there was an onChange() callback passed in the props, call
	  // that at the end so that the parent can update as expected.
	  onChange: function onChange(e) {
	    var inputValue = this.refs.inputField.getDOMNode().value;

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
	    e.preventDefault();

	    this.setState({
	      recentlyChoseSuggestion: true
	    });
	  },

	  clearInput: function clearInput(e) {
	    this.setState({
	      input: '',
	      recentlyChoseSuggestion: true
	    });
	  },

	  chooseSuggestion: function chooseSuggestion(e) {
	    e.preventDefault();

	    var suggestion = e.target.dataset.suggestion;

	    if (this.props.clearOnSelect) {
	      this.clearInput();
	    } else {
	      this.setState({
	        input: suggestion,
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

	  // Return an array of JSX elements based on any matches in
	  // this.props.suggestions to the value of input.
	  // Sort by simple heuristic: if input is closer to the beginning of the suggestion string
	  // (e.g., "Toronto" should be more relevant than "Victoria" for the input "tor").
	  renderSuggestions: function renderSuggestions(input) {
	    var clickHandler = this.chooseSuggestion;

	    console.log(matches(input, this.props.suggestions).map(distanceToQuery(input)).sort(byDistance));

	    return matches(input, this.props.suggestions).map(distanceToQuery(input)).sort(byDistance).slice(0, this.props.maxSuggestions).map(function (suggestion, i) {
	      return _react2['default'].createElement(
	        'li',
	        {
	          onClick: clickHandler,
	          key: i,
	          'data-suggestion': suggestion.value },
	        suggestion.value
	      );
	    });
	  },

	  render: function render() {
	    var suggestionsHtml = '';

	    if (!this.state.recentlyChoseSuggestion) {
	      var suggestionsList = this.renderSuggestions(this.state.input);

	      if (suggestionsList.length > 0) {
	        suggestionsHtml = _react2['default'].createElement(
	          'div',
	          null,
	          _react2['default'].createElement(
	            'ul',
	            { className: 'suggestible-input-suggestions' },
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
	      _react2['default'].createElement('br', null),
	      suggestionsHtml
	    );
	  }
	});

	exports['default'] = SuggestibleInput;
	module.exports = exports['default'];

/***/ }
/******/ ]);