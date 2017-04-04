import sinon from 'sinon';
import styles from 'style!../src/styles.less';
import React from 'react';
import { mount } from 'enzyme';

import Tag from '../src/index';
import AnimationWrapper from '../src/AnimationWrapper';
import Chrome from '../src/Chrome';
import Content from '../src/Content';
import ElemBefore from '../src/ElemBefore';
import RemoveButton from '../src/RemoveButton';

// TODO: Revisit all these tests. AK-1975
// Large parts of the API are not tested (hrefs should render anchors, truncation should occur, etc)
// Most of these tests are testing React behaviour (setting props) where they should be testing
// props + state => expectedRenderedOutput
// They also don't follow the normal naming standards for describe and it blocks

describe('Tag component', () => {
  const atlassianUrl = 'https://www.atlassian.com/';
  const bitbucketUrl = 'https://bitbucket.org/';
  const atlassianlinkText = 'Atlassian';
  const bitbucketLinkText = 'Bitbucket';
  const REMOVE_BUTTON_TEXT = 'Click to remove this tag !';
  const testProps = {
    text: atlassianlinkText,
    href: atlassianUrl,
    removeButtonText: REMOVE_BUTTON_TEXT,
  };

  it('Test Tag with removable link', () => {
    const wrapper = mount(<Tag {...testProps} />);
    expect(wrapper.props().href).to.equal(atlassianUrl);
    expect(wrapper.find('a').text()).to.equal(atlassianlinkText);
    wrapper.setProps({ href: bitbucketLinkText });
    expect(wrapper.props().href).to.equal(bitbucketLinkText);
    expect(wrapper.find(`.${styles.chrome}`).hasClass(styles.isRemovable)).to.equal(true);
  });

  it('Test onBeforeRemoveAction callback contract', () => {
    const onBeforeRemoveAction = sinon.spy();
    const wrapper = mount(<Tag {...testProps} onBeforeRemoveAction={onBeforeRemoveAction} />);
    wrapper.find(RemoveButton).find('button').simulate('click');
    expect(onBeforeRemoveAction.calledOnce).to.equal(true);
  });

  it('Test onAfterRemoveAction callback contract', () => {
    const onAfterRemoveAction = sinon.spy();
    const wrapper = mount(<Tag {...testProps} onAfterRemoveAction={onAfterRemoveAction} />);
    wrapper.find(AnimationWrapper).props().onRemovalCompletion();
    expect(onAfterRemoveAction.calledOnce).to.equal(true);
  });

  it('onAfterRemoveAction should not be called if onBeforeRemoveAction returns false', () => {
    const onAfterRemoveAction = sinon.spy();
    const wrapper = mount(
      <Tag
        {...testProps}
        onBeforeRemoveAction={() => false}
        onAfterRemoveAction={onAfterRemoveAction}
      />
    );
    wrapper.find(RemoveButton).find('button').simulate('click');
    expect(onAfterRemoveAction.calledOnce).to.equal(false);
  });

  it('Test mouse over and out over remove button', () => {
    const wrapper = mount(<Tag {...testProps} />);
    wrapper.find(RemoveButton).find('button').simulate('mouseover');
    expect(wrapper.find(`.${styles.chrome}`).hasClass(styles.markedForRemoval)).to.equal(true);
    wrapper.find(RemoveButton).find('button').simulate('mouseout');
    expect(wrapper.find(`.${styles.chrome}`).hasClass(styles.markedForRemoval)).to.equal(false);
  });

  /* TODO: figure out why this is not working

  it('Test keyboard actions over remove button', () => {
    const wrapper = mount(<Tag {...testProps}/>);
    wrapper.find(RemoveButton).find('button').simulate('keyPress', {keyCode: 13});
    wrapper.find(RemoveButton).find('button').simulate('keyPress', {keyCode: 32});
    expect((wrapper.find(Chrome)).hasClass((styles.isRemoving))).to.equal(true);
  });*/

  it('Tag allows us to set props', () => {
    const wrapper = mount(<Tag text={atlassianlinkText} href={atlassianUrl} />);
    expect(wrapper.props().href).to.equal(atlassianUrl);

    expect(wrapper.find('a').text()).to.equal(atlassianlinkText);
    expect((wrapper.find('a')).hasClass((styles.href))).to.equal(true);

    wrapper.setProps({ href: bitbucketUrl });
    expect(wrapper.props().href).to.equal(bitbucketUrl);
  });

  it('Tag full rendering - with link', () => {
    const wrapper = mount(<div><Tag text={atlassianlinkText} href={atlassianUrl} /></div>);
    const renderedHtml =
    `<div class="${styles.rootWrapper}">` +
      `<div class="${styles.animationWrapper}">` +
        `<span role="link" tabindex="0" class="${styles.chrome}">` +
          '<!-- react-empty: 5 -->' + // This is created because of the elemBefore element
          `<a tabindex="-1" class="${styles.href}"` +
              ` href="${atlassianUrl}">${atlassianlinkText
          }</a>` +
        '</span>' +
      '</div>' +
    '</div>';
    expect(wrapper.find('Tag').html()).to.equal(renderedHtml);
  });

  it('Tag full rendering - with text', () => {
    const wrapper = mount(<div><Tag text={atlassianlinkText} /></div>);
    const renderedHtml =
    `<div class="${styles.rootWrapper}">` +
      `<div class="${styles.animationWrapper}">` +
        `<span tabindex="-1" class="${styles.chrome}">` +
          '<!-- react-empty: 5 -->' + // This is created because of the elemBefore element
          `<span class="${styles.text}">Atlassian</span>` +
        '</span>' +
      '</div>' +
    '</div>';
    expect(wrapper.find('Tag').html()).to.equal(renderedHtml);
  });

  describe('appearance prop', () => {
    it('should set the isRounded prop of Chrome and RemoveButton to true when set to "rounded"', () => {
      const wrapper = mount(<Tag appearance="rounded" text="foo" removeButtonText="foo" />);
      expect(wrapper.find(Chrome).prop('isRounded')).to.equal(true);
      expect(wrapper.find(RemoveButton).prop('isRounded')).to.equal(true);
    });

    it('should set the isRounded prop of Chrome and RemoveButton to false when not set to "rounded"', () => {
      const wrapper = mount(<Tag appearance="default" text="foo" removeButtonText="foo" />);
      expect(wrapper.find(Chrome).prop('isRounded')).to.equal(false);
      expect(wrapper.find(RemoveButton).prop('isRounded')).to.equal(false);
    });
  });

  describe('elemBefore prop', () => {
    it('should render anything passed to it', () => {
      const wrapper = mount(<Tag text="foo" elemBefore={<div className="test" />} />);
      expect(wrapper.find(ElemBefore).find('div.test').length).to.equal(1);
    });

    it('should render the elemBefore before the content', () => {
      const wrapper = mount(<Tag text="foo" elemBefore={<div className="test" />} />);
      const chrome = wrapper.find(Chrome);
      expect(chrome.childAt(0).is(ElemBefore)).to.equal(true);
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
      expect(wrapper.find(RemoveButton).length).to.equal(0);
    });

    it('should render a button if set', () => {
      const wrapper = mount(<Tag text="foo" removeButtonText="removeMe" />);
      expect(wrapper.find(RemoveButton).length).to.equal(1);
    });

    it('should set the removeText prop of button if set', () => {
      const wrapper = mount(<Tag text="foo" removeButtonText="removeMe" />);
      expect(wrapper.find(RemoveButton).prop('removeText')).to.equal('removeMe');
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
      // we simulate the remove action finishing by calling AnimationWrappers onRemovalCompletion()
      wrapper.find(AnimationWrapper).prop('onRemovalCompletion')();
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
