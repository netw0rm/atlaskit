// @flow
import React from 'react';

import ScrollHintWrapper from '../styled/ScrollHintWrapper';
import ScrollHintScrollContainer from '../styled/ScrollHintScrollContainer';
import ContainerNavigationChildrenInner from '../styled/ContainerNavigationChildrenInner';
import type { ReactElement } from '../../types';

type Props = {
  children?: ReactElement,
  hasScrollHintBottom?: boolean,
  hasScrollHintTop?: boolean,
  scrollRef?: () => void,
};

const ContainerNavigationChildren = ({
  children,
  hasScrollHintBottom,
  hasScrollHintTop,
  scrollRef,
}: Props) => (
  <ScrollHintWrapper
    hasScrollHintBottom={hasScrollHintBottom}
    hasScrollHintTop={hasScrollHintTop}
  >
    <ScrollHintScrollContainer innerRef={scrollRef}>
      <ContainerNavigationChildrenInner>
        {children}
      </ContainerNavigationChildrenInner>
    </ScrollHintScrollContainer>
  </ScrollHintWrapper>
);
ContainerNavigationChildren.displayName = 'ContainerNavigationChildren';
export default ContainerNavigationChildren;
