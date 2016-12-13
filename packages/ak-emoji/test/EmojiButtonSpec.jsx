import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import { mount } from 'enzyme';
import React from 'react';
import styles from 'style!../src/style.less';
import EmojiButton from '../src/EmojiButton';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.use(sinonChai);
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
      expect(onClickSpy).to.have.been.called;
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
      expect(onClickSpy).to.have.been.called;
    });
  });
});
