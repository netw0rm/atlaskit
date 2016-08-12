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
            tabs = [{ selected: true }, {}, {}, {}, {}, {}, {}, {}];
            setupTabs(done);
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
            tabs = [{}, {}, {}, {}, {}, {}, {}, { selected: true }];
            containerWidth = '300px';
            setupTabs(done);
          });
          afterEach(cleanupTabs);

          it('displays the last tab', () => {
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
