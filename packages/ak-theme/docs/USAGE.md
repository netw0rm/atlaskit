# Theme

The `ak-theme` component allows you to define theme variables for components that can affect how they look and feel.

## Setup and install

```sh
npm install ak-theme
```

## Using the component

### HTML

The `ak-theme` package exports the Theme [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-theme';
```

Now we can use the defined tag in our HTML markup, e.g.:

#### index.html

```html
<html>
<head>
  <script src="bundle.js"></script>
</head>
<body>
  <!-- ... -->
  <ak-theme></ak-theme>
</body>
```

or from within another JavaScript resource:

```js
import Theme from 'ak-theme';

const component = new Theme();
document.body.appendChild(component);
```

### React

```js
import Theme from 'ak-theme';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Theme, {});

ReactDOM.render(<ReactComponent />, container);
```

## Theming components

Theming is a two-part process. You must both declare a theme as well as make a component able to be themed.

### Declaring a theme

To theme a component, declare a theme and specify some variables.

```html
<ak-theme id="my-component">
  <ak-theme-var name="background" value="blue" />
  <ak-theme-var name="text" value="white" />
</ak-theme>
```

This declares a theme for a component called `my-component` and will expose two variables:

1. `background`
2. `text`

### Making a themeable component

To make a component able to be themed, we use the `themeable()` function that is exported from `ak-theme`.

```js
import { define } from 'skatejs';
import { themeable } from 'ak-theme';

export default define('my-component', themeable({
  render(elem) {
    return (
      <style>
        background-color: {elem.themeVars.background}
      </style>
    );
  }
}));
```

By using `themeable()` does several things for you so that all you have to worry about is rendering your component based on some theme variables. It ensures:

1. `themeVars` are always populated with the corresponding theme's variables
2. `themeVars` is updated if the theme is updated
3. `themeVars` is updated if the component's theme is changed

### Setting a component's theme

By default, a themeable component's theme is a theme that has an `id` that matches its tag name. However, if you need to change the theme a component should have, you can set its `themeName` property. This property is also reflected, so you can use the `theme-name` attribute just the same.

This is handy when the display of a particular component may change when in the context of a different parent:

```html
<ak-button>My button</ak-button>
<ak-navigation>
  <ak-button theme-name="nav-button">Navigation button</ak-button>
</ak-navigatoin>
```
