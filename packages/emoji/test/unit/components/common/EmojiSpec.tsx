import { shallow } from 'enzyme';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import Tooltip from '@atlaskit/tooltip';

import * as styles from '../../../../src/components/common/styles';
import Emoji from '../../../../src/components/common/Emoji';
import { spriteEmoji, imageEmoji } from '../../../../src/support/test-data';

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
        selected={true}
      />);

      expect((wrapper.find(`.${styles.emojiContainer}`)).hasClass((styles.selected))).to.equal(true);
    });

    it('should be wrapped in a tooltip if showTooltip is set to true', () => {
      const wrapper = shallow(<Emoji
        emoji={spriteEmoji}
        showTooltip={true}
      />);

      const tooltip = wrapper.find(Tooltip);
      expect(tooltip).to.have.length(1);
    });

    it('should not be wrapped in a tooltip if showTooltip is not set', () => {
      const wrapper = shallow(<Emoji
        emoji={spriteEmoji}
      />);

      const tooltip = wrapper.find(Tooltip);
      expect(tooltip).to.have.length(0);
    });
  });

  describe('as image', () => {
    it('should use image by default', () => {
      const wrapper = shallow(<Emoji
        emoji={imageEmoji}
      />);

      const image = wrapper.find(`.${styles.emoji} img`);
      expect((image.prop('src') || {})).to.equal('https://path-to-image.png');
    });

    it('should use altRepresentation image if fitToHeight is larger than representation height', () => {
      const wrapper = shallow(<Emoji
        emoji={imageEmoji}
        fitToHeight={26}
      />);

      const image = wrapper.find(`.${styles.emoji} img`);
      expect((image.prop('src') || {})).to.equal('https://alt-path-to-image.png');
    });

    it('should call onError handler with emoji using altRepresentation', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<Emoji
        emoji={imageEmoji}
        fitToHeight={26}
        onLoadError={spy}
      />);
      const fittedEmoji = {
        ...imageEmoji,
        representation: imageEmoji.altRepresentation,
      };
      const image = wrapper.find(`.${styles.emoji} img`);
      image.prop('onError')!({} as SyntheticEvent<HTMLElement>);
      expect(spy.callCount).to.equal(1);
      expect(spy.args[0][1]).to.deep.equal(fittedEmoji);
    });

    it('should be selected', () => {
      const wrapper = shallow(<Emoji
        emoji={imageEmoji}
        selected={true}
      />);

      const image = wrapper.find(`.${styles.emoji}`);
      expect((image).hasClass((styles.selected))).to.equal(true);
    });

    it('should be wrapped in a tooltip if showTooltip is set to true', () => {
      const wrapper = shallow(<Emoji
        emoji={imageEmoji}
        showTooltip={true}
      />);

      const tooltip = wrapper.find(Tooltip);
      expect(tooltip).to.have.length(1);
    });

    it('should not be wrapped in a tooltip if showTooltip is not set', () => {
      const wrapper = shallow(<Emoji
        emoji={imageEmoji}
      />);

      const tooltip = wrapper.find(Tooltip);
      expect(tooltip).to.have.length(0);
    });
  });
});
