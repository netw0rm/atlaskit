import { storiesOf } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import Readme, { Chrome, Code, Heading, Description, Props } from '../src';

import { name, description } from '../package.json';

storiesOf(name)
  .add('Overview', () => (
    <Readme component={Readme} description={description}>
      <Code
        code={`
          import Readme, { Code } from 'akutil-readme';

          export default (
            <Readme
              component="ComponentName"
              description="Short description of the component."
            >
              <Code>{'// Code example for your component'}</Code>
            </Readme>
          );
        `}
      >
        <Readme
          component="ComponentName"
          description="Short description of the component."
        >
          <Code>{'// Code example for your component'}</Code>
        </Readme>
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
        code={`
          import Readme from 'akuti-readme';

          export default (
            <Readme
              component="MyComponent"
              description="Short description."
            />
          );
        `}
      >
        <Readme
          component="MyComponent"
          description="Short description."
        />
      </Code>
      <Heading type="3">Passing a component class</Heading>
      <Description>You may also pass a component class instead of a string.</Description>
      <Code
        code={`
          class MyComponent extends PureComponent {
            static displayName = 'MyComponent'
          }

          export default (
            <Readme
              component={MyComponent}
              description="Short description."
            />
          );
        `}
      >
        {(() => {
          // eslint-disable-next-line react/prefer-stateless-function
          class MyComponent extends PureComponent {
            static displayName = 'MyComponent'
          }

          return (
            <Readme
              component={MyComponent}
              description="Short description."
            />
          );
        })()}
      </Code>
      <Props
        component={Readme}
        descriptions={{
          children: 'Any content you want displayed below the "Props" section.',
          component: 'The component you are documenting. Can be a string or class.',
          description: 'A short description of the component. Generally this can be your package.json description.',
        }}
      />
    </Chrome>
  ))
  .add('Chrome', () => (
    <Chrome title="Chrome">
      <Description>Displays and syntax highlights the string you pass as children.</Description>
      <Code>{`
        import { Chrome } from 'akutil-readme';

        export default (
          <Chrome title="My Title">Content in the chromed area.</Chrome>
        );  
      `}</Code>
      <Props component={Chrome} />
    </Chrome>
  ))
  .add('Code', () => (
    <Chrome title="Code">
      <Description>Displays and syntax highlights the string you pass as children.</Description>
      <Code>{`
        import { Code } from 'akutil-readme';

        export default (
          <Code>{'// A basic single-line example'}</Code>
        );  
      `}</Code>

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
      <Code>{`
        import { Description } from 'akutil-readme';

        export default (
          <div>
            <Description>Single line</Description>
            <Description>{['multiple lines', 'of content']}</Description>
          </div>
        )'  
      `}</Code>
      <Props component={Description} />
    </Chrome>
  ))
  .add('Heading', () => (
    <Chrome title="Heading">
      <Description>Displays a heading of a given type. Defaults to H1.</Description>
      <Code>{`
        import { Heading } from 'akutil-readme';

        export default (
          <Heading>My heading</Heading>
        );  
      `}</Code>

      <Heading type="2">Changing the type</Heading>
      <Code>{'<Heading type="2">My second heading</Heading>'}</Code>

      <Props component={Heading} />
    </Chrome>
  ))
  .add('Props', () => (
    <Chrome title="Props">
      <Description>
        Auto-generates a table or available props and associated information for a givencomponent.
      </Description>
      <Code>{`
        import { Props } from 'akutil-readme';

        class MyComponent extends PureComponent {
          static propTypes = {
            prop1: PropTypes.string,
            prop2: PropTypes.number,
          }
        }

        export deafult (
          <Props component={MyComponent} />
        );  
      `}</Code>
      <Props component={Props} />
    </Chrome>
  ));
