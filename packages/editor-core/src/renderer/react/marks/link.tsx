import * as React from 'react';
import {
  akColorB300,
  akColorB400,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

// tslint:disable-next-line:variable-name
const StyledAnchor = styled.a`
  color: ${akColorB400};

  &:hover {
    color: ${akColorB300};
    text-decoration: underline;
  }
`;

export interface Props {
  children?: any;
  href: string;
  target?: string;
}

export default function Link(props, params)  {
  const {
    href,
    target = '_blank',
  } = props;

  const anchorProps: any = {
    href,
    target,
    title: href,
  };

  return (
    <StyledAnchor key={params.key} {...anchorProps}>{params.children}</StyledAnchor>
  );
}
