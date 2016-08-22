# Tag

## Synopsis

This component displays as a tag with an optional link and/or button to remove the given tag.

## Setup and install

```
npm install ak-tag
```

## Using the component

### HTML

The `ak-tag` package exports the Tag [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```
import Tag from 'ak-tag';
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
  <ak-tag text="Jelly bean"></ak-tag>
</body>
```

or within another JS resource:

#### index.js
```javascript
const myTag = new Tag();
myTag.text = 'Jelly bean';

document.body.appendChild(myTag);
```

### React

```javascript
import Tag from 'ak-tag';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Tag, {});

ReactDOM.render(<ReactComponent text="Jelly bean" />, container);
```
