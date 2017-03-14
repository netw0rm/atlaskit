import * as sinon from 'sinon';
import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';

import * as styles from '../src/components/common/styles';
import EmojiButton from '../src/components/common/EmojiButton';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { spriteEmoji, imageEmoji } = emojiTestData.emojiTestData;

describe('<EmojiButton />', () => {
  describe('as sprite', () => {
    it('should call onClick on click', () => {
      const onClickSpy = sinon.spy();
      const wrapper = mount(<EmojiButton
        emoji={spriteEmoji}
        onSelected={onClickSpy}
      />);

      wrapper.find(`.${styles.emojiButton}`).simulate('mousedown', { button: 0 });
      expect(onClickSpy.called).to.equal(true);
    });
  });

  describe('as image', () => {
    it('should call onClick on click', () => {
      const onClickSpy = sinon.spy();
      const wrapper = mount(<EmojiButton
        emoji={imageEmoji}
        onSelected={onClickSpy}
      />);

      wrapper.find(`.${styles.emojiButton}`).simulate('mousedown', { button: 0 });
      expect(onClickSpy.called).to.equal(true);
    });
  });
});
