# Tag


This component is displayed as a accessible tag with an optional link and/or button to remove it.

![Example tags](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-tag/docs/overview.png)

Although the `ak-tag` component can be used by itself, it works best in conjunction with the
[`ak-tag-group`](https://www.npmjs.com/package/ak-tag-group) component.

## Try it out

Interact with a [live demo of the ak-tag component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-tag/@VERSION@/).


## Installation

```sh
npm install ak-tag --save
```

## Using the component

### HTML

The `ak-tag` package exports the Tag [React](https://facebook.github.io/react/) component.

Import the component in your JS resource:

#### bundle.js

```javascript
import 'ak-tag';
```

Now you can use the defined tag in your HTML markup:
#### index.html

```html
<html>
  <head>
    <script src="react.js"></script>
    <script src="react-dom.js"></script>
    <script src="bundle.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      ReactDOM.render(
        <Tag text="Jelly bean"/>,
        document.getElementById('root')
      );
    </script>
  </body>
</html>
```

You can also use it within another JS resource:

#### index.js
```javascript
import React, { PureComponent, PropTypes } from 'react';
import Tag from 'ak-tag';

export default class MyComponent extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render = () => (<div>
    <Tag href="http://atlassian.com/careers/"
         text="Atlassian"
         removeButtonText="Come join us !"
      />
  </div>)
}
```
