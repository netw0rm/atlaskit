// @flow

import React, { PureComponent } from 'react';
import { colors } from '@atlaskit/theme';
import { GridColumn } from '@atlaskit/page';
import {
  ProgressTrackerStageContainer,
  ProgressTrackerStageMarker,
  ProgressTrackerStageBar,
  ProgressTrackerStageTitle,
} from '../styled/ProgressTrackerStage';
import DefaultProgressTrackerLink from './DefaultProgressTrackerLink';
import type {
  ComponentType,
  Stage,
} from '../types';

const semibold = '600';
const regular = '400';
const getMarkerColor = (status) => {
  switch (status) {
    case 'unvisited':
      return colors.N70;
    case 'current':
      return colors.B300;
    case 'visited':
      return colors.B300;
    case 'disabled':
      return colors.B300;
    default:
      return null;
  }
};

const getTextColor = (status) => {
  switch (status) {
    case 'unvisited':
      return colors.N300;
    case 'current':
      return colors.B300;
    case 'visited':
      return colors.N800;
    case 'disabled':
      return colors.N70;
    default:
      return null;
  }
};

const getFontWeight = (status) => {
  switch (status) {
    case 'unvisited':
      return regular;
    case 'current':
      return semibold;
    case 'visited':
      return semibold;
    case 'disabled':
      return semibold;
    default:
      return null;
  }
};

type Props = {
  /** stage data passed to each `ProgressTrackerStage` component */
  stage: Stage,
  /** Custom component to render instead of default link */
  linkComponent?: ComponentType,
};

export default class ProgressTrackerStage extends PureComponent {
  shouldShowLink() {
    return this.props.stage.status === 'visited' && (this.props.stage.href || this.props.stage.onClick);
  }

  props: Props;

  render() {
    const {
      stage,
      linkComponent,
    } = this.props;

    const LinkComponent = linkComponent || DefaultProgressTrackerLink;

    const link = () => (
      <LinkComponent stage={stage} />
    );

    return (
      <GridColumn medium={2}>
        <ProgressTrackerStageContainer>
          <ProgressTrackerStageMarker
            color={getMarkerColor(stage.status)}
          />
          <ProgressTrackerStageBar
            color={colors.B300}
            percentageComplete={stage.percentageComplete}
          />
          <ProgressTrackerStageTitle
            color={getTextColor(stage.status)}
            fontweight={getFontWeight(stage.status)}
          >
            {this.shouldShowLink() ? link() : stage.label}
          </ProgressTrackerStageTitle>
        </ProgressTrackerStageContainer>
      </GridColumn>
    );
  }
}
