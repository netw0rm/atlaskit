import React from 'react';

import { storiesOf, action } from '@kadira/storybook';

import {
  ResultParser,
  ResultsList,
} from '../src';
import { name } from '../package.json';
import sampleResultData from './helpers/sample-result-data';

import mockSearchData from '../test/helpers/mock-search-response-short';

const containerStyles = {
  width: '300px',
  background: 'white',
};

const resizableContainerStyles = {
  ...containerStyles,
  resize: 'vertical',
  overflow: 'auto',
  height: '210px',
};

storiesOf(`${name}/ResultsList`, module)
  .add('basic list', () => (
    <div style={containerStyles}>
      <ResultsList
        resultGroups={{
          Convsersations: sampleResultData.Conversations.slice(0, 5),
        }}
      />
    </div>
  ))
  .add('no results', () => (
    <div style={containerStyles}>
      <ResultsList
        resultGroups={{}}
      />
    </div>
  ))
  .add('list with scroll', () => (
    <div style={resizableContainerStyles}>
      <ResultsList
        resultGroups={sampleResultData}
      />
    </div>
  ))
  .add('list scales number of results to fit height', () => (
    <div>
      <h1>Resize the frame to trim the results list</h1>
      (Mininum list size set to 3 items)
      <div style={containerStyles}>
        <ResultsList
          resultsType="recent"
          resultGroups={sampleResultData}
        />
      </div>
    </div>
  ))
  .add('list w/ onSearchTerminate callback', () => (
    <div style={containerStyles}>
      <ResultsList
        resultGroups={sampleResultData}
        onSearchTerminate={action('close-search')}
      />
    </div>
  ))
  .add('list w/ grouped results', () => (
    <div style={containerStyles}>
      <ResultsList
        resultGroups={mockSearchData.parsed}
      />
    </div>
  ))
  .add('grouped results list w/ type-specific callbacks', () => (
    <div style={containerStyles}>
      <ResultsList
        resultGroups={mockSearchData.parsed}
        resultCallbacks={{
          HipChatConversation: action('hipchat-conversation-click'),
          unknown: action('non-hipchat-links-not-yet-supported'),
        }}
      />
    </div>
  ))
  .add('list w/ custom result parser', () => (
    <div>
      <h1>This result parser ignores groups</h1>
      <div style={containerStyles}>
        <ResultsList
          resultGroups={mockSearchData.parsed}
          resultParser={new ResultParser(() => {}, {})}
        />
      </div>
    </div>
  ));
