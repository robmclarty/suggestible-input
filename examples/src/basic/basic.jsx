import React from 'react';
import SuggestibleInput from '../../../dist/suggestible-input.js';

let suggestions = [
  'Toronto',
  'Montreal',
  'Vancouver',
  'Ottawa',
  'Edmonton',
  'Calgary',
  'Winnipeg',
  'Halifax',
  'St. John',
  'Quebec'
];

React.render(
  <SuggestibleInput suggestions={suggestions} />,
  document.getElementById('example')
);
