# Tabs

## Synopsis

Tabs are an easy way to view and switch between different views of similar content..

## Setup and install

```
npm install ak-tabs
```

## Using the component

### HTML

The `ak-tabs` package exports the Tabs [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:
 
#### bundle.js

```
import Tabs from 'ak-tabs';
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
  <ak-tabs>
    <ak-tabs-tab label="My first tab">
      <p>Hello world!</p>
    </ak-tabs-tab>
  </ak-tabs>
</body>
```

### React

```
import Tabs from 'ak-tabs';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Tabs, {});

ReactDOM.render(<ReactComponent />, container);
```
