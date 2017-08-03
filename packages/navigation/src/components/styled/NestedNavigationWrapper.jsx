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
  flex-shrink: 0;
  flex-wrap: nowrap;
  width: 100%;

  /* as a flex child - take up the full height */
  flex-grow: 1;
`;

NestedNavigationWrapper.displayName = 'NestedNavigationWrapper';

export default NestedNavigationWrapper;
