import sinon from 'sinon';
import styles from 'style!../src/styles.less';
import React from 'react';
import { mount } from 'enzyme';
import Avatar from '@atlaskit/avatar';

import Tag from '../src/index';
import RemoveButton from '../src/RemoveButton';
import Chrome from '../src/Chrome';
import AnimationWrapper from '../src/AnimationWrapper';

// TODO: Revist all these tests.
// Large parts of the API are not tested (hrefs should render anchors, truncation should occur, etc)
// Most of these tests are testing React behaviour (setting props) where they should be testing
// props + state => expectedRenderedOutput
// They also don't follow the normal naming standards for describe and it blocks

describe('<Tag/> component tests', () => {
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

  describe('elemBefore props', () => {
    it('should render anything passed to it', () => {
      const wrapper = mount(<Tag
        elemBefore={<Avatar size="xsmall" />}
      />);
      expect(wrapper.find(Avatar).length).to.equal(1);
    });

    it('should not render a .elemBefore block if not elemBefore passed in', () => {
      const wrapper = mount(<Tag text="foo" />);
      expect(wrapper.find(`.${styles.elemBefore}`).length).to.equal(0);
    });
  });

  describe('appearance prop', () => {
    it('should set the rounded prop of Chrome and RemoveButton to true when set to "rounded"', () => {
      const wrapper = mount(<Tag appearance="rounded" text="foo" removeButtonText="foo" />);
      expect(wrapper.find(Chrome).prop('rounded')).to.equal(true);
      expect(wrapper.find(RemoveButton).prop('rounded')).to.equal(true);
    });

    it('should set the rounded prop of Chrome and RemoveButton to false when not set to "rounded"', () => {
      const wrapper = mount(<Tag appearance="default" text="foo" removeButtonText="foo" />);
      expect(wrapper.find(Chrome).prop('rounded')).to.equal(false);
      expect(wrapper.find(RemoveButton).prop('rounded')).to.equal(false);
    });
  });
});
