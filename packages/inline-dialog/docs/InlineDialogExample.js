import React, { PureComponent } from 'react';
import InlineDialog from '@atlaskit/inline-dialog';
import Button from '@atlaskit/button';

const content = (
  <div style={{ maxWidth: 320 }}>
    <h5>Title</h5>
    <p>Cheesecake gingerbread cupcake soufflé.</p>
    <p>Macaroon cupcake powder dragée liquorice fruitcake cookie sesame snaps cake.</p>
  </div>
);

export default class InlineDialogExample extends PureComponent {
  state = {
    dialogOpen: true,
  }

  toggleDialog = () => this.setState({ dialogOpen: !this.state.dialogOpen })

  render() {
    return (
      <div style={{ height: '120px' }}>
        <InlineDialog
          content={content}
          isOpen={this.state.dialogOpen}
        >
          <Button onClick={this.toggleDialog}>Toggle Dialog</Button>
        </InlineDialog>
      </div>
    );
  }
}
