import React, { PureComponent } from 'react';
import Modal, { ModalFooter } from '@atlaskit/modal-dialog';
import Button, { ButtonGroup } from '@atlaskit/button';

const VARIANTS = {
  number: { value: 300, label: 'Number' },
  pixels: { value: '400px', label: 'Pixels' },
  percentage: { value: '50%', label: 'Percentage' },
  size: { value: 'small', label: 'Size' },
};

export default class LozengeExamples extends PureComponent {
  state = { active: null }
  openModal = active => this.setState({ active })
  closeModal = () => this.setState({ active: null })

  render() {
    const { active } = this.state;
    const variants = Object.keys(VARIANTS);
    const Footer = () => <ModalFooter>
      <Button onClick={this.closeModal}>Close Modal</Button>
    </ModalFooter>;

    return (
      <div>
        <ButtonGroup>
          {variants.map((v) => {
            const width = VARIANTS[v];
            const onClick = () => this.openModal(v);

            return (
              <Button key={v} onClick={onClick} isSelected={active === v}>
                {width.label} ({width.value})
              </Button>
            );
          })}
        </ButtonGroup>
        {variants.map((v) => {
          const width = VARIANTS[v];

          return (
            <Modal
              footer={Footer}
              isOpen={active === v}
              key={v}
              onDialogDismissed={this.closeModal}
              title={`Width as ${width.label}`}
              width={width.value}
            >
              Width as {width.label}
            </Modal>
          );
        })}
      </div>
    );
  }
}
