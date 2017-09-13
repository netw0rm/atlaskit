import React, { PropTypes, PureComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import Lorem from 'react-lorem-component';
import { action } from '@kadira/storybook';

import ModalDialog from '../src';

function onClose() {
  action('the "onClose" handler is fired')();
}
const onClick = () => {};

export default class ModalDemo extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    footer: PropTypes.func,
    header: PropTypes.func,
    heading: PropTypes.string,
  }
  static defaultProps = {
    heading: 'New issue',
  }

  render() {
    const { children, footer, header, heading } = this.props;

    return (
      <ThemeProvider theme={{}}>
        <ModalDialog
          actions={!footer ? [{ text: 'Create issue', onClick }] : null}
          footer={footer}
          header={header}
          onClose={onClose}
          heading={heading}
          {...this.props}
        >
          {children || <Lorem count="1" />}
        </ModalDialog>
      </ThemeProvider>
    );
  }
}
