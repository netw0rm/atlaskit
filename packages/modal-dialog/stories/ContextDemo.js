// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withContextFromProps } from '@atlaskit/layer-manager';
import ModalDemo from './ModalDemo';

const ContextTypes = {
  greeting: PropTypes.string,
  name: PropTypes.string,
};

const ModalWithContext = (props, context) => (
  <ModalDemo heading={props.heading}>
    <blockquote>
      {context.greeting}, my name is {context.name}.
    </blockquote>
    {props.children}
  </ModalDemo>
);
ModalWithContext.contextTypes = ContextTypes;

const ContextProvider = withContextFromProps(ContextTypes);

export default () => (
  <ContextProvider greeting="Hello" name="Charlie">
    <ModalWithContext heading="Props as expected">
      <p>Render whatever you like as children.</p>
    </ModalWithContext>
  </ContextProvider>
);
