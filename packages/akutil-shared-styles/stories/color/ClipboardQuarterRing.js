import React from 'react';
import Clipboard from 'clipboard';
import { action } from '@kadira/storybook';

import QuarterRing from './QuarterRing';
import styles from './ring.less';


class ClipboardQuarterRing extends React.Component {

  componentDidMount() {
    console.log(this.quarterRing);
    if (this.quarterRing) {
      this.clipboard = new Clipboard(this.quarterRing);
      const copyAction = action('copied color to clipboard');
      this.clipboard.on('success', ({ text: color }) => copyAction(color));
    } else {
      this.clipboard.destroy();
    }
  }

  render() {
    return (
      <span
        {...this.props}
        data-clipboard-text={this.props.color}
        ref={n => (this.quarterRing = n)}
        style={{ color: this.props.color, display: 'flex' }}
      >
        <QuarterRing className={styles.locals[this.props.position]} />
      </span>
    );
  }
}

ClipboardQuarterRing.displayName = 'ClipboardQuarterRing';
ClipboardQuarterRing.propTypes = {
  color: React.PropTypes.string.isRequired,
  position: React.PropTypes.string.isRequired,
};

export default ClipboardQuarterRing;
