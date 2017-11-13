# Progress Tracker

## Progress Tracker

The progress tracker is a visual indicators used when stepping a user through a
journey, to allow them to keep track of their progress.

It allows the user to view steps in the journey and to step back to previous steps.

It is usually used for the focus task pattern.

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Custom Link Components

You can pass your own component through to replace the default link component.
Your component must take in stage as a prop.

Example:

```
import React, { PureComponent } from 'react';
import { colors } from '@atlaskit/theme';
import styled from 'styled-components';
import type { Stage } from '../types';

const ProgressTrackerLink = styled.a`
    cursor: pointer;
    color: ${colors.N800};
`;

type Props = {
  /** stage data passed to each `ProgressTrackerStage` component */
  stage: Stage,
};

export default class CustomProgressTrackerLink extends PureComponent {
  props: Props;

  render() {
    const {
        href,
        onClick,
        label,
    } = this.props.stage;
    return (
      <ProgressTrackerLink href={href} onClick={onClick}>
        {label}
      </ProgressTrackerLink>
    );
  }
}
```
