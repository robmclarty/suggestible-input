'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const enterKeyCode = 13;

// Cut down the total number of suggestions to consider based on a heuristic
// which matches sequence of characters in needle to that in haystack, not
// necessarily all in one clump. For example, searching for "tor" would match
// both "Toronto" and "East York" (as "TORonto" and "easT yORk"). This is meant
// simply as a fast way to cut down the list to closely matched results which
// will subsequently be ranked for relevance without requiring the ranking
// algorithm to be executed on the total list.
// Based on https://github.com/bevacqua/fuzzysearch
function fuzzysearch(needle, haystack) {
  let hlen = haystack.length;
  let nlen = needle.length;

  if (nlen > hlen) {
    return false;
  }
  if (nlen === hlen) {
    return needle === haystack;
  }

  // "outer" is a label for the `for` loop referenced by `continue`. This is an
  // optimization for the V8 interpreter. This is *not* a "good part" of JS.
  // See Vyacheslav Egorov's graph: https://cloud.githubusercontent.com/assets/934293/6550014/d3a86174-c5fc-11e4-8334-b2e2b0d38fad.png.
  /*eslint no-labels: 0*/
  outer: for (let i = 0, j = 0; i < nlen; i++) {
    let nch = needle.charCodeAt(i);

    while (j < hlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }

    return false;
  }

  return true;
}

// Return the Levenstein/edit distance between two given strings. This distance
// is used to sort the list of suggestions from most closely matching the user's
// input query to least close as a means of giving the user the most relevant
// list of suggestions.
// This is a modification based on gist by @andrei-m https://gist.github.com/andrei-m/982927
// What is the Levenstein distance? https://en.wikipedia.org/wiki/Levenshtein_distance
function getEditDistance(a, b) {
  let matrix = [];
  let arrayA = a.split(''); // Convert string 'a' to an array of characters.
  let arrayB = b.split(''); // Convert string 'b' to an array of characters.

  if (arrayA.length === 0) {
    return arrayB.length;
  }
  if (arrayB.length === 0) {
    return arrayA.length;
  }

  // Increment along the first column of each row.
  for (let i = 0; i <= arrayB.length; i += 1) {
    matrix[i] = [i];
  }

  // Increment each column in the first row.
  for (let j = 0; j <= arrayA.length; j += 1) {
    matrix[0][j] = j;
  }

  arrayB.forEach((charB, i) => {
    arrayA.forEach((charA, j) => {
      if (charB === charA) {
        matrix[i + 1][j + 1] = matrix[i][j];
      } else {
        matrix[i + 1][j + 1] = Math.min(
          matrix[i][j] + 1, // substitution
          Math.min(
            matrix[i + 1][j] + 1, // insertion
            matrix[i][j + 1] + 1 // deletion
          )
        );
      }
    });
  });

  return matrix[arrayB.length][arrayA.length];
}

