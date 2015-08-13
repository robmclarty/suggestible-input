var React = require('react');
var SuggestibleInput = require('../dist/suggestible-input.js');

var suggestions = [
  'Lorem Ipsum',
  'Sit Amet',
  'Dolor Consectetur',
  'Dipiscing Amet',
  'Lorem Ipsum',
  'Sit Amet',
  'Dolor Consectetur',
  'Dipiscing Amet'
];

React.render(
  React.createElement(SuggestibleInput, {
    suggestions: suggestions,
    className: 'search-input',
    placeholder: 'Search for numbers'
  }),
  document.getElementById('example')
);
