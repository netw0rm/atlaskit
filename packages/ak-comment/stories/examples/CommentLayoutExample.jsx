import React from 'react';
import Comment, { CommentAuthor, CommentLayout } from 'ak-comment';
import Avatar from 'ak-avatar';
import Editor from 'ak-editor-bitbucket';

const avatar = (<Avatar
  src="https://design.atlassian.com/images/avatars/project-128.png"
  label="AtlasKit avatar"
  size="medium"
/>);

export default (
  <CommentLayout
    avatar={avatar}
    content={
      <Editor
        isExpandedByDefault
        defaultValue="This editor is shown in place of a Comment."
      />
    }
  >
    <Comment
      avatar={avatar}
      author={<CommentAuthor>John Smith</CommentAuthor>}
      content={<div>This is a regular Comment.</div>}
    />
  </CommentLayout>
);
