import React, { Component } from 'react';
import { action } from '@kadira/storybook';
import LayerManager from '@atlaskit/layer-manager';
import Button, { ButtonGroup } from '@atlaskit/button';
import Lorem from 'react-lorem-component';
import Modal from '../src';

const sizes = ['large', 'medium', 'small'];

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
  handleStackChange = (idx, name) => {
    console.info(`"${name}" stack change`, idx);
    action(`"${name}" stack change ${idx}`)();
  }
  handleCloseComplete = () => {
    console.info(`The exit animation of the "${sizes[0]}" modal has completed.`);
  }

  render() {
    const { isOpen } = this.state;

    return (
      <LayerManager>
        <div style={{ maxWidth: 400, padding: 16 }}>
          <ButtonGroup>
            {sizes.map(name => (
              <Button key={name} onClick={() => this.open(name)}>
                Open: {name}
              </Button>
            ))}
          </ButtonGroup>
          <p>
            For illustrative purposes three {'"stacked"'} modals can be opened
            in this demo, though ADG3 recommends only two at any time.
          </p>
          <p>
            Check the storybook{"'"}s {'"action logger"'} (or your console) to
            see how you can make use of the <code>onStackChange</code> property.
          </p>

          {sizes.filter(v => isOpen.includes(v)).map((name) => {
            const next = sizes[sizes.indexOf(name) + 1];
            const onClick = next ? () => this.open(next) : null;
            const actions = [{ text: 'Close', onClick: this.close }];
            if (next) actions.push({ text: `Open: ${next}`, onClick });

            return (
              <Modal
                actions={actions}
                autoFocus
                key={name}
                onClose={this.close}
                onCloseComplete={next && this.handleCloseComplete}
                onStackChange={next ? (id) => this.handleStackChange(id, name) : null}
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
