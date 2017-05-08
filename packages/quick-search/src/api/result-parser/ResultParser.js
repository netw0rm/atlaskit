import React from 'react';

import { AkNavigationItemGroup } from '@atlaskit/navigation';

import hcPersonParser from './HipChatPersonParser';
import hcRoomParser from './HipChatRoomParser';
import Result from '../../components/Result';
import unknownParser from './UnknownResultParser';

export class IResultParser {} // Placeholder for TS interface

export class ResultParser extends /** implements */ IResultParser {
  constructor(onSearchTerminate, callbacks) {
    super();
    this.onSearchTerminate = onSearchTerminate;
    this.callbacks = callbacks || {};
  }

  parse = resultGroups =>
    Object.keys(resultGroups)
      .reduce((totalResults, key) => {
        totalResults.push(this.parseList(resultGroups[key]));
        return totalResults;
      }, []);

  parseList = dataList => (
    dataList
      .map(this.parseSingle)
      .filter(x => x !== null)
  );

  parseSingle = (data) => {
    if (!data || !data.type) {
      return null;
    }

    let parser;
    let actionCallback;
    switch (data.type) {
      case 'hc.room':
        parser = hcRoomParser;
        actionCallback = this.callbacks.HipChatConversation;
        break;
      case 'mention':
        parser = hcPersonParser;
        actionCallback = this.callbacks.HipChatConversation;
        break;
      default:
        parser = unknownParser;
        actionCallback = this.callbacks.unknown;
    }

    const resultProps = parser.parse(
      data,
      actionCallback,
      this.onSearchTerminate
    );
    return React.createElement(Result, resultProps);
  }
}

export class GroupedResultsParser extends /** implements */ IResultParser {
  constructor(onSearchTerminate, callbacks) {
    super();
    this.resultParser = new ResultParser(onSearchTerminate, callbacks);
  }

  parse = (resultGroups) => {
    if (Object.keys(resultGroups).length === 1) {
      return this.resultParser.parseList(
        resultGroups[Object.keys(resultGroups)[0]]
      );
    }

    return Object.keys(resultGroups).map(group =>
      React.createElement(
        AkNavigationItemGroup,
        { title: group, key: group },
        this.resultParser.parseList(resultGroups[group]),
      )
    );
  }
}
