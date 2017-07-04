import React from 'react';
import SizeDetector from '@atlaskit/size-detector';
import RepoList from './styled-repo-list';

const data = [
  {
    repo: 'AtlasKit',
    project: 'Unit tests',
    owner: 'Morty',
    updated: '2016-09-07',
  },
  {
    repo: 'AtlasKit',
    project: 'Storybook examples',
    owner: 'Cassowary',
    updated: '2017-06-01',
  },
  {
    repo: 'AtlasKit',
    project: 'Website',
    owner: 'Homer Simpson',
    updated: '2017-09-07',
  },
];

export default class PullRequests extends React.Component {
  render() {
    return (
      <SizeDetector>
        {(width) => {
          if (width > 600) {
            return (
              <table>
                <thead>
                  <tr>
                    <th>Repository</th>
                    <th>Project</th>
                    <th>Owner</th>
                    <th>Last updated</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map(item => (
                      <tr>
                        <td>{item.repo}</td>
                        <td>{item.project}</td>
                        <td>{item.owner}</td>
                        <td>{item.updated}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            );
          }
          return (
            <RepoList>
              {
                data.map(item => [
                  <dt>Repository</dt>,
                  <dd>{item.repo}</dd>,
                  <dt>Project</dt>,
                  <dd>{item.project}</dd>,
                  <dt>Owner</dt>,
                  <dd>{item.owner}</dd>,
                  <dt>Last updated</dt>,
                  <dd>{item.updated}</dd>,
                ])
              }
            </RepoList>
          );
        }}
      </SizeDetector>
    );
  }
}
