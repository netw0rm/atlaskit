import { mount } from 'enzyme';
import * as React from 'react';

import * as styles from '../../../../src/components/common/styles';
import EmojiButton from '../../../../src/components/common/EmojiButton';
import { spriteEmoji, imageEmoji } from '../../../../src/support/test-data';

describe('<EmojiButton />', () => {
  describe('as sprite', () => {
    it('should call onClick on click', () => {
      const onClickSpy = jest.fn();
      const wrapper = mount(<EmojiButton
        emoji={spriteEmoji}
        onSelected={onClickSpy}
      />);

      wrapper.find(`.${styles.emojiButton}`).simulate('mousedown', { button: 0 });
      expect(onClickSpy).toHaveBeenCalled();
    });
  });

  describe('as image', () => {
    it('should call onClick on click', () => {
      const onClickSpy = jest.fn();
      const wrapper = mount(<EmojiButton
        emoji={imageEmoji}
        onSelected={onClickSpy}
      />);

      wrapper.find(`.${styles.emojiButton}`).simulate('mousedown', { button: 0 });
      expect(onClickSpy).toHaveBeenCalled();
    });
  });
});
