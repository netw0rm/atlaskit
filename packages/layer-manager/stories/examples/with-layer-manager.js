import React, { Component } from 'react';
import Modal from '@atlaskit/modal-dialog';
import Lorem from 'react-lorem-component';
import DropdownMenu, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import Button from '@atlaskit/button';

import LayerManager from '../../src';

export default class ExampleSingleModal extends Component {
  state = { modalIsOpen: false }
  componentDidMount() { this._mounted = true; }
  componentWillUnmount() { this._mounted = false; }

  toggleModal = modalIsOpen => this._mounted && this.setState({ modalIsOpen })
  openModal = () => this.toggleModal(true)
  closeModal = () => this.toggleModal(false)

  render() {
    const { modalIsOpen } = this.state;

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

          {modalIsOpen ? (
            <Modal
              autoFocus
              onClose={this.closeModal}
              heading="Modal Title"
              actions={[
                { text: 'Close Modal', onClick: this.closeModal },
                { text: 'No Action', onClick: () => {} },
              ]}
            >
              <Lorem count={10} />
              <DropdownMenu
                trigger="Open dropdown"
                triggerType="button"
              >
                <DropdownItemGroup>
                  <DropdownItem>This item a DropdownItem</DropdownItem>
                  <DropdownItem>Another DropdownItem</DropdownItem>
                </DropdownItemGroup>
                <DropdownItemGroup id="checkboxes" title="items">
                  <DropdownItem id="checkbox-1">This item a checkbox item</DropdownItem>
                  <DropdownItem id="checkbox-2">Another checkbox item</DropdownItem>
                </DropdownItemGroup>
                <DropdownItemGroup id="radios" title="items">
                  <DropdownItem id="radio-1">This item a radio item</DropdownItem>
                  <DropdownItem id="radio-2">Another radio item</DropdownItem>
                </DropdownItemGroup>
              </DropdownMenu>
            </Modal>
          ) : null}
        </div>
      </LayerManager>
    );
  }
}
