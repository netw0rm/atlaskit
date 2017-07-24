import * as React from 'react';
import { PureComponent } from 'react';
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

export default class Link extends PureComponent<Props, {}> {
  render() {
    const {
      href,
      target = '_blank',
    } = this.props;

    const anchorProps: any = {
      href,
      target,
      title: href,
    };

    return (
      <StyledAnchor {...anchorProps}>{this.props.children}</StyledAnchor>
    );
  }
}
