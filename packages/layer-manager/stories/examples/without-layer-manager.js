import React, { Component } from 'react';
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
          <button onClick={this.openModal}>
            Open modal
          </button>
        </p>

        <Modal
          isOpen={modalIsOpen}
          onDialogDismissed={this.closeModal}
          key="modal"
          header={<h2>Modal Title</h2>}
          footer={(
            <div>
              <button onClick={this.closeModal} autoFocus>
                Close modal
              </button>
              <button>
                button two
              </button>
            </div>
            )}
        >
          <p>Modal Body</p>
        </Modal>
      </div>
    );
  }
}
