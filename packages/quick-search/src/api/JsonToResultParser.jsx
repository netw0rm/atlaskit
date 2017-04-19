import React from 'react';
import { AkContainerItemGroup } from '@atlaskit/navigation';
import {
  HipChatPersonResult,
  HipChatRoomResult,
  UnknownResult,
} from '../components/Result';

export class JsonToResultParser {} // Placeholder for TS interface

export class ResultParser extends /** implements */ JsonToResultParser {
  constructor(onSearchTerminate, callbacks) {
    super();
    this.onSearchTerminate = onSearchTerminate;
    this.callbacks = callbacks;
  }

  parse = (dataList) => {
    if (!dataList || !dataList.length) {
      return [];
    }
    return dataList.map(data => this.parseSingle(data));
  }

  parseSingle = (data) => {
    if (!data || !data.type) {
      return null;
    }

    let className;
    let key;
    let callbackType;
    switch (data.type) {
      case 'hc.room':
        className = HipChatRoomResult;
        callbackType = 'HipChatConversation';
        key = `hc.room.${data.id}`;
        break;
      case 'mention':
        className = HipChatPersonResult;
        callbackType = 'HipChatConversation';
        key = `hc.person.${data.id}`;
        break;
      default:
        className = UnknownResult;
        callbackType = 'unknown';
        key = `${data.type}.${data.id}`;
    }

    return React.createElement(
      className,
      {
        ...data,
        key,
        callback: this.callbacks[callbackType],
        onSearchTerminate: this.onSearchTerminate,
      }
    );
  }
}

export class GroupedResultsParser extends /** implements */ JsonToResultParser {
  constructor(onSearchTerminate, callbacks) {
    super();
    this.resultParser = new ResultParser(onSearchTerminate, callbacks);
  }

  groupNameDictionary = {
    hc: 'Conversations',
    mention: 'Conversations',
    'jira-board': 'Boards',
    'jira-issue': 'Issues',
    'jira-project': 'Projects',
    'confluence-page': 'Pages',
    'confluence-space': 'Spaces',
  };

  getGroupName(key, defaultGroup = 'Other') {
    const groupKey = key.split('.')[0];
    return this.groupNameDictionary[groupKey] || defaultGroup;
  }

  parse = (dataList) => {
    if (!dataList || !dataList.length) {
      return [];
    }

    const groupedCmpnts = dataList
      .map(this.resultParser.parseSingle)
      .reduce((groups, result) => {
        const groupName = this.getGroupName(result.props.type);
        groups[groupName] = groups[groupName] || [];
        groups[groupName].push(result);
        return groups;
      }, {});

    return Object.keys(groupedCmpnts).map((group) => {
      const memberCmpnts = groupedCmpnts[group];
      return (
        <AkContainerItemGroup title={group} key={group}>
          {memberCmpnts}
        </AkContainerItemGroup>
      );
    });
  }
}
