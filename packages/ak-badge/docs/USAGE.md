# AkBadge

## Synopsis

Badges are visual indicators for numeric values such as tallies and other quantities. 

They are not used for anything other than integers. For statuses, use Lozenges. To call out tags or other high-visibility attributes, use Labels.
Badges are used before or, more commonly, after the name or label of the thing they quantify.
Use badges unambiguously – they should always be used singly, after a single item name.
Use tooltips to enhance user understanding – to indicate units, for example.
Badges are for counts, so should only contain numbers.

## Setup and install

```
npm install ak-badge
```

## Using the component

### HTML

The `ak-badge` package exports the AkBadge [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:
 
#### bundle.js

```
import AkBadge from 'ak-badge';
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
