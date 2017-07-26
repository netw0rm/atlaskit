import * as React from 'react';
import { shallow, mount } from 'enzyme';

import ToneSelector from '../../../../src/components/common/ToneSelector';
import EmojiButton from '../../../../src/components/common/EmojiButton';
import { EmojiDescription, EmojiDescriptionWithVariations } from '../../../../src/types';
import { imageEmoji, generateSkinVariation } from '../../../../src/support/test-data';

const baseHandEmoji: EmojiDescription = {
  ...imageEmoji,
  id: 'raised_back_of_hand',
  shortName: ':raised_back_of_hand:',
};

const handEmoji: EmojiDescriptionWithVariations = {
  ...baseHandEmoji,
  skinVariations: [
    generateSkinVariation(baseHandEmoji, 1),
    generateSkinVariation(baseHandEmoji, 2),
    generateSkinVariation(baseHandEmoji, 3),
    generateSkinVariation(baseHandEmoji, 4),
    generateSkinVariation(baseHandEmoji, 5),
  ],
};

describe('<ToneSelector />', () => {
  it('should display one emoji per skin variations + default', () => {
    const onToneSelectedSpy = jest.fn();
    const wrapper = shallow(<ToneSelector
      emoji={handEmoji}
      onToneSelected={onToneSelectedSpy}
    />);

    expect(wrapper.find(EmojiButton)).toHaveLength(6);
  });

  it('should call onToneSelected on click', () => {
    const onToneSelectedSpy = jest.fn();
    const wrapper = mount(<ToneSelector
      emoji={handEmoji}
      onToneSelected={onToneSelectedSpy}
    />);

    wrapper.find(EmojiButton).first().simulate('mousedown', { button: 0 });
    expect(onToneSelectedSpy).toHaveBeenCalledWith(0);
  });
});
