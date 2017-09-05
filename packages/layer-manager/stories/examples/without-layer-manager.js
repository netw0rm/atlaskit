import React, { Component } from 'react';
import Lorem from 'react-lorem-component';
import { ThemeProvider } from 'styled-components';
import Button from '@atlaskit/button';
import InlineDialog from '@atlaskit/inline-dialog';
import Modal from '@atlaskit/modal-dialog';

export default class ExampleSingleModal extends Component {
  state = { dialogOpen: false, modalIsOpen: false }

  toggleModal = (modalIsOpen) => this.setState({ modalIsOpen })
  openModal = () => this.toggleModal(true)
  closeModal = () => this.toggleModal(false)

  render() {
    const { dialogOpen, modalIsOpen } = this.state;

    return (
      <ThemeProvider theme={{}}>
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

          {modalIsOpen && (
            <Modal
              onDialogDismissed={this.closeModal}
              title="Modal Title"
              actions={[
                { text: 'Close Modal', onClick: this.closeModal },
                { text: 'No Action', onClick: () => {} },
              ]}
            >
              <InlineDialog
                content={<div>Dialog Content</div>}
                isOpen={dialogOpen}
                position="top left"
              >
                <Button onClick={() => this.setState({ dialogOpen: !dialogOpen })}>
                  Toggle Dialog
                </Button>
              </InlineDialog>
              <Lorem count={1} />
            </Modal>
          )}
        </div>
      </ThemeProvider>
    );
  }
}
