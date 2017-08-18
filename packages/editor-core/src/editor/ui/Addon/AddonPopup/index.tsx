import * as React from 'react';
import Popup from '../../../../ui/Popup';
import withOuterListeners from '../../../../ui/with-outer-listeners';

export interface Props {
  handleClickOutside: () => void;
  handleEscapeKeydown: () => void;
  fitWidth?: number;
  fitHeight?: number;
  target?: HTMLElement;
  mountTo?: HTMLElement;
  boundariesElement?: HTMLElement;
  children?: React.ReactElement<any>[];
}

export default withOuterListeners((props: Props) => (
  <Popup
    target={props.target}
    mountTo={props.mountTo}
    boundariesElement={props.boundariesElement}
    fitHeight={props.fitHeight}
    fitWidth={props.fitWidth}
  >
    {props.children}
  </Popup>
));
