import { action } from '@kadira/storybook';
import reactify from 'akutil-react';
import React from 'react';
import CalendarIcon from 'ak-icon/glyph/confluence/calendar';
import PageIcon from 'ak-icon/glyph/confluence/page';
import QuestionIcon from 'ak-icon/glyph/question';
import ExpandIcon from 'ak-icon/glyph/expand';

import AkButtonTemplate, { APPEARANCE } from '../src';
import AkButtonStates from './AkButtonStates';
import { DefaultWrapper } from './button-story-wrappers';


const AkButton = reactify(AkButtonTemplate);

const DefaultWrapperReact = reactify(DefaultWrapper);

const ICONS = [
  reactify(CalendarIcon),
  reactify(QuestionIcon),
  reactify(PageIcon),
  reactify(ExpandIcon),
];

const buttonStyles = { 'margin-right': '10px', display: 'inline-flex' };

export default function addStories(storiesBuilder, Wrapper = DefaultWrapperReact) {
  storiesBuilder
    .add('a standard ak-button', () => (
      <Wrapper>
        <AkButton>
          Button
        </AkButton>
      </Wrapper>
    ))
    .add('a primary ak-button', () => (
      <Wrapper>
        <AkButton appearance={APPEARANCE.PRIMARY}>Primary Button</AkButton>
      </Wrapper>
    ))
    .add('a disabled ak-button', () =>
      <Wrapper>
        <AkButton disabled onclick={action('clicking the WebComponent')}>
          Button
        </AkButton>
      </Wrapper>
    )
    .add('a subtle ak-button', () =>
      <Wrapper>
        <AkButton appearance={APPEARANCE.SUBTLE} >
          Button
        </AkButton>
      </Wrapper>
    )
    .add('a selected button', () =>
      <Wrapper>
        <AkButton selected>
          Button
        </AkButton>
      </Wrapper>
    )
    .add('a link button (appearance)', () =>
      <Wrapper>
        <AkButton appearance={APPEARANCE.LINK}>
          Button
        </AkButton>
      </Wrapper>
    )
    .add('a button with href and target', () =>
      <Wrapper>
        <AkButton style={buttonStyles} href="http://www.atlassian.com" target="_blank">
          Button
        </AkButton>
      </Wrapper>
    )
    .add('a button with href', () => {
      const Icon = ICONS[0];
      const url = 'http://www.atlassian.com';
      return (<Wrapper>
        <AkButton style={buttonStyles} href={url}>
          Button
        </AkButton>
        <AkButton style={buttonStyles} disabled href={url}>
          Button
        </AkButton>
        <AkButton style={buttonStyles} appearance={APPEARANCE.LINK} href={url}>
          Button
        </AkButton>
        <AkButton style={buttonStyles} appearance={APPEARANCE.SUBTLE} href={url}>
          Button
        </AkButton>
        <AkButton style={buttonStyles} href={url}>
          <Icon slot="before" />
          Button
        </AkButton>
        <AkButton style={buttonStyles} href={url}>
          <Icon />
        </AkButton>
        <AkButton style={buttonStyles} disabled href={url}>
          <Icon slot="before" />
          Button
        </AkButton>
        <AkButton style={buttonStyles} disabled href={url}>
          <Icon />
        </AkButton>
        <AkButton style={buttonStyles} appearance={APPEARANCE.SUBTLE} href={url}>
          <Icon slot="before" />
          Button
        </AkButton>
      </Wrapper>);
    })
    .add('an ak-button that emits an action when it is clicked', () => (
      <Wrapper>
        <p>
          some text
          <AkButton onClick={action('clicking the WebComponent')}>
            Button
          </AkButton>
          more text
        </p>
      </Wrapper>
    ))
    .add('compact buttons with all attributes', () =>
      <Wrapper>
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
      </Wrapper>
    )
    .add('an ak-button with only icons', () => (
      <Wrapper>
        {
          ICONS.map(Icon =>
            (<AkButton style={buttonStyles}>
              <Icon />
            </AkButton>)
          )
        }
      </Wrapper>
    ))
    .add('an ak-button with icon + text', () => (
      <Wrapper>
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
      </Wrapper>
    ))
    .add('a button that can change its attributes', () => (
      <Wrapper>
        <AkButtonStates icons={[() => null].concat(ICONS)} />
      </Wrapper>
    ));
}
