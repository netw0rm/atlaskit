# Pfmention

The AkPage component wraps the whole page and should be the first child of the body. It contains slots for different layout styles and for the navigation component.

![Example avatars](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-page/docs/page.png)

##Try it out

Interact with a [live demo of the pfmention component](https://aui-cdn.atlassian.com/atlaskit/stories/pfmention/@VERSION@/).

Although the ak-page component can be used by itself, it works best in conjunction with the [ak-navigation](https://www.npmjs.com/package/ak-navigation) component.

## Installation

```sh
npm install ak-page
```

## Using the component

### HTML

The `ak-page` package exports the AkPage [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-page';
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
    <ak-page>
      <ak-navigation slot="navigation" />

      <div id="content">
        Page content goes here.
      </div>
    </ak-page>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import AkPage from 'ak-page';

const component = new AkPage();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import AkPage from 'ak-page';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(AkPage, {});

ReactDOM.render(<ReactComponent />, container);
```
