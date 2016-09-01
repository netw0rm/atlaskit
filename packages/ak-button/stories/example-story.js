import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkButtonTemplate, { APPEARANCE } from '../src/index';
const { React, ReactDOM } = window;
import buttonStatesExample from './AkButtonStates';
import { name } from '../package.json';
import IconTemplate from 'ak-icon';

const AkButton = reactify(AkButtonTemplate, {
  React,
  ReactDOM,
});

const Icon = reactify(IconTemplate, {
  React,
  ReactDOM,
});

const GLYPHS = [
  'calendar',
  'create',
  'question',
  'person',
  'page',
];

const AkButtonStates = buttonStatesExample({
  React,
  AkButton,
  APPEARANCE,
  Icon,
  GLYPHS: [false].concat(GLYPHS),
});

storiesOf(name, module)
  .add('a standard ak-button', () => (
    <AkButton>
      Button
    </AkButton>
  ))
  .add('a primary ak-button', () => (
    <AkButton appearance={APPEARANCE.PRIMARY}>Primary Button</AkButton>
  ))
  .add('a disabled ak-button', () =>
    <AkButton disabled onclick={action('clicking the WebComponent')}>
      Button
    </AkButton>
  )
  .add('a subtle ak-button', () =>
    <AkButton appearance={APPEARANCE.SUBTLE} >
      Button
    </AkButton>
  )
  .add('a selected button', () =>
    <AkButton selected>
      Button
    </AkButton>
  )
  .add('a link button', () =>
    <AkButton appearance={APPEARANCE.LINK}>
      Button
    </AkButton>
  )
  .add('an ak-button that emits an action when it is clicked', () => (
    <AkButton id="myComponent" onClick={action('clicking the WebComponent')}>Button</AkButton>
  ))
  .add('compact buttons with all attributes', () =>
    <div>
      <style>{"ak-button {margin-left: 10px;}"}</style>
      <AkButton compact>
        Button
      </AkButton>
      <AkButton compact appearance="primary">
        Button
      </AkButton>
      <AkButton compact appearance="subtle">
        Button
      </AkButton>
      <AkButton compact selected>
        Button
      </AkButton>
      <AkButton compact disabled onclick={action('clicking the WebComponent')}>
        Button
      </AkButton>
    </div>
  )
  .add('an ak-button that emits an action when it is clicked', () => (
    <AkButton id="myComponent" onClick={action('clicking the WebComponent')}>Button</AkButton>
  ))
  .add('an ak-button with icons', () => {
    const buttonStyles = { 'margin-right': '10px', display: 'inline-flex' };
    return (<div style={{ display: 'flex', flexDirection: 'column' }}>
      {
        GLYPHS.map(glyph =>
          (<div className="icons-container">
              {<h1>{glyph}</h1>}
              {[APPEARANCE.STANDARD, APPEARANCE.PRIMARY, APPEARANCE.SUBTLE]
                .map(appearance => (
                  <AkButton
                    style={buttonStyles}
                    onclick={action('clicking the WebComponent')}
                    appearance={appearance}
                  >
                    <Icon slot="before" key={glyph} glyph={glyph} />
                      Button
                  </AkButton>
                  )
                )
                .concat([
                  <AkButton style={buttonStyles} selected>
                    <Icon slot="before" key={glyph} glyph={glyph} />
                    Button
                  </AkButton>,
                  <AkButton style={buttonStyles} disabled>
                    <Icon slot="before" key={glyph} glyph={glyph} />
                      Button
                  </AkButton>,
                ])
              }
          </div>)
        )
    }
    </div>);
  })
  .add('a button that can change its attributes', () =>
    <AkButtonStates />
  );
