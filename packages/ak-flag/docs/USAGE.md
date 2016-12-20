# Flag

Flags are used for confirmations, alerts, and acknowledgments that require minimal user interaction. They are event-driven messages that appear over screen content at the bottom left of the screen, emerging from the navigation.

Multiple flags can be shown at the same time. The top-most flag is always visible, with remaining flags stacked vertically underneath.

![ak-flag demo](https://i.imgur.com/bwe40hc.gif)

## Try it out

Interact with a [live demo of the ak-flag component with code examples](https://aui-cdn.atlassian.com/atlaskit/stories/ak-flag/@VERSION@/).

## Installation

```sh
npm install ak-flag
```

## Using the component

The `ak-flag` package exports the `Flag` React component as the default export. A named `FlagGroup` export is also provided.

To ensure correct Flag placement and animation, each `Flag` component must have a unique `id` prop. The same unique value can be used for the React `key` prop.

```js
import Flag, { FlagGroup } from 'ak-flag';
import { WarningIcon, SuccessIcon } from 'ak-icon';
ReactDOM.render((
  <FlagGroup>
    <Flag
      id="flag-1"
      key="flag-1"
      icon={
        <WarningIcon label="Warning" />
      }
      title="The Internet seems to be full"
      description="Somebody forgot to upgrade the storage on the information superhighway."
    />
    <Flag
      id="flag-2"
      key="flag-2"
      icon={
        <SuccessIcon label="Success" />
      }
      title="Calculation finished"
      description="It took a while, but the answer is 42."
    />
  </FlagGroup>
), container);
```
