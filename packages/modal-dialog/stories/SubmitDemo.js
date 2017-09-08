import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Button from '@atlaskit/button';
import Field from '@atlaskit/field-text';

import ModalDialog, { ModalFooter } from '../src';

const FORM = 'test-form';
const FRAME = 'submit-frame';
const NOOP = () => {};
const Iframe = styled.iframe`
  background: #f1ede4;
  border: 0 solid #f7d87c;
  border-left-width: 5px;
  bottom: 16px;
  box-shadow: 0 2px 11px -1px rgba(0, 0, 0, 0.18);
  height: 200px;
  left: 16px;
  opacity: ${props => (props.hasData ? 1 : 0)};
  position: absolute;
  transform: ${props => (props.hasData ? 'translateX(0)' : 'translateX(-30px)')};
  transition: opacity 200ms, transform 200ms ease-out;
  width: 400px;
  z-index: 500;
`;

export default class SubmitDemo extends Component {
  state = { hasData: false }
  handleLoad = () => this.setState({ hasData: true })
  render() {
    const { hasData } = this.state;
    const footer = props => (
      <ModalFooter showKeyline={props.showKeyline}>
        <span />
        <Button appearance="primary" form={FORM} type="submit">
          Create issue
        </Button>
      </ModalFooter>
    );

    return (
      <ThemeProvider theme={{}}>
        <div>
          <ModalDialog footer={footer} heading="Submit demo" onClose={NOOP}>
            <form action="https://httpbin.org/post" id={FORM} method="post" target={FRAME}>
              <p>Enter some text and then submit the form to see the response.</p>
              <Field label="Name" name="my-name" placeholder="Your name" />
              <Field label="Email" name="my-email" placeholder="gbelson@hooli.com" />
            </form>
          </ModalDialog>

          <Iframe
            hasData={hasData}
            onLoad={this.handleLoad}
            name={FRAME}
            heading="Form POST test"
          />
        </div>
      </ThemeProvider>
    );
  }
}
