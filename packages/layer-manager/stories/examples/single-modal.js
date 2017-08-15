import React, { Component } from 'react';
import Modal from '@atlaskit/modal-dialog';
import LayerManager from '../../src';

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
      <LayerManager>
        <div style={{ padding: '1em' }}>
          <p>App Content</p>
          <p>
            <button onClick={this.openModal}>
              Open modal
            </button>
          </p>
          {!!modalIsOpen && (
            <Modal onRequestClose={this.closeModal}>
              <h1>Modal Title</h1>
              <p>Modal Body</p>
              <p>
                <button onClick={this.closeModal}>
                  Close modal
                </button>
              </p>
            </Modal>
          )}
        </div>
      </LayerManager>
    );
  }
}
