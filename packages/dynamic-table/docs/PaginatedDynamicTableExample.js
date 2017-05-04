import React from 'react';
import DefaultTable from '@atlaskit/dynamic-table';

const caption = 'Simple Table';
const head = {
  cells: [
    { key: 'word', content: 'Name', isSortable: true, width: 25 },
    { key: 'association', content: 'An Association', isSortable: false, width: 50 },
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

const PaginatedTableExample = () => (
  <DefaultTable
    caption={caption}
    head={head}
    rows={rows}
    rowsPerPage={2}
    defaultPage={2}
    defaultSortKey="word"
    defaultSortOrder="ASC"
    onSetPage={e => console.log('now on page', e)}
  />
);

export default PaginatedTableExample;
