import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { FilmStripNavigator } from '@atlaskit/media-filmstrip';

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
  padding: 0 0 8px 0;
`;

export interface Props {
  children?: React.ReactNode;
}

export default class MediaGroupNode extends PureComponent<Props, {}> {
  render() {
    return (
      <Wrapper>
        <FilmStripNavigator>{this.props.children}</FilmStripNavigator>
      </Wrapper>
    );
  }
}
