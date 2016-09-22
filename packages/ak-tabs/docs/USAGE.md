# Tabs

They're a simple graphical element that allow multiple panels to be contained within a single window and provide an easy way to switch between views of similar content.

![Example tags](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-tabs/docs/tabs.gif)

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
