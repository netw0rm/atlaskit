/* global jest, describe, it */

jest.autoMockOff();
const runTest = require('jscodeshift/dist/testUtils').runTest;

describe('codemod/icon/8', () => {
  it('handles renamed icons already using absolute path glyph imports', () => (
    runTest(__dirname, 'index', null, 'HandlesRenamedIcons')
  ));
});
