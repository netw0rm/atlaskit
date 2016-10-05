import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkButtonTemplate, { APPEARANCE } from '../src/index';
import React from 'react';
import buttonStatesExample from './AkButtonStates';
import { name } from '../package.json';
import IconTemplate from 'ak-icon';

const AkButton = reactify(AkButtonTemplate);

const Icon = reactify(IconTemplate);

const GLYPHS = [
  'calendar',
  'question',
  'person',
  'page',
  'expand',
];

const AkButtonStates = buttonStatesExample({
  React,
  AkButton,
  APPEARANCE,
  Icon,
  GLYPHS: [false].concat(GLYPHS),
});

const buttonStyles = { 'margin-right': '10px', display: 'inline-flex' };

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
    <div>
      <p>
        some text
        <AkButton onClick={action('clicking the WebComponent')}>
          Button
        </AkButton>
        more text
      </p>
    </div>
  ))
  .add('compact buttons with all attributes', () =>
    <div>
      <p>
        <AkButton compact style={buttonStyles}>
          Button
        </AkButton>
        <AkButton
          compact
          appearance="primary"
          style={buttonStyles}
        >
          Button
        </AkButton>
        <AkButton
          compact
          appearance="subtle"
          style={buttonStyles}
        >
          Button
        </AkButton>
        <AkButton compact selected style={buttonStyles}>
          Button
        </AkButton>
        <AkButton

          compact
          disabled
          onclick={action('clicking the WebComponent')}
          style={buttonStyles}
        >
          Button
        </AkButton>
      </p>
    </div>
  )
  .add('an ak-button with only icons', () => (
    <div>
      {
        GLYPHS.map(glyph =>
          (<AkButton style={buttonStyles}>
            <Icon key={glyph} glyph={glyph} />
          </AkButton>)
        )
      }
    </div>
  ))
  .add('an ak-button with icon + text', () =>
    (<div style={{ display: 'flex', flexDirection: 'column' }}>
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
    </div>)
  )
  .add('a button that can change its attributes', () =>
    <AkButtonStates />
  );
