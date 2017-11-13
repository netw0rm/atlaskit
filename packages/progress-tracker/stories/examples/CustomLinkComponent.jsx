import React, { PureComponent } from 'react';
import ProgressTracker from '../../src/components/ProgressTracker';
import styled from 'styled-components';
import type { Stage } from '../../src/types';

const stages = [
  {
    id: 'disabled-1',
    label: 'Disabled Step',
    percentageComplete: 100,
    status: 'disabled',
  },
  {
    id: 'visited-1',
    label: 'Visited Step',
    percentageComplete: 100,
    status: 'visited',
    href: '#',
  },
  {
    id: 'current-1',
    label: 'Current Step',
    percentageComplete: 0,
    status: 'current',
  },
  {
    id: 'unvisited-1',
    label: 'Unvisited Step 1',
    percentageComplete: 0,
    status: 'unvisited',
  },
  {
    id: 'unvisited-2',
    label: 'Unvisited Step 2',
    percentageComplete: 0,
    status: 'unvisited',
  },
  {
    id: 'unvisited-3',
    label: 'Unvisited Step 3',
    percentageComplete: 0,
    status: 'unvisited',
  },
];

const CustomLinkComponent = styled.a`
    cursor: crosshair;
    color: pink;
`;

type Props = {
  /** stage data passed to each `ProgressTrackerStage` component */
  stage: Stage,
};

class CustomProgressTrackerLink extends PureComponent {
  props: Props;

  render() {
    const {
        href,
        onClick,
        label,
    } = this.props.stage;
    return (
      <CustomLinkComponent href={href} onClick={onClick}>
        {label}
      </CustomLinkComponent>
    );
  }
}

export default (
  <ProgressTracker
    stages={stages}
    linkComponent={CustomProgressTrackerLink}
  />
);
