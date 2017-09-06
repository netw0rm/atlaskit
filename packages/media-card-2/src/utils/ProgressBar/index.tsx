import * as React from 'react';
import {ProgressWrapper, ProgressValue} from './styled';

export interface ProgressBarProps {
  progress?: number;
}

export interface ProgressBarState {
}

export class ProgressBar extends React.Component<ProgressBarProps, ProgressBarState> {

  render() {
    const {progress = 0} = this.props;
    return (
      <ProgressWrapper>
        <ProgressValue style={{width: `${Math.min(100, Math.max(0, progress))}%`}}/>
      </ProgressWrapper>
    );
  }

}
