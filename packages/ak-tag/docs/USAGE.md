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

```
<html>
<head>
  <script src="bundle.js"></script>
</head>
<body>
  <!-- ... -->
  <ak-tag text="watersports"></ak-tag>
</body>
```

### React

```
import Tag from 'ak-tag';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Tag, {});

ReactDOM.render(<ReactComponent text="watersports" />, container);
```
