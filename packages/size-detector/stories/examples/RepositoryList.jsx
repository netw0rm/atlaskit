import React from 'react';
import SizeDetector from '@atlaskit/size-detector';
import RepoList from './dummy-repo-list';
import RepoTable from './dummy-repo-table';

const data = [
  {
    repo: 'AtlasKit',
    project: 'Unit tests',
    owner: 'Morty',
    updated: '2016-09-07',
  },
  {
    repo: 'Confluence',
    project: 'Storybook examples',
    owner: 'Cassowary',
    updated: '2017-06-01',
  },
  {
    repo: 'JIRA',
    project: 'Website',
    owner: 'Homer Simpson',
    updated: '2017-09-07',
  },
];

export default class RepositoryList extends React.Component {
  render() {
    return (
      <SizeDetector>
        {(width) => {
          if (width > 600) {
            return <RepoTable data={data} />;
          }
          return <RepoList data={data} />;
        }}
      </SizeDetector>
    );
  }
}
