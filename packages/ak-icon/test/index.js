import { Component } from 'skatejs';
import chai from 'chai';
import iconNameToComponentName from '../src/iconNameToComponentName';
import chaiAsPromised from 'chai-as-promised';
import { name } from '../package.json';
import pathToDashed from '../src/pathToDashed';
import * as bundle from '../src';
import { getGlyphs } from './_helpers';
import {
  tearDownComponent,
  getRootNode,
  afterMutations,
} from 'akutil-common-test';

chai.use(chaiAsPromised);
chai.should();

// This could be any component, the important thing is the fixed named export
const { BitbucketLogoIcon } = bundle;

const components = getGlyphs();

describe(name, () => {
  describe('exports', () => {
    it('are properly defined for atomic ones', () => {
      // NOTE Please remember:
      // An addition is a feature
      // a removal or rename is a BREAKING CHANGE
      Object
        .keys(components)
        .should.be.deep.equal([
          'atlassian',

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
          'edit',

          'editor/bold',
          'editor/code',
          'editor/image',
          'editor/italic',
          'editor/link',
          'editor/list/bullet',
          'editor/list/number',
          'editor/mention',
          'editor/open',
          'editor/underline',
          'editor/unlink',

          'error',
          'expand',
          'home',
          'jira/logo',
          'projects',
          'question',
          'radio',
          'search',
          'success',
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
      (new BitbucketLogoIcon).should.be.instanceof(Component);

      const bundleKeys = Object.keys(bundle);

      bundleKeys.should.be.deep.equal(Object
            .keys(components)
            .map(pathToDashed)
            .map((x) => iconNameToComponentName(x)));

      bundleKeys.forEach((key) => (new (bundle[key])).should.be.instanceof(Component));
    });
  });

  it('should be possible to create the components', () => {
    Object.entries(components).forEach(([scope, Icon]) => {
      const iconName = pathToDashed(scope);
      const component = new Icon();

      component.should.be.instanceof(Component);
      component.tagName.should.match(new RegExp(`^${name}-${iconName}`, 'i'));
    });
  });

  describe('component structure', () => {
    let component;

    afterEach(() => tearDownComponent(component));

    it('should have role="img"', (done) => {
      component = new BitbucketLogoIcon();
      document.body.appendChild(component);
      afterMutations(
        () => getRootNode(component),
        (rootNode) => rootNode.querySelector('[role="img"]').tagName.should.match(/svg/i),
        done
      );
    });

    it('should accept a label', (done) => {
      const label = '123abc';
      component = new BitbucketLogoIcon();
      component.label = label;
      document.body.appendChild(component);
      afterMutations(
        () => getRootNode(component),
        (rootNode) => rootNode.querySelector('svg'),
        (svg) => {
          svg.hasAttribute('aria-labelledby').should.be.true;
          const labelledBy = svg.getAttribute('aria-labelledby');
          const ids = labelledBy.split(/\s+/);
          ids.length.should.be.at.least(1, 'The labelled-by attribute must reference some node');
          const labels = ids.map((id) => svg.getElementById(id).textContent);
          labels.should.contain(label);
        },
        done
      );
    });
  });
});
