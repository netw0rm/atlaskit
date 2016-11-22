import { waitUntil } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { mount } from 'enzyme';

import mentionData, { mentionDataSize } from '../_mention-data';
import MentionResource from '../_mock-ak-mention-resource';
import MentionPicker from '../../src/components/ak-mention-picker';
import MentionList from '../../src/components/ak-mention-list';
import MentionListError from '../../src/components/ak-mention-list-error';
import MentionItem from '../../src/components/ak-mention-item';
import { isMentionItemSelected, getMentionItemById } from '../_ak-selectors';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
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
    return waitUntil(hasExpectedItems).should.be.fulfilled;
  });

  it('should accept limit result to starting with s', () => {
    const component = setupPicker({
      query: 's',
    });
    const hasExpectedItems = () => component.find(MentionItem).length === 4;
    return waitUntil(hasExpectedItems).should.be.fulfilled;
  });

  it('should accept limit result to starting with shae', () => {
    const component = setupPicker({
      query: 'shae',
    });
    const hasExpectedItems = () => component.find(MentionItem).length === 1;
    return waitUntil(hasExpectedItems).should.be.fulfilled;
  });

  it('should report error when service fails', () => {
    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const noMentionItemsShown = () => component.find(MentionItem).length === 0;
    const mentionErrorShown = () => component.find(MentionListError).length > 0;

    return new Promise((resolve, reject) => {
      waitUntil(defaultMentionItemsShow).should.be.fulfilled.then(() => {
        component.setProps({ query: 'nothing' });
        waitUntil(noMentionItemsShown).should.be.fulfilled.then(() => {
          component.setProps({ query: 'error' });
          waitUntil(mentionErrorShown).should.be.fulfilled.then(() => {
            resolve();
          }, reason => reject(reason));
        }, reason => reject(reason));
      }, reason => reject(reason));
    });
  });

  it('should display previous mention if error straight after', () => {
    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const mentionErrorProcessed = () => {
      const mentionList = component.find(MentionList);
      return mentionList.prop('showError');
    };

    return new Promise((resolve, reject) => {
      waitUntil(defaultMentionItemsShow).should.be.fulfilled.then(() => {
        component.setProps({ query: 'error' });
        waitUntil(mentionErrorProcessed).should.be.fulfilled.then(() => {
          waitUntil(defaultMentionItemsShow).should.be.fulfilled.then(() => {
            resolve();
          }, reason => reject(reason));
        }, reason => reject(reason));
      }, reason => reject(reason));
    });
  });

  it('should change selection when navigating next', function () {
    // FIXME check if still an issue in React
    // Issues under IE in browserstack
    // this.skip();

    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const secondItemSelected = () => isMentionItemSelected(component, mentions[1].id);

    return new Promise((resolve, reject) => {
      waitUntil(defaultMentionItemsShow).should.be.fulfilled.then(() => {
        component.instance().selectNext();
        waitUntil(secondItemSelected).should.be.fulfilled.then(() => {
          resolve();
        }, reason => reject(reason));
      }, reason => reject(reason));
    });
  });

  it('should change selection when navigating previous', function () {
    // FIXME check if still an issue in React
    // Issues under IE in browserstack
    // this.skip();

    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const lastItemSelected = () =>
      isMentionItemSelected(component, mentions[mentions.length - 1].id);

    return new Promise((resolve, reject) => {
      waitUntil(defaultMentionItemsShow).should.be.fulfilled.then(() => {
        component.instance().selectPrevious();
        waitUntil(lastItemSelected).should.be.fulfilled.then(() => {
          resolve();
        }, reason => reject(reason));
      }, reason => reject(reason));
    });
  });

  it('should choose current selection when chooseCurrentSelection called', function () {
    // FIXME check if still an issue in React
    // Issues under IE in browserstack
    // this.skip();
    let chosenMention = null;

    const component = setupPicker({
      onSelection: (mention) => { chosenMention = mention; },
    });
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const secondItemSelected = () => isMentionItemSelected(component, mentions[1].id);
    const chooseSecondItem = () => (chosenMention && chosenMention.id === mentions[1].id);

    return new Promise((resolve, reject) => {
      waitUntil(defaultMentionItemsShow).should.be.fulfilled.then(() => {
        component.instance().selectNext();
        waitUntil(secondItemSelected).should.be.fulfilled.then(() => {
          component.instance().chooseCurrentSelection();
          waitUntil(chooseSecondItem).should.be.fulfilled.then(() => {
            resolve();
          }, reason => reject(reason));
        }, reason => reject(reason));
      }, reason => reject(reason));
    });
  });

  it('should choose clicked selection when item clicked', function () {
    // FIXME check if still an issue in React
    // Issues under IE in browserstack
    // this.skip();
    let chosenMention = null;

    const component = setupPicker({
      onSelection: (mention) => {
        chosenMention = mention;
      },
    });
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const chooseThirdItem = () => (chosenMention && chosenMention.id === mentions[2].id);

    return new Promise((resolve, reject) => {
      waitUntil(defaultMentionItemsShow).should.be.fulfilled.then(() => {
        const item = getMentionItemById(component, mentions[2].id);
        item.simulate('mousedown', leftClick);
        waitUntil(chooseThirdItem).should.be.fulfilled.then(() => {
          resolve();
        }, reason => reject(reason));
      }, reason => reject(reason));
    });
  });
});
