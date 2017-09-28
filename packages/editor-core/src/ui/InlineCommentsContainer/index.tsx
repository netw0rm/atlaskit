import * as React from 'react';
import { PureComponent } from 'react';
import { EditorView } from '../../prosemirror';
import { InlineCommentMarkerState } from '../../plugins/inline-comment-marker';
import InlineComment from './InlineComment';
import InlineCommentEditor from './InlineCommentEditor';
import styled from 'styled-components';

export interface InlineCommentsProviderInterface {
  getComment: (ref: string) => Promise<any>;
  getViewer: () => Promise<any>;
  putComment: (authorID: string, comment: any) => void;
}

export interface Props {
  editorView: EditorView;
  pluginState: InlineCommentMarkerState;
  provider: InlineCommentsProviderInterface;
}

// tslint:disable-next-line:variable-name
const Container: any = styled.div`
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 4px;
  position: absolute;
  right: 10px;
  width: 300px;
`;

/**
 * TODO:
 * - Make this show and hide based on InlineCommentMarkerState.active
 * - Position this correctly based on where the comment node is
 * - Fetch comments
 * - Show only comments relevant to the active id
 */

export default class InlineCommentContainer extends PureComponent<Props, {}> {
  state: any = {
    comments: [
      {
        id: 3155362498,
        authorDisplayName: 'Marco De Jongh',
        authorUserName: 'mdejongh',
        authorAvatarUrl: 'https://pug.jira-dev.com/wiki/aa-avatar/769b8c92aa2206c17e887b29778c6c0e?s=48&d=https%3A%2F%2Fpug.jira-dev.com%2Fwiki%2Fdownload%2Fattachments%2F1652097080%2Fuser-avatar%3FnoRedirect%3Dtrue',
        body: '<p>(by exception). Although if this service isnt worthy of a exception I don\'t know what is.</p>',
        hasDeletePermission: true,
        hasEditPermission: true,
        lastModificationDate: 'Sep 14, 2017',
        commentDateUrl: 'https://pug.jira-dev.com/pages/viewpage.action?pageId=3155264080&focusedCommentId=3155362498#comment-3155362498',
        markerRef: 'd2d05cff-b952-4bd1-9a18-6ba2d9f1da6a',
        parentCommentId: 0,
        originalSelection: 'Is blessed',
        resolveProperties: {
          resolved: false,
          resolvedTime: 0,
          resolvedByDangling: false
        },
        hasResolvePermission: true,
        hasReplyPermission: true
      }
    ],
    viewer: {
      authorAvatarUrl: 'https://pug.jira-dev.com/wiki/aa-avatar/769b8c92aa2206c17e887b29778c6c0e?s=48&d=https%3A%2F%2Fpug.jira-dev.com%2Fwiki%2Fdownload%2Fattachments%2F1652097080%2Fuser-avatar%3FnoRedirect%3Dtrue',
    }
  };

  render() {
    const { comments, viewer } = this.state;
    const allComments = comments.map(data => (
      <InlineComment
        authorAvatarUrl={data.authorAvatarUrl}
        authorDisplayName={data.authorDisplayName}
        body={data.body}
      />
    ));
    return (
      <Container>
        {allComments}
        <InlineCommentEditor authorAvatarUrl={viewer.authorAvatarUrl} />
      </Container>
    );
  }
}
