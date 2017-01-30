import React from 'react';
import { CommentAction } from 'ak-comment';

const clickHandler = e => console.log(`${e.target.textContent} was clicked.`);

export default (
  <CommentAction onClick={clickHandler}>
    Reply
  </CommentAction>
);
