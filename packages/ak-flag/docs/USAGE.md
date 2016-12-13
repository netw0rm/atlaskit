# Flag

Flags are used for confirmations, alerts, and acknowledgments that require minimal user interaction. They are event-driven messages that appear over screen content at the bottom left of the screen emerging from the navigation.

Multiple flags can be shown at the same time. The top-most flag is always visible, with remaining flags stacked vertically underneath.

## Try it out

Interact with a [live demo of the ak-flag component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-flag/@VERSION@/).

## Installation

```sh
npm install ak-flag
```

## Using the component

### HTML

The `ak-flag` package exports the `Flag` React component as the default export. A named `FlagGroup` export is also provided.

To ensure placement and correct animation, `Flag` components must always be placed inside a `FlagGroup`.

```js
import Flag, { FlagGroup } from 'ak-flag';
import { WarningIcon } from 'ak-icon';
ReactDOM.render((
  <FlagGroup>
    <Flag
      icon={
        <WarningIcon label="Warning" />
      }
      title="The Internet seems to be full"
      description="Somebody forgot to upgrade the storage on the information superhighway."
    />
  </FlagGroup>
), container);
```
