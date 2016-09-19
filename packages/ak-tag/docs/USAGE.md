# Tag


This component is displayed as a tag with an optional link and/or button to remove it.

![Example tags](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-tag/docs/overview.png)

Although the `ak-tag` component can be used by itself, it works best in conjunction with the
[`ak-tag-group`](https://www.npmjs.com/package/ak-tag-group) component.

## Try it out

Go to[the Storybook](https://aui-cdn.atlassian.com/atlaskit/stories/ak-tag/2.0.2/) to try for yourself.


## Setting up and installing

```sh
npm install ak-tag
```

## Using the component

### HTML

The `ak-tag` package exports the Tag [Skate](https://github.com/skatejs/skatejs) component. It automatically registers the respective `<ak-tag>` web component upon import.

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
    <script src="bundle.js"></script>
  </head>
  <body>
    <!-- ... -->
    <ak-tag text="Jelly bean"></ak-tag>
  </body>
</html>
```

You can also use it within another JS resource:

#### index.js
```javascript
import Tag from 'ak-tag';

const tag = new Tag();
tag.text = 'Jelly bean';

document.body.appendChild(tag);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```javascript
import Tag from 'ak-tag';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Tag, {});

ReactDOM.render(<ReactComponent text="Jelly bean" />, container);
```
