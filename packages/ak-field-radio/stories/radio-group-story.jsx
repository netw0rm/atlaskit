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

storiesOf(name, module)
  .add('Simple radio group (dumb)', () => (
    <AkRadioGroup
      items={sampleItems}
      label="Pick your favourite animal:"
      onRadioChange={e => (console.log(`Radio item for "${e.target.value}" was selected`))}
    />
  ))
  .add('Simple radio group (dumb) with selection', () => (
    <AkRadioGroup
      items={sampleItemsWithSelection}
      label="Pick your favourite animal:"
      onRadioChange={e => (console.log(`Radio item for "${e.target.value}" was selected`))}
    />
  ))
  .add('Simple radio group', () => (
    <RadioGroup
      items={sampleItems}
      label="Pick your favourite animal:"
    />
  ))
  .add('Simple radio group with submit test', () => radioGroupSubmitStory(
    <RadioGroup
      items={sampleItems}
      label="Pick your favourite animal:"
    />
  ))
  .add('Radio group with default value', () => (
    <RadioGroup
      items={sampleItemsWithDefault}
      label="Pick your favourite animal:"
    />
  ))
  .add('Radio group with many items and default', () => (
    <RadioGroup
      items={longSampleWithDefault}
      label="Who is your favourite Simpsons character?"
    />
  ));
