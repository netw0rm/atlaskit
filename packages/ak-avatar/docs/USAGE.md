# Avatar

The Avatars represent users that are collaborating within the same application. You can use an avatar for projects, repositories and spaces within the Atlassian applications.

![Example avatars](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-avatar/docs/avatar.png)

## Try it out

Interact with a [live demo of the ak-avatar component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-avatar/@VERSION@/).

## Installation

```sh
npm install ak-avatar
```

## Using the component

### HTML

The `ak-avatar` package exports the Avatar [skate](https://github.com/skatejs/skatejs) component.

#### bundle.js

```javascript
import Avatar from 'ak-avatar';

const myAvatar = new Avatar();
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
  <ak-avatar></ak-avatar>
</body>
```
### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```
import AkAvatar from 'ak-avatar';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(AkAvatar, {});

ReactDOM.render(<ReactComponent />, container);
```
