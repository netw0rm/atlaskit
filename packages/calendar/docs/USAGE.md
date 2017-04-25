# Calendar

The `@NAME@` component is a generic calendar that can be used standalone or together with a form field to make a datepicker.

![Example calendar](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/calendar/docs/calendar.gif)

## Try it out

Interact with a [live demo of the @NAME@ component with code examples](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

### HTML

The `@NAME@` package exports the a web component.

Import the component in your JS resource:

#### bundle.js

```js
import '@NAME@';
```

Now you can use the defined tag in your HTML markup:

#### index.html

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <!-- ... -->
    <ak-calendar></ak-calendar>
  </body>
</html>
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import Calendar from '@NAME@';

ReactDOM.render(<Calendar />, container);
```

## API

Any prop that takes multiple dates will expect the dates in `yyyy-mm-dd` without leading zeroes. Any prop that takes more than one date can be specified as an attribute as an array.

### `disabled`

Applies the disabled styles to the specified dates.

Default: `[]`.

*This doesn't not prevent the `select` event from being emitted.*

```html
<ak-calendar disabled="['1906-4-18', '1908-10-17']" />
```

### `focused`

A single number that tells the calendar which day is focused. If a screen reader is turned on, this will announce the date that is currently focused. It also applies the correct styles to indicate visually to the user which day is selected. If no focus should be applied, this should be `0`.

Default: `0`

```html
<ak-calendar focused="29" />
```

### `month`

Tells the calendar which month to display. The number is specified as the month number, not index. This is divergent to the JavaScript Date()` constructor which has 0-indexed months, but standard 1-indexed for the rest. This is to make the entire API consistent and intuitive.

Default: current month.

```html
<!-- December -->
<ak-calendar month="12" />
```

### `previouslySelected`

Tells the calendar which dates were last selected. This visually indicates to the user which dates were selected, but doesn't offer any additional behaviour.

Default: `[]`.

```html
<ak-calendar previously-selected="['1906-4-18', '1908-10-17']" />
```

### `selected`

The dates that should be selected.

Default: `[]`.

```html
<ak-calendar selected="['1906-4-18', '1908-10-17']" />
```

### `year`

Tells the calendar which month to display.

Default: current year.

```html
<!-- Displays the current month in 1984 -->
<ak-calendar year="1984" />
```
