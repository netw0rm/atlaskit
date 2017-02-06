import * as React from 'react';
import Component = React.Component;
import styles from 'style!./progressBar.less'; // MEDIA-FIX

export interface ProgressBarProps {
  progress: number;
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
