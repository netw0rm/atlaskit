import * as React from 'react';
import { PureComponent } from 'react';
import { akTypographyMixins } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const H1 = styled.h1`${akTypographyMixins.h800}`;
const H2 = styled.h2`${akTypographyMixins.h700}`;
const H3 = styled.h3`${akTypographyMixins.h600}`;
const H4 = styled.h4`${akTypographyMixins.h500}`;
const H5 = styled.h5`${akTypographyMixins.h400}`;
const H6 = styled.h6`${akTypographyMixins.h300}`;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export default function Heading(props: { level: HeadingLevel } & React.Props<any>, params) {
  const { level } = props;
  const children = params.children;
  switch (level) {
    case 1:
      return <h1 key={props.key}>{children}</h1>;
    case 2:
      return <h2 key={props.key}>{children}</h2>;
    case 3:
      return <h3 key={props.key}>{children}</h3>;
    case 4:
      return <h4 key={props.key}>{children}</h4>;
    case 5:
      return <h5 key={props.key}>{children}</h5>;
    case 6:
      return <h6 key={props.key}>{children}</h6>;
  }
}
