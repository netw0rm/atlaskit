import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';

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

    it('should not render a tooltip on hover if there is no showTooltip prop', () => {
      const wrapper = mount(<Emoji
        emoji={spriteEmoji}
      />);
      wrapper.simulate('mouseenter');
      const tooltip = wrapper.find(`.${styles.emojiTooltip} span`);
      expect(tooltip).to.have.length(0);
    });

    it('should render a tooltip on hover if showTooltip is set to true', () => {
      const wrapper = mount(<Emoji
        emoji={spriteEmoji}
        showTooltip={true}
      />);
      wrapper.simulate('mouseenter');
      const tooltip = wrapper.find(`.${styles.emojiTooltip} span`);
      // One span for enclosing tooltip and span for emoji node
      expect(tooltip).to.have.length(2);
      expect(tooltip.at(0).prop('aria-label')).to.equal(spriteEmoji.shortName);
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

    it('should be selected', () => {
      const wrapper = shallow(<Emoji
        emoji={imageEmoji}
        selected={true}
      />);

      const image = wrapper.find(`.${styles.emoji}`);
      expect((image).hasClass((styles.selected))).to.equal(true);
    });

    it('should not render a tooltip on hover if there is no showTooltip prop', () => {
      const wrapper = mount(<Emoji
        emoji={imageEmoji}
      />);
      wrapper.simulate('mouseenter');
      const tooltip = wrapper.find(`.${styles.emojiTooltip} span`);
      expect(tooltip).to.have.length(0);
    });

    it('should render a tooltip on hover if showTooltip is set to true', () => {
      const wrapper = mount(<Emoji
        emoji={imageEmoji}
        showTooltip={true}
      />);
      wrapper.simulate('mouseenter');
      const tooltip = wrapper.find(`.${styles.emojiTooltip} span`);
      expect(tooltip).to.have.length(1);
      expect(tooltip.at(0).prop('aria-label')).to.equal(spriteEmoji.shortName);
    });
  });
});
