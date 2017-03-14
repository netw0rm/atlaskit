import { shallow } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';

import * as styles from '../src/components/common/styles';
import Emoji from '../src/components/common/Emoji';

import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { spriteEmoji, imageEmoji } = emojiTestData.emojiTestData;

describe('<Emoji />', () => {
  describe('as sprite', () => {
    it('should use spritesheet if present', () => {
      const wrapper = shallow(<Emoji
        emoji={spriteEmoji}
      />);

      const sprite = wrapper.find(`.${styles.emojiSprite}`);
      expect((sprite.prop('style') || {}).backgroundImage).to.equal('url(https://path-to-spritesheet.png)');
    });

    it('should use percentage for background-position', () => {
      const wrapper = shallow(<Emoji
        emoji={spriteEmoji}
      />);

      const sprite = wrapper.find(`.${styles.emojiSprite}`);
      expect((sprite.prop('style') || {}).backgroundPosition).to.equal('20% 20%');
    });

    it('should use zoom the background image', () => {
      const wrapper = shallow(<Emoji
        emoji={spriteEmoji}
      />);

      const sprite = wrapper.find(`.${styles.emojiSprite}`);
      const size = ((sprite.prop('style') || {}) as any).backgroundSize;
      expect(size).to.equal('600% 600%');
    });

    it('should be selected', () => {
      const wrapper = shallow(<Emoji
        emoji={spriteEmoji}
        selected
      />);

      expect((wrapper.find(`.${styles.emojiContainer}`)).hasClass((styles.selected))).to.equal(true);
    });
  });

  describe('as image', () => {
    it('should use image by default', () => {
      const wrapper = shallow(<Emoji
        emoji={imageEmoji}
      />);

      const sprite = wrapper.find(`.${styles.emoji}`);
      expect((sprite.prop('style') || {}).backgroundImage).to.equal('url(https://path-to-image.png)');
    });

    it('should be selected', () => {
      const wrapper = shallow(<Emoji
        emoji={imageEmoji}
        selected
      />);

      const sprite = wrapper.find(`.${styles.emoji}`);
      expect((sprite).hasClass((styles.selected))).to.equal(true);
    });
  });
});
