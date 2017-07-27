import { Emoji, EmojiDescription, EmojiId, OnEmojiEvent, toEmojiId } from '@atlaskit/emoji';
import * as React from 'react';
import { waitUntil } from '@atlaskit/util-common-test';
import { mount, shallow } from 'enzyme';

import { emojiVisible } from './_test-utils';
import EmojiButton from '../../src/internal/emoji-button';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojiResourcePromise, emojiRepository } = emojiTestData.emojiTestData;

const smiley: EmojiDescription = emojiRepository.findByShortName(':smiley:') as EmojiDescription;
const emojiId: EmojiId = toEmojiId(smiley);

const renderEmojiButton = (onClick: OnEmojiEvent = () => {} ) => {
  return <EmojiButton onClick={onClick} emojiId={emojiId} emojiProvider={getEmojiResourcePromise()} />;
};

describe('@atlaskit/reactions/emoji-button', () => {

  it('should render a button', () => {
    const emojiButton = shallow(renderEmojiButton());
    expect(emojiButton.find('button').length).toBe(1);
  });

  it('should render an emoji', () => {
    const emojiButton = mount(renderEmojiButton());
    return waitUntil(() => emojiVisible(emojiButton)).then(() => {
      const emoji = emojiButton.find(Emoji);
      expect(emoji.length).toBe(1);
      expect(emoji.first().prop('emoji').id).toBe(emojiId.id);
    });
  });

  it('should call "onClick" when clicked', () => {
    const onClick = jest.fn();
    const emojiButton = mount(renderEmojiButton(onClick));
    emojiButton.simulate('mouseup', { button: 0 });
    expect(onClick).toHaveBeenCalled();
  });

});
