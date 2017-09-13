import React from 'react';
import { version } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import ExampleBasic from './ExampleBasic';
import basicSrc from '!raw-loader!./ExampleBasic';
import ExampleAppearance from './ExampleAppearance';
import appearanceSrc from '!raw-loader!./ExampleAppearance';
import ExampleCustom from './ExampleCustom';
import customSrc from '!raw-loader!./ExampleCustom';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>
      This component displays content in a layer that sits above the rest of the
      page content. Users won&#39;t be able to interact with the page until the
      dialog is closed.
    </p>
    <p>
      To ensure you get the exit animation when dismissing a modal dialog, first
      set <code>isOpen</code> to <code>false</code>. Once the animation is finished
      the <code>onClose</code> function prop will be called, at which
      point you can stop rendering the modal dialog. For examples see <a href={`https://aui-cdn.atlassian.com/atlaskit/stories/@atlaskit/modal-dialog/${version}/`}>The Storybook</a>
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Usage',
    Component: ExampleBasic,
    src: basicSrc,
  },
  {
    title: 'Appearances',
    Component: ExampleAppearance,
    src: appearanceSrc,
  },
  {
    title: 'Custom Options',
    Component: ExampleCustom,
    src: customSrc,
  },
];
