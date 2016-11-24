import { storiesOf } from '@kadira/storybook';
import ToolbarButtonComponent from 'ak-editor-button';
import TextFormattingComponent from 'ak-editor-toolbar-text-formatting';
import BoldIconComponent from 'ak-icon/glyph/editor/bold';
import AtlassianIconComponent from 'ak-icon/glyph/atlassian';
import ArrowLeftIconComponent from 'ak-icon/glyph/arrowleft';
import ArrowRightIconComponent from 'ak-icon/glyph/arrowright';
import React from 'react';
import reactify from 'akutil-react';

import ToolbarComponent from '../src';

const Toolbar = reactify(ToolbarComponent);
const ToolbarButton = reactify(ToolbarButtonComponent);
const BoldIcon = reactify(BoldIconComponent);
const ArrowLeftIcon = reactify(ArrowLeftIconComponent);
const ArrowRightIcon = reactify(ArrowRightIconComponent);
const AtlassianIcon = reactify(AtlassianIconComponent);
const TextFormatting = reactify(TextFormattingComponent);

storiesOf('ak-editor-toolbar', module)
  .add('Button alignment', () => (
    <div style={{ 'max-width': '500px' }}>
      <style>{' p { text-align: center} '}</style>
      <p>Left (default)</p>
      <Toolbar>
        <ToolbarButton><AtlassianIcon /></ToolbarButton>
        <ToolbarButton><ArrowLeftIcon /></ToolbarButton>
        <ToolbarButton><ArrowLeftIcon /></ToolbarButton>
      </Toolbar>
      <p>Right (&lt;spacer&gt; at the beginning)</p>
      <Toolbar>
        <spacer />
        <ToolbarButton><ArrowRightIcon /></ToolbarButton>
        <ToolbarButton><ArrowRightIcon /></ToolbarButton>
        <ToolbarButton><AtlassianIcon /></ToolbarButton>
      </Toolbar>
      <p>Center (&lt;spacer&gt; on each side)</p>
      <Toolbar>
        <spacer />
        <ToolbarButton><ArrowRightIcon /></ToolbarButton>
        <ToolbarButton><AtlassianIcon /></ToolbarButton>
        <ToolbarButton><ArrowLeftIcon /></ToolbarButton>
        <spacer />
      </Toolbar>
      <p>Left and right (&lt;spacer&gt; between)</p>
      <Toolbar>
        <ToolbarButton><AtlassianIcon /></ToolbarButton>
        <ToolbarButton><ArrowLeftIcon /></ToolbarButton>
        <ToolbarButton><ArrowLeftIcon /></ToolbarButton>
        <spacer />
        <ToolbarButton><ArrowRightIcon /></ToolbarButton>
        <ToolbarButton><ArrowRightIcon /></ToolbarButton>
        <ToolbarButton><AtlassianIcon /></ToolbarButton>
      </Toolbar>
      <p>Left, right and center (2 spacers)</p>
      <Toolbar>
        <ToolbarButton><AtlassianIcon /></ToolbarButton>
        <ToolbarButton><ArrowLeftIcon /></ToolbarButton>
        <ToolbarButton><ArrowLeftIcon /></ToolbarButton>
        <spacer />
        <ToolbarButton><ArrowRightIcon /></ToolbarButton>
        <ToolbarButton><AtlassianIcon /></ToolbarButton>
        <ToolbarButton><ArrowLeftIcon /></ToolbarButton>
        <spacer />
        <ToolbarButton><ArrowRightIcon /></ToolbarButton>
        <ToolbarButton><ArrowRightIcon /></ToolbarButton>
        <ToolbarButton><AtlassianIcon /></ToolbarButton>
      </Toolbar>
    </div>
  ))
  .add('Text formatting buttons', () => (
    <Toolbar>
      <TextFormatting />
    </Toolbar>
  ))
  .add('Empty toolbar', () => (
    <Toolbar />
  ))
  .add('Single button', () => (
    <Toolbar>
      <ToolbarButton><BoldIcon /></ToolbarButton>
    </Toolbar>
  ))
;
