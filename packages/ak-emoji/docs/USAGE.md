# Emoji

Use emoji....

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

Import the component in your React app as follows:

```js
import EmojiPicker from 'ak-emoji';
ReactDOM.render(<EmojiPicker />, container);
```

## Storybook

The storybook includes a set of stories for running against a live server. See ```ak-emoji/external-emoji```.

You can specify the URL's manually in the textbook on the story (one url per line), or specify it when running story
book (comma separated). For example:

```export STORYBOOK_EMOJI_URL=https://demo/emoji/standard,https://demo/emoji/vendor npm run storybook/single ak-emoji```
