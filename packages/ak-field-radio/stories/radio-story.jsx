import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { AkRadio } from '../src';
import { name } from '../package.json';

function changeHandler(event) {
  console.log(`Radio item for "${event.target.name}" was selected.`);
}

storiesOf(name, module)
  .add('Radio items', () => ([
    <AkRadio name="not-selected" value="true" onChange={changeHandler}>Not selected</AkRadio>,
    <AkRadio name="selected" value="true" onChange={changeHandler} isSelected>Selected</AkRadio>,
    <AkRadio name="disabled" value="true" onChange={changeHandler} isDisabled>Disabled</AkRadio>,
    <AkRadio name="selected-disabled" value="true" onChange={changeHandler} isSelected isDisabled>Selected + disabled</AkRadio>,
    <AkRadio name="markup-content" value="true" onChange={changeHandler}><b>Markup</b> in the <a href="/link">content</a></AkRadio>,
  ]));
