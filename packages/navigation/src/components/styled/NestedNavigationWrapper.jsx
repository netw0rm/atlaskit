// @flow
import React from 'react';
import styled from 'styled-components';
import TransitionGroup from 'react-transition-group/TransitionGroup';

const NestedNavigationWrapper = styled(
  // Don't pass the traversalDirection prop to the TransitionGroup
  // eslint-disable-next-line no-unused-vars
  ({ traversalDirection, children, ...props }) => (
    <TransitionGroup {...props}>{children}</TransitionGroup>
  )
)`
  display: flex;
  flex-direction: ${({ traversalDirection }) => (traversalDirection === 'up' ? 'row' : 'row-reverse')};
  /* take up the full height - desirable when using drag-and-drop in nested nav */
  flex-grow: 1;
  flex-wrap: nowrap;
  max-height: 100%;
  /* make sure the wrapper doesn't scroll - each page should be an independent scroll container */
  overflow: hidden;
`;

NestedNavigationWrapper.displayName = 'NestedNavigationWrapper';

export default NestedNavigationWrapper;
