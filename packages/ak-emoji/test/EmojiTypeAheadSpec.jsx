import React from 'react';
import { mount } from 'enzyme';

import emojiService, { emojis } from '../stories/story-data';
import EmojiTypeAhead, { defaultListLimit } from '../src/EmojiTypeAhead';
import EmojiTypeAheadItem from '../src/internal/typeahead/EmojiTypeAheadItem';
import { isEmojiTypeAheadItemSelected, getEmojiTypeAheadItemById } from './emoji-selectors';

function setupPicker(props) {
  return mount(
    <EmojiTypeAhead
      emojiService={emojiService}
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
    expect(hasExpectedItems()).to.equal(true);
  });

  it('should limit results to those matching "grin"', () => {
    const component = setupPicker({
      query: 'grin',
    });
    const hasExpectedItems = () => component.find(EmojiTypeAheadItem).length === 3;
    expect(hasExpectedItems()).to.equal(true);
  });

  it('should limit result to matching "moon"', () => {
    const component = setupPicker({
      query: 'moon',
    });
    const hasExpectedItems = () => component.find(EmojiTypeAheadItem).length === 14;
    expect(hasExpectedItems()).to.equal(true);
  });

  it('should change selection when navigating next', () => {
    const component = setupPicker();
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    const secondItemSelected = () => isEmojiTypeAheadItemSelected(component, emojis[1].id);
    expect(defaultEmojiShown()).to.equal(true);
    component.instance().selectNext();
    expect(secondItemSelected()).to.equal(true);
  });

  it('should change selection when navigating previous', () => {
    const component = setupPicker();
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    const lastItemSelected = () =>
      isEmojiTypeAheadItemSelected(component, emojis[defaultListLimit - 1].id);
    expect(defaultEmojiShown()).to.equal(true);
    component.instance().selectPrevious();
    expect(lastItemSelected()).to.equal(true);
  });

  it('should choose current selection when chooseCurrentSelection called', () => {
    let choseEmoji = null;

    const component = setupPicker({
      onSelection: (emoji) => { choseEmoji = emoji; },
    });
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    const secondItemSelected = () => isEmojiTypeAheadItemSelected(component, emojis[1].id);
    const chooseSecondItem = () => (choseEmoji && choseEmoji.id === emojis[1].id);
    expect(defaultEmojiShown()).to.equal(true);
    component.instance().selectNext();
    expect(secondItemSelected()).to.equal(true);
    component.instance().chooseCurrentSelection();
    expect(chooseSecondItem()).to.equal(true);
  });

  it('should choose clicked selection when item clicked', () => {
    let choseEmoji = null;

    const component = setupPicker({
      onSelection: (emoji) => { choseEmoji = emoji; },
    });
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    const chooseThirdItem = () => (choseEmoji && choseEmoji.id === emojis[2].id);
    expect(defaultEmojiShown()).to.equal(true);
    const item = getEmojiTypeAheadItemById(component, emojis[2].id);
    item.simulate('mousedown', leftClick);
    expect(chooseThirdItem()).to.equal(true);
  });

  it('should fire onOpen on initial display', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen,
      onClose,
    });
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    expect(defaultEmojiShown()).to.equal(true);
    expect(onOpen.callCount, 'opened').to.equal(1);
    expect(onClose.callCount, 'closed').to.equal(0);
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
    expect(noEmojiShown()).to.equal(true);
    expect(onOpen.callCount, 'opened').to.equal(0);
    expect(onClose.callCount, 'closed').to.equal(0);
    component.setProps({ query: '' });

    expect(defaultEmojiShown()).to.equal(true);
    expect(onOpen.callCount, 'opened').to.equal(1);
    expect(onClose.callCount, 'closed').to.equal(0);
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
    expect(defaultEmojiShown()).to.equal(true);
    expect(onOpen.callCount, 'opened 1').to.equal(1);
    expect(onClose.callCount, 'closed 1').to.equal(0);
    component.setProps({ query: 'zeroresults' });
    expect(noEmojiShown()).to.equal(true);
    expect(onOpen.callCount, 'opened 2').to.equal(1);
    expect(onClose.callCount, 'closed 2').to.equal(1);
  });
});
