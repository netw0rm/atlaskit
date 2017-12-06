import React from 'react';
import styled from 'styled-components';
import AkAvatar from '@atlaskit/avatar';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';
import { akGridSize } from '@atlaskit/util-shared-styles';

import { AkProfilecardTrigger, AkProfileClient } from '../../src';

const gridUnit = parseInt(akGridSize, 10);

const OwnerAvatar = styled.span`
  margin-right: ${gridUnit}px;
  display: inline-block;
  vertical-align: middle;
`;

const Name = styled.span`
  display: flex;
  align-items: center;
  width: 100%;

  a {
    margin-left: ${gridUnit * 6}px;
  }
`;

const Truncate = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Key = styled.span`text-transform: uppercase;`;

const Empty = styled.span`font-style: italic;`;

const getHead = () => ({
  cells: [
    {
      key: 'name',
      content: 'name',
      width: 25,
      isSortable: true,
    },
    {
      key: 'key',
      content: 'key',
      width: 15,
      isSortable: true,
    },
    {
      key: 'type',
      content: 'type',
      shouldTruncate: true,
      isSortable: true,
    },
    {
      key: 'owner',
      content: 'owner',
      shouldTruncate: true,
      isSortable: true,
    },
    {
      key: 'category',
      content: 'category',
      shouldTruncate: true,
      isSortable: true,
    },
    {
      key: 'url',
      content: 'url',
      shouldTruncate: true,
    },
  ],
});

const getBody = () => ([
  {
    cells: [
      {
        key: 'name',
        content: <Name>name</Name>,
      },
      {
        key: 'projectKey',
        content: <Key>projectKey</Key>,
      },
      {
        key: 'key',
        content: (
          <span>
            <span>project</span>
          </span>
        ),
      },
      {
        key: 'leadDisplayName',
        content: (
          <AkProfilecardTrigger
            userId=""
            resourceClient={
              new AkProfileClient({
                url: '',
              })
            }
          >
            <Truncate>
              <OwnerAvatar>
                <AkAvatar src="https://jdog.jira-dev.com/secure/projectavatar?pid=40020&avatarId=40928" />
              </OwnerAvatar>
              <a rel="" title="" href="">
                <span style={{ border: '1px solid red' }}>lead</span>
              </a>
            </Truncate>
          </AkProfilecardTrigger>
        ),
      },
      {
        key: 'catName',
        content: (
          <span>
            <span>categoryName</span>
          </span>
        ),
      },
      {
        key: 'url',
        content: (
          <span>
            <Empty>empty</Empty>
          </span>
        ),
      },
    ],
  },
  {
    cells: [
      {
        key: 'name',
        content: <Name>name</Name>,
      },
      {
        key: 'projectKey',
        content: <Key>projectKey</Key>,
      },
      {
        key: 'key',
        content: (
          <span>
            <span>project</span>
          </span>
        ),
      },
      {
        key: 'lead',
        content: (
          <Truncate>
            <OwnerAvatar>
              <AkAvatar src="https://jdog.jira-dev.com/secure/projectavatar?pid=40020&avatarId=40928" />
            </OwnerAvatar>
            <a rel="" title="" href="">
              <span style={{ border: '1px solid red' }}>lead</span>
            </a>
          </Truncate>
        ),
      },
      {
        key: 'catName',
        content: (
          <span>
            <span>categoryName</span>
          </span>
        ),
      },
      {
        key: 'url',
        content: (
          <span>
            <Empty>empty</Empty>
          </span>
        ),
      },
    ],
  },
]);

export default class App extends React.PureComponent {
  render() {
    return (
      <div style={{ maxWidth: 530 }}>
        <DynamicTableStateless
          head={getHead()}
          isFixedSize
          rows={getBody()}
        />
      </div>
    );
  }
}
