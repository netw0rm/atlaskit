# Lozenge

Use lozenges to highlight an item's status for quick recognition. Lozenges can be emphasised and can use color to help convey meanings that users can learn and recognize across our products. Use subtle lozenges by default and in instances where they may dominate the screen, such as in long tables.

![Example lozenge](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-lozenge/docs/standard_lozenge.png)

![Example lozenge](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-lozenge/docs/bold_lozenge.png)


## Try it out

Interact with a [live demo of the ak-lozenge component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-lozenge/@VERSION@/).

## Installation

```sh
npm install ak-lozenge
```

## Using the component

### HTML

The `ak-lozenge` package exports the Lozenge [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-lozenge';
```

Now you can use the defined tag in your HTML markup, for example
#### index.html

```html
<html>
<head>
  <script src="bundle.js"></script>
</head>
<body>
  <!-- ... -->
  <ak-lozenge appearance="moved" bold>Moved</ak-lozenge>
</body>
```

or from within another JavaScript resource:

```js
import Lozenge from 'ak-lozenge';

const component = new Lozenge();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import Lozenge from 'ak-lozenge';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Lozenge, {});

ReactDOM.render(<ReactComponent />, container);
```
