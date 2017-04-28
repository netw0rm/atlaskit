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
    return dataList
      .map(this.parseSingle)
      .filter(x => x !== null);
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

  parse = (resultGroups) => {
    if (!resultGroups || !Object.keys(resultGroups).length) {
      return [];
    }

    if (Object.keys(resultGroups).length === 1) {
      return this.resultParser.parse(
        resultGroups[Object.keys(resultGroups)[0]]
      );
    }

    return Object.keys(resultGroups).map(group =>
      <AkContainerItemGroup title={group} key={group}>
        {this.resultParser.parse(resultGroups[group])}
      </AkContainerItemGroup>
    );
  }
}
