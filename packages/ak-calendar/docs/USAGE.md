# Calendar

This is a template for AtlasKit components. Update this file with usage instructions and examples.


![Example tags](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-componentname/docs/insertyourimagehere.png)

##Try it out

Interact with a [live demo of the ak-calendar component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-calendar/@VERSION@/).

## Installation

```sh
npm install ak-calendar
```

## Using the component

### HTML

The `ak-calendar` package exports the Calendar [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-calendar';
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

You can also use it from within another JavaScript resource:

```js
import Calendar from 'ak-calendar';

const component = new Calendar();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import Calendar from 'ak-calendar';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Calendar, {});

ReactDOM.render(<ReactComponent />, container);
```
