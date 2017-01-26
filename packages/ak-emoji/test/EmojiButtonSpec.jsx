import chai from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import React from 'react';
import styles from 'style!../src/style.less';
import EmojiButton from '../src/internal/common/EmojiButton';

chai.should();
const expect = chai.expect;

describe('<EmojiButton />', () => {
  describe('as sprite', () => {
    it('should call onClick on click', () => {
      const onClickSpy = sinon.spy();
      const wrapper = mount(<EmojiButton
        shortcut=":grimacing:"
        representation={{
          sprite: {
            imagePath: 'https://path-to-spritesheet.png',
            row: 6,
            column: 6,
          },
          xIndex: 1,
          yIndex: 1,
        }}
        onClick={onClickSpy}
      />);

      wrapper.find(`.${styles.emojiButton}`).simulate('mousedown', { button: 0 });
      expect(onClickSpy.called).to.equal(true);
    });
  });

  describe('as image', () => {
    it('should call onClick on click', () => {
      const onClickSpy = sinon.spy();
      const wrapper = mount(<EmojiButton
        shortcut=":grimacing:"
        representation={{
          imagePath: 'https://path-to-image.png',
          width: 24,
          height: 24,
        }}
        onClick={onClickSpy}
      />);

      wrapper.mount(`.${styles.emojiButton}`).simulate('mousedown', { button: 0 });
      expect(onClickSpy.called).to.equal(true);
    });
  });
});
