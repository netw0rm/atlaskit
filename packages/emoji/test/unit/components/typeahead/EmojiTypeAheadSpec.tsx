import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { waitUntil } from '@atlaskit/util-common-test';


import {
    atlassianBoomEmoji,
    blackFlagEmoji,
    getEmojiResourcePromise,
    mockLocalStorage,
    newEmojiRepository,
    openMouthEmoji,
    standardBoomEmoji
} from '../../../../src/support/test-data';
import { isEmojiTypeAheadItemSelected, getEmojiTypeAheadItemById, getSelectedEmojiTypeAheadItem  } from '../../_emoji-selectors';

import EmojiTypeAhead, { defaultListLimit, Props } from '../../../../src/components/typeahead/EmojiTypeAhead';
import EmojiTypeAheadComponent from '../../../../src/components/typeahead/EmojiTypeAheadComponent';
import { OnLifecycle } from '../../../../src/components/typeahead/EmojiTypeAheadComponent';
import EmojiTypeAheadItem from '../../../../src/components/typeahead/EmojiTypeAheadItem';
import { OptionalEmojiDescription, OnEmojiEvent } from '../../../../src/types';
import { toEmojiId } from '../../../../src/type-helpers';
import { EmojiProvider } from '../../../../src/api/EmojiResource';
import { Props as TypeAheadProps } from '../../../../src/components/typeahead/EmojiTypeAhead';
import { State as TypeAheadState } from '../../../../src/components/typeahead/EmojiTypeAheadComponent';

declare var global: any;

function setupTypeAhead(props?: Props): Promise<ReactWrapper<any, any>> {
  const component = mount(
    <EmojiTypeAhead
      emojiProvider={props && props.emojiProvider ? props.emojiProvider : getEmojiResourcePromise() as Promise<EmojiProvider>}
      query=""
      {...props}
    />
  );

  return waitUntil(() => component.find(EmojiTypeAheadComponent).length > 0)
  .then(() => component);
}

const allEmojis = newEmojiRepository().all().emojis;

const leftClick = {
  button: 0,
};

const findEmojiItems = (component) => component.find(EmojiTypeAheadItem);
const itemsVisibleCount = (component) => findEmojiItems(component).length;
const itemsVisible = (component) => itemsVisibleCount(component) > 0;
const doneLoading = (component: ReactWrapper<TypeAheadProps, TypeAheadState>) => !component.state('loading');

