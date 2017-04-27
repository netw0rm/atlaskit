import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';

import Chrome from '../../src/components/Chrome';
import Content from '../../src/components/Content';
import Remove from '../../src/components/Remove';
import Tag from '../../src/components/Tag';

import Before from '../../src/styled/Before';
import Container from '../../src/styled/Container';

// TODO: Revisit all these tests. AK-1975
// Large parts of the API are not tested (hrefs should render anchors, truncation should occur, etc)
// Most of these tests are testing React behaviour (setting props) where they should be testing
// props + state => expectedRenderedOutput
// They also don't follow the normal naming standards for describe and it blocks

describe('Tag component', () => {
  const atlassianHref = 'https://www.atlassian.com';
  const atlassianText = 'Atlassian';
  const bitbucketHref = 'https://bitbucket.org';
  const testProps = {
    text: atlassianText,
    href: atlassianHref,
    removeButtonText: 'Click to remove this tag!',
  };

  it('Test Tag with removable link', () => {
    const wrapper = mount(<Tag {...testProps} />);
    expect(wrapper.prop('href')).to.equal(atlassianHref);
    expect(wrapper.find('a').text()).to.equal(atlassianText);
    expect(wrapper.find(Chrome).prop('isRemovable')).to.equal(true);
  });

  it('onBeforeRemoveAction callback contract', () => {
    const onBeforeRemoveAction = sinon.spy();
    const wrapper = mount(
      <Tag removeButtonText="Remove" onBeforeRemoveAction={onBeforeRemoveAction} />
    );
    wrapper.find(Remove).simulate('click');
    expect(onBeforeRemoveAction.calledOnce).to.equal(true);
  });

  it('onAfterRemoveAction callback contract', () => {
    const onAfterRemoveAction = sinon.spy();
    const wrapper = mount(
      <Tag removeButtonText="Remove" onAfterRemoveAction={onAfterRemoveAction} />
    );
    wrapper.find(Remove).simulate('click');
    wrapper.find(Container).simulate('animationEnd');
    expect(onAfterRemoveAction.calledOnce).to.equal(true);
  });

  it('onAfterRemoveAction should not be called if onBeforeRemoveAction returns false', () => {
    const onAfterRemoveAction = sinon.spy();
    const wrapper = mount(
      <Tag
        removeButtonText="Remove"
        onBeforeRemoveAction={() => false}
        onAfterRemoveAction={onAfterRemoveAction}
      />
    );
    wrapper.find(Remove).simulate('click');
    expect(onAfterRemoveAction.calledOnce).to.equal(false);
  });

  it('set markedForRemoval via mouse events on remove button', () => {
    const wrapper = mount(<Tag removeButtonText="Remove" />);
    wrapper.find(Remove).simulate('mouseover');
    expect(wrapper.find(Chrome).prop('markedForRemoval')).to.equal(true);
    wrapper.find(Remove).simulate('mouseout');
    expect(wrapper.find(Chrome).prop('markedForRemoval')).to.equal(false);
  });

  it('remove via keypress on remove button', () => {
    const wrapper = mount(<Tag removeButtonText="foo" />);
    wrapper.find(Remove).simulate('keypress', { key: ' ' });
    wrapper.find(Remove).simulate('keypress', { key: 'Enter' });
    expect(wrapper.state(('isRemoving'))).to.equal(true);
  });

  it('Tag allows us to set props', () => {
    const wrapper = mount(<Tag text={atlassianText} href={atlassianHref} />);
    expect(wrapper.prop('href')).to.equal(atlassianHref);

    expect(wrapper.find('a').text()).to.equal(atlassianText);

    wrapper.setProps({ href: bitbucketHref });
    expect(wrapper.prop('href')).to.equal(bitbucketHref);
  });

  describe('appearance prop', () => {
    it('should set the isRounded prop of Chrome and Remove to true when set to "rounded"', () => {
      const wrapper = mount(<Tag appearance="rounded" text="foo" removeButtonText="foo" />);
      expect(wrapper.find(Chrome).prop('isRounded')).to.equal(true);
      expect(wrapper.find(Remove).prop('isRounded')).to.equal(true);
    });

    it('should set the isRounded prop of Chrome and Remove to false when not set to "rounded"', () => {
      const wrapper = mount(<Tag appearance="default" text="foo" removeButtonText="foo" />);
      expect(wrapper.find(Chrome).prop('isRounded')).to.equal(false);
      expect(wrapper.find(Remove).prop('isRounded')).to.equal(false);
    });
  });

  describe('elemBefore prop', () => {
    it('should render anything passed to it', () => {
      const wrapper = mount(<Tag text="foo" elemBefore={<div className="test" />} />);
      expect(wrapper.find(Before).find('div.test').length).to.equal(1);
    });

    it('should render the elemBefore before the content', () => {
      const wrapper = mount(<Tag text="foo" elemBefore={<div className="test" />} />);
      const chrome = wrapper.find(Chrome);
      expect(chrome.childAt(0).is(Before)).to.equal(true);
      expect(chrome.childAt(1).is(Content)).to.equal(true);
    });
  });

  describe('text prop', () => {
    it('should render text to a Content block', () => {
      const wrapper = mount(<Tag text="foo" />);
      expect(wrapper.find(Content).text()).to.equal('foo');
    });
  });

  describe('href prop', () => {
    it('should cause an anchor to be rendered', () => {
      const wrapper = mount(<Tag text="foo" href="#" />);
      expect(wrapper.find(Content).find('a').length).to.equal(1);
    });

    it('should reflect the href onto the anchor', () => {
      const wrapper = mount(<Tag text="foo" href="#" />);
      expect(wrapper.find(Content).find('a').prop('href')).to.equal('#');
    });

    it('should set the isLink prop on Chrome', () => {
      const wrapper = mount(<Tag text="foo" href="#" />);
      expect(wrapper.find(Chrome).prop('isLink')).to.equal(true);
    });
  });

  describe('removeButtonText prop', () => {
    it('should not render a button if not set', () => {
      const wrapper = mount(<Tag text="foo" />);
      expect(wrapper.find(Remove).length).to.equal(0);
    });

    it('should render a button if set', () => {
      const wrapper = mount(<Tag text="foo" removeButtonText="removeMe" />);
      expect(wrapper.find(Remove).length).to.equal(1);
    });

    it('should set the removeText prop of button if set', () => {
      const wrapper = mount(<Tag text="foo" removeButtonText="removeMe" />);
      expect(wrapper.find(Remove).prop('removeText')).to.equal('removeMe');
    });
  });

  describe('onBeforeRemoveAction prop', () => {
    it('should be called if button is clicked', () => {
      const spy = sinon.spy();
      const wrapper = mount(<Tag text="foo" removeButtonText="removeMe" onBeforeRemoveAction={spy} />);
      wrapper.find('button').simulate('click');
      expect(spy.callCount).to.equal(1);
    });
  });

  describe('onAfterRemoveAction prop', () => {
    it('should be called after remove animation is completed', () => {
      const spy = sinon.spy();
      const wrapper = mount(<Tag text="foo" removeButtonText="removeMe" onAfterRemoveAction={spy} />);
      wrapper.find('button').simulate('click');
      wrapper.find(Container).simulate('animationEnd');
      expect(spy.callCount).to.equal(1);
    });

    it('should not be called if onBeforeRemoveAction returns false', () => {
      const beforeRemove = () => false;
      const spy = sinon.spy();
      const wrapper = mount(<Tag
        text="foo"
        removeButtonText="removeMe"
        onBeforeRemoveAction={beforeRemove}
        onAfterRemoveAction={spy}
      />);
      wrapper.find('button').simulate('click');
      expect(spy.callCount).to.equal(0);
    });
  });
});
