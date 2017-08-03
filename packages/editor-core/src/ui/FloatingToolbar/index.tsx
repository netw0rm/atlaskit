import * as React from 'react';
import { PureComponent } from 'react';
import Popup from '../Popup';
import { Container } from './styles';
export type Coordniates = { left: number, right: number, top: number, bottom: number };

export interface Props {
  onOutsideClick?: () => void;
  className?: string | undefined;
  children?: any;
  target?: HTMLElement;
  offset?: number[];
  fitWidth?: number;
  fitHeight?: number;
  onPositionCalculated?: (position: any) => any;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  alignY?: 'top' | 'bottom';
}

export default class FloatingToolbar extends PureComponent<Props, any> {
  render() {
    const {
      children,
      className,
      target, offset, fitWidth, fitHeight, popupsMountPoint, popupsBoundariesElement,
      alignY,
      onPositionCalculated
    } = this.props;

    if (!target) {
      return null;
    }

    return (

        <Popup
          target={target}
          offset={offset}
          fitWidth={fitWidth}
          fitHeight={fitHeight}
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          onPositionCalculated={onPositionCalculated}
          alignY={alignY}
        >
          <Container className={`${className || ''}`} >
            {children}
          </Container>
        </Popup>

    );
  }
}
