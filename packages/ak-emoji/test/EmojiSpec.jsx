import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { shallow } from 'enzyme';
import React from 'react';
import styles from 'style!../src/style.less';
import Emoji from '../src/Emoji';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

describe('<Emoji />', () => {
  describe('as sprite', () => {
    it('should use spritesheet if present', () => {
      const wrapper = shallow(<Emoji
        shortcut=":grimacing:"
        representation={{
          sprite: {
            url: 'https://path-to-spritesheet.png',
            row: 1,
            column: 1,
          },
        }}
      />);

      const sprite = wrapper.find(`.${styles.emojiSprite}`);
      expect(sprite).to.have.style('background-image', 'url(https://path-to-spritesheet.png)');
    });

    it('should use percentage for background-position', () => {
      const wrapper = shallow(<Emoji
        shortcut=":grimacing:"
        representation={{
          sprite: {
            url: 'https://path-to-spritesheet.png',
            row: 6,
            column: 6,
          },
          xIndex: 1,
          yIndex: 1,
        }}
      />);

      const sprite = wrapper.find(`.${styles.emojiSprite}`);
      expect(sprite).to.have.style('background-position', '20% 20%');
    });

    it('should use zoom the background image', () => {
      const wrapper = shallow(<Emoji
        shortcut=":grimacing:"
        representation={{
          sprite: {
            url: 'https://path-to-spritesheet.png',
            row: 6,
            column: 6,
          },
          xIndex: 1,
          yIndex: 1,
        }}
      />);

      const sprite = wrapper.find(`.${styles.emojiSprite}`);
      expect(sprite).to.have.style('background-size', '600% 600%');
    });

    it('should be selected', () => {
      const wrapper = shallow(<Emoji
        shortcut=":grimacing:"
        representation={{
          sprite: {
            url: 'https://path-to-spritesheet.png',
            row: 6,
            column: 6,
          },
          xIndex: 1,
          yIndex: 1,
        }}
        selected
      />);

      expect(wrapper.find(`.${styles.emojiContainer}`)).to.have.className(styles.selected);
    });
  });

  describe('as image', () => {
    it('should use image by default', () => {
      const wrapper = shallow(<Emoji
        shortcut=":grimacing:"
        representation={{
          imagePath: 'https://path-to-image.png',
          width: 24,
          height: 24,
        }}
      />);

      const sprite = wrapper.find(`.${styles.emoji}`);
      expect(sprite).to.have.style('background-image', 'url(https://path-to-image.png)');
    });

    it('should be selected', () => {
      const wrapper = shallow(<Emoji
        shortcut=":grimacing:"
        representation={{
          imagePath: 'https://path-to-image.png',
          width: 24,
          height: 24,
        }}
        selected
      />);

      const sprite = wrapper.find(`.${styles.emoji}`);
      expect(sprite).to.have.className(styles.selected);
    });
  });
});
