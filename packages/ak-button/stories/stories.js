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
          Create Issue
        </AkButton>
        <span>no extra attrs</span>
      </div>

      <div className="sample">
        <AkButton {...props} href="http://www.atlassian.com">
          Create Issue
        </AkButton>
        <span>with href attribute</span>
      </div>

      <div className="sample">
        <AkButton {...props} href="http://www.atlassian.com">
          Create Issue
        </AkButton>
        <span>with href attribute + target blank</span>
      </div>

      <div className="sample">
        <span>
          text
          <AkButton {...props} onClick={action('clicking the WebComponent')}>
            Create Issue
          </AkButton>
          text
        </span>
        <span>click event + text alignment check</span>
      </div>

      <div className="sample">
        <AkButton {...props} disabled onClick={action('clicking the WebComponent')}>
          Disabled Option
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
          Go to Site
        </AkButton>
        <span>disabled + href + target</span>
      </div>

      <div className="sample">
        <AkButton {...props} selected>
          Selected
        </AkButton>
        <span>selected</span>
      </div>

      <div className="sample">
        <AkButton {...props}>
          <Page slot="before" />
          Comment
        </AkButton>
        <span>button + text with page icon</span>
      </div>

      <div className="sample">
        <span>
          text
          <AkButton {...props}>
            <Question slot="before" />
            Info
          </AkButton>
          text
        </span>
        <span>button + text with question icon + text alignment check</span>
      </div>

      <div className="sample">
        <span>
          text
          <AkButton {...props} selected>
            <Calendar slot="after" />
            Pick Date
          </AkButton>
          text
        </span>
        <span>button + text with calendar icon + text alignment check + selected</span>
      </div>

      <div className="sample">
        <AkButton {...props}>
          Show Options
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
        <span>
          text
          <AkButton {...props}>
            <Calendar />
          </AkButton>
          text
        </span>
        <span>button with Calendar icon + text alignment check</span>
      </div>

      <div className="sample">
        <AkButton {...props} selected>
          <Question />
        </AkButton>
        <span>button with Question icon + selected</span>
      </div>

      <div className="sample">
        <AkButton {...props} compact>
          Create Issue
        </AkButton>
        <span>compact</span>
      </div>

      <div className="sample">
        <AkButton {...props} onClick={action('clicking the WebComponent')} compact disabled>
          Disabled Option
        </AkButton>
        <span>compact + disabled</span>
      </div>

      <div className="sample">
        <AkButton {...props} compact selected>
          Selected Option
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
