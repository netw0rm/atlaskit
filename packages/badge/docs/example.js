import React from 'react';
import styled from 'styled-components';
import Badge from '@atlaskit/badge';
import { colors } from '@atlaskit/theme';

const Container = styled.div`
  color: ${colors.text};
  max-width: 360px;
`;
const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Badges = () => (
  <Container>
    <Row>
      <span>Default</span>
      <Badge value={5} />
    </Row>
    <Row>
      <span>Primary</span>
      <Badge appearance="primary" value={-5} />
    </Row>
    <Row>
      <span>Important</span>
      <Badge appearance="important" value={25} />
    </Row>
    <Row>
      <span>Added (no theme change)</span>
      <Badge appearance="added" max={99} value={3000} />
    </Row>
    <Row>
      <span>Removed (no theme change)</span>
      <Badge appearance="removed" />
    </Row>
  </Container>
);

export default Badges;