// Compare `query` to the values in the array of suggestions and return an array
// of strings that contain `query` as a substring or partially matching substring.
function matches(query, suggestions) {
  if (query) {
    return suggestions.filter((suggestion) => {
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
// once per string so that the byDistance() sorting comparator (below) doesn't
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
  let suggestions = [];

  suggestionStrings.forEach((suggestionString) => {
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
const SuggestibleInput = (props, context) => {
  const component = { ...React.Component.prototype }
  
  SuggestibleInput.displayName = 'SuggestibleInput'
  
  SuggestibleInput.propTypes = {
    suggestions: PropTypes.array,

    value: PropTypes.string,
    placeholder: PropTypes.string,
    clearOnSelect: PropTypes.bool,
    maxSuggestions: PropTypes.number,

    onChoose: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func
  }
  
  SuggestibleInput.defaultProps = {
    suggestions: [],
    value: undefined, // If no value is defined, then don't set a value.
    placeholder: '',
    maxSuggestions: 10,
    clearOnSelect: false
  }
  
  // The initial state of the component.
  // suggestions - An array of suggestion objects used throughout the components
  //   (plain strings are converted to objects before being stored here). This
  //   ensures that throughout the component, all suggestions can be assumed to be
  //   objects with at least one property "name".
  // input - The actual value of the input, can be updated through typing, or
  //   selecting a suggestion.
  // recentlyChoseSuggestion - A flag to determine if a suggestion was just
  //   chosen, or not (helps optimize rendering).
  const initialState = {
    suggestions: [],
    input: '',
    recentlyChoseSuggestion: false
  }

  const shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.value === '' ||
      nextProps.value !== component.props.value ||
      nextState.input !== component.state.input ||
      nextState.recentlyChoseSuggestion !== component.state.recentlyChoseSuggestion;
  }

  const componentWillMount = () => {
    component.componentWillReceiveProps(component.props);
  }

  const componentWillReceiveProps = nextProps => {
    let firstSuggestion = nextProps.suggestions[0];

    // If the first element of `suggestions` exists, and it is an object that has
    // a property `name`, then simply store those objects in the state's suggestions.
    if (firstSuggestion && firstSuggestion.hasOwnProperty('name')) {
      component.setState({ suggestions: nextProps.suggestions });
    }

    // If the first element of `suggestions` exists, and it is a plain string,
    // then convert those strings to objects before storing them in the state's
    // suggestions array.
    if (firstSuggestion && typeof firstSuggestion === 'string') {
      component.setState({ suggestions: suggestionStringsToObjects(nextProps.suggestions) });
    }

    // If an explicit value is passed to the component, set `input` as the value.
    if (nextProps.value !== undefined) {
      component.setState({ input: nextProps.value });
    }
  }

  // Whenever the text in the input changes, update the state's input and reset
  // recentlyChoseSuggestion to false so that the suggestions show up again.
  // Finally, if there was an onChange() callback passed in the props, call
  // that at the end so that the parent can update as expected.
  const onChange = e => {
    let inputValue = component.refs.inputField.value;

    component.setState({
      input: inputValue,
      recentlyChoseSuggestion: false
    });

    if (component.props.onChange) {
      component.props.onChange(e);
    }
  }

  // Simply call props.onKeyDown if it was defined, otherwise this component
  // doesn't do anything onKeyDown itself.
  const onKeyDown = e => {
    if (e.keyCode === enterKeyCode) {
      component.clearInput();
    }

    if (component.props.onKeyDown) {
      component.props.onKeyDown(e);
    }
  }

  // When clicking outside the suggestion box area, force the component to
  // behave *as if* a suggestion had recently been chosen (i.e., hide the
  // suggestion drop-down selection).
  const closeSuggestions = e => {
    component.setState({ recentlyChoseSuggestion: true });
    e.preventDefault();
  }

  const clearInput = e => {
    component.setState({
      input: '',
      recentlyChoseSuggestion: true
    });
    e.preventDefault();
  }

  const chooseSuggestion = e => {
    let suggestion = JSON.parse(e.target.dataset.suggestion);

    e.preventDefault();

    if (component.props.clearOnSelect) {
      component.clearInput();
    } else {
      component.setState({
        input: suggestion.name,
        recentlyChoseSuggestion: true
      });
    }

    // If the caller has specified a callback for onChoose, call that after
    // selecting a new suggestion, otherwise, focus on the input field with
    // the newly populated suggestion.
    if (component.props.onChoose) {
      component.props.onChoose(suggestion);
    }
  }

  // Show close-button for clearing search field only if it isn't currently blank.
  const clearIsDisabled = () => {
    return component.state.input ? '' : 'disabled';
  }

  // Return an array of JSX elements based on any matches in component.props.suggestions to the value of input.
  // Sort by simple heuristic: if input is closer to the beginning of the suggestion string
  // (e.g., "Toronto" should be more relevant than "Victoria" for the input "tor").
  const renderSuggestions = input => {
    let clickHandler = component.chooseSuggestion;

    return matches(input, component.state.suggestions)
      .map(distanceToQuery(input))
      .sort(byDistance)
      .slice(0, component.props.maxSuggestions)
      .map((suggestionWithDistance, i) => {
        let suggestion = suggestionWithDistance.suggestion;

        return (
          <li
            onClick={clickHandler}
            key={i}
            className={suggestion.class ? suggestion.class : ''}
            data-suggestion={JSON.stringify(suggestion)}>
            {suggestion.name}
          </li>
        );
      });
  }

  const render = () => {
    let suggestionsMarkup = '';

    if (!component.state.recentlyChoseSuggestion) {
      let suggestionsList = component.renderSuggestions(component.state.input);

      if (suggestionsList.length > 0) {
        suggestionsMarkup = (
          <div className="suggestible-input-suggestions">
            <ul>
              {suggestionsList}
            </ul>
            <div
              onClick={component.closeSuggestions}
              className="suggestible-input-bg"></div>
          </div>
        );
      }
    }

    return (
      <div className="suggestible-input">
        <input
          type="text"
          className={component.props.className}
          ref='inputField'
          onChange={component.onChange}
          onKeyDown={component.onKeyDown}
          value={component.state.input}
          placeholder={component.props.placeholder} />
        <button
          className={`suggestible-input-clear ${component.clearIsDisabled()}`}
          onClick={component.clearInput}></button>
        {suggestionsMarkup}
      </div>
    );
  }
  
  return Object.assign(component, {
    props,
    context,
    state: initialState,
    shouldComponentUpdate,
    componentWillMount,
    componentWillReceiveProps,
    onChange,
    onKeyDown,
    closeSuggestions,
    clearIsDisabled,
    renderSuggestions,
    render
  })
}

export default SuggestibleInput;
