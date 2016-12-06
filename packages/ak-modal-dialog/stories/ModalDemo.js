import React, { PropTypes } from 'react';
import Button from 'ak-button';
import Lorem from 'react-lorem-component';
import ModalDialog from '../src';

// eslint-disable-next-line react/prefer-stateless-function
export default class ModalDemo extends React.PureComponent {
  static get propTypes() {
    return {
      header: PropTypes.element,
      children: PropTypes.element,
      footer: PropTypes.element,
    };
  }

  render() {
    const { header, children, footer } = this.props;

    return (
      <ModalDialog
        isOpen
        header={
          header || <span>New issue</span>
        }
        footer={
          footer || <Button appearance="primary">Create issue</Button>
        }
        {...this.props}
      >
        {children || <Lorem count="1" />}
      </ModalDialog>
    );
  }
}
