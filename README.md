# Suggestible Input

A [React](http://facebook.github.io/react/index.html)
component that quacks like an HTML `<input>` but which includes a selectable list
of suggestions for filling in its value.

![screenshot](https://github.com/robmclarty/suggestible-input/raw/master/screenshot.png)

As you type text into the input field, a list of suggestions will be displayed
in a selectable overlay just below. The suggestions are an array of strings
given to the component as a prop and are compared to the ever-changing query
string that you are typing. The "closer" a suggestion is to what you have typed,
the higher in the list it will appear.

## Installation

The easiest way to use SuggestibleInput is to install it from NPM and include
it in your own React build process (e.g., using
[Browserify](http://browserify.org/) or [Webpack](http://webpack.github.io/))

`npm install suggestible-input --save`

## Usage

Use SuggestibleInput where you would use a regular `<input>` tag in your React
app.  It will behave as you would expect an `<input>` to behave with the added
bonus of giving users the ability to complete their text input from a list of
helpful suggestions.

### Basic

The simplest way of using it is to require it, and then render it by passing it
an array of strings (the suggestions). See the "basic" demo in the examples
folder.

```javascript
var SuggestibleInput = require('suggestible-input');

var suggestions = [
  'Toronto',
  'Montreal',
  'Ottawa',
  'Vancouver',
  'Edmonton',
  'Calgary'
];

<SuggestibleInput suggestions={suggestions} />
```

### Advanced

More advanced usage involves passing an array of objects into the component
(as opposed to plain strings). This allows you some additional control over the
suggestion list output such as assigning custom classes to particular
suggestions, as well as including extra data to pass along with the suggestion.

When defining suggestions as objects, each suggestion must contain a `name`
property. Optionally, you may pass a `class` property which is a simple string
value that will be passed into the `<li>` element's class which contains the
suggestion in the drop-down list (this can be one or more class names just as
you would define them in plain HTML). Finally, you may also add any additional,
custom, properties you like to the object. These properties can then be accessed
in the `onChoose()` callback so that you can associate custom data with each
suggestion.

The following example demonstrates how to construct an array of suggestions as
objects, as well as how to use some of the other props to customize how the
component is rendered. See the "objects" demo in the examples folder.

```javascript
var SuggestibleInput = require('suggestible-input');

var suggestions = [
  { name: 'Toronto', class: 'my-custom-class', customProperty: 'my-custom-property' },
  { name: 'Montreal' },
  { name: 'Vancouver' },
  { name: 'Ottawa', class: 'my-custom-class' },
  { name: 'Edmonton', class: 'my-custom-class' },
  { name: 'Calgary', customProperty: 'my-custom-property' }
];

<SuggestibleInput
  suggestions={suggestions}
  maxSuggestions={5}
  placeholder="Find canadian cities..."
  clearOnSelect={true} />
```

## Styling

You can style the component any way you like by simply implementing the following
CSS classes and elements.

Element | Description
------- | -----------
.suggestible-input | The outer container of the whole component.
.suggestible-input > input | The actual input element used for entering text.
.suggestible-input-clear | A button used to clear the value of the input. It has no content itself and is intended to be given a background-image for graphics.
.suggestible-input-suggestions | A container that wraps the list of suggestions + a background overlay.
.suggestible-input-suggestions > ul | The list of suggestions.
.suggestible-input-suggestions > ul > li | An individual suggestion in the list.
.suggestible-input-bg | A background overlay that can be used to block, or dim, anything underneath the component while the suggestions are being shown.

The basic HTML markup structure looks like this when it is output to the DOM:

```html
<div class="suggestible-input">
  <input type="text" />
  <button class="suggestible-input-clear"></button>
  <div class="suggestible-input-suggestions">
    <ul>
      <li>First Suggestion</li>
      <li>Second Suggestion</li>
      <li>Third Suggestion</li>
    </ul>
    <div class="suggestible-input-bg"></div>
  </div>
</div>
```

There are examples in `examples/dist/` that you can use as a starting point.

## How it works

A combination of filters get used to shorten the list of suggestions and sort
them based on a heuristic relevance.

1. Find a subset of suggestions that match what you've typed based on a simple
algorithm which finds suggestion strings that match your query string in terms
of containing the characters of the query string, in the order that they appear
(not necessarily in sequence).

2. Rank each suggestion in the subset based on how different it is from the
query string (that is, how many edits it would take to change the suggestion
into the query string).

3. Sort the subset list based on their rankings.

4. Cut off the list at the user-defined maximum (or 10, by default).

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
value | string | '' | Used to set the initial value of the input.
suggestions | array | [] | An array of strings/objects used as the source of the suggestions that are displayed.
maxSuggestions | number | 10 | The maximum number of suggestions to display at one time.
placeholder | string | '' | The value of the input's placeholder, shown when there is no value.
clearOnSelect | boolean | false | Whether or not to clear the input's value when selecting a suggestion.
onChange | function | null | Used to hook into onChange events of the input.
onKeyDown | function | null | Used to hook into onKeyDown events of the input.
onChoose | function | null | Used to hook into onChoose events when selecting a suggestion from the dropdown.

## Dependencies

React >= 0.14

## Acknowledgements

The initial pattern matching algorithm is based on [fuzzysearch](https://github.com/bevacqua/fuzzysearch).

The JS implementation of the Levenshtein algorithm is based on [this gist](https://gist.github.com/andrei-m/982927) by [andrei-m](https://gist.github.com/andrei-m).

The "x" icon used in the examples is from [ionicons](https://github.com/driftyco/ionicons).
