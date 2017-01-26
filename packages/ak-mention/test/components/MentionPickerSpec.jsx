import { waitUntil } from 'akutil-common-test';
import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';

import mentionData, { mentionDataSize } from '../_mention-data';
import MentionResource from '../_mock-ak-mention-resource';
import MentionPicker from '../../src/components/ak-mention-picker';
import MentionList from '../../src/components/ak-mention-list';
import MentionListError from '../../src/components/ak-mention-list-error';
import MentionItem from '../../src/components/ak-mention-item';
import { isMentionItemSelected, getMentionItemById } from '../_ak-selectors';

chai.should();

const mentions = mentionData.mentions;

function setupPicker(props) {
  const resourceProvider = new MentionResource({
    minWait: 0,
    maxWait: 0,
  });
  return mount(<MentionPicker resourceProvider={resourceProvider} query="" {...props} />);
}

const leftClick = {
  button: 0,
};

describe('MentionPicker', () => {
  it('should accept all mention names by default', () => {
    const component = setupPicker();
    const hasExpectedItems = () => component.find(MentionItem).length === mentionDataSize;
    return hasExpectedItems().should.be.fulfilled;
  });

  it('should accept limit result to starting with s', () => {
    const component = setupPicker({
      query: 's',
    });
    const hasExpectedItems = () => component.find(MentionItem).length === 4;
    return hasExpectedItems().should.be.fulfilled;
  });

  it('should accept limit result to starting with shae', () => {
    const component = setupPicker({
      query: 'shae',
    });
    const hasExpectedItems = () => component.find(MentionItem).length === 1;
    return hasExpectedItems().should.be.fulfilled;
  });

  it.skip('should report error when service fails', () => {
    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const noMentionItemsShown = () => component.find(MentionItem).length === 0;
    const mentionErrorShown = () => component.find(MentionListError).length > 0;

    expect(defaultMentionItemsShow()).to.equal(true);
    component.setProps({ query: 'nothing' });
    expect(noMentionItemsShown()).to.equal(true);
    component.setProps({ query: 'error' });
    expect(mentionErrorShown()).to.equal(true);
  });

  it.skip('should display previous mention if error straight after', () => {
    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const mentionErrorProcessed = () => {
      const mentionList = component.find(MentionList);
      return mentionList.prop('showError');
    };

    expect(defaultMentionItemsShow()).to.equal(true);
    component.setProps({ query: 'error' });
    expect(mentionErrorProcessed()).to.equal(true);

    expect(defaultMentionItemsShow()).to.equal(true);
  });

  it.skip('should change selection when navigating next', () => {
    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const secondItemSelected = () => isMentionItemSelected(component, mentions[1].id);
    expect(defaultMentionItemsShow()).to.equal(true);
    component.instance().selectNext();

    expect(secondItemSelected()).to.equal(true);
  });

  it.skip('should change selection when navigating previous', () => {
    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const lastItemSelected = () =>
      isMentionItemSelected(component, mentions[mentions.length - 1].id);
    expect(defaultMentionItemsShow()).to.equal(true);
    component.instance().selectPrevious();

    expect(lastItemSelected()).to.equal(true);
  });

  it.skip('should choose current selection when chooseCurrentSelection called', () => {
    let chosenMention = null;

    const component = setupPicker({
      onSelection: (mention) => { chosenMention = mention; },
    });
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const secondItemSelected = () => isMentionItemSelected(component, mentions[1].id);
    const chooseSecondItem = () => (chosenMention && chosenMention.id === mentions[1].id);
    expect(defaultMentionItemsShow()).to.equal(true);
    component.instance().selectNext();
    expect(secondItemSelected()).to.equal(true);
    component.instance().chooseCurrentSelection();

    expect(chooseSecondItem()).to.equal(true);
  });

  it.skip('should choose clicked selection when item clicked', () => {
    let chosenMention = null;

    const component = setupPicker({
      onSelection: (mention) => {
        chosenMention = mention;
      },
    });
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const chooseThirdItem = () => (chosenMention && chosenMention.id === mentions[2].id);
    expect(defaultMentionItemsShow()).to.equal(true);
    const item = getMentionItemById(component, mentions[2].id);
    item.simulate('mousedown', leftClick);

    expect(chooseThirdItem()).to.equal(true);
  });

  it.skip('should fire onOpen when first result shown', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen,
      onClose,
    });
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    expect(defaultMentionItemsShow()).to.equal(true);

    expect(onOpen.callCount, 'opened').to.equal(1);
    expect(onClose.callCount, 'closed').to.equal(0);
  });

  it.skip('should fire onClose when no matches', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen,
      onClose,
    });
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const noMentionItemsShown = () => component.find(MentionItem).length === 0;
    expect(defaultMentionItemsShow()).to.equal(true);
    expect(onOpen.callCount, 'opened 1').to.equal(1);
    expect(onClose.callCount, 'closed 1').to.equal(0);
    component.setProps({ query: 'nothing' });
    expect(noMentionItemsShown()).to.equal(true);
    expect(onOpen.callCount, 'opened 2').to.equal(1);
    expect(onClose.callCount, 'closed 2').to.equal(1);
  });
});
