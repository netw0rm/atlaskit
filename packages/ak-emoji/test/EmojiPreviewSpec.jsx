import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import styles from 'style!../src/style.less';
import EmojiPreview from '../src/internal/EmojiPreview';
import ToneSelector from '../src/internal/ToneSelector';
import Emoji from '../src/Emoji';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

function skinVariation(id) {
  return {
    imagePath: `https://path-to-skin-variation-tone${id}.png`,
    width: 24,
    height: 24,
  };
}

const emoji = {
  shortcut: ':head_on_fire:',
  representation: {
    imagePath: '',
    width: 24,
    height: 24,
  },
  skinVariations: [
    skinVariation(1),
    skinVariation(2),
    skinVariation(3),
    skinVariation(4),
    skinVariation(5),
  ],
};

const toneEmoji = {
  shortcut: ':raised_back_of_hand:',
  representation: {
    imagePath: '',
    width: 24,
    height: 24,
  },
  skinVariations: [
    skinVariation(1),
    skinVariation(2),
    skinVariation(3),
    skinVariation(4),
    skinVariation(5),
  ],
};

describe('<ToneSelector />', () => {
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
      expect(wrapper).to.have.state('selectingTone', true);
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
      expect(first, 'Emoji shortcut').to.have.prop('shortcut').to.equal(emoji.shortcut);
      expect(first, 'Emoji skin variation').to.have.prop('representation').to.have.all.keys(skinVariation(1));
      const second = wrapper.find(Emoji).at(1);
      expect(second, 'Tone shortcut').to.have.prop('shortcut').to.equal(toneEmoji.shortcut);
      expect(second, 'Tone skin variation').to.have.prop('representation').to.have.all.keys(skinVariation(1));
    });

    it('button should show default tone if selected tone is not specified', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      expect(wrapper.find(Emoji), 'Emoji in preview').to.have.length(2);
      const first = wrapper.find(Emoji).first();
      expect(first, 'Emoji shortcut').to.have.prop('shortcut').to.equal(emoji.shortcut);
      expect(first, 'Emoji skin variation').to.have.prop('representation').to.have.all.keys(emoji.representation);
      const second = wrapper.find(Emoji).at(1);
      expect(second, 'Tone shortcut').to.have.prop('shortcut').to.equal(toneEmoji.shortcut);
      expect(second, 'Tone skin variation').to.have.prop('representation').to.have.all.keys(toneEmoji.representation);
    });

    it('should stop selecting tone when tone selected', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      wrapper.instance().onToneButtonClick();
      wrapper.instance().onToneSelected();
      expect(wrapper).to.have.state('selectingTone', false);
    });

    it('should pass onToneSelected to tone selector', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      wrapper.instance().onToneButtonClick();

      expect(wrapper.find(ToneSelector)).to.have.prop('onToneSelected', wrapper.instance().onToneSelected);
    });

    it('should stop selecting tone on mouse leave', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      wrapper.instance().onToneButtonClick();

      wrapper.simulate('mouseLeave');
      expect(wrapper).to.have.state('selectingTone', false);
    });
  });
});
