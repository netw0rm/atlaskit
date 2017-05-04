import React from 'react';
import {
  CommentAuthor,
  CommentTime,
  CommentAction,
  CommentEdited,
} from '@atlaskit/comment';

const CommentSingleComponents = () => (
  <div>
    <div><CommentAuthor href="/author">John Smith</CommentAuthor></div>
    <div><CommentAction onClick={e => console.log(e.target.textContent)}>Like</CommentAction></div>
    <div><CommentTime>30 August, 2016</CommentTime></div>
    <div><CommentEdited>Show is edited</CommentEdited></div>
  </div>
);

export default CommentSingleComponents;
