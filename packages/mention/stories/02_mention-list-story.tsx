import * as React from 'react';
import { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { name } from '../package.json';
import styled from 'styled-components';
import { MentionDescription } from '../src/types';
import { HttpError } from '../src/api/MentionResource';
import MentionList from '../src/components/MentionList';
import { mentions } from './story-data';

// tslint:disable:next-line variable-name
const StoryStyle = styled.div`
  padding: 10px;
`;

function randomMentions() {
  return mentions.filter(() => Math.random() < 0.7);
}

export interface Props {}

export interface State {
  mentions: MentionDescription[];
}

class RefreshableMentionList extends Component<Props, State> {
  private mentionListRef: MentionList;

  constructor(props) {
    super(props);
    this.state = {
      mentions: randomMentions(),
    };
  }

  private updateData = () => {
    this.setState({
      mentions: randomMentions(),
    });
  }

  private moveUp = () => {
    if (this.mentionListRef) {
      // FIXME reactify should expose prototype methods from a wc
      this.mentionListRef.selectPrevious();
    }
  }

  private moveDown = () => {
    if (this.mentionListRef) {
      this.mentionListRef.selectNext();
    }
  }

  private handleMentionListRef = (ref) => {
    this.mentionListRef = ref;
  }

  render() {
    const mentionList = (
      <MentionList
        mentions={this.state.mentions}
        onSelection={action('onSelection')}
        ref={this.handleMentionListRef}
      />
    );

    return (
      <div style={{ paddingLeft: '10px' }}>
        <div style={{ paddingBottom: '10px' }}>
          <button onClick={this.updateData} style={{ height: '30px', marginRight: '10px' }}>Random refresh</button>
          <button onClick={this.moveUp} style={{ height: '30px', marginRight: '10px' }}>Up</button>
          <button onClick={this.moveDown} style={{ height: '30px', marginRight: '10px' }}>Down</button>
        </div>
        {mentionList}
      </div>
    );
  }
}

function createSpecialMentions() {
  return [
    {
      id: '123',
      avatarUrl: 'ak-numvatar:23',
      name: 'All room members',
      mentionName: 'all'
    },
    {
      id: '321',
      avatarUrl: 'ak-numvatar:2',
      name: 'Available room members',
      mentionName: 'here'
    }
  ];
}

class SpecialMentionList extends Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      mentions: createSpecialMentions()
    };
  }

  render() {
    return (
      <MentionList
        mentions={this.state.mentions}
      />
    );
  }
}

storiesOf(`${name}/MentionList`, module)
  .add('simple mention list', () => <RefreshableMentionList />)
  .add('mention list with numeric avatar items', () => (
    <StoryStyle>
      <SpecialMentionList />
    </StoryStyle>
  ))
  .add('generic error mention list', () => (
    <StoryStyle>
      <MentionList resourceError={new Error('monkey trousers')} mentions={[]} />
    </StoryStyle>
  ))
  .add('error mention list for 401', () => (
    <StoryStyle>
      <MentionList resourceError={new HttpError(401, 'not used')} mentions={[]} />
    </StoryStyle>
  ))
  .add('error mention list for 403', () => (
    <StoryStyle>
      <MentionList resourceError={new HttpError(403, 'not used')} mentions={[]} />
    </StoryStyle>
  ));

