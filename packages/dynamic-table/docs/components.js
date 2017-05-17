const path = require('path');

module.exports = [
  { name: 'Stateful DynamicTable', src: path.join(__dirname, '../src/stateful.jsx') },
  { name: 'Stateless DynamicTable', src: path.join(__dirname, '../src/stateless.jsx') },
];
