import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from 'akutil-readme';

import { name } from '../package.json';
import Spinner from '../src';

const description = [`Spinners are used for showing a system process of unknown length going on
    that ends with the system displaying results to the user.`,
  `The spinner will display a loading in animation and then continue spinning until the
    \`isCompleting\` prop is set on it.`,
  `If this prop is set to true the spinner will begin playing the outro animation (approximately
    300ms).`,
  `You can be notified once the animation is complete by hooking into the \`onComplete\` callback
    like so.`,
  'See the rest of the examples in this storybook for a more in depth usages.',
];
const propDescriptions = {
  isCompleting: 'a flag to signal that a loader should start playing it&#39;s fade out animation',
  onComplete: 'a callback function called after the fade out animation has finished',
  size: 'a number indicating the width of the spinner, or one of "small" (20px), "medium" (32px), or "large" (45px).',
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
  ));
