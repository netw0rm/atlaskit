# Badge

Badges are visual indicators for numeric values such as tallies and scores. They're commonly used before and after the label of the thing they're quantifying.
They must be used singly after a single item name, and have only numbers.

* Use lozenges for statuses.
* Use labels to call out tags and high-visibility attributes.
* Use a tooltip if you want to indicate units.

![Example badge](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-badge/docs/badge.png)

## Try it out

Interact with a [live demo of the ak-badge component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-badge/@VERSION@/).

## Installation

```sh
npm install ak-badge
```

## Using the component

### HTML

The `ak-badge` package exports the AkBadge [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource as follows:

#### bundle.js

```javascript
import AkBadge from 'ak-badge';
```

Now we can use the defined tag in our HTML markup:

#### index.html

```html
<html>
<head>
  <script src="bundle.js"></script>
</head>
<body>
  <!-- ... -->
  <ak-badge value="256" appearance="added"></ak-badge>
</body>
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```
import AkBadge from 'ak-badge';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(AkBadge, {});

ReactDOM.render(<ReactComponent />, container);
```
