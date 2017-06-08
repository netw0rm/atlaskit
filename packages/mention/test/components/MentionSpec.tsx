import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import Tooltip from '@atlaskit/tooltip';
import { MentionStyle } from '../../src/components/Mention/styles';
import Mention from '../../src/components/Mention';
import ResourcedMention from '../../src/components/Mention/ResourcedMention';
import { mentionData, mentionProvider } from '../_mock-mention-provider';

describe('<Mention />', () => {
  describe('Mention', () => {
    it('should render based on mention data', () => {
      const mention = shallow(<Mention {...mentionData} />);
      expect(mention.html()).to.contain(mentionData.text);
    });

    it('should add a highlight class if `isHighlighted` is set to true', () => {
      const mention = shallow(<Mention {...mentionData} isHighlighted={true} />);
      expect(mention.find(MentionStyle).prop('highlighted')).to.equal(true);
    });

    it('should dispatch onClick-event', () => {
      const spy = sinon.spy();
      const mention = mount(<Mention {...mentionData} onClick={spy} />);
      mention.find(MentionStyle).simulate('click');
      expect(spy.called).to.equal(true);
      expect(spy.calledWith(mentionData.id, mentionData.text)).to.equal(true);
    });

    it('should dispatch onMouseEnter-event', () => {
      const spy = sinon.spy();
      const mention = mount(<Mention {...mentionData} onMouseEnter={spy} />);
      mention.find(MentionStyle).simulate('mouseenter');
      expect(spy.called).to.equal(true);
      expect(spy.calledWith(mentionData.id, mentionData.text)).to.equal(true);
    });

    it('should dispatch onMouseLeave-event', () => {
      const spy = sinon.spy();
      const mention = mount(<Mention {...mentionData} onMouseLeave={spy} />);
      mention.find(MentionStyle).simulate('mouseleave');
      expect(spy.called).to.equal(true);
      expect(spy.calledWith(mentionData.id, mentionData.text)).to.equal(true);
    });

    it('should not display a tooltip if no accessLevel data', () => {
      const mention = mount(<Mention {...mentionData} />);
      expect(mention.find(Tooltip).length).to.equal(0);
    });

    it('should display tooltip if mentioned user does not have container permission', () => {
      const mention = mount(<Mention {...mentionData} accessLevel="NONE" />);
      expect(mention.find(Tooltip).length).to.equal(1);
    });

     it('should not display tooltip if mentioned user has container permission', () => {
      const mention = mount(<Mention {...mentionData} accessLevel="CONTAINER" />);
      expect(mention.find(Tooltip).length).to.equal(0);
    });

    it('should not display tooltip if mention is highlighted', () => {
      const mention = mount(<Mention {...mentionData} isHighlighted={true} />);
      expect(mention.find(Tooltip).length).to.equal(0);
    });
  });

  describe('ResourcedMention', () => {
    it('should render a stateless mention component based on mention data', () => {
      const mention = mount(<ResourcedMention {...mentionData} mentionProvider={mentionProvider} />);
      expect(mention.find(Mention).first().text()).to.equal(mentionData.text);
    });

    it('should render a highlighted statless mention component if mentionProvider.shouldHighlightMention returns true', async () => {
      const mention = mount(<ResourcedMention id="oscar" text="@Oscar Wallhult" mentionProvider={mentionProvider} />);

      await mentionProvider;
      expect(mention.find(Mention).first().find(MentionStyle).prop('highlighted')).to.equal(true);
    });

    it('should not render highlighted mention component if there is no mentionProvider', () => {
      const mention = mount(<ResourcedMention id="oscar" text="@Oscar Wallhult" />);
      expect(mention.find(Mention).first().find(MentionStyle).prop('highlighted')).to.equal(false);
    });

    it('should dispatch onClick-event', () => {
      const spy = sinon.spy();
      const mention = mount(<ResourcedMention {...mentionData} mentionProvider={mentionProvider} onClick={spy} />);
      mention.find(MentionStyle).simulate('click');
      expect(spy.called).to.equal(true);
      expect(spy.calledWith(mentionData.id, mentionData.text)).to.equal(true);
    });

    it('should dispatch onMouseEnter-event', () => {
      const spy = sinon.spy();
      const mention = mount(<ResourcedMention {...mentionData} mentionProvider={mentionProvider} onMouseEnter={spy} />);
      mention.find(MentionStyle).simulate('mouseenter');
      expect(spy.called).to.equal(true);
      expect(spy.calledWith(mentionData.id, mentionData.text)).to.equal(true);
    });

    it('should dispatch onMouseLeave-event', () => {
      const spy = sinon.spy();
      const mention = mount(<ResourcedMention {...mentionData} mentionProvider={mentionProvider} onMouseLeave={spy} />);
      mention.find(MentionStyle).simulate('mouseleave');
      expect(spy.called).to.equal(true);
      expect(spy.calledWith(mentionData.id, mentionData.text)).to.equal(true);
    });
  });
});
