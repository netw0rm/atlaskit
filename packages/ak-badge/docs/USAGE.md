# Badge

Badges are visual indicators for numeric values such as tallies and scores. They're commonly used before and after the label of the thing they're quantifying.
They must be used singly after a single item name, and have only numbers.

* Use lozenges for statuses.
* Use labels to call out tags and high-visibility attributes.
* Use a tooltip if you want to indicate units.



## Setup and install

```
npm install ak-badge
```

## Using the component

### HTML

The `ak-badge` package exports the AkBadge [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource as follows:

#### bundle.js

```
import AkBadge from 'ak-badge';
```

Now we can use the defined tag in our HTML markup. For example:

#### index.html

```
<html>
<head>
  <script src="bundle.js"></script>
</head>
<body>
  <!-- ... -->
  <ak-badge value="256" appearance="added"></ak-badge>
</body>
```

### React

```
import AkBadge from 'ak-badge';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(AkBadge, {});

ReactDOM.render(<ReactComponent />, container);
```
