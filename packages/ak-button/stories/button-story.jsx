import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import React from 'react';
import CalendarIcon from 'ak-icon/glyph/confluence/calendar';
import PageIcon from 'ak-icon/glyph/confluence/page';
import QuestionIcon from 'ak-icon/glyph/question';
import ExpandIcon from 'ak-icon/glyph/expand';
import UnlinkIcon from 'ak-icon/glyph/editor/unlink';
import OpenIcon from 'ak-icon/glyph/editor/open';
import { akColorN20, akColorN700 } from 'akutil-shared-styles';
import { name } from '../package.json';

import AkButton from '../src';
import ButtonBuilderExample from './button-builder-example';

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

/* eslint-disable react/prop-types */
const buildBackgroundStory = () => {
  const createSample = ({ backgroundColor, extraProps = { onClick: action('clicking the WebComponent') } }) => (
    <div style={{ 'margin-bottom': '30px' }}>
      <style>{'.buttonContainer > * { margin: 5px }'}</style>
      <div className="sample" style={{ 'background-color': backgroundColor }}>
        <div className="buttonContainer">
          <AkButton {...extraProps}>
            Default
          </AkButton>
          <AkButton {...extraProps} appearance="primary">
            Primary
          </AkButton>
          <AkButton {...extraProps} appearance="link">
            Link
          </AkButton>
          <AkButton {...extraProps} appearance="subtle" >
            Subtle
          </AkButton>
          <AkButton {...extraProps} selected>
            Selected
          </AkButton>
        </div>
        <span> Normal States </span>
      </div>
      <div className="sample" style={{ 'background-color': backgroundColor }}>
        <div className="buttonContainer">
          <AkButton {...extraProps} iconAfter={<Question />}>
            Default
          </AkButton>
          <AkButton {...extraProps} appearance="primary" iconAfter={<Calendar />}>
            Primary
          </AkButton>
          <AkButton {...extraProps} appearance="link" iconAfter={<Page />}>
            Link
          </AkButton>
          <AkButton {...extraProps} appearance="subtle" iconAfter={<Expand />}>
            Subtle
          </AkButton>
          <AkButton {...extraProps} selected iconAfter={<Open />}>
            Selected
          </AkButton>
        </div>
        <span> Normal States + icons</span>
      </div>
      <div className="sample" style={{ 'background-color': backgroundColor }}>
        <div className="buttonContainer">
          <AkButton {...extraProps} disabled>
            Default Disabled
          </AkButton>
          <AkButton {...extraProps} appearance="primary" disabled>
            Primary Disabled
          </AkButton>
          <AkButton {...extraProps} appearance="link" disabled>
            Link Disabled
          </AkButton>
        </div>
        <span> Disabled variations </span>
      </div>
      <div className="sample" style={{ 'background-color': backgroundColor }}>
        <div className="buttonContainer">
          <AkButton {...extraProps} disabled iconAfter={<Page />}>
            Default Disabled
          </AkButton>
          <AkButton {...extraProps} appearance="primary" disabled iconAfter={<Question />}>
            Primary Disabled
          </AkButton>
          <AkButton {...extraProps} appearance="link" disabled iconAfter={<Calendar />}>
            Link Disabled
          </AkButton>
        </div>
        <span> Disabled variations + icons</span>
      </div>
      <div className="sample" style={{ 'background-color': backgroundColor }}>
        <div className="buttonContainer">
          <AkButton {...extraProps} spacing="none">
            <Unlink />
          </AkButton>
          <AkButton {...extraProps} spacing="none" selected>
            <Unlink />
          </AkButton>
          <AkButton {...extraProps} spacing="none" appearance="primary">
            <Unlink />
          </AkButton>
          <AkButton {...extraProps} spacing="none" disabled>
            <Unlink />
          </AkButton>
          <AkButton {...extraProps} appearance="subtle" spacing="none">
            <Unlink />
          </AkButton>
          <AkButton {...extraProps} spacing="none">
            <Open />
          </AkButton>
          <AkButton {...extraProps} spacing="none" selected>
            <Open />
          </AkButton>
          <AkButton {...extraProps} spacing="none" appearance="primary">
            <Open />
          </AkButton>
          <AkButton {...extraProps} spacing="none" disabled>
            <Open />
          </AkButton>
          <AkButton {...extraProps} appearance="subtle" spacing="none">
            <Open />
          </AkButton>
        </div>
        <span> No spacing buttons with only icons </span>
      </div>
    </div>
  );

  return (
    <div>
      <style>{css}</style>
      <div className="container" style={{ width: '100%' }}>
        {
          createSample({
            backgroundColor: 'white',
          })
        }
        {
          createSample({
            backgroundColor: akColorN20,
          })
        }
        {
          createSample({
            backgroundColor: akColorN700,
            extraProps: { theme: 'dark', onClick: action('clicking the WebComponent') },
          })
        }
      </div>
    </div>
  );
};

