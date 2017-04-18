import { Emoji, EmojiDescription, toEmojiId } from '@atlaskit/emoji';
import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';
import { waitUntil } from '@atlaskit/util-common-test';
import { mount, shallow } from 'enzyme';

import { emojiVisible } from './test-utils';
import Reaction from '../src/internal/reaction';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojiResourcePromise, emojiRepository } = emojiTestData.emojiTestData;

const { expect } = chai;

const grinning: EmojiDescription = emojiRepository.findByShortName(':grinning:') as EmojiDescription;
const renderReaction = (reacted: boolean, count: number, onClick: Function) => {
  const reactionData = {
    ari: 'ari:cloud:demo:123:123',
    emojiId: toEmojiId(grinning),
    count: count,
    reacted: reacted
  };

  return <Reaction reaction={reactionData} emojiProvider={getEmojiResourcePromise()} onClick={onClick} />;
};

describe('@atlaskit/reactions/reaction', () => {

  it('should render emoji with resolved emoji data', () => {
    const reaction = mount(renderReaction(false, 1, () => {}));

    return waitUntil(() => emojiVisible(reaction)).then(() => {
      const emoji = reaction.find(Emoji).first();
      expect(emoji.length).to.equal(1);
      const emojiDesc = emoji.prop('emoji');
      expect(emojiDesc.id).to.equal(grinning.id);
    });
  });

  it('should render with "reacted" css-class if user have reacted', () => {
    const reaction = shallow(renderReaction(true, 1, () => {}));
    expect(reaction.hasClass('reacted')).to.equal(true);
  });

  it('should call onClick on click', () => {
    const onClickSpy = sinon.spy();
    const reaction = mount(renderReaction(false, 1, onClickSpy));

    reaction.simulate('mouseup', { button: 0 });
    expect(onClickSpy.called).to.equal(true);
  });

});
