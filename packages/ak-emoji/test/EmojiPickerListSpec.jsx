import chai from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import styles from 'style!../src/style.less';
import EmojiList from '../src/internal/picker/EmojiPickerList';

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

describe('<EmojiPickerList />', () => {
  describe('list', () => {
    it('should contain search ', () => {
      const wrapper = mount(<EmojiList
        emojis={emojis}
      />);

      expect(wrapper.find(`.${styles.search}`)).to.have.length(1);
    });
  });
});
