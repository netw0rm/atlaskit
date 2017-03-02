import {
  akColorB300,
  akColorB400,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import * as React from 'react';
import { PureComponent } from 'react';

//tslint:disable-next-line
const LinkInternal = styled.a`
  color: ${akColorB400};

  &:hover {
    color: ${akColorB300};
    text-decoration: underline;
  }
`;

export interface Props {
  url: string;
}

export default class Link extends PureComponent<Props, {}> {
  render() {
    const { props } = this;
    return (
      <LinkInternal href={props.url}>{props.children}</LinkInternal>
    );
  }
}
