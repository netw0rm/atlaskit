import { waitUntil } from '@atlaskit/util-common-test';
import React from 'react';
import { mount } from 'enzyme';

import mentionData, { mentionDataSize } from '../_mention-data';
import MentionList from '../../src/components/MentionList';
import MentionItem from '../../src/components/MentionItem';
import { isMentionItemSelected } from '../_ak-selectors';

const mentions = mentionData.mentions;

function setupList(props) {
  return mount(
    <MentionList
      mentions={mentions}
      {...props}
    />
  );
}

describe('MentionList', () => {
  it('should have first item selected by default', () => {
    const component = setupList();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const firstItemSelected = () => isMentionItemSelected(component, mentions[0].id);

    return waitUntil(defaultMentionItemsShow)
      .then(() => waitUntil(firstItemSelected));
  });

  it('selectIndex selects correct item', () => {
    const component = setupList();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const thirdItemSelected = () => isMentionItemSelected(component, mentions[2].id);

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        component.instance().selectIndex(2);
        return waitUntil(thirdItemSelected);
      });
  });

  it('selectId selects correct item', () => {
    const component = setupList();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const thirdItemSelected = () => isMentionItemSelected(component, mentions[2].id);

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        component.instance().selectId(mentions[2].id);
        return waitUntil(thirdItemSelected);
      });
  });

  it('mentionsCount returns the number of mentions in the list', () => {
    const component = setupList();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        expect(component.instance().mentionsCount()).to.equal(mentionDataSize);
      });
  });
});
