import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtlassianLogo } from '@atlaskit/logo';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import styled from 'styled-components';

export const RequestTrialHeader = styled.h3`
  margin-top: 0px;
`;

export default class RequestTrial extends Component {
  static propTypes = {
    productLogo: PropTypes.element,
    header: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    productLogo: <AtlassianLogo />,
  }

  render() {
    return (
      <div>
        <ModalDialog
          isOpen
          header={this.props.productLogo}
          footer={
            <p>
              <Button appearance="primary">Request access</Button>
              <Button appearance="subtle-link">Cancel</Button>
            </p>
          }
        >
          <RequestTrialHeader>{this.props.header}</RequestTrialHeader>
          {this.props.children}
        </ModalDialog>
      </div>
    );
  }
}
