# Pfmention

The pf-mention is the new shared mentions component. Use it to mention people or rooms.

![Example avatars](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/pf-mention/docs/pfmention.png)

##Try it out

Interact with a [live demo of the pfmention component](https://aui-cdn.atlassian.com/atlaskit/stories/pfmention/@VERSION@/).


## Installation

```sh
npm install pf-mention
```

## Using the component

### HTML

The `pf-mention` package exports the Pfmention [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'pf-mention';
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
