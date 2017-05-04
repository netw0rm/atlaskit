import React from 'react';
import DefaultTable from '@atlaskit/dynamic-table';

const caption = 'Simple Table';
const head = {
  cells: [
    { key: 'word', content: 'Name', isSortable: true, width: 1, shouldTruncate: true },
    { key: 'association', content: 'An Association', isSortable: false, width: 3 },
  ],
};
const rows = [
  {
    cells: [
      { key: 'scissor', content: 'scissor' },
      { key: 'association', content: (<p>crafts</p>) },
    ],
  },
  {
    cells: [
      { key: 'paper', content: 'paper' },
      { key: 'association', content: (<p>books</p>) },
    ],
  },
  {
    cells: [
      { key: 'rock', content: 'rock' },
      { key: 'association', content: (<p>hiking</p>) },
    ],
  },
];

const DefaultTableExample = () => (
  <DefaultTable
    caption={caption}
    head={head}
    rows={rows}
    defaultSortKey="word"
    defaultSortOrder="ASC"
    onSort={e => console.log(e)}
  />
);

export default DefaultTableExample;
