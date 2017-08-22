import React, { Component } from 'react';
import Lorem from 'react-lorem-component';
import Button from '@atlaskit/button';
import Modal from '@atlaskit/modal-dialog';

export default class ExampleSingleModal extends Component {
  state = { modalIsOpen: false }

  componentDidMount() { this._isMounted = true; }
  componentWillUnmount() { this._isMounted = false; }

  toggleModal = modalIsOpen => this._isMounted && this.setState({ modalIsOpen })
  openModal = () => this.toggleModal(true)
  closeModal = () => this.toggleModal(false)

  render() {
    const { modalIsOpen } = this.state;

    return (
      <div style={{ padding: '1em' }}>
        <h1>Without a LayerManager</h1>
        <p>
          Mounted in a portal, that&apos;s injected before close of body.
        </p>
        <p>
          <Button onClick={this.openModal}>
            Open modal
          </Button>
        </p>

        <Modal
          isOpen={modalIsOpen}
          onDialogDismissed={this.closeModal}
          title="Modal Title"
          actions={[
            { text: 'Close Modal', onClick: this.closeModal },
            { text: 'No Action', onClick: () => {} },
          ]}
        >
          <Lorem count={1} />
        </Modal>
      </div>
    );
  }
}
