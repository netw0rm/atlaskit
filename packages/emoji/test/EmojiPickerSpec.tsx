import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import { waitUntil } from '@atlaskit/util-common-test';

import { emojiRepository, getEmojiResourcePromise } from './TestData';

import CategorySelector from '../src/components/picker/CategorySelector';
import Emoji from '../src/components/common/Emoji';
import EmojiButton from '../src/components/common/EmojiButton';
import EmojiPicker, { Props } from '../src/components/picker/EmojiPicker';
import EmojiPickerFooter from '../src/components/picker/EmojiPickerFooter';
import EmojiPickerList from '../src/components/picker/EmojiPickerList';
// import EmojiPickerListCategory from '../src/components/picker/EmojiPickerListCategory';
import { EmojiProvider } from '../src/api/EmojiResource';
// import EmojiPickerListSearch from '../src/components/picker/EmojiPickerListSearch';
import { OptionalEmojiDescription } from '../src/types';

function setupPicker(props?: Props): ReactWrapper<any, any> {
  return mount(
    <EmojiPicker
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      {...props}
    />
  );
}

const leftClick = {
  button: 0,
};

const allEmojis = emojiRepository.all().emojis;

const findEmoji = list => list.find(Emoji);
const emojisVisible = (list) => findEmoji(list).length > 0;

describe('<EmojiPicker />', () => {
  describe('display', () => {
    it('should display first set of emoji in viewport by default', () => {
      const component = setupPicker();
      const list = component.find(EmojiPickerList);

      return waitUntil(() => emojisVisible(list)).then(() => {
        const emojis = findEmoji(list);
        const emojiProp = emojis.at(0).prop('emoji');
        expect(emojiProp.id, 'First emoji displayed').to.equal(allEmojis[0].id);
        const lastEmojiProp = emojis.at(emojis.length - 1).prop('emoji');
        expect(lastEmojiProp.id, 'Last displayed emoji in same order as source data').to.equal(allEmojis[emojis.length - 1].id);
      });
    });

    it('should display all categories', () => {
      const component = setupPicker();
      const categorySelector = component.find(CategorySelector);
      const buttons = categorySelector.find('button');
      const expectedCategories = CategorySelector.defaultProps.categories;

      expect(buttons.length, 'Number of category buttons').to.equal(expectedCategories.length);
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons.at(i);
        expect(button.text(), `Button #${i} (${button.text()})`).to.equal(expectedCategories[i].name);
      }
    });

    it('should empty preview by default', () => {
      const component = setupPicker();
      const footer = component.find(EmojiPickerFooter);
      const previewEmoji = footer.find(Emoji);

      expect(previewEmoji.length, 'No emoji preview by default').to.equal(0);
    });
  });

  describe('hover', () => {
    it('should update preview on hover', () => {
      const hoverOffset = 5;
      const component = setupPicker();
      const footer = component.find(EmojiPickerFooter);
      const list = component.find(EmojiPickerList);

      return waitUntil(() => emojisVisible(list)).then(() => {
        const hoverButton = list.find(EmojiButton).at(hoverOffset);
        hoverButton.simulate('mousemove');
        const previewEmoji = footer.find(Emoji);
        expect(previewEmoji.length, 'Emoji preview after hover').to.equal(1);
        const emojiProps = previewEmoji.prop('emoji');
        expect(emojiProps.id, 'First emoji displayed').to.equal(allEmojis[hoverOffset].id);
      });
    });
  });

  describe('category', () => {
    it('selecting category should show that category', () => {
      const component = setupPicker();
      const categorySelector = component.find(CategorySelector);

      const list = component.find(EmojiPickerList);
      expect(list.prop('selectedCategory'), 'Flags category not yet selected').to.not.equal('FLAGS');

      const flagCategoryButton = categorySelector.find('button').filterWhere(n => n.key() === 'Flags');
      expect(flagCategoryButton.length, 'Flag category button').to.equal(1);
      flagCategoryButton.simulate('click', leftClick);

      return waitUntil(() => list.prop('selectedCategory') === 'FLAGS').then(() => {
        expect(list.prop('selectedCategory'), 'Flags category selected').to.equal('FLAGS');
      });
    });
  });

  describe('selection', () => {
    it('selecting emoji should trigger onSelection', () => {
      let selection: OptionalEmojiDescription;
      const clickOffset = 10;
      const component = setupPicker({
        onSelection: (emojiId, emoji) => { selection = emoji; },
      } as Props);
      const list = component.find(EmojiPickerList);
      const hoverButton = () => list.find(EmojiButton).at(clickOffset);
      return waitUntil(() => hoverButton().exists()).then(() => {
        hoverButton().simulate('mousedown', leftClick);
        return waitUntil(() => !!selection).then(() => {
          expect(selection, 'Selected emoji defined').to.not.equal(undefined);
          if (selection) {
            expect(selection.id, 'Selected emoji id').to.equal(allEmojis[clickOffset].id);
          }
        });
      });
    });
  });

  // it('searching for aus should match emoji via description', () => {
  //   const component = setupPicker();
  //   const search = component.find(EmojiPickerListSearch);
  //   const searchInput = search.find('input');
  //   // const searchInput: ReactHTMLElement<HTMLInputElement> = searchInputWrapper.get(0) as ReactHTMLElement<HTMLInputElement>;
  //   console.log('input', searchInput, searchInput.props());
  //   searchInput.value = 'aus';
  //   searchInput.first().simulate('change');
  //   const list = component.find(EmojiPickerList);
  //   const emojis = list.find(Emoji);
  //   expect(emojis.length, 'Two matching emoji').to.equal(2);
  //   expect(emojis.at(0).prop('id'), 'Australia emoji displayed').to.equal('flag_au');
  //   expect(emojis.at(1).prop('id'), 'Austria emoji displayed').to.equal('flag_at');
  // });

  // it('searching for aus should match emoji via shortName', () => {
  //   const component = setupPicker();
  //   const search = component.find(EmojiPickerListSearch);
  //   const searchInput = search.find('input');
  //   searchInput.get(0).value = 'ok_wo';
  //   searchInput.first().simulate('change');
  //   const list = component.find(EmojiPickerList);
  //   const emojis = list.find(Emoji);
  //   expect(emojis.length, '1 matching emoji').to.equal(1);
  //   expect(emojis.at(0).prop('id'), 'ok_woman emoji displayed').to.equal('ok_woman');
  // });
});
