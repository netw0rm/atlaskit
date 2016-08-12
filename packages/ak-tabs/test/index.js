import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkTabsTab from '../src/children/tab.js';
import AkTabs from '../src/index.js';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars


describe('ak-tabs', () => {
  const DEFAULT_LABEL = 'Default tab label';
  const DEFAULT_CONTENT = '<p>Default tab content</p>';

  let tabsElement;
  let tabElements;
  let tabContainer;

  // Helper function to create an ak-tabs component
  function createTabs(tabsArray, containerSize) {
    const tabs = tabsArray || [];

    tabsElement = new AkTabs();
    tabElements = [];

    tabs.forEach(tab => {
      const newTab = new AkTabsTab();

      newTab.label = tab.label || DEFAULT_LABEL;
      newTab.innerHTML = tab.content || DEFAULT_CONTENT;
      newTab.selected = tab.selected;

      tabsElement.appendChild(newTab);
      tabElements.push(newTab);
    });

    tabContainer = document.createElement('div');
    if (containerSize) {
      tabContainer.style.width = containerSize;
    }
    tabContainer.appendChild(tabsElement);
    document.body.appendChild(tabContainer);
  }

  function cleanupTabs() {
    document.body.removeChild(tabContainer);
    tabContainer = null;
  }

  function afterMutations(cb) {
    setTimeout(cb, 0);
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
      beforeEach(() => (createTabs()));
      afterEach(cleanupTabs);

      it('does not take up any vertical space', () => {
        expect(tabsElement.getBoundingClientRect().height).to.equal(0,
          'Empty Tabs component should have no height.'
        );
      });
    });

    describe('with one child', () => {
      describe('that is selected', () => {
        beforeEach(() => {
          createTabs([{
            selected: true,
          }]);
        });
        afterEach(cleanupTabs);

        it('selects the first child', () => {
          expect(tabElements[0].selected).to.equal(true);
        });
      });

      describe('that is not selected', () => {
        beforeEach((done) => {
          createTabs([{
            selected: false,
          }]);
          afterMutations(done);
        });
        afterEach(cleanupTabs);

        it('selects the first child', () => {
          // TODO
        });
      });

      describe('that is very long', () => {
        it('truncates the label to fit the container', () => {
          // TODO
        });

        it('does not display the More dropdown', () => {
          // TODO
        });
      });
    });

    describe('with many children', () => {
      describe('with no overflow', () => {
        describe('with the first child selected', () => {
          beforeEach((done) => {
            createTabs([
              { selected: true }, {}, {}, {}, {}, {}, {}, {},
            ], '99999px');
            afterMutations(done);
          });
          afterEach(cleanupTabs);

          it('displays the selected tab', () => {
            expect(tabElements[0].selected).to.equal(true);
          });

          it('does not show the More dropdown', () => {
            // TODO
          });
        });
      });

      describe('with overflow', () => {
        describe('with the last child selected', () => {
          beforeEach((done) => {
            createTabs([
              {}, {}, {}, {}, {}, {}, {}, { selected: true },
            ], '300px');
            afterMutations(done);
          });
          afterEach(cleanupTabs);

          it('displays the selected tab', () => {
            expect(tabElements[tabElements.length - 1].selected).to.equal(true);
          });

          it('displays the label for the selected tab', () => {
            // TODO
          });

          it('shows the More dropdown', () => {
            // TODO
          });

          it('pulls some labels into the dropdown menu', () => {
            // TODO
          });
        });
      });
    });
  });


  describe('Events', () => {
    it('emits the "ak-tabs-tab-select" event if no initial tab is selected', () => {
      // TODO
    });
  });

  describe('Keyboard navigation', () => {
    describe('Tabbing', () => {
      // TODO
    });

    describe('with arrow keys', () => {
      // TODO
    });
  });
});
