# Comment

Comments enable discussions on an entity such as a page, blog post, issue or pull request. Depending on the context, discussions can be between any combination of authors, contributors and readers.

![Example avatars](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-comment/docs/comment.png)

## Try it out

Interact with a [live demo of the ak-comment component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-comment/@VERSION@/).

## Installation

```
npm install ak-comment
```

## Using the component

### HTML

The `ak-comment` package exports the Comment [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```javascript
import Comment from 'ak-comment';
```

Now you can use the defined tag in your HTML markup:

#### index.html

```
<html>
<head>
  <script src="bundle.js"></script>
</head>
<body>
  <!-- ... -->
  <ak-comment>
    <ak-avatar slot="avatar" src="..." label="Charlie Smith"></ak-avatar>
    <a slot="author" href="...">Charlie Smith</a>
    <time slot="time" datetime="2016-09-20T19:00">5 minutes ago</time>
    <ak-button-group slot="actions">...</ak-button-group>
    <p>Hello world!</p>
    <p>This is my first ak-comment.</p>
    <ak-comment-group slot="reply">
      <ak-comment>...</ak-comment>
      <ak-comment>...</ak-comment>
      <ak-comment>...</ak-comment>
    </ak-comment-group>
  </ak-comment>
</body>
```

### React
This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).


```
import Comment from 'ak-comment';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Comment, {});

ReactDOM.render(<ReactComponent />, container);
```
