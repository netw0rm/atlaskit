import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Lorem from 'react-lorem-component';
import Modal, { ModalHeader, ModalHeaderTitle, ModalFooter } from '@atlaskit/modal-dialog';
import Button, { ButtonGroup } from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Avatar from '@atlaskit/avatar';
import { colors } from '@atlaskit/theme';

const Hint = styled.span`
  align-items: center;
  color: ${colors.subtleText};
  display: flex;
`;
const HintText = styled.span`
  margin-left: 1em;
`;
const CustomBody = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Image = styled.img`
 max-width: 100%;
 margin-bottom: 1em;
 margin-top: 1em;
`;

const Header = ({ onClose }) => (
  <ModalHeader>
    <ModalHeaderTitle>Custom Modal</ModalHeaderTitle>
    <Button onClick={onClose} appearance="link" spacing="none">
      <CrossIcon label="Close Modal" size="small" />
    </Button>
  </ModalHeader>
);
const Footer = ({ onClose }) => (
  <ModalFooter>
    <Hint>
      <Avatar size="small" />
      <HintText>Some hint text?</HintText>
    </Hint>
    <Button onClick={onClose}>Close</Button>
  </ModalFooter>
);

export default class LozengeExamples extends PureComponent {
  state = { commonIsOpen: false, customIsOpen: false }
  toggleCommon = () => this.setState(state => ({ commonIsOpen: !state.commonIsOpen }))
  toggleCustom = () => this.setState(state => ({ customIsOpen: !state.customIsOpen }))

  render() {
    const { commonIsOpen, customIsOpen } = this.state;

    return (
      <div>
        <ButtonGroup>
          <Button onClick={this.toggleCommon}>Open Common Modal</Button>
          <Button onClick={this.toggleCustom}>Open Custom Modal</Button>
        </ButtonGroup>

        {/* Most often you'll only need a title, action and children  */}
        <Modal
          actions={[
            { text: 'Close Modal', onClick: this.toggleCommon },
            { text: 'Open Custom Modal', onClick: this.toggleCustom },
          ]}
          isOpen={commonIsOpen}
          onDialogDismissed={this.toggleCommon}
          title="The Modal Header"
        >
          <Lorem count={2} />
        </Modal>

        {/* For something more custom, you can overide the header, body, and footer  */}
        <Modal
          isOpen={customIsOpen}
          header={Header}
          footer={Footer}
          onDialogDismissed={this.toggleCustom}
          width="small"
        >
          <CustomBody>
            <Lorem count={1} />
            <Image src="https://atlaskit.atlassian.com/a857e9e1cf8677895f76f7763098083b.svg" />
            <Lorem count={1} />
          </CustomBody>
        </Modal>
      </div>
    );
  }
}
