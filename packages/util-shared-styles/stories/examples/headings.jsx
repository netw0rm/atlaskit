import React from 'react';
import styled from 'styled-components';
import {
  akTypographyH900,
  akTypographyH800,
  akTypographyH700,
  akTypographyH600,
  akTypographyH500,
  akTypographyH400,
  akTypographyH300,
  akTypographyH200,
  akTypographyH100,
} from '@atlaskit/util-shared-styles';

const H900 = styled.div`
  ${akTypographyH900};
`;

const H800 = styled.div`
  ${akTypographyH800};
`;

const H700 = styled.div`
  ${akTypographyH700};
`;

const H600 = styled.div`
  ${akTypographyH600};
`;

const H500 = styled.div`
  ${akTypographyH500};
`;

const H400 = styled.div`
  ${akTypographyH400};
`;

const H300 = styled.div`
  ${akTypographyH300};
`;

const H200 = styled.div`
  ${akTypographyH200};
`;

const H100 = styled.div`
  ${akTypographyH100};
`;

export default (
  <div>
    <H900>This is a heading styled as h900</H900>
    <H800>This is a heading styled as h800</H800>
    <H700>This is a heading styled as h700</H700>
    <H600>This is a heading styled as h600</H600>
    <H500>This is a heading styled as h500</H500>
    <H400>This is a heading styled as h400</H400>
    <H300>This is a heading styled as h300</H300>
    <H200>This is a heading styled as h200</H200>
    <H100>This is a heading styled as h100</H100>
  </div>
);
