# Tabs

A tab is a simple graphical element that allows to contain multiple panels within a single window, and provides an easy way to switch between panels of similar content.

![Example tabs](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-tabs/docs/tabs.gif)

## Try it out

Interact with a [live demo of the ak-tabs component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-tabs/@VERSION@/).


## Installation

```sh
npm install ak-tabs
```

## Using the component

### HTML

The `ak-tabs` package exports the Tabs [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:
 
#### bundle.js

```javascript
import Tabs from 'ak-tabs';
```

Now you can use the defined tag in your HTML markup, for example:

#### index.html

```html
<html>
<head>
  <script src="bundle.js"></script>
</head>
<body>
  <!-- ... -->
  <ak-tabs>
    <ak-tabs-tab label="My first tab">
      <p>Hello world!</p>
    </ak-tabs-tab>
  </ak-tabs>
</body>
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```
import Tabs from 'ak-tabs';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Tabs, {});

ReactDOM.render(<ReactComponent />, container);
```
