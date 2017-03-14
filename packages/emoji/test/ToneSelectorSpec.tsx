import * as sinon from 'sinon';
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import ToneSelector from '../src/components/common/ToneSelector';
import EmojiButton from '../src/components/common/EmojiButton';
import { EmojiDescription, EmojiRepresentation } from '../src/types';

import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { imageEmoji } = emojiTestData.emojiTestData;

function skinVariation(id): EmojiRepresentation {
  return {
    imagePath: `https://path-to-skin-variation-tone${id}.png`,
    width: 24,
    height: 24,
  };
}

const handEmoji: EmojiDescription = {
  ...imageEmoji,
  id: 'raised_back_of_hand',
  shortcut: ':raised_back_of_hand:',
  skinVariations: [
    skinVariation(1),
    skinVariation(2),
    skinVariation(3),
    skinVariation(4),
    skinVariation(5),
  ],
};

describe('<ToneSelector />', () => {
  it('should display one emoji per skin variations + default', () => {
    const onToneSelectedSpy = sinon.spy();
    const wrapper = shallow(<ToneSelector
      emoji={handEmoji}
      onToneSelected={onToneSelectedSpy}
    />);

    expect(wrapper.find(EmojiButton)).to.have.length(6);
  });

  it('should call onToneSelected on click', () => {
    const onToneSelectedSpy = sinon.spy();
    const wrapper = mount(<ToneSelector
      emoji={handEmoji}
      onToneSelected={onToneSelectedSpy}
    />);

    wrapper.find(EmojiButton).first().simulate('mousedown', { button: 0 });
    expect(onToneSelectedSpy.calledWith(1)).to.equal(true);
  });
});
