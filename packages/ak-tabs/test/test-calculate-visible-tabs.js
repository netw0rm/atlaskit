import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { labelsContainer } from '../src/internal/symbols';
import { calculateVisibleTabs } from '../src/internal/tabs-helpers';
import { setupTabs, cleanupTabs, getElementWidth } from './_helpers';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe.skip('ak-tabs calculate visible tabs -', () => {
  function setUpTest(labelWidth, opts = {}) {
    return setupTabs(opts).then((fixtures) => {
      const children = Array.from(fixtures.el[labelsContainer].children);
      children.forEach((el) => {
        el.style.maxWidth = el.style.minWidth = labelWidth;
        el.style.paddingLeft = el.style.paddingRight = 0;
      });
      fixtures.moreWidth = getElementWidth(children[children.length - 1]);
      return fixtures;
    });
  }

  function cleanUpTest(fixtures) {
    cleanupTabs(fixtures);
  }

  describe('with ten 100px labels', () => {
    const labelWidth = 100;
    const tabs = [{ selected: true }, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    it('displays all the labels in a 1000px container', () =>
      setUpTest(`${labelWidth}px`, { width: '1000px', tabs }).then((fixtures) => {
        expect(calculateVisibleTabs(fixtures.el).length).to.equal(10, 'All tabs should be visible');
        cleanUpTest(fixtures);
      })
    );

    describe('shows the correct number of labels for container', () => {
      const widths = [1, 200, 400, 600, 800];
      function numVisibleForWidth(width, moreWidth) {
        const numVisible = Math.floor((width - moreWidth) / labelWidth);
        if (numVisible > 1) {
          return numVisible;
        }
        return 1; // There should always be one visible label.
      }
      widths.forEach((width) => {
        it(`with ${width}px width`, () =>
          setUpTest(`${labelWidth}px`, { width: `${width}px`, tabs }).then((fixtures) => {
            const numExpected = numVisibleForWidth(width, fixtures.moreWidth);
            expect(calculateVisibleTabs(fixtures.el).length).to.equal(numExpected,
              `Should display ${numExpected} number of labels`
            );
            cleanUpTest(fixtures);
          })
        );
      });
    });
  });
});
