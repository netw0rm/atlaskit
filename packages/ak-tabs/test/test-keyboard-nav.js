import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import '../src/index.js';

import {
  setupTabs,
  cleanupTabs,
  keyboardNavLeft,
  keyboardNavRight,
} from '../test-helpers/helpers';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-tabs keyboard nav -', () => {
  let fixtures;

  function setUpTest(opts = {}) {
    beforeEach(done => (setupTabs(opts, (out) => {
      fixtures = out;
      done();
    })));
    afterEach(() => cleanupTabs(fixtures));
  }

  describe('with arrow keys', () => {
    describe('with three children, with the second selected', () => {
      setUpTest({
        tabs: [
          { label: 'Tab 1' },
          { label: 'Tab 2', selected: true },
          { label: 'Tab 3' },
        ],
      });

      it('pressing the LEFT arrow selects the first tab', done => {
        keyboardNavLeft(fixtures.el, () => {
          expect(fixtures.tabs[0].selected).to.equal(true, 'The first tab should be selected');
          done();
        });
      });

      it('pressing the RIGHT arrow selects the third tab', done => {
        keyboardNavRight(fixtures.el, () => {
          expect(fixtures.tabs[2].selected).to.equal(true, 'The first tab should be selected');
          done();
        });
      });
    });

    describe('with eight children and overflow, with the last selected', () => {
      setUpTest({
        width: '300px',
        tabs: [
          { label: 'Tab 1' },
          { label: 'Tab 2' },
          { label: 'Tab 3' },
          { label: 'Tab 4' },
          { label: 'Tab 5' },
          { label: 'Tab 6' },
          { label: 'Tab 7' },
          { label: 'Tab 8', selected: true },
        ],
      });

      it('pressing the LEFT arrow selects the seventh tab', done => {
        keyboardNavLeft(fixtures.el, () => {
          expect(fixtures.tabs[6].selected).to.equal(true, 'The seventh tab should be selected');
          done();
        });
      });
    });
  });
});
