import React, { PureComponent } from 'react';
import styled from 'styled-components';
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

        {isOpen === 'root' && (
          <StubDialog autoFocus heading="Boolean on dialog">
            <p>The first {'"tabbable"'} element will be focused.</p>
            <button>I am focused!</button>
            <button>I am NOT focused</button>
          </StubDialog>
        )}
        {isOpen === 'node' && (
          <StubDialog autoFocus={false} heading="Boolean on child">
            <p>The second button has <code>autoFocus</code> attr, and will be focused.</p>
            <button>I am NOT focused</button>
            <button autoFocus>I am focused!</button>
          </StubDialog>
        )}
        {isOpen === 'ref' && (
          <StubDialog autoFocus={() => this.focusTarget} heading="Function returns a ref">
            <p>The second button sets a reference to itself on the class and passes that node
            to the modal, which calls the focus method on it once mounted.</p>
            <button>I am NOT focused</button>
            <button ref={r => (this.focusTarget = r)}>I am focused!</button>
          </StubDialog>
        )}
      </div>
    );
  }
}
