// @flow
import React from 'react';
import styled from 'styled-components';
import { colors, grid } from './constants';
import type { DropResult } from '../../src/types';

type Props = {|
  result: DropResult,
  index: ?number,
|}

const Container = styled.div`
  display: flex;
  align-items: baseline;
`;

const Index = styled.small`
  color: ${colors.blue};
  padding-right: ${grid}px;
  margin: 0;
  width: 1em;
`;

const Id = styled.small`
  padding-right: ${grid}px;
  margin: 0;
  width: 3em;
`;

const IndexTitle = styled.small`
  color: ${colors.blue};
  margin: 0;
`;

const Arrow = styled.span`
  padding-left: ${grid}px;
  padding-right: ${grid}px;
`;

export default ({ result, index }: Props) => (
  <Container>
    <Index>{index != null ? index : '*'}</Index>
    <Id>(id: {result.draggableId})</Id>
    <div>
      <IndexTitle>index</IndexTitle> {result.source.index} <Arrow>→</Arrow> <IndexTitle>index</IndexTitle> {result.destination ? result.destination.index : '*'}
    </div>
  </Container>
);
