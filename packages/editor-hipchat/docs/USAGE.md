# @NAME@

This component provides a packaged version of the Atlassian Editor for use in HipChat.

It's specific to HipChat in that it:

- has a schema that's compatible with HipChat's current "supported content" (e.g. no bold / italic / images / etc)
- provides encoding and decoding to HipChat's storage format (at the time of writing it's a slight variant of ProseMirror's `.toJSON()`)

## Try it out

Interact with a [live demo of the @NAME@ component with code examples](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).


## Installation

Install from NPM:

```sh
npm install @NAME@
```

Two flavours of JavaScript are published:

- ES5 (referenced by the `main` field in `package.json`)
- ES2015 (referenced by the `jsnext:main` field in `package.json`)

If you're using webpack, adjust your [`resolve.packageMains`](https://webpack.github.io/docs/configuration.html#resolve-packagemains) accordingly.


## Usage

The editor is built as a React component that can be used directly in a JSX file.

**Example:**

```jsx
import React, { Component } from 'react';
import Editor from '@NAME@';

class Page extends Component {
  render() {
    return (
      <div>
        <Editor
          isExpandedByDefault
          onSave={this.handleSave}
        />
      </div>
    );
  }

  handleSave = (editor) => {
    alert(`Saved with HipChat storage object value: ${editor.value}`);
  }
}
```


## `Editor` API

```jsx
import Editor from '@NAME@';
```

### Props

#### `onSubmit?: (doc: Doc) => void`

A callback triggered when enter (without shift) is pressed. The callback is passed a JavaScript object
representing the document.

```typescript
export type Doc = {
  type: 'doc',
  content?: any[]
}
```

#### `errorReporter?: ErrorReportingHandler`

If you're using some error reporting service/tool in your product you can help Atlassian Editor track and store its own errors inside your error reporting service. Provide "errorReporter" property to the Editor component and describe "captureMessage" and "captureException" methods for this.

```typescript
// if you're using Sentry
import * as Raven from 'raven';

// this is optional, use it only for TS support
import { ErrorReportingHandler, ErrorReporterTags } from '@atlaskit/editor-core';

Raven
  .config(DSN_URI, { release: RELEASE_VERSION })
  .install();

class ErrorReporter implements ErrorReportingHandler {
  captureMessage(msg: string, tags?: ErrorReporterTags) {
    Raven.captureMessage(msg, { ...tags, module: 'editor' });
  }

  captureException(err: Error, tags?: ErrorReporterTags) {
    Raven.captureException(err, { ...tags, module: 'editor' });
  }
}

const errorReporter = new ErrorReporter();

export default (
  <Editor errorReporter={errorReporter}/>
);
```
