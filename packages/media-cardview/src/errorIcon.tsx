import * as React from 'react';
import {Component} from 'react';
import * as styles from 'style!./styles.less';

export const errorIconSize = {
  HEIGHT: 15,
  WIDTH: 16
};

export interface ErrorIconProps {
  height?: number;
  width?: number;
}

export class ErrorIcon extends Component<ErrorIconProps, {}> {
  render() {
    const height = this.props.height || errorIconSize.HEIGHT;
    const width = this.props.width || errorIconSize.WIDTH;

    const style = {
      width: `${width}px`,
      height: `${height}px`
    };

    return <div style={style} className={styles['errorIcon']} />;
  }
}
