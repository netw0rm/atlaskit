import React, { PureComponent } from 'react';
import { ProgressTrackerLink } from '../styled/ProgressTrackerLink';
import type { Stage } from '../types';

type Props = {
  /** stage data passed to each `ProgressTrackerStage` component */
  stage: Stage,
};

export default class DefaultProgressTrackerLink extends PureComponent {
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
