# Blanket

The main purpose of the blanket component is to provide the overlay layer for components such as a modal dialog or a tooltip.

![Example blanket](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-blanket/docs/blanket.gif)

## Try it out

Interact with a [live demo of the ak-blanket component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-blanket/@VERSION@/).

## Installation

```sh
npm install ak-blanket
```

## Using the component

Import the component in your React app as follows:

```js
import Blanket from 'ak-blanket';
ReactDOM.render(<Blanket />, container);
```

There is an `onBlanketClicked` function prop, which is useful for hiding the blanket when the user clicks it.

No custom z-index style is applied, so make sure you put it into an appropriate DOM position.

For the purpose of simplicity blanket doesn't have any `show/hide` functionality. Since the main use of it suppose to be inside `popup` elements it would appear/disappear with the parent element.
