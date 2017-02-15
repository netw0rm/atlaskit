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

    it('should return an empty list when no changed files are found (2 empty strings)', () => {
      // if no changed files, we would have received just a newline character, which, when split
      // would pass an array with two empty strings to our function. We'll test the cases of 1, 2
      // and 0 empty strings though, just in cases
      const changedFiles = ['', ''];
      const changedPackages = changedFilesToChangedPackages(changedFiles);
      changedPackages.should.deep.equal([]);
    });

    it('should return an empty list when no changed files are found (1 empty string)', () => {
      const changedFiles = [''];
      const changedPackages = changedFilesToChangedPackages(changedFiles);
      changedPackages.should.deep.equal([]);
    });

    it('should return an empty list when no changed files are found (no empty strings)', () => {
      const changedFiles = [];
      const changedPackages = changedFilesToChangedPackages(changedFiles);
      changedPackages.should.deep.equal([]);
    });

    it('should return an empty array if only files outside of /packages are changed', () => {
      const changedFiles = ['Readme.md', 'bitbucket-pipelines.yml', 'test/getChangedPackages.js'];
      const changedPackages = changedFilesToChangedPackages(changedFiles);
      changedPackages.should.deep.equal([]);
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
