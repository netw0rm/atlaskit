import React from 'react';
import { CommentEdited } from '@atlaskit/comment';

const mouseOverHandler = e => console.log(`${e.target.textContent} was moused over.`);
export default (
  <CommentEdited href="/EditHistory" onMouseOver={mouseOverHandler} editedText="Edited - Custom" />
);
