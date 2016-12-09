# ak-editor-jira


This component provides a WYSIWYG editor for JIRA. It's based on Atlassian Editor technology, but includes a JIRA specific
schema and user experience.

## Try it out

Interact with a [live demo of the ak-editor-jira component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-editor-jira/@VERSION@/).


## Installation

```sh
npm install ak-editor-jira
```

## Using the component

### HTML

The `ak-editor-jira` package exports the a [Skate](https://github.com/skatejs/skatejs) component. It automatically registers the respective `<ak-editor-jira>` web component upon import.

Import the component in your JS resource:

#### bundle.js

```javascript
import 'ak-editor-jira';
```

Now you can use the defined editor in your HTML markup:

#### index.html

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <!-- ... -->
    <ak-editor-jira default-value="&lt;h1&gt;&lt;a name=&quot;Here%27ssomething%21&quot;&gt;&lt;/a&gt;Here's something!&lt;/h1&gt;&lt;p&gt;&lt;b&gt;&lt;em&gt;Another thing.&lt;/em&gt;&lt;/b&gt;&lt;/p&gt;"></ak-editor-jira>
  </body>
</html>
```

You can also use it within another JS resource:

#### index.js
```javascript
import AkEditorJira from 'ak-editor-jira';

const editor = new AkEditorJira();
editor.defaultValue = `<h1><a name="Here%27ssomething%21"></a>Here's something!</h1><p><b><em>Another thing.</em></b></p>`;

document.body.appendChild(editor);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```javascript
import AkEditorJiraWebComponent from 'ak-editor-jira';
import reactify from 'skatejs-react-integration';

const AkEditorJira = reactify(AkEditorJiraWebComponent, {});

ReactDOM.render(<AkEditorJira
  defaultValue={`<h1><a name="Here%27ssomething%21"></a>Here's something!</h1><p><b><em>Another thing.</em></b></p>`}
  onChange={(e) => console.log(e.target.value)} />, container);
```
