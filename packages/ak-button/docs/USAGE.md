# Button

Buttons are used as triggers for actions. They are used in forms, toolbars, dialog footers and as stand-alone action triggers.

![Example buttons](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-button/docs/button_1.png)

![Example buttons](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-button/docs/button_2.png)

## Try it out

Interact with a [live demo of the ak-button component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-button/@VERSION@/).

## Installation

```sh
npm install ak-button
```

## Using the component

### HTML
This package exports the `ak-button` [skate](https://github.com/skatejs/skatejs) component.
Import the component in your JS resource:

#### bundle.js

```javascript
import AkButton from 'ak-button';
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
  <ak-button>testing</ak-button>
</body>
```

### Vanilla JS
It can be used as a Constructor:

```javascript
import AkButton from 'ak-button';
const myButton = new AkButton();
myButton.innerHTML = 'testing' // renders <ak-button>testing</ak-button>
document.body.appendChild(myButton) // Needed to be attached to the DOM to be rendered
```

Or nested inside skate elements. For example:

```js
import 'ak-button';
const { vdom, define } = skate;
const { element } = vdom;

const MyButton = define('my-elem', {
  render() {
    element('ak-button', () => {
      vdom.text('My Button');
    });
  }
});

document.body.appendChild(new MyButton())  // renders <ak-button>My Button</ak-button>
```
### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import AkButton from 'ak-button';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(AkButton, {});

ReactDOM.render(<ReactComponent />, container);
```
