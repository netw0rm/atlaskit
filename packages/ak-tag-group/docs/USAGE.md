# TagGroup

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```sh
npm install ak-tag-group
```

## Using the component

### HTML

The `ak-tag-group` package exports the TagGroup [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-tag-group';
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
  <ak-tag-group></ak-tag-group>
</body>
```

or from within another JavaScript resource:

```js
import TagGroup from 'ak-tag-group';

const component = new TagGroup();
document.body.appendChild(component);
```

### React

```js
import TagGroup from 'ak-tag-group';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(TagGroup, {});

ReactDOM.render(<ReactComponent />, container);
```
