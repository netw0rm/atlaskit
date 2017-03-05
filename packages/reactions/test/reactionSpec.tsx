import { Emoji } from '@atlaskit/emoji';
import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';

import { mount, shallow } from 'enzyme';
import Reaction from '../src/internal/reaction';
import { emojiService } from '../stories/examples/emoji-service';

const { expect } = chai;

const renderReaction = (reacted: boolean, count: number, onClick: Function) => {
  const reactionData = {
    ari: 'ari:cloud:demo:123:123',
    emojiId: 'grinning',
    count: count,
    reacted: reacted
  };

  return <Reaction reaction={reactionData} emojiService={emojiService} onClick={onClick} />;
};

describe('@atlaskit/reactions/reaction', () => {

  it('should render emoji with resolved emoji data', () => {
    const reaction = shallow(renderReaction(false, 1, () => {}));

    const emoji = reaction.find(Emoji).first();
    expect(emoji.length).to.equal(1);
    expect(emoji.props()).to.have.property('id');
    expect(emoji.props()).to.have.property('name');
    expect(emoji.props()).to.have.property('shortcut');
    expect(emoji.props()).to.have.property('type');
    expect(emoji.props()).to.have.property('category');
    expect(emoji.props()).to.have.property('order');
    expect(emoji.props()).to.have.property('skinVariations');
    expect(emoji.props()).to.have.property('representation');
    expect(emoji.props()).to.have.property('hasSkinVariations');
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
