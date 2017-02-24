import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';

import { mount, shallow } from 'enzyme';
import EmojiButton from '../src/internal/emoji-button';
import Selector from '../src/internal/selector';
import { defaultReactions } from '../src/internal/selector';
import { emojiService } from '../stories/examples/emoji-service';

const { expect } = chai;

const renderSelector = (onSelection: Function = () => {}) => {
  return <Selector emojiService={emojiService} onSelection={onSelection} />;
};

describe('@atlaskit/reactions/selector', () => {

  it('should render default reactions', () => {
    const selector = shallow(renderSelector());
    const emojis = selector.find(EmojiButton);

    expect(emojis.length).to.equal(defaultReactions.length);

    emojis.forEach(emoji => {
      expect(defaultReactions.indexOf(emoji.props().emoji.shortcut)).not.to.equal(-1);
    });
  });

  it('should call "onSelection" on selection', () => {
    const onSelection = sinon.spy();
    const selector = mount(renderSelector(onSelection));
    selector.find(EmojiButton).first().simulate('mouseup', { button: 0 });
    expect(onSelection.called).to.equal(true);
  });

});
