const path = require('path');

module.exports = [
  { name: 'Pagination', src: path.join(__dirname, '../src/stateful.jsx') },
  { name: 'Stateless Pagination', src: path.join(__dirname, '../src/stateless.jsx') },
];
