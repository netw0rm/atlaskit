# @NAME@

This component provides a WYSIWYG editor for JIRA. It's based on Atlassian Editor technology, but includes a JIRA specific
schema and user experience.

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).


## Installation

```sh
npm install --save @NAME@
```

## Using the component

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```javascript
import AkEditorJiraWebComponent from '@NAME@';
import reactify from 'skatejs-react-integration';

const AkEditorJira = reactify(AkEditorJiraWebComponent, {});

ReactDOM.render(<AkEditorJira
  defaultValue={`<h1><a name="Here%27ssomething%21"></a>Here's something!</h1><p><b><em>Another thing.</em></b></p>`}
  onChange={(e) => console.log(e.target.value)} />, container);
```
