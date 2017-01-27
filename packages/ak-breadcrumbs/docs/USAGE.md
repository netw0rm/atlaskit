# Breadcrumbs

Breadcrumbs help users visualize their current location in relation to the rest of the website or application by showing the hierarchy of pages.

## Try it out

Interact with a [live demo of the @NAME@ component with code examples](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

### React

This is a standard React component.

```js
import AkBreadcrumbs, { AkBreadcrumbsItem } from '@NAME@';

ReactDOM.render(
  <AkBreadcrumbs>
    <AkBreadcrumbsItem href="/home" text="Home" />
    <AkBreadcrumbsItem href="/home/item" text="Item" />
  </AkBreadcrumbs>,
  container
);
```
