import React, { PureComponent } from 'react';
import Lorem from 'react-lorem-component';
import Modal from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';

export default class ExampleBasic extends PureComponent {
  state = { isOpen: false }
  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })
  secondaryAction = ({ target }) => console.log(target.innerText)

  render() {
    const { isOpen } = this.state;
    const actions = [
      { text: 'Close', onClick: this.close },
      { text: 'Secondary Action', onClick: this.secondaryAction },
    ];

    return (
      <div>
        <Button onClick={this.open}>Open Modal</Button>

        {isOpen && (
          <Modal
            actions={actions}
            onClose={this.close}
            heading="Modal Title"
          >
            <Lorem count={2} />
          </Modal>
        )}
      </div>
    );
  }
}
