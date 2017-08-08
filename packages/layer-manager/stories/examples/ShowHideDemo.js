import React from 'react';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import Button from '@atlaskit/button';
import Lorem from 'react-lorem-component';
import { Modal } from '../../src';

export default class ShowHideDemo extends React.PureComponent {
  state = {
    isOpen: false,
  }

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <p style={{ padding: `${akGridSizeUnitless * 2}px` }}>
          <Button
            appearance="primary"
            onClick={this.toggleModal}
          >Toggle ze modal</Button>
        </p>
        {this.state.isOpen ?
          <Modal
            footer={
              <Button
                appearance="primary"
                onClick={this.toggleModal}
              >Close</Button>
            }
            header={
              <h3>Animation</h3>
            }
            onDialogDismissed={this.toggleModal}
          >
            <Lorem count="5" />
          </Modal> : null
        }
      </div>
    );
  }
}
