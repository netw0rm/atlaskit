import * as React from 'react';

import { mount } from 'enzyme';
import { Reactions, OnEmoji } from '../../src';
import { sortReactions } from '../../src/internal/helpers';
import Reaction from '../../src/internal/reaction';
import { reactionsProvider } from '../../src/mock-reactions-provider';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';
import { smileyId } from './_test-data';
import {ObjectReactionKey} from '../../src/reactions-resource';

const { getEmojiResourcePromise } = emojiTestData.emojiTestData;

const demoAri = 'ari:cloud:owner:demo-cloud-id:item/1';
const containerAri = 'ari:cloud:owner:demo-cloud-id:container/1';

// Override "subscribe" so that it resovles instantly.
const subscribe = reactionsProvider.subscribe;
jest.spyOn(reactionsProvider, 'subscribe').mockImplementation((objectReactionKey: ObjectReactionKey, handler: Function) => {
  subscribe.call(reactionsProvider, objectReactionKey, handler);
  reactionsProvider.notifyUpdated(containerAri, demoAri, (reactionsProvider as any).cachedReactions[reactionsProvider.objectReactionKeyToString(objectReactionKey)]);
});

const renderReactions = (onClick: OnEmoji = () => { }) => {
  return <Reactions containerAri={containerAri} ari={demoAri} reactionsProvider={reactionsProvider} emojiProvider={getEmojiResourcePromise()} onReactionClick={onClick} />;
};

const getSortedReactions = () => {
  const reactionSummaries = (reactionsProvider as any).cachedReactions[reactionsProvider.objectReactionKey(containerAri, demoAri)];
  return [...reactionSummaries].sort(sortReactions);
};

describe('@atlaskit/reactions/reactions', () => {

  it('should trigger "onReactionClick" when Reaction is clicked', () => {
    const onReactionClick = jest.fn();
    const reactions = mount(renderReactions(onReactionClick));

    reactions.find(Reaction).first().simulate('mouseup', { button: 0 });
    expect(onReactionClick).toHaveBeenCalled();
    reactions.unmount();
  });

  it('should render reactions based on response from reactions service', () => {
    const reactions = mount(renderReactions());
    const sortedReactions = getSortedReactions();

    expect(reactions.length).toBe(1);
    const reactionElements = reactions.find(Reaction);
    expect(reactionElements.length).toBe(sortedReactions.length);

    // NOTE: Type definitions for enzyme is wrong. forEach takes a second parameter (index).
    (reactionElements as any).forEach((reaction, index) => {
      expect(reaction.props().reaction).toEqual(sortedReactions[index]);
    });
    reactions.unmount();
  });

  it('should update when reactions service emits notifyUpdated', () => {
    const reactions = mount(renderReactions());
    const sortedReactions = getSortedReactions();

    const reactionElements = reactions.find(Reaction);
    expect(reactionElements.length).toBe(sortedReactions.length);

    return reactionsProvider.addReaction(containerAri, demoAri, smileyId.id!)
      .then(state => {
        reactionsProvider.notifyUpdated(containerAri, demoAri, state);
        expect(reactions.find(Reaction).length).toBe(sortedReactions.length + 1);
        reactions.unmount();
      });
  });

});
