import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { labelsContainer } from '../src/internal/symbols';
import { calculateVisibleTabs } from '../src/internal/tabs-helpers';
import { afterMutations } from 'akutil-common-test';
import {
  setupTabs,
  cleanupTabs,
  getTabLabels,
  getElementWidth,
} from '../test-helpers/helpers';


chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-tabs calculate visible tabs -', () => {
  let fixtures;

  function setUpTest(opts = {}) {
    beforeEach(done => (setupTabs(opts, (out) => {
      fixtures = out;
      const children = fixtures.el[labelsContainer].children;
      fixtures.moreWidth = getElementWidth(children[children.length - 1]);
      done();
    })));
    afterEach(() => cleanupTabs(fixtures));
  }

  function setWidths(containerWidthPx, labelWidthPx) {
    fixtures.container.style.width = `${containerWidthPx}px`;
    getTabLabels(fixtures.el).forEach(label => {
      label.style.maxWidth = label.style.minWidth = `${labelWidthPx}px`;
      label.style.paddingLeft = label.style.paddingRight = 0;
    });
  }

  describe('with ten 100px labels', () => {
    const labelWidth = 100;
    setUpTest({
      tabs: [{ selected: true }, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    });

    it('displays all the labels in a 1000px container', (done) => {
      setWidths(1000, 100);
      afterMutations(() => {
        expect(calculateVisibleTabs(fixtures.el).length).to.equal(10, 'All tabs should be visible');
        done();
      });
    });

    describe('shows the correct number of labels when the container is resized', () => {
      const widths = [200, 400, 600, 800];
      function numVisibleForWidth(width) {
        return Math.floor((width - fixtures.moreWidth) / labelWidth);
      }

      widths.forEach(width => {
        it(`to ${width}px`, (done) => {
          setWidths(width, 100);
          afterMutations(() => {
            expect(calculateVisibleTabs(fixtures.el).length).to.equal(numVisibleForWidth(width),
              'Should display the correct number of labels'
            );
            done();
          });
        });
      });
    });
  });
});
