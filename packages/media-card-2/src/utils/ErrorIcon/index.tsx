/* tslint:disable: variable-name */
import * as React from 'react';
import styled from 'styled-components';
import {akColorY400} from '@atlaskit/util-shared-styles';
import Icon from '@atlaskit/icon/glyph/warning';

export const Wrapper = styled.div`
  display: flex;
  color: ${akColorY400};
`;

export class ErrorIcon extends React.Component<{}, {}> {
  render() {
    return (
      <Wrapper>
        <Icon label="error" size="small"/>
      </Wrapper>
    );
  }
}
