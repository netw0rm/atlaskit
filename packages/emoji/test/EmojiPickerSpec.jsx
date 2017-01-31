import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';

import { testingEmojiService } from '../stories/story-data';

import CategorySelector from '../src/internal/picker/CategorySelector';
import Emoji from '../src/Emoji';
import EmojiButton from '../src/internal/common/EmojiButton';
import EmojiPicker from '../src/EmojiPicker';
import EmojiPickerFooter from '../src/internal/picker/EmojiPickerFooter';
import EmojiPickerList from '../src/internal/picker/EmojiPickerList';
// import EmojiPickerListSearch from '../src/internal/picker/EmojiPickerListSearch';

chai.should();

function setupPicker(props) {
  return mount(
    <EmojiPicker
      emojiService={testingEmojiService}
      query=""
      {...props}
    />
  );
}

const leftClick = {
  button: 0,
};

const allEmojis = testingEmojiService.all().emojis;

describe('<EmojiPicker />', () => {
  describe('display', () => {
    it('should display first set of emoji in viewport by default', () => {
      const component = setupPicker();
      const list = component.find(EmojiPickerList);
      const emojis = list.find(Emoji);

      expect(emojis.at(0).prop('id'), 'First emoji displayed').to.equal(allEmojis[0].id);
      expect(emojis.at(emojis.length - 1).prop('id'), 'Last displayed emoji in same order as source data').to.equal(allEmojis[emojis.length - 1].id);
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
      const hoverButton = list.find(EmojiButton).at(hoverOffset);
      hoverButton.simulate('mouseenter');
      const previewEmoji = footer.find(Emoji);
      expect(previewEmoji.length, 'Emoji preview after hover').to.equal(1);
      expect(previewEmoji.prop('id'), 'First emoji displayed').to.equal(allEmojis[hoverOffset].id);
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

      expect(list.prop('selectedCategory'), 'Flags category selected').to.equal('FLAGS');
    });
  });

  describe('selection', () => {
    it('selecting emoji should trigger onSelection', () => {
      let selection;
      const clickOffset = 10;
      const component = setupPicker({
        onSelection: (emoji) => { selection = emoji; },
      });
      const list = component.find(EmojiPickerList);
      const hoverButton = list.find(EmojiButton).at(clickOffset);
      hoverButton.simulate('mousedown', leftClick);
      expect(selection, 'Selected emoji defined').to.not.equal(undefined);
      expect(selection.id, 'Selected emoji id').to.equal(allEmojis[clickOffset].id);
    });
  });

  // describe('search', () => {
  //   it('searching for aus should match emoji via description', () => {
  //     const component = setupPicker();
  //     const search = component.find(EmojiPickerListSearch);
  //     const searchInput = search.find('input');
  //     searchInput.get(0).value = 'aus';
  //     searchInput.first().simulate('change');
  //     const list = component.find(EmojiPickerList);
  //     const emojis = list.find(Emoji);
  //     expect(emojis.length, 'Two matching emoji').to.equal(2);
  //     expect(emojis.at(0).prop('id'), 'Australia emoji displayed').to.equal('flag_au');
  //     expect(emojis.at(1).prop('id'), 'Austria emoji displayed').to.equal('flag_at');
  //   });
  // });

  // describe('search', () => {
  //   it('searching for ok_wo should match emoji via shortcut', () => {
  //     const component = setupPicker();
  //     const search = component.find(EmojiPickerListSearch);
  //     const searchInput = search.find('input');
  //     searchInput.get(0).value = 'ok_wo';
  //     searchInput.first().simulate('change');
  //     const list = component.find(EmojiPickerList);
  //     const emojis = list.find(Emoji);
  //     expect(emojis.length, '1 matching emoji').to.equal(1);
  //     expect(emojis.at(0).prop('id'), 'ok_woman emoji displayed').to.equal('ok_woman');
  //   });
  // });
});
