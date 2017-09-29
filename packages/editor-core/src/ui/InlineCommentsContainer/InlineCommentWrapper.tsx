import * as React from 'react';
import { PureComponent } from 'react';
import Avatar from '@atlaskit/avatar';
import styled from 'styled-components';

// tslint:disable-next-line:variable-name
const ItemContainer: any = styled.div`
  display: flex;
  flex-shrink: 0;
  padding-bottom: 24px;

  &:last-child {
    padding-bottom: 16px;
  }
`;

// tslint:disable-next-line:variable-name
const AvatarContainer: any = styled.div`
  flex: 1 1 0%;
`;

// tslint:disable-next-line:variable-name
const CommentContainer: any = styled.div`
  flex: 1 1 100%;
  padding-left: 16px;
`;

export interface Props {
  authorAvatarUrl: string;
  children?: any;
}

export default class InlineComment extends PureComponent<Props, {}> {
  render() {
    const {
      authorAvatarUrl,
      children,
    } = this.props;
    return (
      <ItemContainer>
        <AvatarContainer>
          <Avatar size="medium" src={authorAvatarUrl} />
        </AvatarContainer>
        <CommentContainer>
          {children}
        </CommentContainer>
      </ItemContainer>
    );
  }
}
