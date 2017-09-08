import React, { PureComponent } from 'react';
import Lorem from 'react-lorem-component';
import Modal from '@atlaskit/modal-dialog';
import Button, { ButtonGroup } from '@atlaskit/button';

const appearances = ['warning', 'danger'];

export default class ExampleBasic extends PureComponent {
  state = { isOpen: null }
  open = isOpen => this.setState({ isOpen })
  close = isOpen => this.setState({ isOpen })
  secondaryAction = ({ target }) => console.log(target.innerText)

  render() {
    const { isOpen } = this.state;
    const actions = [
      { text: 'Close', onClick: this.close },
      { text: 'Secondary Action', onClick: this.secondaryAction },
    ];

    return (
      <div>
        <ButtonGroup>
          {appearances.map(name => (
            <Button onClick={() => this.open(name)}>
              Open: {name}
            </Button>
          ))}
        </ButtonGroup>

        {appearances.filter(a => a === isOpen).map(name => (
          <Modal
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
