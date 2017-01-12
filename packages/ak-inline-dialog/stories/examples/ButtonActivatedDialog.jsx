import React, { PropTypes, PureComponent } from 'react';
import AKButton from 'ak-button';
import BitbucketAdminIcon from 'ak-icon/glyph/bitbucket/admin';
import AKInlineDialog from '../../src/index';

class ButtonActivatedDialog extends PureComponent {
  static propTypes = {
    content: PropTypes.node,
    position: PropTypes.string,
  }

  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  render = () => (
    <AKInlineDialog
      content={this.props.content}
      position={this.props.position}
      open={this.state.open}
    >
      <AKButton
        onClick={this.handleClick}
        iconBefore={<BitbucketAdminIcon />}
        isSelected
      />
    </AKInlineDialog>
  )
}

export default ButtonActivatedDialog;
