import { action } from '@kadira/storybook';
import reactify from 'akutil-react';
import React from 'react';
import CalendarIcon from 'ak-icon/glyph/confluence/calendar';
import PageIcon from 'ak-icon/glyph/confluence/page';
import QuestionIcon from 'ak-icon/glyph/question';
import ExpandIcon from 'ak-icon/glyph/expand';

import AkButtonTemplate, { APPEARANCE } from '../src';
import ButtonBuilderExample from './button-builder-example';

const AkButton = reactify(AkButtonTemplate);

const Calendar = reactify(CalendarIcon);
const Question = reactify(QuestionIcon);
const Page = reactify(PageIcon);
const Expand = reactify(ExpandIcon);

const buildStory = (props, Wrapper) => (
  () => (
    <Wrapper>
      <div className="sample">
        <AkButton {...props}>
          Button
        </AkButton>
        <span>no extra attrs</span>
      </div>

      <div className="sample">
        <AkButton {...props} href="http://www.atlassian.com">
          Button
        </AkButton>
        <span>with href attribute</span>
      </div>

      <div className="sample">
        <AkButton {...props} href="http://www.atlassian.com">
          Button
        </AkButton>
        <span>with href attribute + target blank</span>
      </div>

      <div className="sample">
        <span>
          text
          <AkButton {...props} onClick={action('clicking the WebComponent')}>
            Button
          </AkButton>
          text
        </span>
        <span>click event + text alignment check</span>
      </div>

      <div className="sample">
        <AkButton {...props} disabled onClick={action('clicking the WebComponent')}>
          Button
        </AkButton>
        <span>disabled</span>
      </div>

      <div className="sample">
        <AkButton
          {...props}
          disabled
          onClick={action('clicking the WebComponent')}
          href="http://www.atlassian.com"
          target="_blank"
        >
          Button
        </AkButton>
        <span>disabled + href + target</span>
      </div>

      <div className="sample">
        <AkButton {...props} selected>
          Button
        </AkButton>
        <span>selected</span>
      </div>

      <div className="sample">
        <AkButton {...props}>
          <Page slot="before" />
          Button
        </AkButton>
        <span>button + text with page icon</span>
      </div>

      <div className="sample">
        <AkButton {...props}>
          Button
          <Expand slot="after" />
        </AkButton>
        <span>button + text with expand icon</span>
      </div>

      <div className="sample">
        <AkButton {...props} href="http://www.atlassian.com">
          <Page />
        </AkButton>
        <span>button with Page icon + href</span>
      </div>

      <div className="sample">
        <AkButton {...props} href="http://www.atlassian.com" target="_blank">
          <Expand />
        </AkButton>
        <span>button with icons + href + target</span>
      </div>

      <div className="sample">
        <AkButton {...props}>
          <Calendar />
        </AkButton>
        <span>button with Calendar icon</span>
      </div>

      <div className="sample">
        <AkButton {...props}>
          <Question />
        </AkButton>
        <span>button with Question icon</span>
      </div>

      <div className="sample">
        <AkButton {...props} compact>
          Button
        </AkButton>
        <span>compact</span>
      </div>

      <div className="sample">
        <AkButton {...props} onClick={action('clicking the WebComponent')} compact disabled>
          Button
        </AkButton>
        <span>compact + disabled</span>
      </div>

      <div className="sample">
        <AkButton {...props} compact selected>
          Button
        </AkButton>
        <span>compact + selected</span>
      </div>

    </Wrapper>
  )
);

export default function addStories(storiesBuilder, Wrapper) {
  storiesBuilder
    .add('standard ak-button', buildStory({ appearance: APPEARANCE.STANDARD }, Wrapper))
    .add('primary ak-button', buildStory({ appearance: APPEARANCE.PRIMARY }, Wrapper))
    .add('subtle ak-button', buildStory({ appearance: APPEARANCE.SUBTLE }, Wrapper))
    .add('link ak-button', buildStory({ appearance: APPEARANCE.LINK }, Wrapper))
    .add('button builder example', () => (
      <Wrapper>
        <ButtonBuilderExample icons={[() => null].concat([Page, Question, Calendar, Expand])} />
      </Wrapper>
    ));
}
