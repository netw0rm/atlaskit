import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from 'akutil-readme';

import StatefulSpinner from './StatefulSpinner'; // eslint-disable-line import/no-duplicates
import { name } from '../package.json';
import Spinner from '../src';
import ButtonSpinner from './ButtonSpinner'; // eslint-disable-line import/no-duplicates

/* eslint-disable import/no-duplicates, import/first */
import statefulSpinnerRaw from '!raw!./StatefulSpinner';
import ButtonSpinnerRaw from '!raw!./ButtonSpinner';
/* eslint-enable import/no-duplicates, import/first */

const defaultImports = { imports: [['Spinner', 'ak-spinner']] };
const description = [`Spinners are used for showing a system process of unknown length going on
  that ends with the system displaying results to the user.`, `The spinner will display a loading in
   animation and then continue spinning until the \`isCompleting\` prop is set on it.`, `If this
   prop is set to true the spinner will begin playing the outro animation (approximately 300ms).`,
  `You can be notified once the animation is complete by hooking into the \`onComplete\` callback
   like so.`, 'See the rest of the examples in this storybook for a more in depth usages.'];
const propDescriptions = {
  isCompleting: 'a flag to signal that a loader should start playing it&#39;s fade out animation',
  onComplete: 'a callback function called after the fade out animation has finished',
};

storiesOf(name, module)
  .add('Readme', () => (
    <div>
      <Readme
        component={Spinner}
        description={description}
      >
        <Code
          code={`
            import Spinner from 'ak-spinner';
            // some flag that we will set once our long running task is complete
            let loadingFinishedFlag = false;

            function loadingFinished() {
              // show our loaded content, etc
            }

            // this would normally be in a component or an app
            ReactDOM.render(<Spinner
              isCompleting={loadingFinishedFlag}
              onComplete={loadingFinished}
            />);`
          }
        />
        <Props component={Spinner} descriptions={propDescriptions} />
      </Readme>
    </div>
  ))
  .addCodeExampleStory('A default spinner', () => (
    <Spinner />
  ), defaultImports)
  .addCodeExampleStory('Baseline alignment', () => (
    <div>
      <div>
        <h1>This &lt;h1&gt; element <Spinner /> is using h800</h1>
        <h2>This &lt;h2&gt; element <Spinner /> is using h700</h2>
        <h3>This &lt;h3&gt; element <Spinner /> is using h600</h3>
        <h4>This &lt;h4&gt; element <Spinner /> is using h500</h4>
        <h5>This &lt;h5&gt; element <Spinner /> is using h400</h5>
        <h6>This &lt;h6&gt; element <Spinner /> is using h300</h6>
      </div>
    </div>
  ), defaultImports)
  .addCodeExampleStory('Stateful spinner', () => (
    <div style={{ padding: '10px' }}>
      <StatefulSpinner />
    </div>
  ), { scripts: [statefulSpinnerRaw] })
  .addCodeExampleStory('Spinner in a button', () => (
    <div style={{ padding: '10px' }}>
      <ButtonSpinner />
    </div>
  ), { scripts: [ButtonSpinnerRaw] })
  ;
