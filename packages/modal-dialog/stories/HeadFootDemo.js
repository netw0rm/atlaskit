import React, { PureComponent } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Lorem from 'react-lorem-component';
import Button, { ButtonGroup } from '@atlaskit/button';
import ModalDialog from '../src';

const variants = ['header', 'footer', 'both', 'neither'];
const H4 = styled.h4`margin-bottom: 0.66em;`;

export default class ModalDemo extends PureComponent {
  state = { isOpen: null }
  open = isOpen => this.setState({ isOpen })
  close = isOpen => this.setState({ isOpen })

  render() {
    const { isOpen } = this.state;
    const btn = name => <Button onClick={() => this.open(name)}>{name}</Button>;
    const actions = [
      { text: 'Close', onClick: this.close },
      { text: 'Secondary Action', onClick: this.secondaryAction },
    ];

    return (
      <ThemeProvider theme={{}}>
        <div style={{ padding: 16 }}>
          <H4>Variants</H4>
          <ButtonGroup>{variants.map(btn)}</ButtonGroup>

          {variants.filter(w => w === isOpen).map(name => (
            <ModalDialog
              actions={['footer', 'both'].includes(name) && actions}
              onClose={this.close}
              heading={['header', 'both'].includes(name) && `Modal: ${name}`}
              {...this.props}
            >
              <Lorem count="5" />
            </ModalDialog>
          ))}
        </div>
      </ThemeProvider>
    );
  }
}
