import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MultiStep, Step } from '../../../src/common/components/multi-step';

storiesOf('common/MultiStep')
  .add('basic', () =>
    <MultiStep onComplete={action('complete')}>

      <Step
        render={(nextStep) =>
          <div>
            <p>Step 1</p>
            <button onClick={() => nextStep()}>next</button>
          </div>
      }
      />

      <Step
        render={(nextStep) =>
          <div>
            <p>Step 2</p>
            <button onClick={() => nextStep()}>next</button>
          </div>
      }
      />

      <Step
        render={(nextStep) =>
          <div>
            <p>Step 3</p>
            <button onClick={() => nextStep()}>next</button>
          </div>
      }
      />

    </MultiStep>)
  .add('more complex', () =>
    <MultiStep start={0} onComplete={action('complete')}>

      <Step
        render={(nextStep, cancel) =>
          <div>
            <p>Step 1</p>
            <button onClick={() => nextStep(2)}>skip</button>
            <button onClick={() => nextStep()}>next</button>
            <button onClick={() => cancel()}>cancel</button>
          </div>
      }
      />

      <Step
        render={(nextStep, cancel) =>
          <div>
            <p>Step 2</p>
            <button onClick={() => nextStep(-1)}>back</button>
            <button onClick={() => nextStep()}>next</button>
            <button onClick={() => cancel()}>cancel</button>
          </div>
      }
      />

      <Step
        render={(nextStep, cancel) =>
          <div>
            <p>Step 3</p>
            <button onClick={() => nextStep(-1)}>back</button>
            <button onClick={() => nextStep()}>next</button>
            <button onClick={() => cancel()}>cancel</button>
            <button onClick={() => nextStep(-2)}>start over</button>
          </div>
      }
      />

    </MultiStep>);
