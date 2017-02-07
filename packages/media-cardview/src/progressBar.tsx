import * as React from 'react';
import {Component} from 'react';
import styles from 'style!./styles.less';

export interface ProgressBarProps {
  progress?: number;
}

export class ProgressBar extends Component<ProgressBarProps, {}> {
  render() {
    if (typeof this.props.progress !== 'number') {
      return null;
    }

    const progress = Math.min(1, Math.max(0, this.props.progress));
    const progressBarStyle = {width: `${progress * 100}%`};
    return (
      <div className={styles['progressWrapper']}>
        <div className={styles['progressBar']} style={progressBarStyle} />
      </div>
    );
  }
}
