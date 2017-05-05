const path = require('path');

module.exports = [
  { name: 'Comment', src: path.join(__dirname, '../src/index.jsx') },
  { name: 'CommentAction', src: path.join(__dirname, '../src/CommentAction.jsx') },
  { name: 'CommentAuthor', src: path.join(__dirname, '../src/CommentAuthor.jsx') },
  { name: 'CommentTime', src: path.join(__dirname, '../src/CommentTime.jsx') },
  { name: 'CommentEdited', src: path.join(__dirname, '../src/CommentEdited.jsx') },
  { name: 'CommentLayout', src: path.join(__dirname, '../src/layout/CommentLayout.jsx') },
];
