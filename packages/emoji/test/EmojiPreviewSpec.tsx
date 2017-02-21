import { shallow, mount } from 'enzyme';
import * as React from 'react';
import * as styles from '../src/components/common/styles';
import { expect } from 'chai';

import EmojiPreview from '../src/components/common/EmojiPreview';
import ToneSelector from '../src/components/common/ToneSelector';
import Emoji from '../src/components/common/Emoji';
import { EmojiDescription } from '../src/types';
import { imageEmoji } from './TestData';

function skinVariation(id) {
  return {
    imagePath: `https://path-to-skin-variation-tone${id}.png`,
    width: 24,
    height: 24,
  };
}

const emoji: EmojiDescription = {
  ...imageEmoji,
  skinVariations: [
    skinVariation(1),
    skinVariation(2),
    skinVariation(3),
    skinVariation(4),
    skinVariation(5),
  ],
};

const toneEmoji = {
  ...imageEmoji,
  id: 'raised_back_of_hand',
  shortcut: ':raised_back_of_hand:',
  name: 'Raised back of hand',
  skinVariations: [
    skinVariation(1),
    skinVariation(2),
    skinVariation(3),
    skinVariation(4),
    skinVariation(5),
  ],
};

describe('<EmojiPreview />', () => {
  describe('preview', () => {
    it('should render an emoji preview if one is selected', () => {
      const wrapper = shallow(<EmojiPreview
        emoji={emoji}
      />);

      expect(wrapper.find(`.${styles.preview}`), 'Preview rendered').to.have.length(1);
    });

    it('should not render the emoji preview if one is not selected', () => {
      const wrapper = shallow(<EmojiPreview />);

      expect(wrapper.find(`.${styles.preview}`), 'Preview not rendered').to.have.length(0);
    });
  });

  describe('tone', () => {
    it('should display tone selector after clicking on the tone button', () => {
      const wrapper = shallow(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      wrapper.find('#toneSelectorButton').first().simulate('click');
      expect((wrapper).state('selectingTone')).to.equal(true);
      expect(wrapper.find(ToneSelector), 'ToneSelector in preview').to.have.length(1);
    });

    it('button should show current selected tone if provided', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        selectedTone={1}
        toneEmoji={toneEmoji}
      />);

      expect(wrapper.find(Emoji), 'Emoji in preview').to.have.length(2);
      const first = wrapper.find(Emoji).first();
      const emoji1Prop = first.prop('emoji');
      expect(emoji1Prop, 'First has emoji prop').to.not.equal(undefined);
      expect(emoji1Prop.shortcut, 'Emoji shortcut').to.equal(emoji.shortcut);
      expect(emoji1Prop.representation, 'Emoji skin variation').to.have.all.keys(skinVariation(1));
      const second = wrapper.find(Emoji).at(1);
      const emoji2Prop = second.prop('emoji');
      expect(emoji2Prop, 'Second has emoji prop').to.not.equal(undefined);
      expect(emoji2Prop.shortcut, 'Tone shortcut').to.equal(toneEmoji.shortcut);
      expect(emoji2Prop.representation, 'Tone skin variation').to.have.all.keys(skinVariation(1));
    });

    it('button should show default tone if selected tone is not specified', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      expect(wrapper.find(Emoji), 'Emoji in preview').to.have.length(2);
      const first = wrapper.find(Emoji).first();
      const emoji1Prop = first.prop('emoji');
      expect(emoji1Prop.shortcut, 'Emoji shortcut').to.equal(emoji.shortcut);
      expect(emoji1Prop.representation, 'Emoji skin variation').to.have.all.keys(emoji.representation as Object);
      const second = wrapper.find(Emoji).at(1);
      const emoji2Prop = second.prop('emoji');
      expect(emoji2Prop.shortcut, 'Tone shortcut').to.equal(toneEmoji.shortcut);
      expect(emoji2Prop.representation, 'Tone skin variation').to.have.all.keys(toneEmoji.representation as Object);
    });

    it('should stop selecting tone when tone selected', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      const instance = wrapper.instance() as EmojiPreview;
      instance.onToneButtonClick();
      instance.onToneSelected(1);

      expect(wrapper.state('selectingTone')).to.equal(false);
    });

    it('should pass onToneSelected to tone selector', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      const instance = wrapper.instance() as EmojiPreview;
      instance.onToneButtonClick();

      expect(wrapper.find(ToneSelector).prop('onToneSelected')).to.equal(instance.onToneSelected);
    });

    it('should stop selecting tone on mouse leave', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      const instance = wrapper.instance() as EmojiPreview;
      instance.onToneButtonClick();

      wrapper.simulate('mouseLeave');
      expect(wrapper.state('selectingTone')).to.equal(false);
    });
  });
});
