import { Component } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { name } from '../package.json';
import fileToScope from '../src/fileToScope';
import pathToDashed from '../src/pathToDashed';

// This is an anti-pattern and a special case here as we auto-generate the exports
// and need to make sure that the single ones align to the bundled ones.
// DO NOT COPY TO OTHER COMPONENTS!
import bundle from '../dist/bundle';

chai.use(chaiAsPromised);
chai.should();

// NOTE context change (../glyph) is a breaking change, as the exports change
const req = require.context('../glyph', true, /^.*\.js/);
const components = req.keys().reduce((prev, file) => {
  prev[fileToScope(file)] = req(file).default;
  return prev;
}, {});


describe(name, () => {
  describe('exports', () => {
    it('are properly defined for atomic ones', () => {
      // NOTE Please remember:
      // An addition is a feature
      // a removal or rename is a BREAKING CHANGE
      Object
        .keys(components)
        .should.be.deep.equal([
          'bitbucket/admin',
          'bitbucket/branches',
          'bitbucket/builds',
          'bitbucket/commits',
          'bitbucket/create',
          'bitbucket/downloads',
          'bitbucket/feedback',
          'bitbucket/followers',
          'bitbucket/following',
          'bitbucket/help',
          'bitbucket/issues',
          'bitbucket/logo',
          'bitbucket/optout',
          'bitbucket/overview',
          'bitbucket/pipelines',
          'bitbucket/pullrequests',
          'bitbucket/repos',
          'bitbucket/repositories',
          'bitbucket/settings',
          'bitbucket/snippets',
          'bitbucket/source',
          'bitbucket/teams',
          'bitbucket/wiki',

          'checkbox',

          'confluence/calendar',
          'confluence/canvas',
          'confluence/page',
          'confluence/person',
          'confluence/quote',

          'dashboard',
          'expand',
          'home',
          'jira/logo',
          'projects',
          'question',
          'radio',
          'search',
        ]);
        // If you find yourself here and wonder why this list is not auto-generated, then bear in
        // mind that tests are supposed to tell you when a piece of software breaks.
        // As the sole purpose of this component is providing icons:
        //
        // * changing an icon is a patch
        // * adding an icon is a feature
        // * removing an icon is breaking change
        // * renaming an icon is a breaking change
        //
        // If we were to auto-generate this list, then renaming, adding or removing would NOT
        // break any tests and thus not hint the developer at what kind of change he/she is making
    });

    it('are properly defined in bundle', () => {
      Object.keys(bundle).should.be.deep.equal(Object.keys(components));
    });
  });

  it('should be possible to create the components', () => {
    Object.keys(components).forEach((scope) => {
      const iconName = pathToDashed(scope);
      const Icon = components[scope];
      const component = new Icon();

      component.should.be.instanceof(Component);
      component.tagName.should.match(new RegExp(`^${name}-${iconName}`, 'i'));
    });
  });
});
