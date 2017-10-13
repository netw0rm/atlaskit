// @flow
import React, { Component } from 'react';
import Modal from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';

import { Actions, ActionItem, Body, Heading, Image } from '../styled/Modal';
import type { ActionsType, ChildrenType, ElementType } from '../types';

/* eslint-disable react/no-unused-prop-types */
type Props = {|
  /** Buttons to render in the footer */
  actions?: ActionsType,
  /** The elements rendered in the modal */
  children: ChildrenType,
  /** Path to the the your image */
  image?: string,
  /** Optional element rendered above the body */
  header?: ElementType,
  /** Optional element rendered below the body */
  footer?: ElementType,
  /** Heading text rendered above the body */
  heading?: string,
|};
/* eslint-enable react/no-unused-prop-types */

const noop = () => {};

export default class OnboardingModal extends Component {
  props: Props; // eslint-disable-line react/sort-comp

  render() {
    const {
      footer: footerElement, header: headerElement,
      actions, children, heading, image, ...props
    } = this.props;

    // NOTE: @atlaskit/modal-dialog expects a component for header/footer. This
    // is inconsistent with Spotlight so we take the element and create a component.
    const footer = footerElement ? () => footerElement : null;
    const header = headerElement ? () => headerElement : null;

    const footerComponent = footer || (actions ? () => (
      <Actions>
        {actions.map(({ text, ...rest }, idx) => {
          const variant = idx ? 'subtle-link' : 'help';

          return (
            <ActionItem key={text || idx}>
              <Button appearance={variant} autoFocus={!idx} {...rest}>
                {text}
              </Button>
            </ActionItem>
          );
        })}
      </Actions>
    ) : null);

    const headerComponent = header || (image
      ? () => <Image alt={heading} src={image} />
      : null);

    return (
      <Modal
        autoFocus
        footer={footerComponent}
        header={headerComponent}
        onClose={noop}
        scrollBehavior="outside"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEscapePress={false}
        {...props}
      >
        <Body>
          {heading && <Heading>{heading}</Heading>}
          {children}
        </Body>
      </Modal>
    );
  }
}
