import sinon from 'sinon';
import styles from 'style!../src/styles.less';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { mount } from 'enzyme';


import Tag from '../src/index';

chai.use(chaiEnzyme());

describe('<Tag/> component tests', () => {
  const atlassianUrl = 'https://www.atlassian.com/';
  const bitbucketUrl = 'https://bitbucket.org/';
  const atlassianlinkText = 'Atlassian';
  const REMOVE_BUTTON_TEXT = 'Click to remove this tag !';
  const testProps = { text: 'Hi', href: 'some link', removeButtonText: REMOVE_BUTTON_TEXT };

  it('Tag allows us to set props', () => {
    const wrapper = mount(<Tag text={atlassianlinkText} href={atlassianUrl} />);
    expect(wrapper.props().href).to.equal(atlassianUrl);

    expect(wrapper.find('a').text()).to.equal(atlassianlinkText);
    expect(wrapper.find('a')).to.have.className(styles.href);

    wrapper.setProps({ href: bitbucketUrl });
    expect(wrapper.props().href).to.equal(bitbucketUrl);
  });
  it('Tag full rendering - with link', () => {
    const wrapper = mount(<Tag text={atlassianlinkText} href={atlassianUrl} />);
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
    expect(wrapper.html()).to.equal(renderedHtml);
  });

  it('Tag full rendering - with text', () => {
    const wrapper = mount(<Tag text={atlassianlinkText} />);
    const renderedHtml =
    `<div class="${styles.rootWrapper}">` +
      `<div class="${styles.animationWrapper}">` +
        `<span tabindex="-1" class="${styles.chrome}">` +
          `<span class="${styles.text}">Atlassian</span>` +
        '</span>' +
      '</div>' +
    '</div>';
    expect(wrapper.html()).to.equal(renderedHtml);
  });
  it('Check if link tag has uses the passed href', () => {
    const wrapper = mount(<Tag {...testProps} />);
    expect(wrapper.props().href).to.equal('some link');
    expect(wrapper.find('a').text()).to.equal('Hi');
    wrapper.setProps({ href: 'another link' });
    expect(wrapper.props().href).to.equal('another link');
  });

  it('Test isRemovable() api contract', () => {
    const wrapper = mount(<Tag {...testProps} />);
    expect(wrapper.instance().isRemovable()).to.be.equal(true);
    wrapper.setProps({ removeButtonText: null });
    expect(wrapper.instance().isRemovable()).to.be.equal(false);
  });

  it('Test isLinked() api contract', () => {
    const wrapper = mount(<Tag {...testProps} />);
    expect(wrapper.instance().isLinked()).to.be.equal(true);
    wrapper.setProps({ href: null });
    expect(wrapper.instance().isLinked()).to.be.equal(false);
  });

  it('Test remove() api contract', () => {
    const onAfterRemoveAction = sinon.spy();
    const wrapper = mount(<Tag {...testProps} onAfterRemoveAction={onAfterRemoveAction} />);
    expect(wrapper.state().isRemoved).to.be.equal(false);
    expect(wrapper.state().isRemoving).to.be.equal(false);
    wrapper.instance().remove();
    expect(onAfterRemoveAction.calledOnce).to.equal(true);
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
