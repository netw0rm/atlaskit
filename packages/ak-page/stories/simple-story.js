import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import reactify from 'akutil-react';
import 'ak-icon/glyph/search';
import 'ak-icon/glyph/create';
import AkNavigation from 'ak-navigation';

import webComponent from '../src';
import { name } from '../package.json';


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
  .add('with navigation and fixed layout', () => (
    <Component>
      <Navigation slot="navigation" collapsible open />
      <Lorem count="30" />
    </Component>
  ))
  .add('with navigation and fluid layout', () => (
    <Component layout="fluid">
      <Navigation slot="navigation" collapsible open />
      <Lorem count="30" />
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
        <ak-icon-create slot="global-create" />
      </Navigation>
      <div>
        <div className="z-index-content">
          When you open search, it should be in front of this div
        </div>
      </div>
    </Component>
  ));
