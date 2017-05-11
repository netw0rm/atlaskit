import React from 'react';
import styled from 'styled-components';

import Logo from '@atlaskit/logo';

const Vert = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoExample = () => (
  <Vert>
    <Logo size="xlarge" />
    <Logo size="large" />
    <Logo size="medium" />
    <Logo size="small" />
    <Logo collapseTo="type" />
    <Logo collapseTo="icon" />
  </Vert>
);

export default LogoExample;
