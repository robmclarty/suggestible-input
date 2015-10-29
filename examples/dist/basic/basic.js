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

	var suggestions = ['Toronto', 'Montreal', 'Vancouver', 'Ottawa', 'Edmonton', 'Calgary', 'Winnipeg', 'Halifax', 'St. John\'s', 'Quebec City', 'Fredericton', 'Charlottetown', 'Regina', 'Yellowknife', 'Iqaluit', 'Whitehorse', 'Victoria'];

	_reactDom2['default'].render(_react2['default'].createElement(_distSuggestibleInputJs2['default'], { suggestions: suggestions, placeholder: 'Find cities...' }), document.getElementById('example'));

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

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function fuzzysearch(e,t){var n=t.length,s=e.length;if(s>n)return!1;if(s===n)return e===t;e:for(var o=0,r=0;s>o;o++){for(var i=e.charCodeAt(o);n>r;)if(t.charCodeAt(r++)===i)continue e;return!1}return!0}function levenshtein(e,t){var n=[],s=void 0,o=void 0;return t.split("").forEach(function(r,i){e.split("").forEach(function(r,a){o=e.charAt(a-1)===t.charAt(i-1)?s:Math.min(n[a],n[a-1],s)+1,s=n[a],n[a]=o||0})}),n.pop()}function distance(e,t){if(null===e&&null===t)throw"Trying to compare two null values";if(null===e||null===t)return 0;e=String(e),t=String(t);var n=levenshtein(e,t);return e.length>t.length?1-n/e.length:1-n/t.length}function matches(e,t){return e?t.filter(function(t){return fuzzysearch(e.toLowerCase(),t.name.toLowerCase())}):[]}function distanceToQuery(e){return function(t){return{distance:distance(e.toLowerCase(),t.name.toLowerCase()),suggestion:t}}}function byDistance(e,t){return t.distance-e.distance}function suggestionStringsToObjects(e){var t=[];return e.forEach(function(e){t.push({name:e})}),t}Object.defineProperty(exports,"__esModule",{value:!0});var _react=__webpack_require__(1),_react2=_interopRequireDefault(_react),enterKeyCode=13,SuggestibleInput=_react2["default"].createClass({displayName:"SuggestibleInput",getInitialState:function(){return{suggestions:[],input:"",recentlyChoseSuggestion:!1}},propTypes:{suggestions:_react2["default"].PropTypes.array,value:_react2["default"].PropTypes.string,placeholder:_react2["default"].PropTypes.string,clearOnSelect:_react2["default"].PropTypes.bool,maxSuggestions:_react2["default"].PropTypes.number,onChoose:_react2["default"].PropTypes.func,onChange:_react2["default"].PropTypes.func,onKeyDown:_react2["default"].PropTypes.func},getDefaultProps:function(){return{suggestions:[],value:void 0,placeholder:"",maxSuggestions:10,clearOnSelect:!1}},shouldComponentUpdate:function(e,t){return""===e.value||e.value!==this.props.value||t.input!==this.state.input||t.recentlyChoseSuggestion!==this.state.recentlyChoseSuggestion},componentWillMount:function(){this.componentWillReceiveProps(this.props)},componentWillReceiveProps:function(e){var t=e.suggestions[0];t&&t.hasOwnProperty("name")&&this.setState({suggestions:e.suggestions}),t&&"string"==typeof t&&this.setState({suggestions:suggestionStringsToObjects(e.suggestions)}),void 0!==e.value&&this.setState({input:e.value})},onChange:function(e){var t=this.refs.inputField.value;this.setState({input:t,recentlyChoseSuggestion:!1}),this.props.onChange&&this.props.onChange(e)},onKeyDown:function(e){e.keyCode===enterKeyCode&&this.clearInput(),this.props.onKeyDown&&this.props.onKeyDown(e)},closeSuggestions:function(e){this.setState({recentlyChoseSuggestion:!0}),e.preventDefault()},clearInput:function(e){this.setState({input:"",recentlyChoseSuggestion:!0})},chooseSuggestion:function(e){var t=e.target.dataset.suggestion;e.preventDefault(),this.props.clearOnSelect?this.clearInput():this.setState({input:t,recentlyChoseSuggestion:!0}),this.props.onChoose&&this.props.onChoose(t)},clearIsDisabled:function(){return this.state.input?"":"disabled"},renderSuggestions:function(e){var t=this.chooseSuggestion;return matches(e,this.state.suggestions).map(distanceToQuery(e)).sort(byDistance).slice(0,this.props.maxSuggestions).map(function(e,n){var s=e.suggestion;return _react2["default"].createElement("li",{onClick:t,key:n,className:s["class"]?s["class"]:"","data-suggestion":s.name},s.name)})},render:function(){var e="";if(!this.state.recentlyChoseSuggestion){var t=this.renderSuggestions(this.state.input);t.length>0&&(e=_react2["default"].createElement("div",{className:"suggestible-input-suggestions"},_react2["default"].createElement("ul",null,t),_react2["default"].createElement("div",{onClick:this.closeSuggestions,className:"suggestible-input-bg"})))}return _react2["default"].createElement("div",{className:"suggestible-input"},_react2["default"].createElement("input",{type:"text",className:this.props.className,ref:"inputField",onChange:this.onChange,onKeyDown:this.onKeyDown,value:this.state.input,placeholder:this.props.placeholder}),_react2["default"].createElement("button",{className:"suggestible-input-clear "+this.clearIsDisabled(),onClick:this.clearInput}),e)}});exports["default"]=SuggestibleInput,module.exports=exports["default"];

/***/ }
/******/ ]);