# Breadcrumbs

Breadcrumbs help users visualize their current location in relation to the rest of the website or application by showing the hierarchy of pages.

## Try it out

Interact with a [live demo of the ak-breadcrumbs component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-breadcrumbs/@VERSION@/).

## Installation

```sh
npm install ak-breadcrumbs
```

## Using the component

### React

This is a standard React component.

```js
import AkBreadcrumbs, { AkBreadcrumbsItem } from 'ak-breadcrumbs';

ReactDOM.render(
  <AkBreadcrumbs>
    <AkBreadcrumbsItem href="/home">Home</AkBreadcrumbsItem>
    <AkBreadcrumbsItem href="/home/item">Item</AkBreadcrumbsItem>
  </AkBreadcrumbs>,
  container
);
```
