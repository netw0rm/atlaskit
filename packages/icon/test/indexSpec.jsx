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
      //
      // - A backward compatible update is a patch
      // - A backward compatible addition is a feature
      // - A removal or rename is a BREAKING CHANGE
      // - A rename is a BREAKING CHANGE
      //
      // NOTE the reduced-ui-pack package uses the icons from this package, so
      // if you change anything in the list below then you'll also need to
      // update the tests in reduced-ui-pack. A breaking change to this package
      // is also a breaking change to the reduced-ui-pack package.
      //
      // This list is manually maintained because if we auto-generated it, we
      // wouldn't be able to detect breaking changes (removals).
      //
      // This list should be sorted alphabetically.
      const expected = [
        'activity',
        'add-circle',
        'add-item',
        'add',
        'addon',
        'app-switcher',
        'arrow-down',
        'arrow-left-circle',
        'arrow-left',
        'arrow-right-long',
        'arrow-right',
        'arrow-up',
        'atlassian',
        'attachment',
        'audio-circle',
        'audio',
        'backlog',
        'billing',

        'bitbucket',
        'bitbucket/branches',
        'bitbucket/builds',
        'bitbucket/clone',
        'bitbucket/commits',
        'bitbucket/compare',
        'bitbucket/forks',
        'bitbucket/output',
        'bitbucket/pipelines',
        'bitbucket/pullrequests',
        'bitbucket/repos',
        'bitbucket/snippets',

        'board',
        'book',
        'bullet-list',
        'calendar-filled',
        'calendar',
        'camera-filled',
        'camera-rotate',
        'camera-take-picture',
        'camera',
        'cancel',
        'canvas',
        'check-circle',
        'check',
        'checkbox',
        'chevron-down-circle',
        'chevron-down',
        'chevron-left-circle',
        'chevron-left',
        'chevron-right-circle',
        'chevron-right',
        'chevron-up-circle',
        'chevron-up',
        'code',
        'comment',
        'component',
        'confirm',
        'confluence',
        'copy',
        'cross-circle',
        'cross',
        'dashboard',
        'decision',
        'detail-view',
        'discover-filled',
        'discover',
        'document-filled',
        'document',
        'documents',
        'download',
        'dropbox',
        'edit-filled',
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
        'editor/close',
        'editor/code',
        'editor/date',
        'editor/decision',
        'editor/done',
        'editor/edit',
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
        'emoji/emoji',
        'emoji/flags',
        'emoji/food',
        'emoji/frequent',
        'emoji/nature',
        'emoji/objects',
        'emoji/people',
        'emoji/symbols',
        'emoji/travel',

        'error',
        'expand',
        'export',
        'feedback',
        'file',
        'filter',
        'folder-filled',
        'folder',
        'followers',
        'following',
        'googledrive',
        'graph-bar',
        'graph-line',
        'help',
        'hint',

        'hipchat',
        'hipchat/chevron-double-down',
        'hipchat/chevron-double-up',
        'hipchat/chevron-down',
        'hipchat/chevron-up',
        'hipchat/lobby',
        'hipchat/media-attachment-count',
        'hipchat/media-uploader',

        'home-circle',
        'home-filled',
        'image-border',
        'image-resize',
        'image',
        'info',
        'invite-team',
        'issue-raise',
        'issue',
        'issues',
        'jira',
        'lightbulb-filled',
        'lightbulb',
        'link-filled',
        'link',
        'list',
        'location',
        'lock-circle',
        'lock-filled',
        'lock',
        'marketplace',

        'media-services/actual-size',
        'media-services/add-comment',
        'media-services/arrow',
        'media-services/audio',
        'media-services/blur',
        'media-services/brush',
        'media-services/code',
        'media-services/document',
        'media-services/filter',
        'media-services/grid',
        'media-services/image',
        'media-services/line',
        'media-services/open-mediaviewer',
        'media-services/oval',
        'media-services/pdf',
        'media-services/preselected',
        'media-services/presentation',
        'media-services/scale-large',
        'media-services/scale-small',
        'media-services/spreadsheet',
        'media-services/square',
        'media-services/text',
        'media-services/unknown',
        'media-services/video',
        'media-services/zip',
        'media-services/zoom-in',
        'media-services/zoom-out',

        'mention',
        'menu',
        'more-vertical',
        'more',
        'notification-all',
        'notification-direct',
        'notification',
        'office-building',
        'open',
        'overview',
        'page-filled',
        'page',
        'pdf',
        'people-group',
        'people',
        'person',
        'portfolio',
        'preferences',
        'presence-active',
        'presence-busy',
        'presence-unavailable',
        'question-circle',
        'question',
        'queues',
        'quote',
        'radio',
        'recent',
        'redo',
        'refresh',
        'remove',
        'room-menu',
        'schedule-add',
        'schedule-filled',
        'screen',
        'search',
        'send',
        'settings',
        'share',
        'ship',
        'shortcut',
        'sign-in',
        'sign-out',
        'star-filled',
        'star',
        'table',
        'task',
        'time',
        'trash',
        'tray',
        'undo',
        'unlink',
        'unlock-circle',
        'upload',
        'user-avatar-circle',

        'vid-audio-muted',
        'vid-audio-on',
        'vid-backward',
        'vid-camera-off',
        'vid-connection-circle',
        'vid-forward',
        'vid-full-screen-off',
        'vid-full-screen-on',
        'vid-hang-up',
        'vid-hd-circle',
        'vid-pause',
        'vid-play',
        'vid-raised-hand',
        'vid-share-screen',
        'vid-speaking-circle',

        'video-circle',
        'video-filled',
        'warning',
        'watch-filled',
        'watch',
        'world',
      ];

      const actual = Object.keys(components);
      const errorMsg = arrayCompare(actual, expected);
      expect(errorMsg).to.equal('');
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
          .filter(key => key !== 'size' && key !== 'default');

        bundleKeys.should.be.deep.equal(Object
              .keys(components)
              .map(pathToDashed)
              .map(x => iconNameToComponentName(x))
        );

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
