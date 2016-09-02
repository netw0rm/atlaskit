import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkTabs from '../src/index.js';

import { labelsContainer } from '../src/internal/symbols';
import {
  setupTabs,
  cleanupTabs,
  getTabLabels,
  getSelectedTab,
  getLabelForTab,
  getLabelContent,
  getElementWidth,
  getVisibleTabs,
  isHidden,
  hasOverflow,
  hasVisibleDropdown,
  defaultLabel,
} from '../test-helpers/helpers';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-tabs initialisation -', () => {
  let fixtures;

  function setUpTest(opts = {}) {
    beforeEach(() => (setupTabs(opts).then(out => (fixtures = out))));
    afterEach(() => cleanupTabs(fixtures));
  }

  it('can be initialised with constructor', () => {
    expect(() => {
      const component = new AkTabs(); // eslint-disable-line no-unused-vars
    }).not.to.throw(Error);
  });

  describe('with no children', () => {
    setUpTest({ tabs: [] });

    it('does not take up any vertical space', () => {
      expect(fixtures.el.getBoundingClientRect().height).to.equal(0,
        'Empty Tabs component should have no height'
      );
    });

    it('does not show any labels', () => {
      expect(getTabLabels(fixtures.el).length).to.equal(0, 'There should be no labels');
    });
  });

  describe('with one child', () => {
    describe('that is selected', () => {
      setUpTest({ tabs: [{ selected: true }] });

      it('selects the first child', () => {
        expect(fixtures.tabs[0].selected).to.equal(true);
      });

      it('displays the label for the selected tab', () => {
        expect(isHidden(getLabelForTab(fixtures.tabs[0]))).to.equal(false,
          'Label for selected tab should be visible'
        );
      });

      it('displays one label with the correct label text', () => {
        expect(getTabLabels(fixtures.el).length).to.equal(1, 'There should only be one label');
        expect(getLabelContent(getLabelForTab(fixtures.tabs[0]))).to.equal(defaultLabel);
      });
    });

    describe('that is not selected', () => {
      setUpTest({ tabs: [{}] });

      it('the first child is not selected', () => {
        expect(fixtures.tabs[0].selected).to.equal(false);
      });

      it('displays the label for the tab', () => {
        expect(isHidden(getLabelForTab(fixtures.tabs[0]))).to.equal(false,
          'Label for selected tab should be visible'
        );
      });

      it('displays one label with the correct label text', () => {
        expect(getTabLabels(fixtures.el).length).to.equal(1, 'There should only be one label.');
        expect(getLabelContent(getLabelForTab(fixtures.tabs[0]))).to.equal(defaultLabel);
      });
    });

    describe('that is wider than its container', () => {
      setUpTest({
        width: '200px',
        tabs: [{
          selected: true,
          label: `Long label text. Long label text. Long label text. Long label text.
                  Long label text. Long label text. Long label text. Long label text.`,
        }],
      });

      it('truncates the label to fit the container', () => {
        const container = fixtures.el[labelsContainer];
        const label = getLabelForTab(getSelectedTab(fixtures.tabs));

        const containerElWidth = getElementWidth(container);
        const tabLabelWidth = getElementWidth(label);

        expect(hasOverflow(label)).to.equal(true, 'Label should be truncated');
        expect(tabLabelWidth).to.be.at.most(containerElWidth,
          'Label should be smaller than the container');
      });

      it('does not display the More dropdown', () => {
        expect(hasVisibleDropdown(fixtures.el)).to.equal(false, 'Dropdown should not be visible');
      });
    });
  });

  describe('with eight children', () => {
    const NUM_CHILDREN = 8;
    describe('with no overflow', () => {
      describe('with the first child selected', () => {
        setUpTest({
          width: '9999px',
          tabs: [{ selected: true }, {}, {}, {}, {}, {}, {}, {}],
        });

        it('displays the selected tab', () => {
          expect(fixtures.tabs[0].selected).to.equal(true);
        });

        it('displays the label for the selected tab', () => {
          expect(isHidden(getLabelForTab(getSelectedTab(fixtures.tabs)))).to.equal(false,
            'Label for selected tab should be visible'
          );
        });

        it(`has ${NUM_CHILDREN} labels`, () => {
          expect(getTabLabels(fixtures.el).length).to.equal(NUM_CHILDREN,
            `Should have ${NUM_CHILDREN} labels.`
          );
        });

        it('does not show the More dropdown', () => {
          expect(hasVisibleDropdown(fixtures.el)).to.equal(false,
            'Dropdown should not be visible'
          );
        });
      });
    });

    describe('with overflow', () => {
      describe('with the last child selected', () => {
        setUpTest({
          width: '300px',
          tabs: [{}, {}, {}, {}, {}, {}, {}, { selected: true }],
        });

        it('displays the last tab', () => {
          expect(fixtures.tabs[fixtures.tabs.length - 1].selected).to.equal(true,
            'The last tab should be selected'
          );
        });

        it('displays the label for the selected tab', () => {
          expect(isHidden(getLabelForTab(getSelectedTab(fixtures.tabs)))).to.equal(false,
            'Label for selected tab should be visible'
          );
        });

        it('shows the More dropdown', () => {
          expect(hasVisibleDropdown(fixtures.el)).to.equal(true, 'Dropdown should be visible');
        });

        it('pulls some labels into the dropdown menu', () => {
          const numVisibleTabs = getVisibleTabs(fixtures.el).length;
          const numTabs = fixtures.tabs.length;
          expect(numVisibleTabs).to.be.below(numTabs, 'Some tabs should not be visible');
          // TODO: Ensure that dropdown menu contains the hidden items
        });
      });
    });
  });
});
