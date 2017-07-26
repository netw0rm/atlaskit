import * as React from 'react';
import { OnEmojiEvent } from '@atlaskit/emoji';

import { mount, shallow } from 'enzyme';
import EmojiButton from '../../src/internal/emoji-button';
import Selector from '../../src/internal/selector';
import { defaultReactions, isDefaultReaction } from '../../src/internal/selector';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojiResourcePromise } = emojiTestData.emojiTestData;

const renderSelector = (onSelection: OnEmojiEvent = () => {}) => {
  return <Selector emojiProvider={getEmojiResourcePromise()} onSelection={onSelection} />;
};

describe('@atlaskit/reactions/selector', () => {
  beforeEach(function () {
    jest.useFakeTimers();
  });

  afterEach(function () {
    jest.useRealTimers();
  });

  it('should render default reactions', () => {
    const selector = shallow(renderSelector());
    const emojis = selector.find(EmojiButton);

    expect(emojis.length).toBe(defaultReactions.length);

    emojis.forEach(emoji => {
      expect(isDefaultReaction(emoji.props().emojiId)).toBe(true);
    });
  });

  it('should call "onSelection" on selection', () => {
    const onSelection = jest.fn();
    const selector = mount(renderSelector(onSelection));
    selector.find(EmojiButton).first().simulate('mouseup', { button: 0 });

    jest.runTimersToTime(500);
    expect(onSelection).toHaveBeenCalled();
  });

});
