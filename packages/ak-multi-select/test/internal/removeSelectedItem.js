import { tearDownComponent, afterMutations } from 'akutil-common-test';

import { name } from '../../package.json';
import { initMultiSelect } from '../_helpers';
import selectItem from '../../src/internal/selectItem';
import removeSelectedItem from '../../src/internal/removeSelectedItem';
import shadowStyles from '../../src/shadow.less';
import { itemsSymbol } from '../../src/internal/symbols';

describe(name, () => {
  describe('removeSelectedItem', () => {
    let component;

    beforeEach(() => initMultiSelect().then((newComponent) => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));

    it('should be possible to remove a selected item', (done) => {
      // need to select something before removing it
      const item = component.firstChild.children[1];
      selectItem(component, item);

      afterMutations(
        () => {
          const t = component.shadowRoot.querySelector(`.${shadowStyles.locals.trigger}`);
          const tag = t.children[1].children[0];
          removeSelectedItem(component, tag);
        },
        () => {
          expect(component[itemsSymbol].length).to.equal(0);
          expect(item.hidden).to.equal(false);
          expect(item.selected).to.equal(false);
        },
        done
      );
    });

    it('should be possible to remove a bunch of items', (done) => {
      // need to select something before removing it
      const item1 = component.firstChild.children[0];
      const item2 = component.firstChild.children[1];
      const item3 = component.firstChild.children[2];
      selectItem(component, item1);
      selectItem(component, item2);
      selectItem(component, item3);

      afterMutations(
        () => {
          const t = component.shadowRoot.querySelector(`.${shadowStyles.locals.trigger}`);
          const tags = t.children[1].children;
          removeSelectedItem(component, tags[0]);
          removeSelectedItem(component, tags[1]);
          removeSelectedItem(component, tags[2]);
        },
        () => {
          expect(component[itemsSymbol].length).to.equal(0);
          expect(item1.hidden).to.equal(false);
          expect(item1.selected).to.equal(false);
          expect(item2.hidden).to.equal(false);
          expect(item2.selected).to.equal(false);
          expect(item3.hidden).to.equal(false);
          expect(item3.selected).to.equal(false);
        },
        done
      );
    });
  });
});
