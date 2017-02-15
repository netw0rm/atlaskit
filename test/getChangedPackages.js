const chai = require('chai');

chai.should();

const { changedFilesToChangedPackages, changedPackagesToLernaGlob } = require('../build/bin/_get_changed_packages');

describe('_get_changed_packages.js', () => {
  describe('changedFilesToChangedPackages()', () => {
    it('should return a single package when a single file in a package changes', () => {
      const changedFiles = ['packages/foo/bar.js'];
      const changedPackages = changedFilesToChangedPackages(changedFiles);
      changedPackages.should.deep.equal(['@atlaskit/foo']);
    });

    it('should return a single package when multiple files in a package changes', () => {
      const changedFiles = ['packages/foo/bar.js', 'packages/foo/xyz.js'];
      const changedPackages = changedFilesToChangedPackages(changedFiles);
      changedPackages.should.deep.equal(['@atlaskit/foo']);
    });

    it('should return a multiple packages if multiple files touched in multiple packages', () => {
      const changedFiles = ['packages/foo/bar.js', 'packages/bar/xyz.js'];
      const changedPackages = changedFilesToChangedPackages(changedFiles);
      changedPackages.should.deep.equal(['@atlaskit/foo', '@atlaskit/bar']);
    });
  });

  describe('changedPackagesToLernaGlob', () => {
    it('should return comma separated packages surrounded by braces', () => {
      const changedPackages = ['@atlaskit/foo', '@atlaskit/bar'];
      const lernaGlob = changedPackagesToLernaGlob(changedPackages);
      lernaGlob.should.equal('{@atlaskit/foo,@atlaskit/bar}');
    });

    it('should return single package name if only one package passed (no braces)', () => {
      const changedPackages = ['@atlaskit/foo'];
      const lernaGlob = changedPackagesToLernaGlob(changedPackages);
      lernaGlob.should.equal('@atlaskit/foo');
    });

    it('should return an empty string if an empty array is passed', () => {
      const changedPackages = [];
      const lernaGlob = changedPackagesToLernaGlob(changedPackages);
      lernaGlob.should.equal('');
    });
  });
});
