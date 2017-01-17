import React from 'react';
import { CommentAuthor } from 'ak-comment';

const mouseOverHandler = e => console.log(`${e.target.textContent} was moused over.`);

export default (
  <CommentAuthor href="/author" onMouseOver={mouseOverHandler}>
    John Smith
  </CommentAuthor>
);
