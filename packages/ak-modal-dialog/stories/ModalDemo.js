import React, { PropTypes } from 'react';
import Button from 'ak-button';
import Lorem from 'react-lorem-component';
import { action } from '@kadira/storybook';
import ModalDialog from '../src';

function doSomethingOnClick() {
  action('the "onBlanketClicked" handler is fired')();
}

export default class ModalDemo extends React.PureComponent {
  static propTypes = {
    header: PropTypes.element,
    children: PropTypes.element,
    footer: PropTypes.element,
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
        onBlanketClicked={doSomethingOnClick}
        {...this.props}
      >
        {children || <Lorem count="1" />}
      </ModalDialog>
    );
  }
}
