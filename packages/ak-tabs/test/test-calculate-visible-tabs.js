import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { labelsContainer } from '../src/internal/symbols';
import { calculateVisibleTabs } from '../src/internal/tabs-helpers';
import {
  setupTabs,
  cleanupTabs,
  getElementWidth,
} from '../test-helpers/helpers';


chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-tabs calculate visible tabs -', () => {
  let fixtures = {};

  function setUpTest(labelWidth, opts = {}, cb) {
    setupTabs(opts, (out) => {
      fixtures = out;
      const children = Array.from(fixtures.el[labelsContainer].children);
      children.forEach(el => {
        el.style.maxWidth = el.style.minWidth = labelWidth;
        el.style.paddingLeft = el.style.paddingRight = 0;
      });
      fixtures.moreWidth = getElementWidth(children[children.length - 1]);
      cb();
    });
  }

  function cleanUpTest() {
    cleanupTabs(fixtures);
    fixtures = {};
  }

  describe('with ten 100px labels', () => {
    const labelWidth = 100;
    const tabs = [{ selected: true }, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    it('displays all the labels in a 1000px container', (done) => {
      setUpTest(`${labelWidth}px`, { width: '1000px', tabs }, () => {
        expect(calculateVisibleTabs(fixtures.el).length).to.equal(10, 'All tabs should be visible');
        cleanUpTest();
        done();
      });
    });

    describe('shows the correct number of labels for container', () => {
      const widths = [1, 200, 400, 600, 800];
      function numVisibleForWidth(width) {
        const numVisible = Math.floor((width - fixtures.moreWidth) / labelWidth);
        return numVisible > 1 ? numVisible : 1; // There should always be one visible label.
      }
      widths.forEach(width => {
        it(`with ${width}px width`, (done) => {
          setUpTest(`${labelWidth}px`, { width: `${width}px`, tabs }, () => {
            expect(calculateVisibleTabs(fixtures.el).length).to.equal(numVisibleForWidth(width),
              'Should display the correct number of labels'
            );
            cleanUpTest();
            done();
          });
        });
      });
    });
  });
});
