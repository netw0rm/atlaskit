# Profilecard

![Example profilecard](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/pf-profilecard/docs/profilecard.png)

## Installation

```sh
npm install pf-profilecard
```

## Using the component

### HTML

The `pf-profilecard` package exports the ProfileCard [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'pf-profilecard';
```

Now you can use the defined tag in our HTML markup, e.g.:

#### index.html

```html
<html>
<head>
  <script src="bundle.js"></script>
</head>
<body>
  <!-- ... -->
  <pf-profilecard></pf-profilecard>
</body>
```

or from within another JavaScript resource:

```js
import ProfileCard from 'pf-profilecard';

const component = new ProfileCard();
document.body.appendChild(component);
```

### React

```js
import ProfileCard from 'pf-profilecard';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(ProfileCard, {});

ReactDOM.render(<ReactComponent />, container);
```
