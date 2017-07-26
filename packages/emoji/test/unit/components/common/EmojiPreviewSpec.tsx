import { shallow, mount } from 'enzyme';
import * as React from 'react';

import * as styles from '../../../../src/components/common/styles';
import EmojiPreview from '../../../../src/components/common/EmojiPreview';
import ToneSelector from '../../../../src/components/common/ToneSelector';
import Emoji from '../../../../src/components/common/Emoji';
import EmojiButton from '../../../../src/components/common/EmojiButton';
import { EmojiDescriptionWithVariations } from '../../../../src/types';
import { imageEmoji, generateSkinVariation } from '../../../../src/support/test-data';

const baseEmoji = imageEmoji;

const emoji: EmojiDescriptionWithVariations = {
  ...baseEmoji,
  skinVariations: [
    generateSkinVariation(imageEmoji, 1),
    generateSkinVariation(imageEmoji, 2),
    generateSkinVariation(imageEmoji, 3),
    generateSkinVariation(imageEmoji, 4),
    generateSkinVariation(imageEmoji, 5),
  ],
};

const baseToneEmoji = {
  ...imageEmoji,
  id: 'raised_back_of_hand',
  shortName: ':raised_back_of_hand:',
  name: 'Raised back of hand',
};

const toneEmoji: EmojiDescriptionWithVariations = {
  ...baseToneEmoji,
  skinVariations: [
    generateSkinVariation(baseToneEmoji, 1),
    generateSkinVariation(baseToneEmoji, 2),
    generateSkinVariation(baseToneEmoji, 3),
    generateSkinVariation(baseToneEmoji, 4),
    generateSkinVariation(baseToneEmoji, 5),
  ],
};

describe('<EmojiPreview />', () => {
  describe('preview', () => {
    it('should render an emoji preview if one is selected', () => {
      const wrapper = shallow(<EmojiPreview
        emoji={emoji}
      />);

      expect(wrapper.find(`.${styles.preview}`)).toHaveLength(1);
    });

    it('should not render the emoji preview if one is not selected', () => {
      const wrapper = shallow(<EmojiPreview />);

      expect(wrapper.find(`.${styles.preview}`)).toHaveLength(0);
    });
  });

  describe('tone', () => {
    it('should display tone selector after clicking on the tone button', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      wrapper.find(EmojiButton).simulate('mousedown', { button: 0 });
      expect(wrapper.state('selectingTone')).toBe(true);
      expect(wrapper.find(ToneSelector)).toHaveLength(1);
    });

    it('button should show current selected tone if provided', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        selectedTone={1}
        toneEmoji={toneEmoji}
      />);

      expect(wrapper.find(Emoji)).toHaveLength(2);
      const first = wrapper.find(Emoji).first();
      const emoji1Prop = first.prop('emoji');
      expect(emoji1Prop).not.toBe(undefined);
      expect(emoji1Prop.id).toBe(emoji.id);
      expect(emoji1Prop.shortName).toBe(emoji.shortName);
      const second = wrapper.find(Emoji).at(1);
      const selectedTone = toneEmoji!.skinVariations![0];
      const emoji2Prop = second.prop('emoji');
      expect(emoji2Prop).not.toBe(undefined);
      expect(emoji2Prop.id).toBe(selectedTone.id);
      expect(emoji2Prop.shortName).toBe(selectedTone.shortName);
    });

    it('button should show default tone if selected tone is not specified', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      expect(wrapper.find(Emoji)).toHaveLength(2);
      const first = wrapper.find(Emoji).first();
      const emoji1Prop = first.prop('emoji');
      expect(emoji1Prop.shortName).toBe(emoji.shortName);
      expect(Object.keys(emoji1Prop.representation)).toEqual(Object.keys(emoji.representation));
      const second = wrapper.find(Emoji).at(1);
      const emoji2Prop = second.prop('emoji');
      expect(emoji2Prop.shortName).toBe(toneEmoji.shortName);
      expect(Object.keys(emoji2Prop.representation)).toEqual(Object.keys(toneEmoji.representation));
    });

    it('should stop selecting tone when tone selected', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      const instance = wrapper.instance() as EmojiPreview;
      instance.onToneButtonClick();
      instance.onToneSelected(1);

      expect(wrapper.state('selectingTone')).toBe(false);
    });

    it('should pass onToneSelected to tone selector', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      const instance = wrapper.instance() as EmojiPreview;
      instance.onToneButtonClick();

      expect(wrapper.find(ToneSelector).prop('onToneSelected')).toBe(instance.onToneSelected);
    });

    it('should stop selecting tone on mouse leave', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      const instance = wrapper.instance() as EmojiPreview;
      instance.onToneButtonClick();

      wrapper.simulate('mouseLeave');
      expect(wrapper.state('selectingTone')).toBe(false);
    });

    // it('should render placeholder for unloaded media emoji', () => {
    //   const wrapper = shallow(<EmojiPreview
    //     emoji={mediaEmoji}
    //   />);

    //   const placeholders = wrapper.find(EmojiPlaceholder);
    //   expect(placeholders.length).toBe(1);
    //   const props = placeholders.get(0).props;
    //   expect(props.shortName, 'short name').toBe(mediaEmoji.shortName);
    // });
  });
});
