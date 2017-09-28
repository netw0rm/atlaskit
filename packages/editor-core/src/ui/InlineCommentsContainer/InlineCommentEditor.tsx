import * as React from 'react';
import { PureComponent } from 'react';
import Avatar from '@atlaskit/avatar';
import Editor from '../../editor';
import EditorContext from '../../editor/ui/EditorContext';
import styled from 'styled-components';

// tslint:disable-next-line:variable-name
const ItemContainer: any = styled.div`
  display: flex;
  flex-shrink: 0;
`;

// tslint:disable-next-line:variable-name
const AvatarContainer: any = styled.div`
  flex: 1 1 0%;
  padding: 2px;
`;

// tslint:disable-next-line:variable-name
const CommentContainer: any = styled.div`
  flex: 1 1 100%;
  padding: 4px;
`;

export interface Props {
  authorAvatarUrl: string;
}

export default class InlineComment extends PureComponent<Props, {}> {
  render() {
    const {
      authorAvatarUrl,
    } = this.props;
    return (
      <ItemContainer>
        <AvatarContainer>
          <Avatar size="medium" src={authorAvatarUrl} />
        </AvatarContainer>
        <CommentContainer>
          <EditorContext>
            <Editor appearance="message" saveOnEnter={true} placeholder="Reply" />
          </EditorContext>
        </CommentContainer>
      </ItemContainer>
    );
  }
}
