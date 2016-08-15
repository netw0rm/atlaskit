import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkTabsTab from '../src/children/tab.js';
import AkTabs from '../src/index.js';
import { name } from '../package.json';

import {
  labelsContainer,
  buttonContainer,
  tabLabel,
} from '../src/internal/symbols';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars


describe('ak-tabs', () => {
  const DEFAULT_LABEL = 'Default tab label';
  const DEFAULT_CONTENT = '<p>Default tab content</p>';

  // The actual elements used in the tests
  let tabsElement;
  let tabElements;
  let containerElement;

  // A collection of values from which the test fixtures are generated
  let tabs = [];
  let containerWidth = '';

  // Helper function to create an ak-tabs component
  function createTabs(tabOptionsArray) {
    const parent = new AkTabs();
    const children = [];

    tabOptionsArray.forEach(tabOptions => {
      const newTabElement = new AkTabsTab();

      newTabElement.label = tabOptions.label || DEFAULT_LABEL;
      newTabElement.innerHTML = tabOptions.content || DEFAULT_CONTENT;
      newTabElement.selected = tabOptions.selected;

      parent.appendChild(newTabElement);
      children.push(newTabElement);
    });

    return { parent, children };
  }

  function createContainer(child, width) {
    const container = document.createElement('div');

    if (width) {
      container.style.width = width;
    }
    container.appendChild(child);
    document.body.appendChild(container);

    return container;
  }

  function afterMutations(cb) {
    setTimeout(cb, 0);
  }

  function setupTabs(cb) {
    const created = createTabs(tabs);
    tabsElement = created.parent;
    tabElements = created.children;
    containerElement = createContainer(tabsElement, containerWidth);
    afterMutations(cb);
  }

  function cleanupTabs() {
    document.body.removeChild(containerElement);
    tabsElement = null;
    tabElements = [];
    containerElement = null;
    containerWidth = '';
  }

  function getLabelForTab(tab) {
    return tab[tabLabel];
  }

  function getTabLabels() {
    const labels = tabsElement[labelsContainer].children;
    labels.pop(); // Remove More dropdown from list
    return labels;
  }

  function getLabelContent(labelEl) {
    return labelEl.querySelector('span').innerHTML;
  }

  function getSelectedTab() {
    return tabElements.find(el => el.selected);
  }

  function getElementWidth(el) {
    return el.getBoundingClientRect().width;
  }

  function hasOverflow(el) {
    return el.scrollWidth > el.clientWidth;
  }

  function isVisible(el) {
    return getComputedStyle(el).visibility !== 'hidden';
  }

  function hasVisibleDropdown(tabsEl) {
    return isVisible(tabsEl[buttonContainer]);
  }

  function getVisibleTabs(tabsEl) {
    return tabsEl._visibleTabs; // eslint-disable-line no-underscore-dangle
  }

  describe('Initialisation', () => {
    it('can be initialised with constructor', () => {
      let component;
      expect(() => {
        component = new AkTabs();
      }).not.to.throw(Error);
      expect(component.tagName.toLowerCase()).to.equal(name);
    });

    describe('with no children', () => {
      beforeEach(done => {
        tabs = [];
        setupTabs(done);
      });
      afterEach(cleanupTabs);

      it('does not take up any vertical space', () => {
        expect(tabsElement.getBoundingClientRect().height).to.equal(0,
          'Empty Tabs component should have no height.'
        );
      });

      it('does not show any labels', () => {
        expect(getTabLabels().length).to.equal(0, 'There should be no labels.');
      });
    });

    describe('with one child', () => {
      describe('that is selected', () => {
        beforeEach(done => {
          tabs = [{ selected: true }];
          setupTabs(done);
        });
        afterEach(cleanupTabs);

        it('selects the first child', () => {
          expect(tabElements[0].selected).to.equal(true);
        });

        it('displays the label for the selected tab', () => {
          expect(isVisible(getLabelForTab(getSelectedTab()))).to.equal(true,
            'Label for selected tab should be visible.'
          );
        });

        it('displays one label with the correct label text', () => {
          expect(getTabLabels().length).to.equal(1,
            'There should only be one label.'
          );
          expect(getLabelContent(getLabelForTab(tabElements[0]))).to.equal(DEFAULT_LABEL);
        });
      });

      describe('that is not selected', () => {
        beforeEach(done => {
          tabs = [{}];
          setupTabs(done);
        });
        afterEach(cleanupTabs);

        it('selects the first child', () => {
          expect(tabElements[0].selected).to.equal(true);
        });

        it('displays the label for the selected tab', () => {
          expect(isVisible(getLabelForTab(getSelectedTab()))).to.equal(true,
            'Label for selected tab should be visible.'
          );
        });

        it('displays one label with the correct label text', () => {
          expect(getTabLabels().length).to.equal(1,
            'There should only be one label.'
          );
          expect(getLabelContent(getLabelForTab(tabElements[0]))).to.equal(DEFAULT_LABEL);
        });
      });

      describe('that is wider than its container', () => {
        beforeEach(done => {
          tabs = [{
            selected: true,
            label: `Long label text. Long label text. Long label text. Long label text.
                    Long label text. Long label text. Long label text. Long label text.
                    Long label text. Long label text. Long label text. Long label text.
                    Long label text. Long label text. Long label text. Long label text.`,
          }];
          containerWidth = '300px';
          setupTabs(done);
        });
        afterEach(cleanupTabs);

        it('truncates the label to fit the container', () => {
          const container = tabsElement[labelsContainer];
          const label = getLabelForTab(getSelectedTab());

          const containerElWidth = getElementWidth(container);
          const tabLabelWidth = getElementWidth(label);

          expect(hasOverflow(label)).to.equal(true, 'Label should be truncated.');
          expect(tabLabelWidth).to.be.at.most(containerElWidth,
            'Label should be smaller than the container.');
        });

        it('does not display the More dropdown', () => {
          expect(hasVisibleDropdown(tabsElement)).to.equal(false,
            'Dropdown should not be visible.'
          );
        });
      });
    });

    describe('with eight children', () => {
      const NUM_CHILDREN = 8;
      describe('with no overflow', () => {
        describe('with the first child selected', () => {
          beforeEach((done) => {
            tabs = [{ selected: true }, {}, {}, {}, {}, {}, {}, {}];
            containerWidth = '9999px';
            setupTabs(done);
          });
          afterEach(cleanupTabs);

          it('displays the selected tab', () => {
            expect(tabElements[0].selected).to.equal(true);
          });

          it('displays the label for the selected tab', () => {
            expect(isVisible(getLabelForTab(getSelectedTab()))).to.equal(true,
              'Label for selected tab should be visible.'
            );
          });

          it(`has ${NUM_CHILDREN} labels`, () => {
            expect(getTabLabels().length).to.equal(NUM_CHILDREN,
              `Should have ${NUM_CHILDREN} labels.`
            );
          });

          it('does not show the More dropdown', () => {
            expect(hasVisibleDropdown(tabsElement)).to.equal(false,
              'Dropdown should not be visible.'
            );
          });
        });
      });

      describe('with overflow', () => {
        describe('with the last child selected', () => {
          beforeEach((done) => {
            tabs = [{}, {}, {}, {}, {}, {}, {}, { selected: true }];
            containerWidth = '300px';
            setupTabs(done);
          });
          afterEach(cleanupTabs);

          it('displays the last tab', () => {
            expect(tabElements[tabElements.length - 1].selected).to.equal(true);
          });

          it('displays the label for the selected tab', () => {
            expect(isVisible(getLabelForTab(getSelectedTab()))).to.equal(true,
              'Label for selected tab should be visible.'
            );
          });

          it('shows the More dropdown', () => {
            expect(hasVisibleDropdown(tabsElement)).to.equal(true,
              'Dropdown should be visible.'
            );
          });

          it('pulls some labels into the dropdown menu', () => {
            const numVisibleTabs = getVisibleTabs(tabsElement).length;
            const numTabs = tabElements.length;
            expect(numVisibleTabs).to.be.below(numTabs,
              'Some tabs should not be visible.'
            );
            // TODO: Ensure that dropdown menu contains the hidden items
          });
        });
      });
    });
  });

  describe('Behaviour', () => {
    beforeEach((done) => {
      tabs = [{}, {}];
      setupTabs(done);
    });
    afterEach(cleanupTabs);

    describe('with one selected child', () => {
      it('emits the tab selection event on initialisation', () => {
        // TODO
      });

      it('does not emit any events when the tab is selected', () => {
        // TODO
      });

      it('updates the label correctly when the property is set', () => {

      });

      it('updates the label correctly whe the attribute is set', () => {

      });
    });

    describe('with three children and no overflow, with the second selected', () => {
      it('emits the tab selection event on initialisation', () => {
        // TODO test that the correct tab is selected
      });

      it('selects the first tab when clicked', () => {
        // TODO test for selection
        // TODO test for selection and deselection events
      });

      it('selects the first tab via keyboard nav', () => {
        // TODO test for selection
        // TODO test for selection and deselection events
      });

      it('selects the first tab when the property is set', () => {

      });

      it('selects the first tab when the attribute is set', () => {

      });
    });

    describe('with eight children and overflow, with the first selected', () => {
      it('emits the tab selection event on initialisation', () => {
        // TODO test that the correct tab is selected
      });

      it('selects the last tab when clicked', () => {
        // TODO test for selection
        // TODO test for selection and deselection events
      });

      it('selects the last tab via keyboard nav', () => {
        // TODO test for selection
        // TODO test for selection and deselection events
      });
    });
  });

  describe('Keyboard navigation', () => {
    describe('Tabbing', () => {
      describe('with two tabs with tabbable content, with the first tab selected', () => {
        it('tabbing from the first tab label does not tab to the second label', () => {

        });

        it('tabbing from the focused label focuses the tabbable content', () => {

        });
      });
    });

    describe('with arrow keys', () => {
      describe('with a single child', () => {
        it('pressing the LEFT arrow leaves focus on the label', () => {

        });

        it('pressing the RIGHT arrow leaves focus on the label', () => {

        });
      });

      describe('with three children, with the second selected and focused', () => {
        it('pressing the LEFT arrow selects the first tab', () => {

        });

        it('pressing the RIGHT arrow selects the third tab', () => {

        });
      });

      describe('with eight children and overflow, with the last selected', () => {
        it('pressing the LEFT arrow selects the seventh tab', () => {

        });
      });
    });
  });
});
