import * as React from 'react';
import { PureComponent } from 'react';
import Avatar from '@atlaskit/avatar';
import styled from 'styled-components';

const itemContainer: any = styled.div`
  display: flex;
  flex-shrink: 0;
`;

const avatarContainer: any = styled.div`
  flex: 1 1 0%;
  padding: 4px;
`;

const commentContainer: any = styled.div`
  flex: 1 1 100%;
  padding: 4px;
`;

export interface Props {
  authorAvatarUrl: string;
  authorDisplayName: string;
  body: string;
}

export default class InlineComment extends PureComponent<Props, {}> {
  render() {
    const {
      authorAvatarUrl,
      body,
      authorDisplayName,
    } = this.props;
    return (
      <itemContainer>
        <avatarContainer>
          <Avatar size="medium" src={authorAvatarUrl} />
        </avatarContainer>
        <commentContainer>
          <div><strong>{authorDisplayName}</strong></div>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </commentContainer>
      </itemContainer>
    );
  }
}
