import {
  akBorderRadius,
  akColorN0,
  akColorN50A,
  akColorN60A
} from '@atlaskit/util-shared-styles';
import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import { style } from 'typestyle';

export interface Props {
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
  render() {
    return (
      <div className={popupStyle}>
        {this.props.children}
      </div>
    );
  }
}
