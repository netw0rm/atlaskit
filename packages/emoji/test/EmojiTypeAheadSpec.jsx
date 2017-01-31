import { waitUntil } from 'akutil-common-test';
import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';

import { testingEmojiService, testingEmojis } from '../stories/story-data';
import EmojiTypeAhead, { defaultListLimit } from '../src/EmojiTypeAhead';
import EmojiTypeAheadItem from '../src/internal/typeahead/EmojiTypeAheadItem';
import { isEmojiTypeAheadItemSelected, getEmojiTypeAheadItemById } from './emoji-selectors';

chai.should();

function setupPicker(props) {
  return mount(
    <EmojiTypeAhead
      emojiService={testingEmojiService}
      query=""
      {...props}
    />
  );
}

const leftClick = {
  button: 0,
};

describe('EmojiTypeAhead', () => {
  it('should display max emoji by default', () => {
    const component = setupPicker();
    const hasExpectedItems = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    return waitUntil(hasExpectedItems);
  });

  it('should limit results to those matching "grin"', () => {
    const component = setupPicker({
      query: 'grin',
    });
    const hasExpectedItems = () => component.find(EmojiTypeAheadItem).length === 3;
    return waitUntil(hasExpectedItems);
  });

  it('should limit result to matching "moon"', () => {
    const component = setupPicker({
      query: 'moon',
    });
    const hasExpectedItems = () => component.find(EmojiTypeAheadItem).length === 14;
    return waitUntil(hasExpectedItems);
  });

  it('should change selection when navigating next', () => {
    const component = setupPicker();
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    const secondItemSelected = () => isEmojiTypeAheadItemSelected(component, testingEmojis[1].id);

    return waitUntil(defaultEmojiShown)
      .then(() => {
        component.instance().selectNext();
        return waitUntil(secondItemSelected);
      });
  });

  it('should change selection when navigating previous', () => {
    const component = setupPicker();
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    const lastItemSelected = () =>
      isEmojiTypeAheadItemSelected(component, testingEmojis[defaultListLimit - 1].id);

    return waitUntil(defaultEmojiShown)
      .then(() => {
        component.instance().selectPrevious();
        return waitUntil(lastItemSelected);
      });
  });

  it('should choose current selection when chooseCurrentSelection called', () => {
    let choseEmoji = null;

    const component = setupPicker({
      onSelection: (emoji) => { choseEmoji = emoji; },
    });
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    const secondItemSelected = () => isEmojiTypeAheadItemSelected(component, testingEmojis[1].id);
    const chooseSecondItem = () => (choseEmoji && choseEmoji.id === testingEmojis[1].id);

    return waitUntil(defaultEmojiShown)
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
    let choseEmoji = null;

    const component = setupPicker({
      onSelection: (emoji) => { choseEmoji = emoji; },
    });
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    const chooseThirdItem = () => (choseEmoji && choseEmoji.id === testingEmojis[2].id);

    return waitUntil(defaultEmojiShown)
      .then(() => {
        const item = getEmojiTypeAheadItemById(component, testingEmojis[2].id);
        item.simulate('mousedown', leftClick);
        return waitUntil(chooseThirdItem);
      });
  });

  it('should fire onOpen on initial display', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen,
      onClose,
    });
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;

    return waitUntil(defaultEmojiShown)
      .then(() => {
        expect(onOpen.callCount, 'opened').to.equal(1);
        expect(onClose.callCount, 'closed').to.equal(0);
      });
  });

  it('should fire onOpen when first result shown', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen,
      onClose,
      query: 'zeroresults',
    });
    const noEmojiShown = () => component.find(EmojiTypeAheadItem).length === 0;
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;

    return waitUntil(noEmojiShown)
      .then(() => {
        expect(onOpen.callCount, 'opened').to.equal(0);
        expect(onClose.callCount, 'closed').to.equal(0);
        component.setProps({ query: '' });
        return waitUntil(defaultEmojiShown);
      }).then(() => {
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
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    const noEmojiShown = () => component.find(EmojiTypeAheadItem).length === 0;

    return waitUntil(defaultEmojiShown)
      .then(() => {
        expect(onOpen.callCount, 'opened 1').to.equal(1);
        expect(onClose.callCount, 'closed 1').to.equal(0);
        component.setProps({ query: 'zeroresults' });
        return waitUntil(noEmojiShown);
      })
      .then(() => {
        expect(onOpen.callCount, 'opened 2').to.equal(1);
        expect(onClose.callCount, 'closed 2').to.equal(1);
      });
  });
});
