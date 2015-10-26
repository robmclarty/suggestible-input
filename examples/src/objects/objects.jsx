import React from 'react';
import ReactDOM from 'react-dom';
import SuggestibleInput from '../../../dist/suggestible-input.js';

// Example custom callback triggered when a suggestion is selected from the list.
// The properties on the `suggestion` parameter are determined by the objects
// which are constructed in the `suggestions` array. `name` and `class` are
// built-in properties with special functionality, whereas `customProperty` is
// a made-up property which has no special functionality. Custom properties may
// be convenient when using a callback like this if some extra bit of data would
// need to be accessed here, relative the the suggestion that was selected.
function onChooseSuggestion(suggestion) {
  if (suggestion.customProperty) {
    console.log(`Chose suggestion with custom property: ${suggestion.name} - ${suggestion.customProperty}`);
  } else {
    console.log(`Chosen suggestion: ${suggestion.name}`);
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
let suggestions = [
  { name: 'Toronto', class: 'my-custom-class', customProperty: 'my-custom-property' },
  { name: 'Montreal' },
  { name: 'Vancouver' },
  { name: 'Ottawa', class: 'my-custom-class' },
  { name: 'Edmonton', class: 'my-custom-class' },
  { name: 'Calgary', customProperty: 'my-custom-property' },
  { name: 'Winnipeg' },
  { name: 'Halifax' },
  { name: 'St. John\'s' },
  { name: 'Quebec City', class: 'my-custom-class', customProperty: 'my-custom-property' },
  { name: 'Fredericton', customProperty: 'my-custom-property' },
  { name: 'Charlottetown' },
  { name: 'Regina' },
  { name: 'Yellowknife' },
  { name: 'Iqaluit', class: 'my-custom-class' },
  { name: 'Whitehorse' },
  { name: 'Victoria }'
];

ReactDOM.render(
  <SuggestibleInput
    suggestions={suggestions}
    placeholder="Find cities..."
    onChoose={onChooseSuggestion} />,
  document.getElementById('example')
);
