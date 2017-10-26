import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Lorem from 'react-lorem-component';
import Button, { ButtonGroup } from '@atlaskit/button';
import ModalDialog from '../src';

const H4 = styled.h4`margin-bottom: 0.66em;`;

export default class ModalDemo extends PureComponent {
  state = { isOpen: null }
  open = isOpen => this.setState({ isOpen })
  close = isOpen => this.setState({ isOpen })

  render() {
    const { isOpen } = this.state;
    const actions = [
      { text: 'Close', onClick: this.close },
      { text: 'Secondary Action', onClick: this.secondaryAction },
    ];
    const StubDialog = ({ children, ...props }) => (
      <ModalDialog
        actions={actions}
        onClose={this.close}
        {...props}
      >
        <Lorem count="1" />
        {children}
      </ModalDialog>
    );

    return (
      <div style={{ padding: 16 }}>
        <H4>Variants</H4>
        <ButtonGroup>
          <Button onClick={() => this.open('root')}>
            Boolean on dialog
          </Button>
          <Button onClick={() => this.open('node')}>
            Boolean on child
          </Button>
          <Button onClick={() => this.open('ref')}>
            Function returns a ref
          </Button>
        </ButtonGroup>

        <p>When boolean applied to the dialog, we search inside for tabbable elements.</p>
        <p>
          The autoFocus property must be a function rather the node itself so its
          evaluated at the right time and ensures a node is returned.
        </p>

        {isOpen === 'root' && (
          <StubDialog autoFocus heading="Boolean on dialog">
            <button>I am focused!</button>
          </StubDialog>
        )}
        {isOpen === 'node' && (
          <StubDialog heading="Boolean on child">
            <input autoFocus defaultValue="I am focused!" />
          </StubDialog>
        )}
        {isOpen === 'ref' && (
          <StubDialog autoFocus={() => this.focusTarget} heading="Function returns a ref">
            <button ref={r => (this.focusTarget = r)}>I am focused!</button>
          </StubDialog>
        )}
      </div>
    );
  }
}
