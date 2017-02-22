import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { emojiService, emojis } from './TestData';
import { isEmojiTypeAheadItemSelected, getEmojiTypeAheadItemById } from './emoji-selectors';

import EmojiTypeAhead, { defaultListLimit, Props, OnLifecycle } from '../src/components/typeahead/EmojiTypeAhead';
import EmojiTypeAheadItem from '../src/components/typeahead/EmojiTypeAheadItem';
import { EmojiDescription } from '../src/types';

function setupPicker(props?: Props): ReactWrapper<any, any> {
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
    expect(component.find(EmojiTypeAheadItem).length).to.equal(defaultListLimit);
  });

  it('should limit results to those matching "grin"', () => {
    const component = setupPicker({
      query: 'grin',
    } as Props);
    expect(component.find(EmojiTypeAheadItem).length).to.equal(2);
  });

  it('should limit result to matching "ball"', () => {
    const component = setupPicker({
      query: 'ball',
    } as Props);
    expect(component.find(EmojiTypeAheadItem).length).to.equal(3);
  });

  it('should change selection when navigating next', () => {
    const component = setupPicker();
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    const secondItemSelected = () => isEmojiTypeAheadItemSelected(component, emojis[1].id);
    expect(defaultEmojiShown()).to.equal(true);

    const instance = component.instance() as EmojiTypeAhead;
    instance.selectNext();

    expect(secondItemSelected()).to.equal(true);
  });

  it('should change selection when navigating previous', () => {
    const component = setupPicker();
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    const lastItemSelected = () =>
      isEmojiTypeAheadItemSelected(component, emojis[defaultListLimit - 1].id);
    expect(defaultEmojiShown()).to.equal(true);

    const instance = component.instance() as EmojiTypeAhead;
    instance.selectPrevious();

    expect(lastItemSelected()).to.equal(true);
  });

  it('should choose current selection when chooseCurrentSelection called', () => {
    let choseEmoji: EmojiDescription;

    const component = setupPicker({
      onSelection: (emojiId, emoji) => { choseEmoji = emoji; },
    } as Props);
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    const secondItemSelected = () => isEmojiTypeAheadItemSelected(component, emojis[1].id);
    const chooseSecondItem = () => (choseEmoji && choseEmoji.id === emojis[1].id);
    expect(defaultEmojiShown()).to.equal(true);

    const instance = component.instance() as EmojiTypeAhead;
    instance.selectNext();
    expect(secondItemSelected()).to.equal(true);

    instance.chooseCurrentSelection();
    expect(chooseSecondItem()).to.equal(true);
  });

  it('should choose clicked selection when item clicked', () => {
    let choseEmoji: EmojiDescription;

    const component = setupPicker({
      onSelection: (emojiId, emoji) => { choseEmoji = emoji; },
    } as Props);
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
      onOpen: onOpen as OnLifecycle,
      onClose: onClose as OnLifecycle,
    } as Props);
    const defaultEmojiShown = () => component.find(EmojiTypeAheadItem).length === defaultListLimit;
    expect(defaultEmojiShown()).to.equal(true);
    expect(onOpen.callCount, 'opened').to.equal(1);
    expect(onClose.callCount, 'closed').to.equal(0);
  });

  it('should fire onOpen when first result shown', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen: onOpen as OnLifecycle,
      onClose: onClose as OnLifecycle,
      query: 'zeroresults',
    } as Props);
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
      onOpen: onOpen as OnLifecycle,
      onClose: onClose as OnLifecycle,
    } as Props);
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
