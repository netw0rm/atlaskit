import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Button from 'ak-button';

import RadioGroup, { AkRadioGroup } from '../src';
import { name } from '../package.json';
import {
  sampleItems,
  sampleItemsWithSelection,
  sampleItemsWithDefault,
  longSampleWithDefault,
} from './_constants';

const formTestUrl = 'http://www.w3schools.com/html/action_page.php';

function radioGroupSubmitStory(content) {
  return (
    <div>
      <form
        action={formTestUrl}
        method="get"
        style={{ backgroundColor: 'white', padding: '40px', width: '500px' }}
        target="myFrame"
      >
        {content}
        <p>
          <Button type="submit" appearance="primary">Submit</Button>
        </p>
      </form>
      <p>The data submitted by the form will appear below:</p>
      <iframe src="" name="myFrame" style={{ width: '50%', height: '300px' }} />
    </div>
  );
}

function changeHandler(event) {
  console.log(`Radio item for "${event.target.value}" was selected`);
}

const imports = [
  ['React', 'react'],
  ['{ AkRadioGroup }', 'ak-field-radio'],
];

const smartImports = [
  ['React', 'react'],
  ['RadioGroup', 'ak-field-radio'],
];

storiesOf(name, module)
  .addCodeExampleStory('Simple radio group (dumb)', () => (
    <AkRadioGroup
      items={sampleItems}
      label="Pick your favourite animal:"
      onRadioChange={changeHandler}
    />
), { imports, scripts: [changeHandler] })
  .add('Simple radio group (dumb) with selection', () => (
    <AkRadioGroup
      items={sampleItemsWithSelection}
      label="Pick your favourite animal:"
      onRadioChange={changeHandler}
    />
  ))
  .addCodeExampleStory('Simple radio group', () => (
    <RadioGroup
      items={sampleItems}
      label="Pick your favourite animal:"
    />
  ), { imports: smartImports })
  .add('Simple radio group with submit test', () => radioGroupSubmitStory(
    <RadioGroup
      items={sampleItems}
      label="Pick your favourite animal:"
    />
  ))
  .addCodeExampleStory('Radio group with default value', () => (
    <RadioGroup
      items={sampleItemsWithDefault}
      label="Pick your favourite animal:"
      isRequired
    />
  ), { imports: smartImports })
  .add('Radio group with many items and default', () => (
    <RadioGroup
      items={longSampleWithDefault}
      label="Who is your favourite Simpsons character?"
    />
));
