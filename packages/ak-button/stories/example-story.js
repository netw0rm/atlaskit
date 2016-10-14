import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import React from 'react';
import CalendarIcon from 'ak-icon/glyph/confluence/calendar';
import PageIcon from 'ak-icon/glyph/confluence/page';
import QuestionIcon from 'ak-icon/glyph/question';
import ExpandIcon from 'ak-icon/glyph/expand';

import AkButtonTemplate, { APPEARANCE } from '../src';
import AkButtonStates from './AkButtonStates';
import { name } from '../package.json';


const AkButton = reactify(AkButtonTemplate);

const ICONS = [
  reactify(CalendarIcon),
  reactify(QuestionIcon),
  reactify(PageIcon),
  reactify(ExpandIcon),
];

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
        ICONS.map(Icon =>
          (<AkButton style={buttonStyles}>
            <Icon />
          </AkButton>)
        )
      }
    </div>
  ))
  .add('an ak-button with icon + text', () =>
    (<div style={{ display: 'flex', flexDirection: 'column' }}>
      {
        ICONS.map(Icon =>
          (<div className="icons-container">
            {[APPEARANCE.STANDARD, APPEARANCE.PRIMARY, APPEARANCE.SUBTLE]
                .map(appearance => (
                  <AkButton

                    style={buttonStyles}
                    onclick={action('clicking the WebComponent')}
                    appearance={appearance}
                    key={appearance}
                  >
                    <Icon slot="before" />
                      Button
                  </AkButton>
                  )
                )
                .concat([
                  (<AkButton style={buttonStyles} selected>
                    <Icon slot="before" />
                    Button
                  </AkButton>),
                  (<AkButton style={buttonStyles} disabled>
                    <Icon slot="before" />
                      Button
                  </AkButton>),
                ])
              }
          </div>)
        )
    }
    </div>)
  )
  .add('a button that can change its attributes', () => (
    <AkButtonStates icons={[() => null].concat(ICONS)} />
  ));
