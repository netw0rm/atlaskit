import { Emoji } from '@atlaskit/emoji';
import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';

import { mount, shallow } from 'enzyme';
import EmojiButton from '../src/internal/emoji-button';
import { emojiService } from '../stories/examples/emoji-service';

const { expect } = chai;

const emojiData = emojiService.all().emojis.filter(e => e.shortcut === 'smiley')[0];

const renderEmojiButton = (onClick: Function = () => {} ) => {
  return <EmojiButton onClick={onClick} emoji={emojiData} />;
};

describe('@atlaskit/reactions/emoji-button', () => {

  it('should render a button', () => {
    const emojiButton = shallow(renderEmojiButton());
    expect(emojiButton.find('button').length).to.equal(1);
  });

  it('should render an emoji', () => {
    const emojiButton = shallow(renderEmojiButton());
    const emoji = emojiButton.find(Emoji);
    expect(emoji.length).to.equal(1);
    expect(emoji.first().props()).to.deep.equal(emojiData);
  });

  it('should call "onClick" when clicked', () => {
    const onClick = sinon.spy();
    const emojiButton = mount(renderEmojiButton(onClick));
    emojiButton.simulate('mouseup', { button: 0 });
    expect(onClick.called).to.equal(true);
  });

});
