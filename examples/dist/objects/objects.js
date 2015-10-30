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

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function fuzzysearch(e,t){var n=t.length,s=e.length;if(s>n)return!1;if(s===n)return e===t;e:for(var r=0,o=0;s>r;r++){for(var a=e.charCodeAt(r);n>o;)if(t.charCodeAt(o++)===a)continue e;return!1}return!0}function getEditDistance(e,t){var n=[],s=e.split(""),r=t.split("");if(0===s.length)return r.length;if(0===r.length)return s.length;for(var o=0;o<=r.length;o+=1)n[o]=[o];for(var a=0;a<=s.length;a+=1)n[0][a]=a;return r.forEach(function(e,t){s.forEach(function(s,r){e===s?n[t+1][r+1]=n[t][r]:n[t+1][r+1]=Math.min(n[t][r]+1,Math.min(n[t+1][r]+1,n[t][r+1]+1))})}),n[r.length][s.length]}function matches(e,t){return e?t.filter(function(t){return fuzzysearch(e.toLowerCase(),t.name.toLowerCase())}):[]}function distanceToQuery(e){return function(t){return{distance:getEditDistance(e.toLowerCase(),t.name.toLowerCase()),suggestion:t}}}function byDistance(e,t){return e.distance-t.distance}function suggestionStringsToObjects(e){var t=[];return e.forEach(function(e){t.push({name:e})}),t}Object.defineProperty(exports,"__esModule",{value:!0});var _react=__webpack_require__(1),_react2=_interopRequireDefault(_react),enterKeyCode=13,SuggestibleInput=_react2["default"].createClass({displayName:"SuggestibleInput",getInitialState:function(){return{suggestions:[],input:"",recentlyChoseSuggestion:!1}},propTypes:{suggestions:_react2["default"].PropTypes.array,value:_react2["default"].PropTypes.string,placeholder:_react2["default"].PropTypes.string,clearOnSelect:_react2["default"].PropTypes.bool,maxSuggestions:_react2["default"].PropTypes.number,onChoose:_react2["default"].PropTypes.func,onChange:_react2["default"].PropTypes.func,onKeyDown:_react2["default"].PropTypes.func},getDefaultProps:function(){return{suggestions:[],value:void 0,placeholder:"",maxSuggestions:10,clearOnSelect:!1}},shouldComponentUpdate:function(e,t){return""===e.value||e.value!==this.props.value||t.input!==this.state.input||t.recentlyChoseSuggestion!==this.state.recentlyChoseSuggestion},componentWillMount:function(){this.componentWillReceiveProps(this.props)},componentWillReceiveProps:function(e){var t=e.suggestions[0];t&&t.hasOwnProperty("name")&&this.setState({suggestions:e.suggestions}),t&&"string"==typeof t&&this.setState({suggestions:suggestionStringsToObjects(e.suggestions)}),void 0!==e.value&&this.setState({input:e.value})},onChange:function(e){var t=this.refs.inputField.value;this.setState({input:t,recentlyChoseSuggestion:!1}),this.props.onChange&&this.props.onChange(e)},onKeyDown:function(e){e.keyCode===enterKeyCode&&this.clearInput(),this.props.onKeyDown&&this.props.onKeyDown(e)},closeSuggestions:function(e){this.setState({recentlyChoseSuggestion:!0}),e.preventDefault()},clearInput:function(e){this.setState({input:"",recentlyChoseSuggestion:!0}),e.preventDefault()},chooseSuggestion:function(e){var t=JSON.parse(e.target.dataset.suggestion);e.preventDefault(),this.props.clearOnSelect?this.clearInput():this.setState({input:t.name,recentlyChoseSuggestion:!0}),this.props.onChoose&&this.props.onChoose(t)},clearIsDisabled:function(){return this.state.input?"":"disabled"},renderSuggestions:function(e){var t=this.chooseSuggestion;return matches(e,this.state.suggestions).map(distanceToQuery(e)).sort(byDistance).slice(0,this.props.maxSuggestions).map(function(e,n){var s=e.suggestion;return _react2["default"].createElement("li",{onClick:t,key:n,className:s["class"]?s["class"]:"","data-suggestion":JSON.stringify(s)},s.name)})},render:function(){var e="";if(!this.state.recentlyChoseSuggestion){var t=this.renderSuggestions(this.state.input);t.length>0&&(e=_react2["default"].createElement("div",{className:"suggestible-input-suggestions"},_react2["default"].createElement("ul",null,t),_react2["default"].createElement("div",{onClick:this.closeSuggestions,className:"suggestible-input-bg"})))}return _react2["default"].createElement("div",{className:"suggestible-input"},_react2["default"].createElement("input",{type:"text",className:this.props.className,ref:"inputField",onChange:this.onChange,onKeyDown:this.onKeyDown,value:this.state.input,placeholder:this.props.placeholder}),_react2["default"].createElement("button",{className:"suggestible-input-clear "+this.clearIsDisabled(),onClick:this.clearInput}),e)}});exports["default"]=SuggestibleInput,module.exports=exports["default"];

/***/ }
/******/ ]);