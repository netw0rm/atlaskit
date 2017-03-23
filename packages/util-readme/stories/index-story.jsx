import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Chrome, Code, Heading, Description, Props } from '../src';

import { name, description } from '../package.json';

import OverviewExample from './examples/overview'; // eslint-disable-line
import ReadmeExample1 from './examples/readme1'; // eslint-disable-line
import ReadmeExample2 from './examples/readme2'; // eslint-disable-line
import ChromeExample from './examples/chrome'; // eslint-disable-line
import CodeExample from './examples/code'; // eslint-disable-line
import DescriptionExample1 from './examples/description1'; // eslint-disable-line
import DescriptionExample2 from './examples/description2'; // eslint-disable-line
import HeadingExample1 from './examples/heading1'; // eslint-disable-line
import HeadingExample2 from './examples/heading2'; // eslint-disable-line
import PropsExample from './examples/props'; // eslint-disable-line

/* eslint-disable import/first, import/no-duplicates */
import OverviewExampleRaw from '!raw!./examples/overview';
import ReadmeExampleRaw1 from '!raw!./examples/readme1';
import ReadmeExampleRaw2 from '!raw!./examples/readme2';
import ChromeExampleRaw from '!raw!./examples/chrome';
import CodeExampleRaw from '!raw!./examples/code';
import DescriptionExampleRaw1 from '!raw!./examples/description1';
import DescriptionExampleRaw2 from '!raw!./examples/description2';
import HeadingExampleRaw1 from '!raw!./examples/heading1';
import HeadingExampleRaw2 from '!raw!./examples/heading2';
import PropsExampleRaw from '!raw!./examples/props';
/* eslint-enable import/first, import/no-duplicates */

storiesOf(name)
  .add('Overview', () => (
    <Readme component={name} description={description}>
      <Code
        code={OverviewExampleRaw}
      >
        {OverviewExample}
      </Code>
    </Readme>
  ))
  .add('Readme', () => (
    <Chrome title="Readme">
      <Description>
        The readme component is responsible for displaying the main documentation for the
        component. It is responsible for displaying how you install, import and use the main export
        of the component in its most basic form to give the consumer a general overview if its API.
      </Description>
      <Code
        code={ReadmeExampleRaw1}
      >
        {ReadmeExample1}
      </Code>
      <Heading type="3">Passing a component class</Heading>
      <Description>You may also pass a component class instead of a string.</Description>
      <Code
        code={ReadmeExampleRaw2}
      >
        {ReadmeExample2}
      </Code>
      <Props
        component={Readme}
        descriptions={{
          children: 'Any content you want displayed below the "Props" section.',
          component: 'The component you are documenting. Can be a string or class.',
          description: 'A short description of the component. Generally this can be your package.json description.',
        }}
        types={{
          component: 'oneOfType([string, func])',
          description: 'string',
        }}
      />
    </Chrome>
  ))
  .add('Chrome', () => (
    <Chrome title="Chrome">
      <Description>Displays a title and content inside of a padded wrapper.</Description>
      <Code code={ChromeExampleRaw}>{ChromeExample}</Code>
      <Props component={Chrome} />
    </Chrome>
  ))
  .add('Code', () => (
    <Chrome title="Code">
      <Description>Displays and syntax highlights the string you pass as children.</Description>
      <Code
        code={CodeExampleRaw}
      >{CodeExample}</Code>

      <Heading type="3">Displaying an example</Heading>
      <Description>
        It also allows you to pass a code prop and then specify an example as children.
      </Description>
      <Code>{'<Code code="<MyComponent />"><MyComponent /></Code>'}</Code>

      <Heading type="3">Changing the language</Heading>
      <Description>And if you need to, you can specify a language:</Description>
      <Code>{'<Code code="<MyComponent />" language="javascript"><MyComponent /></Code>'}</Code>

      <Props component={Code} />
    </Chrome>
  ))
  .add('Description', () => (
    <Chrome title="Description">
      <Description>Displays pharagraphs of content.</Description>
      <Code code={DescriptionExampleRaw1}>{DescriptionExample1}</Code>
      <Code code={DescriptionExampleRaw2}>{DescriptionExample2}</Code>
      <Props component={Description} />
    </Chrome>
  ))
  .add('Heading', () => (
    <Chrome title="Heading">
      <Description>Displays a heading of a given type. Defaults to H1.</Description>
      <Code code={HeadingExampleRaw1}>{HeadingExample1}</Code>

      <Heading type="2">Changing the type</Heading>
      <Code code={HeadingExampleRaw2}>{HeadingExample2}</Code>

      <Props component={Heading} />
    </Chrome>
  ))
  .add('Props', () => (
    <Chrome title="Props">
      <Description>
        Auto-generates a table or available props and associated information for a givencomponent.
      </Description>
      <Code code={PropsExampleRaw}>{PropsExample}</Code>
      <Props component={Props} />
    </Chrome>
  ));
