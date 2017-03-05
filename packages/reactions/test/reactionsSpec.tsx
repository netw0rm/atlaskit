import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';

import { mount } from 'enzyme';
import { Reactions } from '../src';
import Reaction from '../src/internal/reaction';
import { emojiService } from '../stories/examples/emoji-service';
import MockReactionsService from '../stories/examples/reactions-service';

const { expect } = chai;

const reactionsService = new MockReactionsService();
const demoAri = 'ari:cloud:demo:123:123';

// Override "subscribe" so that it resovles instantly.
const subscribe = reactionsService.subscribe;
sinon.stub(reactionsService, 'subscribe', (ari: string, handler: Function) => {
  subscribe.call(reactionsService, ari, handler);
  reactionsService.notifyUpdated(demoAri, (reactionsService as any).cachedReactions[ari]);
});

const renderReactions = (onClick: Function = () => { }) => {
  return <Reactions ari={demoAri} reactionsService={reactionsService} emojiService={emojiService} onReactionClick={onClick} />;
};

const getSortedReactions = () => {
  const reactionSummaries = (reactionsService as any).cachedReactions[demoAri];
  return [...reactionSummaries].sort((a, b) => a.emojiId > b.emojiId ? 1 : 0);
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

    return reactionsService.addReaction(demoAri, 'smiley')
      .then(state => {
        reactionsService.notifyUpdated(demoAri, state);
        expect(reactions.find(Reaction).length).to.equal(sortedReactions.length + 1);
        reactions.unmount();
      });
  });

});
