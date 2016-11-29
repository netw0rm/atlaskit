import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import styles from 'style!../src/style.less';
import EmojiPickerFooter from '../src/EmojiPickerFooter';
import ToneSelector from '../src/ToneSelector';
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

const emojis = [
  {
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
  },
];

describe('<ToneSelector />', () => {
  describe('preview', () => {
    it('should render an emoji preview if one is selected', () => {
      const wrapper = shallow(<EmojiPickerFooter
        emojis={emojis}
        selectedEmoji={emojis[0]}
      />);

      expect(wrapper.find(`.${styles.preview}`)).to.have.length(1);
    });

    it('should not render the emoji preview if one is not selected', () => {
      const wrapper = shallow(<EmojiPickerFooter
        emojis={emojis}
      />);

      expect(wrapper.find(`.${styles.preview}`)).to.have.length(0);
    });
  });

  describe('tone', () => {
    it('should display tone selector after clicking on the tone button', () => {
      const wrapper = shallow(<EmojiPickerFooter
        emojis={emojis}
      />);

      wrapper.find('#toneSelectorButton').first().simulate('click');
      expect(wrapper).to.have.state('selectingTone', true);
      expect(wrapper.find(ToneSelector)).to.have.length(1);
    });

    it('button should show current selected tone if provided', () => {
      const wrapper = mount(<EmojiPickerFooter
        emojis={emojis}
        selectedTone={1}
      />);

      expect(wrapper.find(Emoji)).to.have.length(1);
      expect(wrapper.find(Emoji).first()).to.have.prop('representation').to.have.all.keys(skinVariation(1));
    });

    it('button should show default tone if selected tone is not specified', () => {
      const wrapper = mount(<EmojiPickerFooter
        emojis={emojis}
      />);

      expect(wrapper.find(Emoji)).to.have.length(1);
      expect(wrapper.find(Emoji).first()).to.have.prop('representation').to.have.all.keys(emojis[0].representation);
    });

    it('should stop selecting tone when tone selected', () => {
      const wrapper = mount(<EmojiPickerFooter
        emojis={emojis}
      />);

      wrapper.instance().onButtonClick();
      wrapper.instance().onToneSelected();
      expect(wrapper).to.have.state('selectingTone', false);
    });

    it('should pass onToneSelected to tone selector', () => {
      const wrapper = mount(<EmojiPickerFooter
        emojis={emojis}
      />);

      wrapper.instance().onButtonClick();

      expect(wrapper.find(ToneSelector)).to.have.prop('onToneSelected', wrapper.instance().onToneSelected);
    });

    it('should stop selecting tone on mouse leave', () => {
      const wrapper = mount(<EmojiPickerFooter
        emojis={emojis}
      />);

      wrapper.instance().onButtonClick();

      wrapper.simulate('mouseLeave');
      expect(wrapper).to.have.state('selectingTone', false);
    });
  });
});
