import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { waitUntil } from 'akutil-common-test';

import AkTabs from '../src';
import { labelsContainer } from '../src/internal/symbols';
import {
  setupTabs,
  cleanupTabs,
  getTabLabels,
  getSelectedTab,
  getLabelForTab,
  getLabelContent,
  getElementWidth,
  isHidden,
  hasOverflow,
  hasVisibleDropdown,
  defaultLabel,
} from './_helpers';


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

      it('displays the label for the selected tab', () =>
        waitUntil(() => !isHidden(getLabelForTab(fixtures.tabs[0]))).should.be.fulfilled
      );

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

      it('displays the label for the tab', () =>
        waitUntil(() => !isHidden(getLabelForTab(fixtures.tabs[0]))).should.be.fulfilled
      );

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

        return waitUntil(() => hasOverflow(label)).then(() =>
          waitUntil(() => (
            getElementWidth(label) <= getElementWidth(container)
          )).should.be.fulfilled
        );
      });

      it('does not display the More dropdown', () =>
        waitUntil(() => !hasVisibleDropdown(fixtures.el)).should.be.fulfilled
      );
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

        it('displays the label for the selected tab', () =>
          waitUntil(() =>
            !isHidden(getLabelForTab(getSelectedTab(fixtures.tabs)))).should.be.fulfilled
        );

        it(`has ${NUM_CHILDREN} labels`, () => {
          expect(getTabLabels(fixtures.el).length).to.equal(NUM_CHILDREN,
            `Should have ${NUM_CHILDREN} labels.`
          );
        });

        it('does not show the More dropdown', () =>
          waitUntil(() => !hasVisibleDropdown(fixtures.el)).should.be.fulfilled
        );
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

        it('displays the label for the selected tab', () =>
          waitUntil(() =>
            !isHidden(getLabelForTab(getSelectedTab(fixtures.tabs)))
          ).should.be.fulfilled
        );

        it('shows the More dropdown', () =>
          waitUntil(() => hasVisibleDropdown(fixtures.el)).should.be.fulfilled
        );

        it('pulls some labels into the dropdown menu', () => {
          const numVisibleTabs = getTabLabels(fixtures.el).filter(el => !isHidden(el)).length;
          const numTabs = fixtures.tabs.length;
          return waitUntil(() => numVisibleTabs < numTabs).should.be.fulfilled;
          // TODO: Ensure that dropdown menu contains the hidden items
        });
      });
    });
  });
});
