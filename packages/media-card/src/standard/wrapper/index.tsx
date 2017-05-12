import * as React from 'react';
import {CardDimensions} from '../..';
import {getCSSUnitValue} from '../../utils';
import {Outer, Inner} from './styled';

export const DEFAULT_DIMENSIONS = {
  WIDTH: '156px',
  HEIGHT: '104px'
};

export interface StandardWrapperProps {
  readonly dimensions?: CardDimensions;
  readonly children?: JSX.Element;
  readonly onClick: () => void;
}

export class StandardWrapper extends React.Component<StandardWrapperProps, {}> {

  private get width(): string {
    const {width} = this.props.dimensions || {width: undefined};

    if (!width) {
      return DEFAULT_DIMENSIONS.WIDTH;
    }

    return getCSSUnitValue(width);
  }

  private get height(): string {
    const {height} = this.props.dimensions || {height: undefined};

    if (!height) {
      return DEFAULT_DIMENSIONS.HEIGHT ;
    }

    return getCSSUnitValue(height);
  }

  render(): JSX.Element {
    const {children, onClick} = this.props;
    return (
      <Outer style={{height: this.height, width: this.width}} onClick={onClick}>
        <Inner>
          {children}
        </Inner>
      </Outer>
    );
  }

}
