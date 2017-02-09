import * as React from 'react';
import {Component} from 'react';
import styled from 'styled-components';

export interface ProgressBarProps {
  progress?: number;
}

const ProgressWrapper = styled.div`
  border-radius: 3px;
  z-index: 30;

  overflow: hidden;
  background-color: rgba(255,255,255,0.3);
`;

const ProgressBarContent = styled.div`
  width: ${props => props.width};
  height: 3px;
  background-color: white;
`;

export class ProgressBar extends Component<ProgressBarProps, {}> {
  render() {
    if (typeof this.props.progress !== 'number') {
      return null;
    }

    const progress = Math.min(1, Math.max(0, this.props.progress));

    return (
      <ProgressWrapper>
        <ProgressBarContent width={{width: `${progress * 100}%`}} />
      </ProgressWrapper>
    );
  }
}
