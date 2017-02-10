import { waitUntil } from '@atlaskit/util-common-test';
import React from 'react';
import { mount } from 'enzyme';

import mentionData, { mentionDataSize } from '../_mention-data';
import MentionResource from '../_mock-ak-mention-resource';
import MentionPicker from '../../src/components/MentionPicker';
import MentionList from '../../src/components/MentionList';
import MentionListError from '../../src/components/MentionListError';
import MentionItem from '../../src/components/MentionItem';
import { isMentionItemSelected, getMentionItemById } from '../_ak-selectors';

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
    return waitUntil(hasExpectedItems);
  });

  it('should accept limit result to starting with s', () => {
    const component = setupPicker({
      query: 's',
    });
    const hasExpectedItems = () => component.find(MentionItem).length === 4;
    return waitUntil(hasExpectedItems);
  });

  it('should accept limit result to starting with shae', () => {
    const component = setupPicker({
      query: 'shae',
    });
    const hasExpectedItems = () => component.find(MentionItem).length === 1;
    return waitUntil(hasExpectedItems);
  });

  it('should report error when service fails', () => {
    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const noMentionItemsShown = () => component.find(MentionItem).length === 0;
    const mentionErrorShown = () => component.find(MentionListError).length > 0;

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        component.setProps({ query: 'nothing' });
        return waitUntil(noMentionItemsShown);
      })
      .then(() => {
        component.setProps({ query: 'error' });
        return waitUntil(mentionErrorShown);
      });
  });

  it('should display previous mention if error straight after', () => {
    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const mentionErrorProcessed = () => {
      const mentionList = component.find(MentionList);
      return mentionList.prop('showError');
    };

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        component.setProps({ query: 'error' });
        return waitUntil(mentionErrorProcessed);
      })
      .then(() => waitUntil(defaultMentionItemsShow));
  });

  it('should change selection when navigating next', () => {
    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const secondItemSelected = () => isMentionItemSelected(component, mentions[1].id);

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        component.instance().selectNext();
        return waitUntil(secondItemSelected);
      });
  });

  it('should change selection when selectIndex called', () => {
    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const thirdItemSelected = () => isMentionItemSelected(component, mentions[2].id);

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        component.instance().selectIndex(2);
        return waitUntil(thirdItemSelected);
      });
  });

  it('should change selection when selectId called', () => {
    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const thirdItemSelected = () => isMentionItemSelected(component, mentions[2].id);

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        component.instance().selectId(mentions[2].id);
        return waitUntil(thirdItemSelected);
      });
  });

  it('should change selection when navigating previous', () => {
    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const lastItemSelected = () =>
      isMentionItemSelected(component, mentions[mentions.length - 1].id);

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        component.instance().selectPrevious();
        return waitUntil(lastItemSelected);
      });
  });

  it('should choose current selection when chooseCurrentSelection called', () => {
    let chosenMention = null;

    const component = setupPicker({
      onSelection: (mention) => { chosenMention = mention; },
    });
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const secondItemSelected = () => isMentionItemSelected(component, mentions[1].id);
    const chooseSecondItem = () => (chosenMention && chosenMention.id === mentions[1].id);

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        component.instance().selectNext();
        return waitUntil(secondItemSelected);
      })
      .then(() => {
        component.instance().chooseCurrentSelection();
        return waitUntil(chooseSecondItem);
      });
  });

  it('should choose clicked selection when item clicked', () => {
    let chosenMention = null;

    const component = setupPicker({
      onSelection: (mention) => {
        chosenMention = mention;
      },
    });
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const chooseThirdItem = () => (chosenMention && chosenMention.id === mentions[2].id);

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        const item = getMentionItemById(component, mentions[2].id);
        item.simulate('mousedown', leftClick);
        return waitUntil(chooseThirdItem);
      });
  });

  it('should fire onOpen when first result shown', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen,
      onClose,
    });
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        expect(onOpen.callCount, 'opened').to.equal(1);
        expect(onClose.callCount, 'closed').to.equal(0);
      });
  });

  it('should fire onClose when no matches', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen,
      onClose,
    });
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const noMentionItemsShown = () => component.find(MentionItem).length === 0;

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        expect(onOpen.callCount, 'opened 1').to.equal(1);
        expect(onClose.callCount, 'closed 1').to.equal(0);
        component.setProps({ query: 'nothing' });
        return waitUntil(noMentionItemsShown);
      })
      .then(() => {
        expect(onOpen.callCount, 'opened 2').to.equal(1);
        expect(onClose.callCount, 'closed 2').to.equal(1);
      });
  });

  it('mentionsCount returns the number of mentions in the list', () => {
    const component = setupPicker();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        expect(component.instance().mentionsCount()).to.equal(mentionDataSize);
      });
  });
});
