import React, { PureComponent } from 'react';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';

export default class LozengeExamples extends PureComponent {
  state = {
    openNumModal: false,
    openPxModal: false,
    percentModal: false,
  }

  toggleNumModal = () => this.setState({ openNumModal: !this.state.openNumModal })
  togglePxModal = () => this.setState({ openPxModal: !this.state.openPxModal })
  togglePercentModal = () => this.setState({ percentModal: !this.state.percentModal })

  render() {
    return (
      <div>
        <Button onClick={this.toggleNumModal}>Width as number</Button>
        <ModalDialog
          width={300}
          header="Three hundred as a number"
          footer={<Button onClick={this.toggleNumModal}>Close Modal</Button>}
          isOpen={this.state.openNumModal}
        >
          The modal dialog main content
        </ModalDialog>
        <Button onClick={this.togglePxModal}>Width of 300px</Button>
        <ModalDialog
          width="300px"
          header="300px as a string"
          footer={<Button onClick={this.togglePxModal}>Close Modal</Button>}
          isOpen={this.state.openPxModal}
        >
          The modal dialog main content
        </ModalDialog>
        <Button onClick={this.togglePercentModal}>Width of 50%</Button>
        <ModalDialog
          width="50%"
          header="50% as a string"
          footer={<Button onClick={this.togglePercentModal}>Close Modal</Button>}
          isOpen={this.state.percentModal}
        >
          The modal dialog main content
        </ModalDialog>
        <Button onClick={this.toggleNumModal}>Width small</Button>
        <ModalDialog
          width="small"
          header="small option"
          footer={<Button onClick={this.toggleNumModal}>Close Modal</Button>}
          isOpen={this.state.baseModalOpen}
        >
          The modal dialog main content
        </ModalDialog>
        <Button onClick={this.toggleNumModal}>Width medium</Button>
        <ModalDialog
          width="medium"
          header="medium option"
          footer={<Button onClick={this.toggleNumModal}>Close Modal</Button>}
          isOpen={this.state.baseModalOpen}
        >
          The modal dialog main content
        </ModalDialog>
        <Button onClick={this.toggleNumModal}>Width large</Button>
        <ModalDialog
          width="large"
          header="large option"
          footer={<Button onClick={this.toggleNumModal}>Close Modal</Button>}
          isOpen={this.state.baseModalOpen}
        >
          The modal dialog main content
        </ModalDialog>
        <Button onClick={this.toggleNumModal}>Width x-large</Button>
        <ModalDialog
          width="x-large"
          header="x-large option"
          footer={<Button onClick={this.toggleNumModal}>Close Modal</Button>}
          isOpen={this.state.baseModalOpen}
        >
          The modal dialog main content
        </ModalDialog>
      </div>
    );
  }
}
