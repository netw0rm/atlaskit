import { waitUntil } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { mount } from 'enzyme';

import mentionData, { mentionDataSize } from '../_mention-data';
import MentionList from '../../src/components/ak-mention-list';
import MentionItem from '../../src/components/ak-mention-item';
import { isMentionItemSelected } from '../_ak-selectors';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.should();

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

    return waitUntil(defaultMentionItemsShow).should.be.fulfilled
      .then(() => waitUntil(firstItemSelected).should.be.fulfilled);
  });
});
