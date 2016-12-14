import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { AkRadio } from '../src';
import { name } from '../package.json';


storiesOf(name, module)
  .add('Radio items', () => ([
    <AkRadio name="item1" value="not-selected">Not selected</AkRadio>,
    <AkRadio name="item2" value="selected" selected>Selected</AkRadio>,
    <AkRadio name="item3" value="disabled" disabled>Disabled</AkRadio>,
    <AkRadio name="item4" value="selected-disabled" selected disabled>Selected + disabled</AkRadio>,
    <AkRadio name="item5" value="markup-content"><b>Markup</b> in the <a href="/link">content</a></AkRadio>,
  ]));
