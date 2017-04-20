import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';

import { mount } from 'enzyme';
import { Reactions, OnEmoji } from '../src';
import { compareEmojiId } from '../src/internal/helpers';
import Reaction from '../src/internal/reaction';
import { reactionsProvider } from '../stories/examples/reactions-provider';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';
import { smileyId } from './test-data';

const { getEmojiResourcePromise } = emojiTestData.emojiTestData;

const { expect } = chai;

const demoAri = 'ari:cloud:demo:123:123';

// Override "subscribe" so that it resovles instantly.
const subscribe = reactionsProvider.subscribe;
sinon.stub(reactionsProvider, 'subscribe', (ari: string, handler: Function) => {
  subscribe.call(reactionsProvider, ari, handler);
  reactionsProvider.notifyUpdated(demoAri, (reactionsProvider as any).cachedReactions[ari]);
});

const renderReactions = (onClick: OnEmoji = () => { }) => {
  return <Reactions ari={demoAri} reactionsProvider={reactionsProvider} emojiProvider={getEmojiResourcePromise()} onReactionClick={onClick} />;
};

const getSortedReactions = () => {
  const reactionSummaries = (reactionsProvider as any).cachedReactions[demoAri];
  return [...reactionSummaries].sort((a, b) => compareEmojiId(a.emojiId, b.emojiId));
};

describe('@atlaskit/reactions/reactions', () => {

  it('should trigger "onReactionClick" when Reaction is clicked', () => {
    const onReactionClick = sinon.spy();
    const reactions = mount(renderReactions(onReactionClick));

    reactions.find(Reaction).first().simulate('mouseup', { button: 0 });
    expect(onReactionClick.called).to.equal(true);
    reactions.unmount();
  });

  it('should render reactions based on response from reactions service', () => {
    const reactions = mount(renderReactions());
    const sortedReactions = getSortedReactions();

    expect(reactions.length).to.equal(1);
    const reactionElements = reactions.find(Reaction);
    expect(reactionElements.length).to.equal(sortedReactions.length);

    // NOTE: Type definitions for enzyme is wrong. forEach takes a second parameter (index).
    (reactionElements as any).forEach((reaction, index) => {
      expect(reaction.props().reaction).to.deep.equal(sortedReactions[index]);
    });
    reactions.unmount();
  });

  it('should update when reactions service emits notifyUpdated', () => {
    const reactions = mount(renderReactions());
    const sortedReactions = getSortedReactions();

    const reactionElements = reactions.find(Reaction);
    expect(reactionElements.length).to.equal(sortedReactions.length);

    return reactionsProvider.addReaction(demoAri, smileyId)
      .then(state => {
        reactionsProvider.notifyUpdated(demoAri, state);
        expect(reactions.find(Reaction).length).to.equal(sortedReactions.length + 1);
        reactions.unmount();
      });
  });

});
