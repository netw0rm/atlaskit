import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { presetThemes } from '@atlaskit/navigation';
import { name } from '../package.json';
import HtmlPage from './components/HtmlPage';
import DragAndDrop from './components/DragAndDrop/DragAndDrop';

storiesOf(name, module)
  .add('with drag and drop', () => (
    <HtmlPage>
      <DragAndDrop />
    </HtmlPage>
  ))
  .add('with themed drag and drop', () => (
    <HtmlPage>
      <DragAndDrop containerTheme={presetThemes.global} />
    </HtmlPage>
  ));
