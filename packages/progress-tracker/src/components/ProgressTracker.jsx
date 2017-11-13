import React, { PureComponent } from 'react';
import { Grid } from '@atlaskit/page';
import ProgressTrackerStage from './ProgressTrackerStage';
import { ProgressTrackerContainer } from '../styled/ProgressTracker';
import type { Stage, Spacing, ComponentType } from '../types';

type Props = {
  /** stage data passed to each `ProgressTrackerStage` component */
  stages: Array<Stage>,
  /** Spacing of the columns within which each step resides */
  spacing?: Spacing,
  /** Custom component to render instead of default link */
  linkComponent?: ComponentType,
};

export default class ProgressTracker extends PureComponent {
  createTheme = () => ({
    spacing: this.props.spacing,
    columns: this.props.stages.length * 2,
  });

  props: Props;

  render() {
    const stages = this.props.stages.map((stage) =>
      <ProgressTrackerStage
        key={stage.id}
        stage={stage}
        linkComponent={this.props.linkComponent}
      />);
    return (
      <Grid theme={this.createTheme()}>
        <ProgressTrackerContainer>
          {stages}
        </ProgressTrackerContainer>
      </Grid>
    );
  }
}
