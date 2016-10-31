import React from 'react';
import { TooltipTrigger } from 'ak-tooltip';
import reactify from 'akutil-react';
import Clipboard from 'clipboard';
import { action } from '@kadira/storybook';

import { locals as styles } from './styles.less';


const AkTooltipTrigger = reactify(TooltipTrigger);

class Block extends React.Component {
  componentDidMount() {
    if (this.block) {
      this.clipboard = new Clipboard(this.block);
      const copyAction = action(`copied ${this.props.description} to clipboard`);
      this.clipboard.on('success', ({ text: color }) => copyAction(color));
    } else {
      this.clipboard.destroy();
    }
  }

  render() {
    return (
      <AkTooltipTrigger description={this.props.backgroundColor}>
        <div
          data-clipboard-text={this.props.backgroundColor}
          ref={n => (this.block = n)}
          aria-describedby={this.props.tooltipId}
          className={styles.Block}
          style={{
            backgroundColor: this.props.backgroundColor,
            color: this.props.foregroundColor,
            borderColor: this.props.foregroundColor,
          }}
        >
          <div className={styles.description}>{this.props.description}</div>
        </div>
      </AkTooltipTrigger>
    );
  }
}

Block.propTypes = {
  description: React.PropTypes.string.isRequired,
  backgroundColor: React.PropTypes.string.isRequired,
  foregroundColor: React.PropTypes.string.isRequired,
  tooltipId: React.PropTypes.string.isRequired,
};

export default Block;
