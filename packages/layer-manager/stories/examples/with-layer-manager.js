import React, { Component } from 'react';
import Modal from '@atlaskit/modal-dialog';
import Lorem from 'react-lorem-component';
// import DropdownMenu from '@atlaskit/dropdown-menu';
import Button from '@atlaskit/button';
import InlineDialog from '@atlaskit/inline-dialog';
import LayerManager from '../../src';

export default class ExampleSingleModal extends Component {
  state = { modalIsOpen: false }

  componentDidMount() { this._isMounted = true; }
  componentWillUnmount() { this._isMounted = false; }

  toggleModal = modalIsOpen => this._isMounted && this.setState({ modalIsOpen })
  openModal = () => this.toggleModal(true)
  closeModal = () => this.toggleModal(false)

  render() {
    const { dialogOpen, modalIsOpen } = this.state;

    return (
      <LayerManager>
        <div style={{ padding: '1em' }}>
          <h1>With a LayerManager</h1>
          <p>
            Mounted in the designated slot, look for the <code>gateway-destination-modal</code> id.
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
            <Lorem count={5} />
            <InlineDialog
              content={<div>Dialog Content</div>}
              isOpen={dialogOpen}
              position="right middle"
            >
              <button onClick={() => this.setState({ dialogOpen: !dialogOpen })}>
                Toggle Dialog
              </button>
            </InlineDialog>
          </Modal>
        </div>
      </LayerManager>
    );
  }
}
