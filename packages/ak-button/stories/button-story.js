import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import React from 'react';
import CalendarIcon from 'ak-icon/glyph/confluence/calendar';
import PageIcon from 'ak-icon/glyph/confluence/page';
import QuestionIcon from 'ak-icon/glyph/question';
import ExpandIcon from 'ak-icon/glyph/expand';
import UnlinkIcon from 'ak-icon/glyph/editor/unlink';
import OpenIcon from 'ak-icon/glyph/editor/open';
import { name } from '../package.json';

import AkButtonTemplate, { APPEARANCE, SPACING } from '../src';
import ButtonBuilderExample from './button-builder-example';

const AkButton = reactify(AkButtonTemplate);

const Calendar = reactify(CalendarIcon);
const Question = reactify(QuestionIcon);
const Page = reactify(PageIcon);
const Expand = reactify(ExpandIcon);
const Unlink = reactify(UnlinkIcon);
const Open = reactify(OpenIcon);

const css = `
  .container {
    display: flex;
    flex-direction: column;
    width: 70%;
  }
  .sample {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid;
    padding-bottom: 10px;
    padding-top: 10px;
  }
`;

const buildStory = props => (
  () => (
    <div>
      <style>{css}</style>
      <div className="container">
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
            <Page slot="before" label="page icon" />
            Comment
          </AkButton>
          <span>button + text with page icon</span>
        </div>

        <div className="sample">
          <span>
            text
            <AkButton {...props}>
              <Question slot="before" label="question icon">Question</Question>
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
              <Calendar slot="after" label="calendar icon" />
              Pick Date
            </AkButton>
            text
          </span>
          <span>button + text with calendar icon + text alignment check + selected</span>
        </div>

        <div className="sample">
          <AkButton {...props}>
            Show Options
            <Expand slot="after" label="expand icon" />
          </AkButton>
          <span>button + text with expand icon</span>
        </div>

        <div className="sample">
          <AkButton {...props} href="http://www.atlassian.com">
            <Page label="page icon" />
          </AkButton>
          <span>button with Page icon + href</span>
        </div>

        <div className="sample">
          <AkButton {...props} href="http://www.atlassian.com" target="_blank">
            <Expand label="expand icon" />
          </AkButton>
          <span>button with icons + href + target</span>
        </div>

        <div className="sample">
          <span>
            text
            <AkButton {...props}>
              <Calendar label="calendar icon" />
            </AkButton>
            text
          </span>
          <span>button with Calendar icon + text alignment check</span>
        </div>

        <div className="sample">
          <AkButton {...props} selected>
            <Question label="question icon">Question</Question>
          </AkButton>
          <span>button with Question icon + selected</span>
        </div>

        <div className="sample">
          <div>
            <style>{'ak-button { margin-right: 5px }'}</style>
            <AkButton {...props} spacing={SPACING.NONE}>
              <Unlink>unlink</Unlink>
            </AkButton>
            <AkButton {...props} spacing={SPACING.NONE} selected>
              <Unlink>unlink selected</Unlink>
            </AkButton>
            <AkButton {...props} spacing={SPACING.NONE}>
              <Open>open</Open>
            </AkButton>
            <AkButton {...props} spacing={SPACING.NONE} selected>
              <Open>open selected</Open>
            </AkButton>
          </div>
          <span>button with icons, no spacing & selected</span>
        </div>

        <div className="sample">
          <AkButton {...props} spacing={SPACING.COMPACT}>
            Create Issue
          </AkButton>
          <span>compact</span>
        </div>

        <div className="sample">
          <AkButton {...props} onClick={action('clicking the WebComponent')} spacing={SPACING.COMPACT} disabled>
            Disabled Option
          </AkButton>
          <span>compact + disabled</span>
        </div>

        <div className="sample">
          <AkButton {...props} spacing={SPACING.COMPACT} selected>
            Selected Option
          </AkButton>
          <span>compact + selected</span>
        </div>

      </div>
    </div>
  )
);

storiesOf(name, module)
    .add('standard ak-button states', buildStory({ appearance: APPEARANCE.STANDARD }))
    .add('primary ak-button states', buildStory({ appearance: APPEARANCE.PRIMARY }))
    .add('subtle ak-button states', buildStory({ appearance: APPEARANCE.SUBTLE }))
    .add('link ak-button states', buildStory({ appearance: APPEARANCE.LINK }))
    .add('button builder example', () =>
      <ButtonBuilderExample icons={[() => null].concat([Page, Question, Calendar, Expand])} />
    );
