import { waitUntil } from '@atlaskit/util-common-test';
import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { expect } from 'chai';

import mentionData, { mentionDataSize } from '../_mention-data';
import MentionList, { Props, State } from '../../../src/components/MentionList';
import MentionItem from '../../../src/components/MentionItem';
import { isMentionItemSelected } from '../_ak-selectors';

const mentions = mentionData.mentions;

function setupList(props?: Props): ReactWrapper<Props, State> {
  return mount(
    <MentionList
      mentions={mentions}
      {...props}
    />
  ) as ReactWrapper<Props, State>;
}

describe('MentionList', () => {
  it('should have first item selected by default', () => {
    const component = setupList();
    const defaultMentionItemsShow = () => {
      return component.find(MentionItem).length === mentionDataSize;
    };
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
        const mentionList = component.instance() as MentionList;
        mentionList.selectIndex(2);
        return waitUntil(thirdItemSelected);
      });
  });

  it('selectId selects correct item', () => {
    const component = setupList();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;
    const thirdItemSelected = () => isMentionItemSelected(component, mentions[2].id);

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        const mentionList = component.instance() as MentionList;
        mentionList.selectId(mentions[2].id);
        return waitUntil(thirdItemSelected);
      });
  });

  it('mentionsCount returns the number of mentions in the list', () => {
    const component = setupList();
    const defaultMentionItemsShow = () => component.find(MentionItem).length === mentionDataSize;

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        const mentionList = component.instance() as MentionList;
        expect(mentionList.mentionsCount()).to.equal(mentionDataSize);
      });
  });

  it('should retain a deliberate selection across changing list of mentions', () => {
    const component = setupList();
    const defaultMentionItemsShow = () => {
      return component.find(MentionItem).length === mentionDataSize;
    };

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        const mentionList = component.instance() as MentionList;

        // select item 3 in the mention list
        mentionList.selectIndex(2);

        const thirdItemSelected = () => isMentionItemSelected(component, mentions[2].id);

        return waitUntil(thirdItemSelected)
          .then(() => {

            // remove the first item from the mentions array and set the new mentions
            const reducedMentionsList = mentions.slice(1);
            component.setProps({
              mentions: reducedMentionsList
            });

            const reducedListOfItemsShow = () => {
              return component.find(MentionItem).length === reducedMentionsList.length;
            };

            return waitUntil(reducedListOfItemsShow)
              .then(() => {
                // ensure item 2 is now selected
                const secondItemSelected = () => isMentionItemSelected(component, reducedMentionsList[1].id);

                return waitUntil(secondItemSelected);
            });
        });
      });
  });

  it('should select first item for each changing set of mentions if no deliberate selection is made', () => {
    const component = setupList();
    const defaultMentionItemsShow = () => {
      return component.find(MentionItem).length === mentionDataSize;
    };

    return waitUntil(defaultMentionItemsShow)
      .then(() => {
        const firstItemSelected = () => isMentionItemSelected(component, mentions[0].id);
        return waitUntil(firstItemSelected)
          .then(() => {
            // move the first item to the third position in a new list.
            // Note that I've also removed a single item from the list so I can differentiate when the new mentions are shown using length
            const reducedMentionsList = [ ...mentions.slice(1, 3), mentions[0], ...mentions.slice(4) ];

            component.setProps({
              mentions: reducedMentionsList
            });

            const reducedListOfItemsShow = () => {
              return component.find(MentionItem).length === reducedMentionsList.length;
            };

            return waitUntil(reducedListOfItemsShow)
              .then(() => {
                // ensure item 0 is still selected
                const newfirstItemSelected = () => isMentionItemSelected(component, reducedMentionsList[0].id);
                return waitUntil(newfirstItemSelected);
            });
          });
      });

  });
});