describe('EmojiTypeAhead', () => {
  const localStorage = global.window.localStorage;
  beforeEach(() => {
    global.window.localStorage = mockLocalStorage;
  });

  afterEach(() => {
    global.window.localStorage.clear();
    global.window.localStorage = localStorage;
  });

  it('should display max emoji by default', () =>
    setupTypeAhead().then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        expect(findEmojiItems(component).length).toBe(defaultListLimit);
      })
    )
  );

  it('should limit results to those matching "grin"', () =>
    setupTypeAhead({
      query: 'grin',
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        expect(findEmojiItems(component).length).toBe(2);
      })
    )
  );

  it('should limit result to matching "ball"', () =>
    setupTypeAhead({
      query: 'ball',
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        expect(findEmojiItems(component).length).toBe(2);
      })
    )
  );

  it('should change selection when navigating next', () =>
    setupTypeAhead().then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
        const secondItemSelected = () => isEmojiTypeAheadItemSelected(component, allEmojis[1].id);
        expect(defaultEmojiShown()).toBe(true);

        const instance = component.instance() as EmojiTypeAhead;
        instance.selectNext();

        expect(secondItemSelected()).toBe(true);
      })
    )
  );

  it('should change selection when navigating previous', () =>
    setupTypeAhead().then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
        const lastItemSelected = () =>
          isEmojiTypeAheadItemSelected(component, allEmojis[defaultListLimit - 1].id);
        expect(defaultEmojiShown()).toBe(true);

        const instance = component.instance() as EmojiTypeAhead;
        instance.selectPrevious();

        expect(lastItemSelected()).toBe(true);
      })
    )
  );

  it('should choose current selection when chooseCurrentSelection called', () => {
    let choseEmoji: OptionalEmojiDescription;
    return setupTypeAhead({
      onSelection: (emojiId, emoji) => { choseEmoji = emoji; },
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
        const secondItemSelected = () => isEmojiTypeAheadItemSelected(component, allEmojis[1].id);
        const chooseSecondItem = () => (choseEmoji && choseEmoji.id === allEmojis[1].id);
        expect(defaultEmojiShown()).toBe(true);

        const instance = component.instance() as EmojiTypeAhead;
        instance.selectNext();
        expect(secondItemSelected()).toBe(true);

        instance.chooseCurrentSelection();
        expect(chooseSecondItem()).toBe(true);
      })
    );
  });

  it('should choose clicked selection when item clicked', () => {
    let choseEmoji: OptionalEmojiDescription;

    return setupTypeAhead({
      onSelection: (emojiId, emoji) => { choseEmoji = emoji; },
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
        const chooseThirdItem = () => (choseEmoji && choseEmoji.id === allEmojis[2].id);
        expect(defaultEmojiShown()).toBe(true);

        const item = getEmojiTypeAheadItemById(component, allEmojis[2].id);
        item.simulate('mousedown', leftClick);
        expect(chooseThirdItem()).toBe(true);
      })
    );
  });

  it('should fire onOpen on initial display', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    return setupTypeAhead({
      onOpen: onOpen as OnLifecycle,
      onClose: onClose as OnLifecycle,
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
        expect(defaultEmojiShown()).toBe(true);
        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onClose).not.toHaveBeenCalled();
      })
    );
  });

  it('should fire onOpen when first result shown', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    return setupTypeAhead({
      onOpen: onOpen as OnLifecycle,
      onClose: onClose as OnLifecycle,
      query: 'zeroresults',
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        const noEmojiShown = () => findEmojiItems(component).length === 0;
        const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
        expect(noEmojiShown()).toBe(true);
        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(1);
        component.setProps({ query: '' });

        return waitUntil(() => itemsVisible(component)).then(() => {
          expect(defaultEmojiShown()).toBe(true);
          expect(onOpen).toHaveBeenCalledTimes(2);
          expect(onClose).toHaveBeenCalledTimes(1);
        });
      })
    );
  });

  it('should fire onClose when no matches', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    return setupTypeAhead({
      onOpen: onOpen as OnLifecycle,
      onClose: onClose as OnLifecycle,
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
        const noEmojiShown = () => findEmojiItems(component).length === 0;
        expect(defaultEmojiShown()).toBe(true);
        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onClose).not.toHaveBeenCalled();
        component.setProps({ query: 'zeroresults' });

        return waitUntil(() => !itemsVisible(component)).then(() => {
          expect(noEmojiShown()).toBe(true);
          expect(onOpen).toHaveBeenCalledTimes(1);
          expect(onClose).toHaveBeenCalledTimes(1);
        });
      })
    );
  });

  it('should find two matches when querying "boom"', () =>
    // Confirm initial state for later conflicting shortName tests
    setupTypeAhead({
      query: 'boom',
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        expect(findEmojiItems(component).length).toBe(2);
      })
    )
  );

  it('should highlight emojis by matching on id then falling back to shortName', () => {
    const standardBoomId = toEmojiId(standardBoomEmoji);

    return setupTypeAhead({
      query: 'boom',
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        const item = getEmojiTypeAheadItemById(component, standardBoomEmoji.id);
        item.prop('onMouseMove')(standardBoomId, standardBoomEmoji, item.simulate('mouseover'));
        expect(isEmojiTypeAheadItemSelected(component, standardBoomEmoji.id)).toBe(true);
      })
    );
  });

  it('should highlight correct emoji regardless of conflicting shortName', () => {
    const atlassianBoomId = toEmojiId(atlassianBoomEmoji);

    return setupTypeAhead({
      query: 'boom',
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        const item = getEmojiTypeAheadItemById(component, atlassianBoomEmoji.id);
        item.prop('onMouseMove')(atlassianBoomId, atlassianBoomEmoji, item.simulate('mouseover'));
        expect(isEmojiTypeAheadItemSelected(component, atlassianBoomEmoji.id)).toBe(true);
      })
    );
  });

  // it('should render placeholder for unloaded media emoji', () => {
  //   return setupTypeAhead({
  //     query: 'media',
  //   } as Props)
  //   .then(component =>
  //     waitUntil(() => doneLoading(component)).then(() => {
  //       const emojiItems = findEmojiItems(component);
  //       expect(emojiItems.length).toBe(1);
  //       const placeholders = emojiItems.find(EmojiPlaceholder);
  //       expect(placeholders.length).toBe(1);
  //       const props = placeholders.get(0).props;
  //       expect(props.shortName, 'short name').toBes(mediaEmoji.shortName);
  //     })
  //   );
  // });

  it('should retain selected match across search refinement', () => {
    const blackFlagId = toEmojiId(blackFlagEmoji);

    return setupTypeAhead({
      query: 'fla',
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        let item = getEmojiTypeAheadItemById(component, blackFlagId.id);
        item.prop('onMouseMove')(blackFlagId, blackFlagEmoji, item.simulate('mouseover'));
        expect(isEmojiTypeAheadItemSelected(component, blackFlagId.id)).toBe(true);

        const itemCount = itemsVisibleCount(component);
        component.setProps({ query: 'flag_b' });

        return waitUntil(() => itemsVisibleCount(component) < itemCount).then(() => {
          expect(isEmojiTypeAheadItemSelected(component, blackFlagId.id)).toBe(true);
        });
      })
    );
  });

  it('should default to exact ascii selection first', () =>
    setupTypeAhead({
      query: ':O',
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        expect(itemsVisibleCount(component) > 1).toBe(true);
        expect(isEmojiTypeAheadItemSelected(component, openMouthEmoji.id)).toBe(true);
      })
    )
  );

  it('should fire onSelection if a query ends in a colon and has an exact match with one emoji shortName', () => {
    const onSelection = jest.fn();

    return setupTypeAhead({
      onSelection: onSelection as OnEmojiEvent,
      query: ':grin:',
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        expect(onSelection).toHaveBeenCalledTimes(1);
      })
    );
  });

  it('should not fire onSelection if a query ends in a colon and more than one emoji has an exact shortName match', () => {
    const onSelection = jest.fn();

    return setupTypeAhead({
      onSelection: onSelection as OnEmojiEvent,
      query: ':boom:',
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        expect(itemsVisibleCount(component) > 1).toBe(true);
        expect(onSelection).not.toHaveBeenCalled();
      })
    );
  });

  it('should not fire onSelection if a query ends in a colon and no emojis have an exact shortName match', () => {
    const onSelection = jest.fn();

    return setupTypeAhead({
      onSelection: onSelection as OnEmojiEvent,
      query: ':blah:',
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        const noEmojiShown = () => findEmojiItems(component).length === 0;
        expect(noEmojiShown()).toBe(true);
        expect(onSelection).not.toHaveBeenCalled();
      })
    );
  });

  it('should perform case insensitive exact shortName matching', () => {
    const onSelection = jest.fn();

    return setupTypeAhead({
      onSelection: onSelection as OnEmojiEvent,
      query: ':GRIN:',
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        expect(onSelection).toHaveBeenCalledTimes(1);
      })
    );
  });

  it('should display emojis without skin tone variations by default', () => {
    return setupTypeAhead({
      query: 'raised_hand',
    } as Props)
    .then(component =>
      waitUntil(() => doneLoading(component)).then(() => {
        expect(itemsVisibleCount(component) === 1).toBe(true);
        const typeaheadEmoji = getSelectedEmojiTypeAheadItem(component).prop('emoji');
        expect(typeaheadEmoji.shortName).toBe(':raised_hand:');
      })
    );
  });

  it('should display emojis using the skin tone preference provided by the EmojiResource', () => {
    const emojiProvider = getEmojiResourcePromise();
    emojiProvider.then(provider => provider.setSelectedTone(1));

    return setupTypeAhead({
      emojiProvider: emojiProvider,
      query: 'raised_hand',
    } as Props)
    .then(component => waitUntil(() => doneLoading(component)).then(() => {
      expect(itemsVisibleCount(component) === 1).toBe(true);
      const typeaheadEmoji = getSelectedEmojiTypeAheadItem(component).prop('emoji');
      expect(typeaheadEmoji.shortName).toBe(':raised_hand::skin-tone-2:');
    }));
  });

  it('should remember skin tone preference between session in the typeahead', () => {
    const setSpy = jest.spyOn(window.localStorage, 'setItem');
    getEmojiResourcePromise().then(provider => provider.setSelectedTone(2));

    return waitUntil(() => setSpy.mock.calls.length === 1).then(() =>
      setupTypeAhead({
        query: 'raised_hand',
      } as Props)
      .then(component => waitUntil(() => doneLoading(component)).then(() => {
        expect(itemsVisibleCount(component) === 1).toBe(true);
        const typeaheadEmoji = getSelectedEmojiTypeAheadItem(component).prop('emoji');
        expect(typeaheadEmoji.shortName).toBe(':raised_hand::skin-tone-3:');
      })) &&
      // Second typeahead should have tone set by default
      setupTypeAhead({
        query: 'raised_hand',
      } as Props)
      .then(component => waitUntil(() => doneLoading(component)).then(() => {
        expect(itemsVisibleCount(component) === 1).toBe(true);
        const typeaheadEmoji = getSelectedEmojiTypeAheadItem(component).prop('emoji');
        expect(typeaheadEmoji.shortName).toBe(':raised_hand::skin-tone-3:');
      }))

    );
  });

});