const buildStory = props => (
  () => (
    <div>
      <style>{css}</style>
      <style>{'.sample { background-color: white }'}</style>
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
          <AkButton {...props} iconBefore={<Page label="page icon" />}>
            Comment
          </AkButton>
          <span>button + text with page icon</span>
        </div>

        <div className="sample">
          <span>
            text
            <AkButton {...props} iconBefore={<Question label="question icon">Question</Question>}>
              Info
            </AkButton>
            text
          </span>
          <span>button + text with question icon + text alignment check</span>
        </div>

        <div className="sample">
          <span>
            text
            <AkButton {...props} selected iconAfter={<Calendar label="calendar icon" />}>
              Pick Date
            </AkButton>
            text
          </span>
          <span>button + text with calendar icon + text alignment check + selected</span>
        </div>

        <div className="sample">
          <AkButton {...props} iconAfter={<Expand label="expand icon" />}>
            Show Options
          </AkButton>
          <span>button + text with expand icon</span>
        </div>

        <div className="sample">
          <AkButton
            {...props}
            href="http://www.atlassian.com"
            iconBefore={<Page label="page icon" />}
          />
          <span>button with Page icon + href</span>
        </div>

        <div className="sample">
          <AkButton
            {...props}
            href="http://www.atlassian.com"
            target="_blank"
            iconBefore={<Expand label="expand icon" />}
          />
          <span>button with icons + href + target</span>
        </div>

        <div className="sample">
          <span>
            text
            <AkButton {...props} iconBefore={<Calendar label="calendar icon" />} />
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
          <div className="ButtonContainer">
            <style>{'.ButtonContainer > a, .ButtonContainer > button, .sample > a, .sample > button { margin-right: 5px }'}</style>
            <AkButton {...props} spacing="none">
              <Unlink>unlink</Unlink>
            </AkButton>
            <AkButton {...props} spacing="none" selected>
              <Unlink>unlink selected</Unlink>
            </AkButton>
            <AkButton {...props} spacing="none">
              <Open>open</Open>
            </AkButton>
            <AkButton {...props} spacing="none" selected>
              <Open>open selected</Open>
            </AkButton>
          </div>
          <span>button with icons, no spacing & selected</span>
        </div>

        <div className="sample">
          <AkButton {...props} spacing="compact">
            Create Issue
          </AkButton>
          <span>compact</span>
        </div>

        <div className="sample">
          <AkButton {...props} onClick={action('clicking the WebComponent')} spacing="compact" disabled>
            Disabled Option
          </AkButton>
          <span>compact + disabled</span>
        </div>

        <div className="sample">
          <AkButton {...props} spacing="compact" selected>
            Selected Option
          </AkButton>
          <span>compact + selected</span>
        </div>

      </div>
    </div>
  )
);

storiesOf(name, module)
    .add('standard ak-button states', buildStory({ appearance: 'default' }))
    .add('primary ak-button states', buildStory({ appearance: 'primary' }))
    .add('subtle ak-button states', buildStory({ appearance: 'subtle' }))
    .add('link ak-button states', buildStory({ appearance: 'link' }))
    .add('different backgrounds', buildBackgroundStory)
    .add('button builder example', () =>
      <ButtonBuilderExample icons={[() => null].concat([Page, Question, Calendar, Expand])} />
    );
