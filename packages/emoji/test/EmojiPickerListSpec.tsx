import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';

import { PickerSearchStyle } from '../src/components/picker/styles';
import EmojiList from '../src/components/picker/EmojiPickerList';
import { imageEmoji } from './TestData';

const emojis = [ imageEmoji ];

describe('<EmojiPickerList />', () => {
  describe('list', () => {
    it('should contain search ', () => {
      const wrapper = mount(<EmojiList
        emojis={emojis}
      />);

      expect(wrapper.find(PickerSearchStyle)).to.have.length(1);
    });
  });
});
