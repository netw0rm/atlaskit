
const stripTags = require('../src/strip-tags.js');

describe('akutil-dmd-plugin', () => {
  describe('stripTags helper', () => {
    const tests = [
      {
        string: '@a',
        tags: ['a'],
        expected: '',
      },
      {
        string: '@a bcdef',
        tags: ['a'],
        expected: 'bcdef',
      },
      {
        string: '@js console.log(\'abc\');',
        tags: ['js'],
        expected: 'console.log(\'abc\');',
      },
      {
        string: '@js @playground console.log(\'abc\');',
        tags: ['js', 'playground'],
        expected: 'console.log(\'abc\');',
      },
      {
        string: 'words before tags @js @playground words after tags',
        tags: ['js', 'playground'],
        expected: 'words before tagswords after tags',
      },
    ];

    tests.forEach((test) => {
      it(`with string '${test.string}'`, () => {
        expect(stripTags(test.string, test.tags)).to.equal(test.expected);
      });
    });
  });
});
