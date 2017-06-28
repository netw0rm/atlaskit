import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import { AtlassianLogo } from '@atlaskit/logo';
import { StartTrialFooter, ProgressBar } from '../styled/StartTrial';

export default class StartTrialProgress extends Component {
  static propTypes = {
    productLogo: PropTypes.element,
    children: PropTypes.node,
  }

  static defaultProps = {
    productLogo: <AtlassianLogo />,
  }

  handleButtonClick = (evt) => {
    console.log(`The ${`${evt.target.textContent}`.toLowerCase()} button got clicked!`);
  }

  render() {
    return (
      <ModalDialog
        isOpen
        width="small"
        header={
          <div>
            {this.props.productLogo}
            <ProgressBar>- P R O G R E S S B A R -</ProgressBar>
          </div>
        }
        footer={
          <StartTrialFooter>
            <Button onClick={this.handleButtonClick} appearance="primary">Continue</Button>
          </StartTrialFooter>
        }
      >
        {this.props.children}
      </ModalDialog>
    );
  }
}
