import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { waitUntil } from 'akutil-common-test';

import '../src';
import {
  setupTabs,
  cleanupTabs,
  keyboardNavLeft,
  keyboardNavRight,
} from './_helpers';


chai.use(chaiAsPromised);
chai.should();

describe.skip('ak-tabs keyboard nav -', () => {
  let fixtures;

  function setUpTest(opts = {}) {
    beforeEach(() => (setupTabs(opts).then(out => (fixtures = out))));
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

      it('pressing the LEFT arrow selects the first tab', () => {
        keyboardNavLeft(fixtures.el);
        return waitUntil(() => fixtures.tabs[0].selected).should.be.fulfilled;
      });

      it('pressing the RIGHT arrow selects the third tab', () => {
        keyboardNavRight(fixtures.el);
        return waitUntil(() => fixtures.tabs[2].selected).should.be.fulfilled;
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

      it('pressing the LEFT arrow selects the seventh tab', () => {
        keyboardNavLeft(fixtures.el);
        return waitUntil(() => fixtures.tabs[6].selected).should.be.fulfilled;
      });
    });
  });
});
