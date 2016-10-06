# Theme

The `ak-theme` component allows you to define theme variables for components that can affect how they look and feel.

![Example theme](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-theme/docs/theme.png)

## Try it out

Interact with a [live demo of the ak-theme component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-theme/@VERSION@/).

## Installation

```sh
npm install ak-theme
```

## Using the component

### HTML

The `ak-theme` package exports the Theme [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```javascript
import 'ak-theme';
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

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import Theme from 'ak-theme';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Theme, {});

ReactDOM.render(<ReactComponent />, container);
```

## Theming components

Theming is a two-part process: 

1.  Declaring a theme.

2.  Make a component themeable.

### How to declare a theme

If you want to theme a component, declare a theme and specify some variables:

```html
<ak-theme id="my-component">
  <ak-theme-var name="background" value="blue" />
  <ak-theme-var name="text" value="white" />
</ak-theme>
```

This example declares a theme for a component called `my-component` and exposes two variables:

1. `background`
2. `text`

### How to make a themeable component

To make a component able to be themed, use the `themeable()` function that is exported from `ak-theme`.

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

The function `themeable()` does several things for you:

1. `themeVars` are always populated with the corresponding theme's variables.
2. `themeVars` is updated if the theme is updated.
3. `themeVars` is updated if the component's theme is changed.

When using `themeable()` you only have to worry about rendering your component based on some theme variables.

### How to set a component's theme

A themeable component's theme is a theme that has an `id` that matches its tag name. However, if you need to change the theme a component should have, you can set its `themeName` property. This property is also reflected, so you can use the `theme-name` attribute just the same.

This is handy when the display of a particular component may changes depending on the parent's context.

```html
<ak-button>My button</ak-button>
<ak-navigation>
  <ak-button theme-name="nav-button">Navigation button</ak-button>
</ak-navigatoin>
```
