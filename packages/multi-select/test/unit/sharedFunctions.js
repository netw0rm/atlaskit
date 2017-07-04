import { name } from '../../package.json';
import { getNextFocusable, getPrevFocusable, filterItems } from '../../src/internal/sharedFunctions';

describe(`${name} - shared functions`, () => {
  describe('filterItems', () => {
    it('should return items intact if nothing is selected and filter is empty', () => {
      const items = [
        { value: 1, filterValues: ['Test1'] },
        { value: 2, filterValues: ['Test 2'] },
        { value: 3, filterValues: ['Third test'] },
      ];
      expect(filterItems(items, '', [])).to.deep.equal(items);
    });

    it('should filter out selected items when the filter is empty', () => {
      const items = [
        { value: 1, filterValues: ['Test1'] },
        { value: 2, filterValues: ['Test 2'] },
        { value: 3, filterValues: ['Third test'] },
      ];
      expect(filterItems(items, '', [items[0]])).to.deep.equal([items[1], items[2]]);
    });

    it('should return filtered items when nothing is selected', () => {
      const items = [
        { value: 1, filterValues: ['Test1'] },
        { value: 2, filterValues: ['Test 2'] },
        { value: 3, filterValues: ['Third test'] },
        { value: 4, filterValues: ['fourth', 'test'] },
      ];
      expect(filterItems(items, 'Test1', [])).to.deep.equal([items[0]]);
      expect(filterItems(items, 'test', [])).to.deep.equal(items);
    });

    it('should filter out selected items and return filtered items', () => {
      const items = [
        { value: 1, filterValues: ['Test one'] },
        { value: 2, filterValues: ['Test two'] },
        { value: 3, filterValues: ['Test three'] },
        { value: 4, filterValues: ['This should stay behind'] },
      ];
      expect(filterItems(items, 'Test', [items[0]])).to.deep.equal([items[1], items[2]]);
    });

    it('should filter by content if filterValues are not provided', () => {
      const items = [
        { value: 1, content: 'Test1' },
        { value: 2, content: 'Test 2', filterValues: ['Test 2'] },
        { value: 3, filterValues: ['Third', 'test'] },
      ];
      expect(filterItems(items, 'Test1 ', [])).to.deep.equal([items[0]]);
      expect(filterItems(items, 'test', [])).to.deep.equal(items);
    });
  });

  describe('getNextFocusable', () => {
    it('should return 0 if null is passed as a current focus', () => {
      expect(getNextFocusable(null, 2)).to.equal(0);
    });

    it('should return next item', () => {
      expect(getNextFocusable(0, 2)).to.equal(1);
    });

    it('should return 0 if focus is on the last item', () => {
      expect(getNextFocusable(1, 2)).to.equal(0);
    });

    it('should return the footer index if on last item and footer is focusable', () => {
      expect(getNextFocusable(1, 2, true)).to.equal(2);
    });

    it('should return 0 if focus is on the footer', () => {
      expect(getNextFocusable(2, 2)).to.equal(0);
    });
  });

  describe('getPrevFocusable', () => {
    it('should return previous item', () => {
      expect(getPrevFocusable(1, 2)).to.equal(0);
    });

    it('should return length - 1 if focus is on the first item (and footer is not focusable)', () => {
      expect(getPrevFocusable(0, 2)).to.equal(1);
    });

    it('should return footer index if on first item (and footer is focusable)', () => {
      expect(getPrevFocusable(0, 2, true)).to.equal(2);
    });
  });
});
