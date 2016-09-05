import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import '../src/index.js';
import { waitUntil } from 'akutil-common-test';
import {
  setupTabs,
  cleanupTabs,
  getSelectedTab,
  getLabelForTab,
  click,
  keyboardNavLeft,
  keyboardNavRight,
} from '../test-helpers/helpers';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-tabs behaviour -', () => {
  let fixtures;

  function setUpTest(opts = {}) {
    beforeEach(() => (setupTabs(opts).then(out => (fixtures = out))));
    afterEach(() => cleanupTabs(fixtures));
  }

  describe('with one selected child', () => {
    setUpTest({ tabs: [{ label: 'Tab 1', selected: true }] });

    it('emits the tab selection event on initialisation', () => {
      expect(fixtures.spies.select.callCount).to.equal(1,
        'Tab selection event should have been fired on initialisation'
      );
      expect(fixtures.spies.select.getCall(0).args[0].detail.tab).to.equal(
        getSelectedTab(fixtures.tabs), 'The tab selection event should be fired on the selected tab'
      );
      expect(fixtures.spies.select.getCall(0).args[0].detail.tab.selected).to.equal(true,
        'The tab passed in the event data should be selected'
      );
      expect(fixtures.spies.select.getCall(0).args[0].detail.tab.label).to.equal('Tab 1',
        'The tab passed in the event data should have the correct label'
      );
    });

    it('does not emit any events when the tab label is clicked', () => {
      const label = getLabelForTab(getSelectedTab(fixtures.tabs));
      click(label);
      expect(fixtures.spies.select.callCount).to.equal(1,
        'Tab selection event should not be emitted again when trying to select it again'
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
    setUpTest({
      tabs: [
        { label: 'Tab 1' },
        { label: 'Tab 2', selected: true },
        { label: 'Tab 3' },
      ],
      width: '9999px',
    });

    it('emits the tab selection event on initialisation', () => {
      expect(fixtures.spies.select.callCount).to.equal(1,
        'Tab selection event should have been fired on initialisation'
      );
      expect(fixtures.spies.select.getCall(0).args[0].detail.tab).to.equal(
        getSelectedTab(fixtures.tabs), 'The tab selection event should be fired on the selected tab'
      );
    });

    describe('selects the first item', () => {
      function expectFirstTabSelected() {
        return waitUntil(() => (
          fixtures.spies.select.callCount > 1 && fixtures.spies.deselect.callCount > 0
        )).then(() => {
          expect(fixtures.tabs[0].selected).to.equal(true, 'Tab 1 should be selected');
          expect(fixtures.tabs[1].selected).to.equal(false, 'Tab 2 should be deselected');
          expect(fixtures.tabs[2].selected).to.equal(false, 'Tab 3 should be deselected');

          expect(fixtures.spies.select.callCount).to.equal(2,
            'Tab selection event should have been fired when selecting a tab'
          );
          expect(fixtures.spies.select.getCall(1).args[0].detail.tab).to.equal(fixtures.tabs[0],
            'The tab selection event should be fired on the first tab'
          );
          expect(fixtures.spies.deselect.callCount).to.equal(1,
            'Tab deselection event should be fired when deselecting a tab'
          );
          expect(fixtures.spies.deselect.getCall(0).args[0].detail.tab).to.equal(fixtures.tabs[1],
            'The tab deselection event should be fired on the second tab'
          );
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
    setUpTest({
      tabs: [
        { label: 'Tab 1', selected: true },
        { label: 'Tab 2' },
        { label: 'Tab 3' },
        { label: 'Tab 4' },
        { label: 'Tab 5' },
        { label: 'Tab 6' },
        { label: 'Tab 7' },
        { label: 'Tab 8' },
      ],
      width: '300px',
    });

    it('emits the tab selection event on initialisation', () => {
      expect(fixtures.spies.select.callCount).to.equal(1,
        'Tab selection event should have been fired on initialisation'
      );
      expect(fixtures.spies.select.getCall(0).args[0].detail.tab).to.equal(
        getSelectedTab(fixtures.tabs), 'The tab selection event should be fired on the selected tab'
      );
    });

    describe('selects the last tab', () => {
      it('when clicked', () => {
        click(getLabelForTab(fixtures.tabs[7]));

        return waitUntil(() => (
          fixtures.spies.select.callCount > 1 && fixtures.spies.deselect.callCount > 0
        )).then(() => {
          expect(fixtures.tabs[7].selected).to.equal(true, 'Tab 8 should be selected');
          for (let i = 0; i < 7; i++) {
            expect(fixtures.tabs[i].selected).to.equal(false, `Tab ${i + 1} should be deselected`);
          }
          expect(fixtures.spies.select.callCount).to.equal(2,
            'Tab selection event should have been fired when selecting a tab'
          );
          expect(fixtures.spies.select.getCall(1).args[0].detail.tab).to.equal(fixtures.tabs[7],
            'The tab selection event should be fired on the first tab'
          );
          expect(fixtures.spies.deselect.callCount).to.equal(1,
            'Tab deselection event should be fired when deselecting a tab'
          );
          expect(fixtures.spies.deselect.getCall(0).args[0].detail.tab).to.equal(fixtures.tabs[0],
            'The tab deselection event should be fired on the first tab'
          );
        });
      });

      it('via keyboard nav', () => {
        keyboardNavRight(fixtures.el, 7);

        return waitUntil(() => (
          fixtures.spies.select.callCount >= 8 && fixtures.spies.deselect.callCount >= 7
        )).then(() => {
          expect(fixtures.tabs[7].selected).to.equal(true, 'Tab 8 should be selected');
          expect(fixtures.spies.select.callCount).to.equal(8,
            'Tab selection event should have been fired 8 times in total'
          );
          expect(fixtures.spies.deselect.callCount).to.equal(7,
            'Tab deselection event should have been fired 7 times in total'
          );
          for (let i = 0; i < 7; i++) {
            expect(fixtures.tabs[i].selected).to.equal(false, `Tab ${i + 1} should be deselected`);
            expect(fixtures.spies.select.getCall(i + 1).args[0].detail.tab).to.equal(
              fixtures.tabs[i + 1], `The tab selection event should be fired on tab ${i + 1}.`
            );
            expect(fixtures.spies.deselect.getCall(i).args[0].detail.tab).to.equal(fixtures.tabs[i],
              `The tab deselection event should be fired on tab ${i}.`
            );
          }
        });
      });
    });
  });
});
