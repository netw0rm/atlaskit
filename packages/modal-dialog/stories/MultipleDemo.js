import React, { Component } from 'react';
import LayerManager from '@atlaskit/layer-manager';
import Button, { ButtonGroup } from '@atlaskit/button';
import Lorem from 'react-lorem-component';
import Modal from '../src';

const sizes = ['medium', 'small'];

export default class ShowHideDemo extends Component {
  state = { isOpen: [] }
  open = (isOpen) => {
    const openModals = this.state.isOpen.slice(0);
    openModals.push(isOpen);
    this.setState({ isOpen: openModals });
  }
  close = () => {
    const openModals = this.state.isOpen.slice(0);
    openModals.pop();
    this.setState({ isOpen: openModals });
  }
  handleStackChange = (idx) => {
    console.info('handleStackChange', idx);
  }
  handleCloseComplete = () => {
    console.info(`The exit animation of the "${sizes[0]}" modal has completed.`);
  }

  render() {
    const { isOpen } = this.state;

    return (
      <LayerManager>
        <div style={{ padding: 16 }}>
          <ButtonGroup>
            {sizes.map(name => (
              <Button key={name} onClick={() => this.open(name)}>
                Open: {name}
              </Button>
            ))}
          </ButtonGroup>

          {sizes.filter(v => isOpen.includes(v)).map((name, idx) => {
            const next = sizes[idx + 1];
            const onClick = next ? () => this.open(next) : null;
            const actions = [{ text: 'Close', onClick: this.close }];
            if (next) actions.push({ text: `Open: ${next}`, onClick });

            return (
              <Modal
                key={name}
                actions={actions}
                onClose={this.close}
                onCloseComplete={next && this.handleCloseComplete}
                onStackChange={next && this.handleStackChange}
                heading={`Modal: ${name}`}
                width={name}
              >
                <Lorem count={2} />
              </Modal>
            );
          })}
        </div>
      </LayerManager>
    );
  }
}
