import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';
import { OnEmojiEvent } from '@atlaskit/emoji';

import { mount, shallow } from 'enzyme';
import EmojiButton from '../src/internal/emoji-button';
import Selector from '../src/internal/selector';
import { defaultReactions, isDefaultReaction } from '../src/internal/selector';
import { getEmojiResource } from '../stories/examples/emoji-provider';

const { expect } = chai;

const renderSelector = (onSelection: OnEmojiEvent = () => {}) => {
  return <Selector emojiProvider={getEmojiResource()} onSelection={onSelection} />;
};

describe('@atlaskit/reactions/selector', () => {

  it('should render default reactions', () => {
    const selector = shallow(renderSelector());
    const emojis = selector.find(EmojiButton);

    expect(emojis.length).to.equal(defaultReactions.length);

    emojis.forEach(emoji => {
      expect(isDefaultReaction(emoji.props().emojiId.id)).to.equal(true);
    });
  });

  it('should call "onSelection" on selection', () => {
    const onSelection = sinon.spy();
    const selector = mount(renderSelector(onSelection));
    selector.find(EmojiButton).first().simulate('mouseup', { button: 0 });
    expect(onSelection.called).to.equal(true);
  });

});
