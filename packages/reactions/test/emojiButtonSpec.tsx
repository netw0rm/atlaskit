import { Emoji, EmojiDescription, EmojiId, OnEmojiEvent } from '@atlaskit/emoji';
import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';
import { waitUntil } from '@atlaskit/util-common-test';
import { mount, shallow } from 'enzyme';

import { emojiVisible } from './test-utils';
import EmojiButton from '../src/internal/emoji-button';
import { getEmojiResource, getEmojiService } from '../stories/examples/emoji-provider';

const { expect } = chai;

// const emojiData = emojiService.all().emojis.filter(e => e.shortcut === 'smiley')[0];
const smiley: EmojiDescription = getEmojiService().findByShortcut('smiley') as EmojiDescription;
const emojiId: EmojiId = { id: smiley.id };

const renderEmojiButton = (onClick: OnEmojiEvent = () => {} ) => {
  return <EmojiButton onClick={onClick} emojiId={emojiId} emojiProvider={getEmojiResource()} />;
};

describe('@atlaskit/reactions/emoji-button', () => {

  it('should render a button', () => {
    const emojiButton = shallow(renderEmojiButton());
    expect(emojiButton.find('button').length).to.equal(1);
  });

  it('should render an emoji', () => {
    const emojiButton = mount(renderEmojiButton());
    return waitUntil(() => emojiVisible(emojiButton)).then(() => {
      const emoji = emojiButton.find(Emoji);
      expect(emoji.length).to.equal(1);
      expect(emoji.first().prop('emoji').id).to.equal(emojiId.id);
    });
  });

  it('should call "onClick" when clicked', () => {
    const onClick = sinon.spy();
    const emojiButton = mount(renderEmojiButton(onClick));
    emojiButton.simulate('mouseup', { button: 0 });
    expect(onClick.called).to.equal(true);
  });

});
