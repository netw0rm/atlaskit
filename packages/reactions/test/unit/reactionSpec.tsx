import { Emoji, EmojiDescription, toEmojiId } from '@atlaskit/emoji';
import * as React from 'react';
import { waitUntil } from '@atlaskit/util-common-test';
import { mount, shallow } from 'enzyme';

import { emojiVisible } from './_test-utils';
import Reaction, { ReactionOnClick } from '../../src/internal/reaction';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojiResourcePromise, emojiRepository } = emojiTestData.emojiTestData;

const grinning: EmojiDescription = emojiRepository.findByShortName(':grinning:') as EmojiDescription;
const renderReaction = (reacted: boolean, count: number, onClick: ReactionOnClick) => {
  const reactionData = {
    ari: 'ari:cloud:owner:demo-cloud-id:item/1',
    containerAri: 'ari:cloud:owner:demo-cloud-id:container/1',
    emojiId: toEmojiId(grinning).id!,
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
      expect(emoji.length).toBe(1);
      const emojiDesc = emoji.prop('emoji');
      expect(emojiDesc.id).toBe(grinning.id);
    });
  });

  it('should render with "reacted" css-class if user have reacted', () => {
    const reaction = shallow(renderReaction(true, 1, (emojiId) => {}));
    expect(reaction.hasClass('reacted')).toBe(true);
  });

  it('should call onClick on click', () => {
    const onClickSpy = jest.fn();
    const reaction = mount(renderReaction(false, 1, onClickSpy));

    reaction.simulate('mouseup', { button: 0 });
    expect(onClickSpy).toHaveBeenCalled();
  });

});
