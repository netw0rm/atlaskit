import mocha from 'mocha';

/**
 * Example:
 *
 *     // src/index.js
 *     import browser from 'browser';
 *
 *     export default function assertMac() {
 *        if (!browser.mac) {
 *          throw new Error('Must be a mac');
 *        }
 *     }
 *
 *     // tests/index.js
 *     import module, { assertMac } from '../src';
 *
 *     describe('a suite', () => {
 *       const rewireMock = RewireMock();
 *
 *       it('a test', () => {
 *         const mockBrowser = { mac: false };
 *         rewireMock(module, 'browser', mockBrowser);
 *         expect(assertMac).to.throw(Error);
 *       });
 *     });
 *
 * The `RewireMock` creates a factory function that can be used within tests. It automatically
 * handles resetting the rewired dependency.
 */
export default () => {
  const resetAfter: any[] = [];

  afterEach(() => resetAfter.map(({ module, name }) => module.__ResetDependency__(name)));

  return (module: any, name: string, mock: any): void => {
    module.__Rewire__(name, mock);
    resetAfter.push({ module, name });
  };
};
