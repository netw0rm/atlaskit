# Comment

## Synopsis

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```
npm install ak-comment
```

## Using the component

### HTML

The `ak-comment` package exports the Comment [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```
import Comment from 'ak-comment';
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
  <ak-comment></ak-comment>
</body>
```

### React

```
import Comment from 'ak-comment';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Comment, {});

ReactDOM.render(<ReactComponent />, container);
```
