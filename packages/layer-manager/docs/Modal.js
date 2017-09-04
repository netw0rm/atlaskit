import React, { Component } from 'react';
import Lorem from 'react-lorem-component';
import Button from '@atlaskit/button';
import Modal from '@atlaskit/modal-dialog';

// FIXME: Replace this relative path with the package when it's on NPM (@atlaskit/layer-manager)
import LayerManager from '../src';

export default class ExampleSingleModal extends Component {
  state = { modalIsOpen: false }

  openModal = () => this.setState(({ modalIsOpen: true }))
  closeModal = () => this.setState(({ modalIsOpen: false }))

  render() {
    const { modalIsOpen } = this.state;

    return (
      <LayerManager>
        <div>
          <p>
            Mounted in the designated slot, look for the <code>gateway-destination-modal</code> id.
          </p>
          <p>
            <Button onClick={this.openModal}>
              Open modal
            </Button>
          </p>

          {modalIsOpen && (
            <Modal
              autoFocus
              onDialogDismissed={this.closeModal}
              title="Modal Title"
              actions={[
                { text: 'Close Modal', onClick: this.closeModal },
                { text: 'No Action', onClick: () => {} },
              ]}
            >
              <Lorem count={1} />
            </Modal>
          )}
        </div>
      </LayerManager>
    );
  }
}
