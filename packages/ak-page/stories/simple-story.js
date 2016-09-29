import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import webComponent from '../src/index';
import React from 'react';
import { name } from '../package.json';
import 'ak-icon';

import AkNavigation from 'ak-navigation';

const Component = reactify(webComponent);

const Navigation = reactify(AkNavigation);

storiesOf(name, module)
.add('a simple ak-page', () => (
  <Component>
    <div style={{ border: '1px solid black' }} slot="navigation">Navigation</div>
    <div>Main</div>
  </Component>
  ))
  .add('with navigation', () => (
    <Component>
      <Navigation slot="navigation" open />
      <div>Content</div>
    </Component>
  ))
  .add('with containerless navigation', () => (
    <Component>
      <Navigation slot="navigation" container-hidden />
      <div>Content</div>
    </Component>
  ))
  .add('with navigation that has layering', () => (
    <Component>
      <style>{`
        .z-index-content {
          z-index: 500;
          background: rgba(0,0,0,0.5);
          height: 300px;
          position: relative;
        }
      `}</style>
      <Navigation slot="navigation" open>
        <ak-icon-search slot="global-search" />
        <ak-icon-bitbucket-create slot="global-create" />
      </Navigation>
      <div>
        <div className="z-index-content">
          When you open search, it should be in front of this div
        </div>
      </div>
    </Component>
  ));
