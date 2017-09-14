import React, { Component } from 'react';
// import { ThemeProvider } from 'styled-components';
import Button, { ButtonGroup } from '@atlaskit/button';
import Lorem from 'react-lorem-component';
import Modal from '../src';

const appearances = ['warning', 'danger'];

export default class ShowHideDemo extends Component {
  state = { isOpen: null }
  open = (isOpen) => this.setState({ isOpen })
  close = () => this.setState({ isOpen: null })

  render() {
    const { isOpen } = this.state;
    const actions = [
      { text: 'Close', onClick: this.close },
      { text: 'Secondary Action', onClick: this.secondaryAction },
    ];

    return (
      <div style={{ padding: 16 }}>
        <ButtonGroup>
          {appearances.map(name => (
            <Button key={name} onClick={() => this.open(name)}>
              Open: {name}
            </Button>
          ))}
        </ButtonGroup>

        {appearances.filter(a => a === isOpen).map(name => (
          <Modal
            key={name}
            actions={actions}
            appearance={name}
            onClose={this.close}
            heading={`Modal: ${name}`}
          >
            <Lorem count={2} />
          </Modal>
        ))}
      </div>
    );
  }
}
