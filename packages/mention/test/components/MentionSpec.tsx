import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';

import * as styles from '../../src/components/Mention/styles';
import Mention from '../../src/components/Mention';
import ResourcedMention from '../../src/components/Mention/ResourcedMention';
import { mentionData, mentionProvider } from '../_mock-mention-provider';

describe('<Mention />', () => {
  describe('Mention', () => {
    it('should render based on mention data', () => {
      const mention = shallow(<Mention {...mentionData} />);
      expect(mention.text()).to.equal(mentionData.text);
    });

    it('should add a highlight class if `isHighlighted` is set to true', () => {
      const mention = shallow(<Mention {...mentionData} isHighlighted={true} />);
      expect(mention.hasClass(styles.highlighted)).to.equal(true);
    });

    it('should dispatch onClick-event', () => {
      const spy = sinon.spy();
      const mention = mount(<Mention {...mentionData} onClick={spy} />);
      mention.simulate('click');
      expect(spy.called).to.equal(true);
      expect(spy.calledWith(mentionData.id, mentionData.text)).to.equal(true);
    });

    it('should dispatch onMouseEnter-event', () => {
      const spy = sinon.spy();
      const mention = mount(<Mention {...mentionData} onMouseEnter={spy} />);
      mention.simulate('mouseenter');
      expect(spy.called).to.equal(true);
      expect(spy.calledWith(mentionData.id, mentionData.text)).to.equal(true);
    });

    it('should dispatch onMouseLeave-event', () => {
      const spy = sinon.spy();
      const mention = mount(<Mention {...mentionData} onMouseLeave={spy} />);
      mention.simulate('mouseleave');
      expect(spy.called).to.equal(true);
      expect(spy.calledWith(mentionData.id, mentionData.text)).to.equal(true);
    });
  });

  describe('ResourcedMention', () => {
    it('should render a stateless mention component based on mention data', () => {
      const mention = mount(<ResourcedMention {...mentionData} mentionProvider={mentionProvider} />);
      expect(mention.find(Mention).first().text()).to.equal(mentionData.text);
    });

    it('should render a highlighted statless mention component if mentionProvider.shouldHighlightMention returns true', () => {
      const mention = mount(<ResourcedMention id="oscar" text="@Oscar Wallhult" mentionProvider={mentionProvider} />);

      return mentionProvider.then(() => {
        expect(mention.find(Mention).first().hasClass(styles.highlighted)).to.equal(true);
      });
    });

    it('should not render highlighted mention component if there is no mentionProvider', () => {
      const mention = mount(<ResourcedMention id="oscar" text="@Oscar Wallhult" />);
      expect(mention.find(Mention).first().hasClass(styles.highlighted)).to.equal(false);
    });

    it('should dispatch onClick-event', () => {
      const spy = sinon.spy();
      const mention = mount(<ResourcedMention {...mentionData} mentionProvider={mentionProvider} onClick={spy} />);
      mention.simulate('click');
      expect(spy.called).to.equal(true);
      expect(spy.calledWith(mentionData.id, mentionData.text)).to.equal(true);
    });

    it('should dispatch onMouseEnter-event', () => {
      const spy = sinon.spy();
      const mention = mount(<ResourcedMention {...mentionData} mentionProvider={mentionProvider} onMouseEnter={spy} />);
      mention.simulate('mouseenter');
      expect(spy.called).to.equal(true);
      expect(spy.calledWith(mentionData.id, mentionData.text)).to.equal(true);
    });

    it('should dispatch onMouseLeave-event', () => {
      const spy = sinon.spy();
      const mention = mount(<ResourcedMention {...mentionData} mentionProvider={mentionProvider} onMouseLeave={spy} />);
      mention.simulate('mouseleave');
      expect(spy.called).to.equal(true);
      expect(spy.calledWith(mentionData.id, mentionData.text)).to.equal(true);
    });
  });
});
