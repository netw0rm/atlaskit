import { shallow } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';

import {
  ContainerStyle,
  EmojiStyle,
} from '../src/components/common/styles';
import { default as Emoji, getSpriteProps } from '../src/components/common/Emoji';
import { spriteEmoji, imageEmoji } from './TestData';
import { spriteUtils } from '../src/components/common/styles';

describe('<Emoji />', () => {
  describe('as sprite', () => {
    it('should use spritesheet if present', () => {
      const spriteProps = getSpriteProps({ emoji: spriteEmoji });
      expect(spriteUtils.backgroundImage(spriteProps)).to.equal('url(https://path-to-spritesheet.png)');
    });

    it('should use percentage for background-position', () => {
      const spriteProps = getSpriteProps({ emoji: spriteEmoji });
      expect(spriteUtils.backgroundPosition(spriteProps)).to.equal('20% 20%');
    });

    it('should use zoom the background image', () => {
      const spriteProps = getSpriteProps({ emoji: spriteEmoji });
      expect(spriteUtils.backgroundSize(spriteProps)).to.equal('600% 600%');
    });

    it('should be selected', () => {
      const wrapper = shallow(<Emoji
        emoji={spriteEmoji}
        selected={true}
      />);

      expect((wrapper.find(ContainerStyle)).prop('selected')).to.equal(true);
    });
  });

  describe('as image', () => {
    it('should use image by default', () => {
      const wrapper = shallow(<Emoji
        emoji={imageEmoji}
      />);

      const image = wrapper.find(EmojiStyle).find('img');
      expect((image.prop('src') || {})).to.equal('https://path-to-image.png');
    });

    it('should be selected', () => {
      const wrapper = shallow(<Emoji
        emoji={imageEmoji}
        selected={true}
      />);

      const image = wrapper.find(EmojiStyle);
      expect(image.prop('selected')).to.equal(true);
    });
  });
});
