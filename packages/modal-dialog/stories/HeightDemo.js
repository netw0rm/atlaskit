import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Lorem from 'react-lorem-component';
import Button, { ButtonGroup } from '@atlaskit/button';
import ModalDialog from '../src';

const units = [420, '42em', '100%'];
const H4 = styled.h4`margin-bottom: 0.66em;`;

export default class ModalDemo extends PureComponent {
  state = { isOpen: null }
  open = isOpen => this.setState({ isOpen })
  close = isOpen => this.setState({ isOpen })

  render() {
    const { isOpen } = this.state;
    const btn = name => <Button key={name} onClick={() => this.open(name)}>{name}</Button>;
    const actions = [
      { text: 'Close', onClick: this.close },
      { text: 'Secondary Action', onClick: this.secondaryAction },
    ];

    return (
      <div style={{ padding: 16 }}>
        <H4>Units</H4>
        <ButtonGroup>{units.map(btn)}</ButtonGroup>

        {units.filter(w => w === isOpen).map(name => (
          <ModalDialog
            actions={actions}
            key={name}
            onClose={this.close}
            heading={`Modal: ${name}`}
            height={name}
            {...this.props}
          >
            <Lorem count="1" />
          </ModalDialog>
        ))}
      </div>
    );
  }
}
