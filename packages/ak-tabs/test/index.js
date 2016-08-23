import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import AkTabsTab, { events } from '../src/index-tab.js';
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

  function afterMutations(cb, delay) {
    setTimeout(cb, delay || 10);
  }

  function setupTabs(cb) {
    containerElement = document.createElement('div');
    containerElement.style.width = containerWidth;

    tabsElement = new AkTabs();
    tabElements = [];

    tabs.forEach(tabOptions => {
      const newTab = new AkTabsTab();
      tabElements.push(newTab);

      newTab.label = tabOptions.label || DEFAULT_LABEL;
      // TODO: This a workaround for https://github.com/skatejs/skatejs/issues/733
      tabOptions.selected && (newTab.selected = true);
      newTab.innerHTML = tabOptions.content || DEFAULT_CONTENT;

      tabsElement.appendChild(newTab);
    });
    containerElement.appendChild(tabsElement);
    document.body.appendChild(containerElement);

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
    const labels = [...tabsElement[labelsContainer].children];
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

  function click(el) {
    el.click();
  }

  /* Keyboard nav helpers */

  function pressKey(keyCode, el) {
    const e = new CustomEvent('keydown', { bubbles: true, cancelable: true });
    e.keyCode = keyCode;
    const elem = el || document.activeElement;
    elem.dispatchEvent(e);
  }

  function pressLeftKey(el) {
    pressKey(37, el);
  }

  function pressRightKey(el) {
    pressKey(39, el);
  }

  function keyboardNav(tabsEl, isLeft, numPresses, cb) {
    const label = getLabelForTab(getSelectedTab());
    isLeft ? pressLeftKey(label) : pressRightKey(label);

    if (numPresses > 1) {
      afterMutations(() => (keyboardNav(tabsEl, isLeft, numPresses - 1, cb)));
    } else {
      afterMutations(cb);
    }
  }

  function keyboardNavLeft(cb, numPresses) {
    keyboardNav(tabsElement, true, numPresses || 1, cb);
  }

  function keyboardNavRight(cb, numPresses) {
    keyboardNav(tabsElement, false, numPresses || 1, cb);
  }

  describe('- Initialisation -', () => {
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
          'Empty Tabs component should have no height'
        );
      });

      it('does not show any labels', () => {
        expect(getTabLabels().length).to.equal(0, 'There should be no labels');
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
            'Label for selected tab should be visible'
          );
        });

        it('displays one label with the correct label text', () => {
          expect(getTabLabels().length).to.equal(1,
            'There should only be one label'
          );
          expect(getLabelContent(getLabelForTab(tabElements[0]))).to.equal(DEFAULT_LABEL);
        });
      });

      describe('that is not selected', () => {
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
            'Label for selected tab should be visible'
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

          expect(hasOverflow(label)).to.equal(true, 'Label should be truncated');
          expect(tabLabelWidth).to.be.at.most(containerElWidth,
            'Label should be smaller than the container');
        });

        it('does not display the More dropdown', () => {
          expect(hasVisibleDropdown(tabsElement)).to.equal(false,
            'Dropdown should not be visible'
          );
        });
      });
    });

    describe('with eight children', () => {
      const NUM_CHILDREN = 8;
      describe('with no overflow', () => {
        describe('with the first child selected', () => {
          beforeEach(done => {
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
              'Label for selected tab should be visible'
            );
          });

          it(`has ${NUM_CHILDREN} labels`, () => {
            expect(getTabLabels().length).to.equal(NUM_CHILDREN,
              `Should have ${NUM_CHILDREN} labels.`
            );
          });

          it('does not show the More dropdown', () => {
            expect(hasVisibleDropdown(tabsElement)).to.equal(false,
              'Dropdown should not be visible'
            );
          });
        });
      });

      describe('with overflow', () => {
        describe('with the last child selected', () => {
          beforeEach(done => {
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
              'Label for selected tab should be visible'
            );
          });

          it('shows the More dropdown', () => {
            expect(hasVisibleDropdown(tabsElement)).to.equal(true,
              'Dropdown should be visible'
            );
          });

          it('pulls some labels into the dropdown menu', () => {
            const numVisibleTabs = getVisibleTabs(tabsElement).length;
            const numTabs = tabElements.length;
            expect(numVisibleTabs).to.be.below(numTabs,
              'Some tabs should not be visible'
            );
            // TODO: Ensure that dropdown menu contains the hidden items
          });
        });
      });
    });
  });

  describe('- Behaviour -', () => {
    let selectSpy;
    let deselectSpy;

    describe('with one selected child', () => {
      beforeEach(done => {
        selectSpy = sinon.spy();
        deselectSpy = sinon.spy();

        window.addEventListener(events.EVENT_TAB_SELECT, selectSpy);
        window.addEventListener(events.EVENT_TAB_DESELECT, deselectSpy);

        tabs = [{ label: 'Tab 1', selected: true }];
        setupTabs(done);
      });
      afterEach(() => {
        window.removeEventListener(events.EVENT_TAB_SELECT, selectSpy);
        window.removeEventListener(events.EVENT_TAB_DESELECT, deselectSpy);
        cleanupTabs();
      });

      it('emits the tab selection event on initialisation', () => {
        expect(selectSpy.callCount).to.equal(1,
          'Tab selection event should have been fired on initialisation'
        );
        expect(selectSpy.getCall(0).args[0].detail.tab).to.equal(getSelectedTab(),
          'The tab selection event should be fired on the selected tab'
        );
        expect(selectSpy.getCall(0).args[0].detail.tab.selected).to.equal(true,
          'The tab passed in the event data should be selected'
        );
        expect(selectSpy.getCall(0).args[0].detail.tab.label).to.equal('Tab 1',
          'The tab passed in the event data should have the correct label'
        );
      });

      it('does not emit any events when the tab label is clicked', () => {
        const label = getLabelForTab(getSelectedTab());
        click(label);
        expect(selectSpy.callCount).to.equal(1,
          'Tab selection event should not be emitted again when trying to select it again'
        );
      });

      it('updates the label correctly when the property is set', done => {
        const tab = getSelectedTab();
        const label = getLabelForTab(getSelectedTab());
        const newLabelText = 'New tab label';

        tab.label = newLabelText;

        afterMutations(() => {
          expect(label.textContent).to.equal(newLabelText,
            'The tab label should display the new label text'
          );
          done();
        });
      });

      it('updates the label correctly when the attribute is set', done => {
        const tab = getSelectedTab();
        const label = getLabelForTab(getSelectedTab());
        const newLabelText = 'New tab label';

        tab.setAttribute('label', newLabelText);

        afterMutations(() => {
          expect(label.textContent).to.equal(newLabelText,
            'The tab label should display the new label text'
          );
          done();
        });
      });
    });

    describe('with three children and no overflow, with the second selected', () => {
      beforeEach(done => {
        selectSpy = sinon.spy();
        deselectSpy = sinon.spy();

        window.addEventListener(events.EVENT_TAB_SELECT, selectSpy);
        window.addEventListener(events.EVENT_TAB_DESELECT, deselectSpy);

        tabs = [
          { label: 'Tab 1' },
          { label: 'Tab 2', selected: true },
          { label: 'Tab 3' },
        ];
        containerWidth = '9999px';
        setupTabs(done);
      });
      afterEach(() => {
        window.removeEventListener(events.EVENT_TAB_SELECT, selectSpy);
        window.removeEventListener(events.EVENT_TAB_DESELECT, deselectSpy);
        cleanupTabs();
      });

      it('emits the tab selection event on initialisation', () => {
        expect(selectSpy.callCount).to.equal(1,
          'Tab selection event should have been fired on initialisation'
        );
        expect(selectSpy.getCall(0).args[0].detail.tab).to.equal(getSelectedTab(),
          'The tab selection event should be fired on the selected tab'
        );
      });

      describe('selects the first item', () => {
        function assertFirstTabSelected(cb) {
          afterMutations(() => {
            expect(tabElements[0].selected).to.equal(true, 'Tab 1 should be selected');
            expect(tabElements[1].selected).to.equal(false, 'Tab 2 should be deselected');
            expect(tabElements[2].selected).to.equal(false, 'Tab 3 should be deselected');

            expect(selectSpy.callCount).to.equal(2,
              'Tab selection event should have been fired when selecting a tab'
            );
            expect(selectSpy.getCall(1).args[0].detail.tab).to.equal(tabElements[0],
              'The tab selection event should be fired on the first tab'
            );
            expect(deselectSpy.callCount).to.equal(1,
              'Tab deselection event should be fired when deselecting a tab'
            );
            expect(deselectSpy.getCall(0).args[0].detail.tab).to.equal(tabElements[1],
              'The tab deselection event should be fired on the second tab'
            );
            cb();
          });
        }

        it('when clicked', done => {
          click(getLabelForTab(tabElements[0]));
          assertFirstTabSelected(done);
        });

        it('via keyboard nav', done => {
          keyboardNavLeft(() => {
            assertFirstTabSelected(done);
          });
        });

        it('when the property is set', done => {
          tabElements[0].selected = true;
          assertFirstTabSelected(done);
        });

        it('when the attribute is set', done => {
          tabElements[0].setAttribute('selected', '');
          assertFirstTabSelected(done);
        });
      });
    });

    describe('with eight children and overflow, with the first selected', () => {
      beforeEach(done => {
        selectSpy = sinon.spy();
        deselectSpy = sinon.spy();

        window.addEventListener(events.EVENT_TAB_SELECT, selectSpy);
        window.addEventListener(events.EVENT_TAB_DESELECT, deselectSpy);

        tabs = [
          { label: 'Tab 1', selected: true },
          { label: 'Tab 2' },
          { label: 'Tab 3' },
          { label: 'Tab 4' },
          { label: 'Tab 5' },
          { label: 'Tab 6' },
          { label: 'Tab 7' },
          { label: 'Tab 8' },
        ];
        containerWidth = '300px';
        setupTabs(done);
      });
      afterEach(() => {
        window.removeEventListener(events.EVENT_TAB_SELECT, selectSpy);
        window.removeEventListener(events.EVENT_TAB_DESELECT, deselectSpy);
        cleanupTabs();
      });

      it('emits the tab selection event on initialisation', () => {
        expect(selectSpy.callCount).to.equal(1,
          'Tab selection event should have been fired on initialisation'
        );
        expect(selectSpy.getCall(0).args[0].detail.tab).to.equal(getSelectedTab(),
          'The tab selection event should be fired on the selected tab'
        );
      });

      describe('selects the last tab', () => {
        it('when clicked', () => {
          click(getLabelForTab(tabElements[7]));

          expect(tabElements[7].selected).to.equal(true, 'Tab 8 should be selected');
          for (let i = 0; i < 7; i++) {
            expect(tabElements[i].selected).to.equal(false, `Tab ${i + 1} should be deselected`);
          }

          expect(selectSpy.callCount).to.equal(2,
            'Tab selection event should have been fired when selecting a tab'
          );
          expect(selectSpy.getCall(1).args[0].detail.tab).to.equal(tabElements[7],
            'The tab selection event should be fired on the first tab'
          );
          expect(deselectSpy.callCount).to.equal(1,
            'Tab deselection event should be fired when deselecting a tab'
          );
          expect(deselectSpy.getCall(0).args[0].detail.tab).to.equal(tabElements[0],
            'The tab deselection event should be fired on the first tab'
          );
        });

        it('via keyboard nav', done => {
          keyboardNavRight(() => {
            expect(tabElements[7].selected).to.equal(true, 'Tab 8 should be selected');

            expect(selectSpy.callCount).to.equal(8,
              'Tab selection event should have been fired 8 times in total'
            );
            expect(deselectSpy.callCount).to.equal(7,
              'Tab deselection event should have been fired 7 times in total'
            );

            for (let i = 0; i < 7; i++) {
              expect(tabElements[i].selected).to.equal(false, `Tab ${i + 1} should be deselected`);

              expect(selectSpy.getCall(i + 1).args[0].detail.tab).to.equal(tabElements[i + 1],
                `The tab selection event should be fired on tab ${i + 1}.`
              );
              expect(deselectSpy.getCall(i).args[0].detail.tab).to.equal(tabElements[i],
                `The tab deselection event should be fired on tab ${i}.`
              );
            }

            done();
          }, 7);
        });
      });
    });
  });

  describe('- Keyboard navigation -', () => {
    describe('with arrow keys', () => {
      describe('with three children, with the second selected', () => {
        beforeEach(done => {
          tabs = [
            { label: 'Tab 1' },
            { label: 'Tab 2', selected: true },
            { label: 'Tab 3' },
          ];
          setupTabs(done);
        });
        afterEach(cleanupTabs);

        it('pressing the LEFT arrow selects the first tab', done => {
          keyboardNavLeft(() => {
            expect(tabElements[0].selected).to.equal(true,
              'The first tab should be selected'
            );
            done();
          });
        });

        it('pressing the RIGHT arrow selects the third tab', done => {
          keyboardNavRight(() => {
            expect(tabElements[2].selected).to.equal(true,
              'The first tab should be selected'
            );
            done();
          });
        });
      });

      describe('with eight children and overflow, with the last selected', () => {
        beforeEach(done => {
          tabs = [
            { label: 'Tab 1' },
            { label: 'Tab 2' },
            { label: 'Tab 3' },
            { label: 'Tab 4' },
            { label: 'Tab 5' },
            { label: 'Tab 6' },
            { label: 'Tab 7' },
            { label: 'Tab 8', selected: true },
          ];
          containerWidth = '300px';
          setupTabs(done);
        });
        afterEach(cleanupTabs);

        it('pressing the LEFT arrow selects the seventh tab', done => {
          keyboardNavLeft(() => {
            expect(tabElements[6].selected).to.equal(true,
              'The seventh tab should be selected'
            );
            done();
          });
        });
      });
    });
  });
});
