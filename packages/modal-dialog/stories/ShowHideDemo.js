import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import Button from '@atlaskit/button';
import DropdownMenu, { DropdownItemGroupRadio, DropdownItemRadio } from '@atlaskit/dropdown-menu';
import Lorem from 'react-lorem-component';
import ModalDialog from '../src';

export default class ShowHideDemo extends Component {
  state = { isOpen: false, showText: true }
  toggleModal = () => this.setState(state => ({ isOpen: !state.isOpen }))
  toggleText = () => this.setState(state => ({ showText: !state.showText }))

  render() {
    const { isOpen, showText } = this.state;
    return (
      <ThemeProvider theme={{}}>
        <div>
          <div style={{ padding: '16px 20vw' }}>
            <p>
              <label htmlFor="checkbox">
                <input
                  id="checkbox"
                  onChange={this.toggleText}
                  type="checkbox"
                />
                <span>Toggle overflowing page content</span>
              </label>
            </p>
            <hr style={{ marginBottom: 16, marginTop: 16 }} />
            <Lorem count={2} style={{ marginBottom: 8 }} />
            <Button appearance="primary" onClick={this.toggleModal}>
              Open the Modal
            </Button>
            {showText && <Lorem count={20} style={{ marginTop: 8 }} />}
          </div>
          {isOpen && (
            <ModalDialog
              actions={[{ text: 'Close', onClick: this.toggleModal }]}
              heading="Animation"
              onClose={this.toggleModal}
            >
              <Lorem count="5" />
              <DropdownMenu trigger="Choose city" triggerType="button">
                <DropdownItemGroupRadio id="cities" heading="Cities">
                  <DropdownItemRadio id="sydney">Sydney</DropdownItemRadio>
                  <DropdownItemRadio id="canberra">Canberra</DropdownItemRadio>
                  <DropdownItemRadio id="melbourne">Melbourne</DropdownItemRadio>
                  <DropdownItemRadio id="perth">Perth</DropdownItemRadio>
                </DropdownItemGroupRadio>
              </DropdownMenu>
            </ModalDialog>
          )}
        </div>
      </ThemeProvider>
    );
  }
}
