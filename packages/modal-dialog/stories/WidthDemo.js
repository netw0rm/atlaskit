import React, { PureComponent } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Lorem from 'react-lorem-component';
import Button, { ButtonGroup } from '@atlaskit/button';

import { WIDTH_ENUM } from '../src/shared-variables';
import ModalDialog from '../src';

const units = [420, '42%', '42em'];
const sizes = WIDTH_ENUM.values;
const allWidths = sizes.concat(units);
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
          <H4>Sizes</H4>
          <ButtonGroup>{sizes.map(btn)}</ButtonGroup>
          <H4>Units</H4>
          <ButtonGroup>{units.map(btn)}</ButtonGroup>

          {allWidths.filter(w => w === isOpen).map(name => (
            <ModalDialog
              actions={actions}
              onClose={this.close}
              heading={`Modal: ${name}`}
              width={name}
              {...this.props}
            >
              <Lorem count="1" />
            </ModalDialog>
          ))}
        </div>
      </ThemeProvider>
    );
  }
}
