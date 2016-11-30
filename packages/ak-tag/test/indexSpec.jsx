import sinon from 'sinon';
import styles from 'style!../src/styles.less';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { mount } from 'enzyme';


import Tag from '../src/index';
import RemoveButton from '../src/RemoveButton';
import Chrome from '../src/Chrome';
import AnimationWrapper from '../src/AnimationWrapper';

chai.use(chaiEnzyme());

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
    expect(wrapper.find(Chrome)).to.have.className(styles.isRemovable);
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

  it('Test mouse over and out over remove button', () => {
    const wrapper = mount(<Tag {...testProps} />);
    wrapper.find(RemoveButton).find('button').simulate('mouseover');
    expect(wrapper.find(Chrome)).to.have.className(styles.markedForRemoval);
    wrapper.find(RemoveButton).find('button').simulate('mouseout');
    expect(wrapper.find(Chrome)).to.not.have.className(styles.markedForRemoval);
  });

  /* TODO: figure out why this is not working

  it('Test keyboard actions over remove button', () => {
    const wrapper = mount(<Tag {...testProps}/>);
    wrapper.find(RemoveButton).find('button').simulate('keyPress', {keyCode: 13});
    wrapper.find(RemoveButton).find('button').simulate('keyPress', {keyCode: 32});
    expect(wrapper.find(Chrome)).to.have.className(styles.isRemoving);
  });*/

  it('Tag allows us to set props', () => {
    const wrapper = mount(<Tag text={atlassianlinkText} href={atlassianUrl} />);
    expect(wrapper.props().href).to.equal(atlassianUrl);

    expect(wrapper.find('a').text()).to.equal(atlassianlinkText);
    expect(wrapper.find('a')).to.have.className(styles.href);

    wrapper.setProps({ href: bitbucketUrl });
    expect(wrapper.props().href).to.equal(bitbucketUrl);
  });

  it('Tag full rendering - with link', () => {
    const wrapper = mount(<div><Tag text={atlassianlinkText} href={atlassianUrl} /></div>);
    const renderedHtml =
    `<div class="${styles.rootWrapper}">` +
      `<div class="${styles.animationWrapper}">` +
        `<span role="link" tabindex="0" class="${styles.chrome}">` +
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
          `<span class="${styles.text}">Atlassian</span>` +
        '</span>' +
      '</div>' +
    '</div>';
    expect(wrapper.find('Tag').html()).to.equal(renderedHtml);
  });


  /*
  1. <Tag text="hello"/>
    validate structure - dom and attributes
    validate events
  2. <Tag text="hello" href="a link"/>
    validate structure - dom and attributes
    validate events
  3. <Tag text="hello" href="a link" removeButtonText="Remove Me"/>
    validate structure - dom and attributes
    validate events
  4. Test all 3 apis
  5. Test hover styles
  6. Test keyboard enter and space events
  */
});
