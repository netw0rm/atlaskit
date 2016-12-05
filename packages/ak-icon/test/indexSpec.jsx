import React, { Component } from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';

import iconNameToComponentName from '../bin/iconNameToComponentName';
import { name } from '../package.json';
import pathToDashed from '../bin/pathToDashed';
import * as bundle from '../src';
import { size } from '../src/Icon';
import { getGlyphs } from './_helpers';


const { expect } = chai;
chai.use(chaiEnzyme());
chai.should();

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
          'arrowleft',
          'arrowright',
          'atlassian',

          'bitbucket/addons',
          'bitbucket/admin',
          'bitbucket/branches',
          'bitbucket/builds',
          'bitbucket/commits',
          'bitbucket/dashboard',
          'bitbucket/downloads',
          'bitbucket/followers',
          'bitbucket/following',
          'bitbucket/issues',
          'bitbucket/logo',
          'bitbucket/members',
          'bitbucket/optout',
          'bitbucket/pipelines',
          'bitbucket/projects',
          'bitbucket/pullrequests',
          'bitbucket/repos',
          'bitbucket/repositories',
          'bitbucket/snippets',
          'bitbucket/source',
          'bitbucket/teams',
          'bitbucket/wiki',

          'cancel',
          'checkbox',
          'confirm',

          'confluence/calendar',
          'confluence/canvas',
          'confluence/page',
          'confluence/person',
          'confluence/quote',

          'create',
          'dashboard',
          'edit',

          'editor/advanced',
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
          'feedback',
          'help',
          'home',
          'jira/logo',
          'moreoptions',
          'projects',
          'question',
          'radio',
          'search',
          'settings',
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

    describe('bundle', () => {
      it('has size export', () => bundle.size.should.be.deep.equal(size));

      it('exports the React component', () => {
        const { AtlassianIcon } = bundle;
        expect(new AtlassianIcon({ label: 'My icon' })).to.be.instanceOf(Component);
      });

      it('icons are properly defined in bundle', () => {
        const bundleKeys = Object
          .keys(bundle)
          .filter(key => key !== 'size');

        bundleKeys.should.be.deep.equal(Object
              .keys(components)
              .map(pathToDashed)
              .map(x => iconNameToComponentName(x)));

        bundleKeys.forEach((key) => {
          expect(bundle[key]).to.be.a.function;
        });
      });
    });
  });

  describe('component structure', () => {
    it('should have role="img"', () => {
      const { AtlassianIcon } = bundle;
      const wrapper = mount(<AtlassianIcon label="My label" />);
      expect(wrapper.find('svg')).to.have.attr('role', 'img');
    });

    it('should be possible to create the components', () => {
      Object.values(components).forEach((Icon) => {
        const wrapper = shallow(<Icon label="My icon" />);
        expect(wrapper).to.be.defined;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });
    });
  });

  describe('props', () => {
    describe('label property', () => {
      it('should accept a label', () => {
        const { AtlassianIcon } = bundle;
        const label = 'my label';
        const wrapper = mount(<AtlassianIcon label={label} />);
        const svgWrapper = wrapper.find('svg').first();

        expect(svgWrapper).to.have.attr('aria-labelledby');

        const svg = svgWrapper.get(0);
        const labelledBy = svg.getAttribute('aria-labelledby');
        const ids = labelledBy.split(/\s+/);
        expect(ids.length).to.be.at.least(1, 'The labelled-by attribute must reference some node');

        // The SVG should contain the provided label
        expect(svgWrapper.containsAnyMatchingElements(
          ids.map(id => <title id={id}>{label}</title>)
        )).to.equal(true);
      });
    });
  });
});
