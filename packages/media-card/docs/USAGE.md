# MediaCard

Includes all media card related components like CardView, CardViewSmall, Card, etc.

![Example @NAME@](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/@NAME@/docs/screencast.gif)

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

**CardView**

```javascript
import {CardView} from '@atlaskit/media-card';

//Default
<CardView
  loading={false}
  selectable={false}
  selected={false}
  mediaName="some image"
  mediaType="image"
  mediaSize={32831}
  dataURI={tallImageDataUri}
  onClick={onClick}
/>
```
