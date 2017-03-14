import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { waitUntil } from '@atlaskit/util-common-test';

import { emojiService, getEmojiResourcePromise } from './TestData';
import { isEmojiTypeAheadItemSelected, getEmojiTypeAheadItemById } from './emoji-selectors';

import EmojiTypeAhead, { defaultListLimit, Props, OnLifecycle } from '../src/components/typeahead/EmojiTypeAhead';
import EmojiTypeAheadItem from '../src/components/typeahead/EmojiTypeAheadItem';
import { OptionalEmojiDescription } from '../src/types';
import { EmojiProvider } from '../src/api/EmojiResource';
import { Props as TypeAheadProps, State as TypeAheadState } from '../src/components/typeahead/EmojiTypeAhead';

function setupPicker(props?: Props): ReactWrapper<any, any> {
  return mount(
    <EmojiTypeAhead
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      query=""
      {...props}
    />
  );
}

const allEmojis = emojiService.all().emojis;

const leftClick = {
  button: 0,
};

const findEmojiItems = (component) => component.find(EmojiTypeAheadItem);
const itemsVisible = (component) => findEmojiItems(component).length > 0;
const doneLoading = (component: ReactWrapper<TypeAheadProps, TypeAheadState>) => !component.state('loading');

describe('EmojiTypeAhead', () => {
  it('should display max emoji by default', () => {
    const component = setupPicker();
    return waitUntil(() => doneLoading(component)).then(() => {
      expect(findEmojiItems(component).length).to.equal(defaultListLimit);
    });
  });

  it('should limit results to those matching "grin"', () => {
    const component = setupPicker({
      query: 'grin',
    } as Props);
    return waitUntil(() => doneLoading(component)).then(() => {
      expect(findEmojiItems(component).length).to.equal(2);
    });
  });

  it('should limit result to matching "ball"', () => {
    const component = setupPicker({
      query: 'ball',
    } as Props);
    return waitUntil(() => doneLoading(component)).then(() => {
      expect(findEmojiItems(component).length).to.equal(3);
    });
  });

  it('should change selection when navigating next', () => {
    const component = setupPicker();
    return waitUntil(() => doneLoading(component)).then(() => {
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      const secondItemSelected = () => isEmojiTypeAheadItemSelected(component, allEmojis[1].id);
      expect(defaultEmojiShown()).to.equal(true);

      const instance = component.instance() as EmojiTypeAhead;
      instance.selectNext();

      expect(secondItemSelected()).to.equal(true);
    });
  });

  it('should change selection when navigating previous', () => {
    const component = setupPicker();
    return waitUntil(() => doneLoading(component)).then(() => {
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      const lastItemSelected = () =>
        isEmojiTypeAheadItemSelected(component, allEmojis[defaultListLimit - 1].id);
      expect(defaultEmojiShown()).to.equal(true);

      const instance = component.instance() as EmojiTypeAhead;
      instance.selectPrevious();

      expect(lastItemSelected()).to.equal(true);
    });
  });

  it('should choose current selection when chooseCurrentSelection called', () => {
    let choseEmoji: OptionalEmojiDescription;

    const component = setupPicker({
      onSelection: (emojiId, emoji) => { choseEmoji = emoji; },
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      const secondItemSelected = () => isEmojiTypeAheadItemSelected(component, allEmojis[1].id);
      const chooseSecondItem = () => (choseEmoji && choseEmoji.id === allEmojis[1].id);
      expect(defaultEmojiShown()).to.equal(true);

      const instance = component.instance() as EmojiTypeAhead;
      instance.selectNext();
      expect(secondItemSelected()).to.equal(true);

      instance.chooseCurrentSelection();
      expect(chooseSecondItem()).to.equal(true);
    });
  });

  it('should choose clicked selection when item clicked', () => {
    let choseEmoji: OptionalEmojiDescription;

    const component = setupPicker({
      onSelection: (emojiId, emoji) => { choseEmoji = emoji; },
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      const chooseThirdItem = () => (choseEmoji && choseEmoji.id === allEmojis[2].id);
      expect(defaultEmojiShown()).to.equal(true);

      const item = getEmojiTypeAheadItemById(component, allEmojis[2].id);
      item.simulate('mousedown', leftClick);
      expect(chooseThirdItem()).to.equal(true);
    });
  });

  it('should fire onOpen on initial display', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen: onOpen as OnLifecycle,
      onClose: onClose as OnLifecycle,
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      expect(defaultEmojiShown()).to.equal(true);
      expect(onOpen.callCount, 'opened').to.equal(1);
      expect(onClose.callCount, 'closed').to.equal(0);
    });
  });

  it('should fire onOpen when first result shown', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen: onOpen as OnLifecycle,
      onClose: onClose as OnLifecycle,
      query: 'zeroresults',
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      const noEmojiShown = () => findEmojiItems(component).length === 0;
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      expect(noEmojiShown()).to.equal(true);
      expect(onOpen.callCount, 'opened 1').to.equal(1);
      expect(onClose.callCount, 'closed 1').to.equal(1);
      component.setProps({ query: '' });

      return waitUntil(() => itemsVisible(component)).then(() => {
        expect(defaultEmojiShown()).to.equal(true);
        expect(onOpen.callCount, 'opened 2').to.equal(2);
        expect(onClose.callCount, 'closed 2').to.equal(1);
      });
    });
  });

  it('should fire onClose when no matches', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen: onOpen as OnLifecycle,
      onClose: onClose as OnLifecycle,
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      const noEmojiShown = () => findEmojiItems(component).length === 0;
      expect(defaultEmojiShown()).to.equal(true);
      expect(onOpen.callCount, 'opened 1').to.equal(1);
      expect(onClose.callCount, 'closed 1').to.equal(0);
      component.setProps({ query: 'zeroresults' });

      return waitUntil(() => !itemsVisible(component)).then(() => {
        expect(noEmojiShown(), 'no emoji shown').to.equal(true);
        expect(onOpen.callCount, 'opened 2').to.equal(1);
        expect(onClose.callCount, 'closed 2').to.equal(1);
      });
    });
  });
});
