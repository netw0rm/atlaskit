import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';

import iconNameToComponentName from '../bin/iconNameToComponentName';
import { name } from '../package.json';
import pathToDashed from '../bin/pathToDashed';
import * as bundle from '../src';
import { size } from '../src/Icon';
import { getGlyphs } from './_helpers';

const components = getGlyphs();

describe(name, () => {
  describe('exports', () => {
    it('are properly defined for atomic ones', () => {
      const arrayCompare = (actual, expected) => {
        expect(actual.length).to.equal(expected.length);

        for (let i = 0; i < actual.length; i++) {
          if (actual[i] !== expected[i]) {
            let actualContext = '... ';
            let expectedContext = '... ';

            for (let j = -2; j <= 2; j++) {
              if (i + j >= 0 && i + j < actual.length) {
                actualContext = `${actualContext} ${actual[i + j]}, `;
                expectedContext = `${expectedContext} ${expected[i + j]}, `;
              }
            }

            if (i + 1 < expected.length && actual[i] === expected[i + 1]) {
              return `Missing value ${expected[i]}: ${actualContext} !== ${expectedContext}`;
            }
            return `Found unexpected value ${actual[i]}: ${actualContext} !== ${expectedContext}`;
          }
        }
        return '';
      };

      // NOTE Please remember:
      // An addition is a feature
      // a removal or rename is a BREAKING CHANGE

      // NOTE the reduced-ui-pack package uses the icons from this package, so if you change
      // anything in the list below then you'll also need to update the tests in reduced-ui-pack.
      const expected = [
        'activity',
        'add-item',
        'add',
        'addon',
        'arrowleft',
        'arrowright',
        'arrowrightlong',
        'atlassian',
        'attachment',
        'audio',
        'backlog',
        'bitbucket',
        'bitbucket/branches',
        'bitbucket/builds',
        'bitbucket/commits',
        'bitbucket/members',
        'bitbucket/optout',
        'bitbucket/pipelines',
        'bitbucket/pullrequests',
        'bitbucket/repos',
        'bitbucket/repositories',
        'bitbucket/snippets',
        'board',
        'calendar',
        'camera',
        'canvas',
        'chart',
        'check-circle',
        'check',
        'checkbox',
        'code',
        'components',
        'cross-circle',
        'cross',
        'dashboard',
        'date',
        'decision',
        'detail-view',
        'discover',
        'document',
        'edit',
        'editor/add',
        'editor/addon',
        'editor/advanced',
        'editor/align-center',
        'editor/align-left',
        'editor/align-right',
        'editor/attachment',
        'editor/bold',
        'editor/bullet-list',
        'editor/check',
        'editor/close',
        'editor/code',
        'editor/date',
        'editor/decision',
        'editor/emoji',
        'editor/error',
        'editor/expand',
        'editor/feedback',
        'editor/file',
        'editor/help',
        'editor/hint',
        'editor/image-border',
        'editor/image-resize',
        'editor/image',
        'editor/indent',
        'editor/info',
        'editor/italic',
        'editor/link',
        'editor/location',
        'editor/mention',
        'editor/more',
        'editor/note',
        'editor/number-list',
        'editor/open',
        'editor/outdent',
        'editor/panel',
        'editor/photo',
        'editor/recent',
        'editor/redo',
        'editor/remove',
        'editor/search',
        'editor/table',
        'editor/task',
        'editor/text-color',
        'editor/underline',
        'editor/undo',
        'editor/unlink',
        'editor/warning',
        'emoji',
        'emoji/activity',
        'emoji/atlassian',
        'emoji/custom',
        'emoji/flags',
        'emoji/food',
        'emoji/frequent',
        'emoji/nature',
        'emoji/objects',
        'emoji/people',
        'emoji/symbols',
        'emoji/travel',
        'expand',
        'export',

        'favorite',
        'feedback',
        'file',
        'folder',
        'followers',
        'following',

        'hipchat/arrow-down',
        'hipchat/arrow-left',
        'hipchat/arrow-right',
        'hipchat/arrow-up',
        'hipchat/authentication',
        'hipchat/bell-all',
        'hipchat/bell-default',
        'hipchat/bell-direct',
        'hipchat/billing',
        'hipchat/carat-down',
        'hipchat/carat-left',
        'hipchat/carat-right',
        'hipchat/carat-up',
        'hipchat/close',
        'hipchat/connect-addon',
        'hipchat/lobby',
        'hipchat/logo',
        'hipchat/more-vertical',
        'hipchat/preferences',
        'hipchat/room-directory',
        'hipchat/room-menu',
        'hipchat/upgrade-available-settings',
        'hipchat/upgrade-available',
        'hipchat/upgrade-min',
        'hipchat/video',
        'hipchat/warning-circle',

        'home',
        'image-border',
        'image-resize',
        'image',
        'info',
        'invite-team',
        'issue',
        'issues',
        'jira',
        'jira/addon',
        'light-bulb',
        'link',
        'list',
        'lock',
        'mention',
        'more',
        'notification',
        'office-building',
        'open',
        'page',
        'people',
        'person',
        'play',
        'question-circle',
        'question',
        'quote',

        'radio',
        'recent',
        'redo',
        'refresh',
        'search',

        'servicedesk/graph-bar',
        'servicedesk/issue-raise',
        'servicedesk/people-group',
        'servicedesk/queues',
        'servicedesk/screen',

        'settings',
        'share',
        'ship',
        'shortcut',
        'source',
        'table',
        'task',
        'trash',
        'tray',
        'undo',
        'unlink',
        'video',
        'warning',
        'world',
      ];

      const actual = Object.keys(components);

      const errorMsg = arrayCompare(actual, expected);
      expect(errorMsg).to.equal('');
        // If you find yourself here and wonder why this list is not auto-generated, then bear in
        // mind that tests are supposed to tell you when a piece of software breaks.
        // As the sole purpose of this component is providing icons:
        //
        // * changing an icon is a patch
        // * adding an icon is a feature
        // * removing an icon is a breaking change
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
          expect(typeof bundle[key]).to.equal('function');
        });
      });
    });
  });

  describe('component structure', () => {
    it('should have role="img"', () => {
      const { AtlassianIcon } = bundle;
      const wrapper = mount(<AtlassianIcon label="My label" />);
      expect(wrapper.find('svg').is('[role="img"]')).to.equal(true);
    });

    it('should be possible to create the components', () => {
      Object.values(components).forEach((Icon) => {
        const wrapper = shallow(<Icon label="My icon" />);
        expect(wrapper).not.to.equal(undefined);
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

        expect(svgWrapper.is('[aria-labelledby]')).to.equal(true);

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
