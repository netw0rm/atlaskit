import { Component } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { name } from '../package.json';

// NOTE context change (../glyph) is a breaking change, as the exports change
const req = require.context('../glyph', true, /^.*\.js/);
const components = req.keys().reduce((prev, file) => {
  prev[file] = req(file).default;
  return prev;
}, {});

chai.use(chaiAsPromised);
chai.should();

function fileToScope(file) {
  return file.substring(2, file.length - 3);
}

describe(name, () => {
  it('exports are properly defined', () => {
    // NOTE Please remember:
    // An addition is a feature
    // a removal or rename is a BREAKING CHANGE
    Object
      .keys(components)
      .map(fileToScope)
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
        'search',
      ]);
  });

  it('should be possible to create the components', () => {
    Object.keys(components).forEach((file) => {
      const iconName = fileToScope(file).split('/').join('-');
      const Icon = components[file];
      const component = new Icon();

      component.should.be.instanceof(Component);
      component.tagName.should.match(new RegExp(`^${name}-${iconName}`, 'i'));
    });
  });
});
