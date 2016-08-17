# AkUtilComponentTemplate

## Synopsis

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```
npm install akutil-component-template
```

## Using the component

### HTML

The `akutil-component-template` package exports the AkUtilComponentTemplate [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```
import AkUtilComponentTemplate from 'akutil-component-template';
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
  <akutil-component-template></akutil-component-template>
</body>
```

### React

```
import AkUtilComponentTemplate from 'akutil-component-template';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(AkUtilComponentTemplate, {});

ReactDOM.render(<ReactComponent />, container);
```
