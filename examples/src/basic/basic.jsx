import React from 'react';
import ReactDOM from 'react-dom';
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
  'St. John\'s',
  'Quebec City',
  'Fredericton',
  'Charlottetown',
  'Regina',
  'Yellowknife',
  'Iqaluit',
  'Whitehorse',
  'Victoria'
];

ReactDOM.render(
  <SuggestibleInput suggestions={suggestions} placeholder="Find cities..." />,
  document.getElementById('example')
);
