import * as React from 'react';
import {Component} from 'react';
import * as styles from './styles.less';

export const spinnerSize = {
  HEIGHT: 60,
  WIDTH: 60
};

interface SpinnerProps {
  loading: boolean;
  height?: number;
  width?: number;
}

export class Spinner extends Component<SpinnerProps, {}> {
  render() {

    const height = this.props.height || spinnerSize.HEIGHT;
    const width = this.props.width || spinnerSize.WIDTH;

    const style = {
      left: `calc(50% - ${width}px/2)`,
      top: `calc(50% - ${height}px/2)`
    };

    const className = (this.props.loading) ? `${styles['spinner']} ${styles['active']}` :  styles['spinner'];
    
    console.log(className)

    return (
        <div className={className} style={style}>
          <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" style={{height: `${height}px`, width: `${width}px`}}>
            <circle className={styles['path-animate']} fill="none" strokeWidth="1.5" strokeLinecap="round" cx="15" cy="15" r="7" />
          </svg>
        </div>
    );
  }
}
