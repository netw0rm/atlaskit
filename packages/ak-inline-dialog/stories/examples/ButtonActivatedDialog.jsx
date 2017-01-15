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
    isOpen: false,
  };

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render = () => (
    <AKInlineDialog
      content={this.props.content}
      position={this.props.position}
      isOpen={this.state.isOpen}
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
