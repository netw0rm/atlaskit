import {
  akBorderRadius,
  akColorN0,
  akColorN50A,
  akColorN60A
} from '@atlaskit/util-shared-styles';
import * as React from 'react';
import { PureComponent, ReactInstance, ReactNode } from 'react';
import * as ReactDOM from 'react-dom';
import { style } from 'typestyle';

export interface Props {
  boundariesElement: string;
  target: ReactInstance;
  children?: ReactNode;
}

const popupStyle = style({
  position: 'absolute',
  background: akColorN0,
  borderRadius: akBorderRadius,
  boxShadow: `0 4px 8px -2px ${akColorN50A}, 0 0 1px ${akColorN60A}`,

  zIndex: 400,
  $nest: {
    '&> div': {
      boxShadow: undefined
    }
  }
});

export default class Popup extends PureComponent<Props, {}> {

  componentDidMount() {
    this.updatePosition();
  }

  componentDidUpdate() {
    this.updatePosition();
  }

  private updatePosition() {
    const trigger = ReactDOM.findDOMNode(this.props.target) as HTMLElement;
    const popup = ReactDOM.findDOMNode(this) as HTMLElement;
    const viewport = document.querySelector(this.props.boundariesElement) as HTMLElement;

    popup.style.left = null;
    popup.style.top = null;

    const popupRect = popup.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();

    if (popupRect.right >= viewportRect.right) {
      popup.style.left = `${popupRect.left - popupRect.width + triggerRect.width - triggerRect.left}px`;
    }

    if (popupRect.bottom >= viewportRect.bottom) {
      popup.style.top = `${popupRect.top - popupRect.height - triggerRect.height - triggerRect.top - 4}px`;
    }
  }

  render() {
    return (
      <div className={popupStyle} ref="popup">
        {this.props.children}
      </div>
    );
  }
}
