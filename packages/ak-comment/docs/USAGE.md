# Comment

## Synopsis

Comments enable a discussion on an entity such as a page, blog post, issue or pull request. Depending on the context, discussions can be between any combination of authors, contributors and readers.

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

```
import Comment from 'ak-comment';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Comment, {});

ReactDOM.render(<ReactComponent />, container);
```
