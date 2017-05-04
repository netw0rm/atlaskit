const path = require('path');

module.exports = [
  { name: 'Comment', src: path.join(__dirname, '../src/index.jsx') },
  { name: 'Comment Action', src: path.join(__dirname, '../src/CommentAction.jsx') },
  { name: 'Comment Author', src: path.join(__dirname, '../src/CommentAuthor.jsx') },
  { name: 'Comment Time', src: path.join(__dirname, '../src/CommentTime.jsx') },
  { name: 'Comment Edited', src: path.join(__dirname, '../src/CommentEdited.jsx') },
  { name: 'Comment Layout', src: path.join(__dirname, '../src/layout/CommentLayout.jsx') },
];
