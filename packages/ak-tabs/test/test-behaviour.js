import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { waitUntil } from 'akutil-common-test';

import '../src';
import {
  setupTabs,
  cleanupTabs,
  getSelectedTab,
  getLabelForTab,
  click,
  keyboardNavLeft,
  keyboardNavRight,
} from './_helpers';


chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-tabs behaviour -', () => {
  let fixtures;

  function setUpTest(opts = {}) {
    beforeEach(() => (setupTabs(opts).then(out => (fixtures = out))));
    afterEach(() => cleanupTabs(fixtures));
  }

  function expectChangeEventProperties(e, props, errorMsg) {
    if (props.target) {
      expect(e.target).to.equal(props.target, errorMsg);
    }
    if (props.selected) {
      expect(e.target.selected).to.equal(props.selected, errorMsg);
    }
    if (props.label) {
      expect(e.target.label).to.equal(props.label, errorMsg);
    }
  }

  describe('with one selected child', () => {
    setUpTest({ tabs: [{ label: 'Tab 1', selected: true }] });

    it('emits the tab change event on initialisation', () => {
      expect(fixtures.spies.change.callCount).to.equal(1,
        'Tab change event should have been fired on initialisation'
      );
      expectChangeEventProperties(fixtures.spies.change.getCall(0).args[0], {
        target: getSelectedTab(fixtures.tabs),
        selected: true,
        label: 'Tab 1',
      });
    });

    it('does not emit any events when the tab label is clicked', () => {
      const label = getLabelForTab(getSelectedTab(fixtures.tabs));
      click(label);
      expect(fixtures.spies.change.callCount).to.equal(1,
        'Tab change event should not be emitted again when trying to select it again'
      );
    });

    it('updates the label correctly when the property is set', () => {
      const tab = getSelectedTab(fixtures.tabs);
      const label = getLabelForTab(tab);
      const newLabelText = 'New tab label';

      tab.label = newLabelText;

      return waitUntil(() => (label.textContent === newLabelText)).should.be.fulfilled;
    });

    it('updates the label correctly when the attribute is set', () => {
      const tab = getSelectedTab(fixtures.tabs);
      const label = getLabelForTab(tab);
      const newLabelText = 'New tab label';

      tab.setAttribute('label', newLabelText);

      return waitUntil(() => (label.textContent === newLabelText)).should.be.fulfilled;
    });
  });

  describe('with three children and no overflow, with the second selected', () => {
    const tabs = [
      { label: 'Tab 1' },
      { label: 'Tab 2', selected: true },
      { label: 'Tab 3' },
    ];

    setUpTest({
      tabs,
      width: '9999px',
    });

    it('emits the tab change event on initialisation', () => {
      expect(fixtures.spies.change.callCount).to.equal(tabs.length,
        'Tab change event should have been fired on initialisation'
      );
      expectChangeEventProperties(fixtures.spies.change.getCall(1).args[0], {
        target: getSelectedTab(fixtures.tabs),
        selected: true,
        label: 'Tab 2',
      }, 'Tab change event should have been fired on the selected tab');
    });

    describe('selects the first item', () => {
      function expectFirstTabSelected() {
        return waitUntil(() => (
          // Tab change event fire should fire once for each tab on init, and twice for selection.
          fixtures.spies.change.callCount === tabs.length + 2
        )).then(() => {
          expect(fixtures.tabs[0].selected).to.equal(true, 'Tab 1 should be selected');
          expect(fixtures.tabs[1].selected).to.equal(false, 'Tab 2 should be deselected');
          expect(fixtures.tabs[2].selected).to.equal(false, 'Tab 3 should be deselected');
          expect(fixtures.spies.change.callCount).to.equal((tabs.length + 2),
            'Tab change event should have been fired when selecting and deselecting a tab'
          );
          expectChangeEventProperties(fixtures.spies.change.getCall(tabs.length).args[0], {
            target: fixtures.tabs[0],
            selected: true,
          }, 'Select the first tab');
          expectChangeEventProperties(fixtures.spies.change.getCall(tabs.length + 1).args[0], {
            target: fixtures.tabs[1],
            selected: false,
          }, 'Deselect the second tab');
        });
      }

      it('when clicked', () => {
        click(getLabelForTab(fixtures.tabs[0]));
        return expectFirstTabSelected();
      });

      it('via keyboard nav', () => {
        keyboardNavLeft(fixtures.el);
        return expectFirstTabSelected();
      });

      it('when the property is set', () => {
        fixtures.tabs[0].selected = true;
        return expectFirstTabSelected();
      });

      it('when the attribute is set', () => {
        fixtures.tabs[0].setAttribute('selected', '');
        return expectFirstTabSelected();
      });
    });
  });

  describe('with eight children and overflow, with the first selected', () => {
    const tabs = [
      { label: 'Tab 1', selected: true },
      { label: 'Tab 2' },
      { label: 'Tab 3' },
      { label: 'Tab 4' },
      { label: 'Tab 5' },
      { label: 'Tab 6' },
      { label: 'Tab 7' },
      { label: 'Tab 8' },
    ];
    setUpTest({
      tabs,
      width: '300px',
    });

    it('emits the tab change event on initialisation', () => {
      expect(fixtures.spies.change.callCount).to.equal(tabs.length,
        'Tab selection event should have been fired on initialisation'
      );
      expectChangeEventProperties(fixtures.spies.change.getCall(0).args[0], {
        target: getSelectedTab(fixtures.tabs),
        selected: true,
      }, 'The tab change event should be fired on the selected tab');
    });

    describe('selects the last tab', () => {
      it('when clicked', () => {
        click(getLabelForTab(fixtures.tabs[tabs.length - 1]));

        return waitUntil(() => (
          // Tab change event should fire once for each tab on init, and twice for the click.
          fixtures.spies.change.callCount === tabs.length + 2
        )).then(() => {
          expect(fixtures.tabs[tabs.length - 1].selected).to.equal(true,
            'Tab 8 should be selected'
          );
          for (let i = 0; i < tabs.length - 1; i++) {
            expect(fixtures.tabs[i].selected).to.equal(false, `Tab ${i + 1} should be deselected`);
          }
          expectChangeEventProperties(fixtures.spies.change.getCall(tabs.length).args[0], {
            target: fixtures.tabs[tabs.length - 1],
            selected: true,
          }, 'Select the last tab');
          expectChangeEventProperties(fixtures.spies.change.getCall(tabs.length + 1).args[0], {
            target: fixtures.tabs[0],
            selected: false,
          }, 'Deselect the first tab');
        });
      });

      it('via keyboard nav', () => {
        keyboardNavRight(fixtures.el, tabs.length - 1);

        // Tab change event fire should fire once for each tab on init, and twice for each keypress.
        const numCalls = tabs.length + (2 * (tabs.length - 1));
        return waitUntil(() => (
          fixtures.spies.change.callCount === numCalls
        )).then(() => {
          expect(fixtures.tabs[tabs.length - 1].selected).to.equal(true,
            'Tab 8 should be selected'
          );
          for (let i = 0; i < tabs.length - 1; i++) {
            expect(fixtures.tabs[i].selected).to.equal(false, `Tab ${i + 1} should be deselected`);
          }
          expectChangeEventProperties(
            fixtures.spies.change.getCall(numCalls - 2).args[0],
            {
              target: fixtures.tabs[tabs.length - 1],
              selected: true,
            }, 'Select last tab'
          );
          expectChangeEventProperties(
            fixtures.spies.change.getCall(numCalls - 1).args[0],
            {
              target: fixtures.tabs[tabs.length - 2],
              selected: false,
            }, 'Deselect second last tab'
          );
        });
      });
    });
  });
});
