import React, { Component } from 'react';
import Modal from '@atlaskit/modal-dialog';
import Lorem from 'react-lorem-component';
import Button from '@atlaskit/button';

import LayerManager from '../../src';

const sizes = ['Large', 'Medium', 'Small'];

export default class ExampleManyModals extends Component {
  state = { openModals: [] }
  componentDidMount() { this._mounted = true; }
  componentWillUnmount() { this._mounted = false; }

  openModal = (modal) => {
    if (!this._mounted) return;
    const openModals = [...this.state.openModals];
    openModals.push(modal);
    this.setState({ openModals });
  }
  closeModal = () => {
    if (!this._mounted) return;
    const openModals = [...this.state.openModals];
    openModals.pop();
    this.setState({ openModals });
  }

  render() {
    const { openModals } = this.state;

    return (
      <LayerManager>
        <div style={{ padding: '1em' }}>
          <h1>With Stacked Children</h1>
          <p>
            Mounted in the designated slot, look for the <code>gateway-destination-modal</code> id.
          </p>
          <p>
            <Button onClick={() => this.openModal(sizes[0])}>
              Open modal
            </Button>
          </p>

          {sizes.map((tshirt, idx) => openModals.includes(tshirt) && (
            <Modal
              autoFocus
              key={tshirt}
              onClose={this.closeModal}
              heading={tshirt}
              width={tshirt.toLowerCase()}
              actions={[
                { text: 'Close Modal', onClick: () => this.closeModal(tshirt) },
                { text: 'No Action', onClick: () => {} },
              ]}
            >
              <Lorem count={idx + 1} />
              {sizes[idx + 1] && (
                <p>
                  <Button onClick={() => this.openModal(sizes[idx + 1])}>
                    Open modal
                  </Button>
                </p>
              )}
            </Modal>
          ))}
        </div>
      </LayerManager>
    );
  }
}
