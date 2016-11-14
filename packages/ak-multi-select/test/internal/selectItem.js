import { tearDownComponent, afterMutations } from 'akutil-common-test';

import { name } from '../../package.json';
import { initMultiSelect } from '../_helpers';
import selectItem from '../../src/internal/selectItem';
import { itemsSymbol } from '../../src/internal/symbols';

describe(name, () => {
  describe('selectItem', () => {
    let component;

    beforeEach(() => initMultiSelect().then((newComponent) => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));

    it('should be possible to select an item', () => {
      const item = component.firstChild.firstChild;
      selectItem(component, item);
      afterMutations(
        () => {
          expect(component[itemsSymbol].length).to.equal(1);
          expect(item.hidden).to.equal(true);
          expect(item.selected).to.equal(true);
        }
      );
    });

    it('should be possible to select a few items within one group', (done) => {
      const group = component.firstChild;
      const item1 = group.children[0];
      const item2 = group.children[1];
      const item3 = group.children[2];
      selectItem(component, item1);
      selectItem(component, item2);
      selectItem(component, item3);
      afterMutations(
        () => {
          expect(component[itemsSymbol].length).to.equal(3);
          expect(item1.hidden).to.equal(true);
          expect(item1.selected).to.equal(true);
          expect(item2.hidden).to.equal(true);
          expect(item2.selected).to.equal(true);
          expect(item3.hidden).to.equal(true);
          expect(item3.selected).to.equal(true);
        },
        done
      );
    });

    it('should be possible to select a few items from different groups', (done) => {
      const group1 = component.children[0];
      const group2 = component.children[1];
      const item1 = group1.children[0];
      const item2 = group1.children[1];
      const item3 = group2.children[1];
      const item4 = group2.children[2];
      selectItem(component, item1);
      selectItem(component, item2);
      selectItem(component, item3);
      selectItem(component, item4);
      afterMutations(
        () => {
          expect(component[itemsSymbol].length).to.equal(4);
          expect(item1.hidden).to.equal(true);
          expect(item1.selected).to.equal(true);
          expect(item2.hidden).to.equal(true);
          expect(item2.selected).to.equal(true);
          expect(item3.hidden).to.equal(true);
          expect(item3.selected).to.equal(true);
          expect(item4.hidden).to.equal(true);
          expect(item4.selected).to.equal(true);
        },
        done
      );
    });
  });
});
