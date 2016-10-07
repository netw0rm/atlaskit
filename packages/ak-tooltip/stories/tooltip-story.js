import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import TooltipWC from '../src/index';
import TooltipTriggerWC from '../src/index.tooltip-trigger';
import ContainerWC from './skate/container';
import FourDirectionTooltipTrigger from './four-direction-tooltip-trigger';
import React from 'react';
import { name } from '../package.json';
import styles from '../src/shadow.less';

const Tooltip = reactify(TooltipWC);

const TooltipTrigger = reactify(TooltipTriggerWC);

const Container = reactify(ContainerWC);

const tooltipClass = styles.locals.akTooltip;

const DefaultTooltip = (props) => <Tooltip className={tooltipClass} {...props} />;

const buttonStyles = {
  backgroundColor: 'orange',
  padding: '5px',
};

const containerStyle = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
};

storiesOf(name, module)
  .add('a simple ak-tooltip with ak-tooltip-trigger', () => (
    <div>
      <div style={containerStyle}>
        <TooltipTrigger position="top" description="This is a tooltip">
          <span style={buttonStyles} aria-describedby="ak-tooltip">Hover over me</span>
        </TooltipTrigger>

      </div>

      <DefaultTooltip id="ak-tooltip" />
    </div>
  ))
  .add('a tooltip with a really long description', () => (
    <div>
      <div style={containerStyle}>
        <TooltipTrigger
          position="top"
          description={`This message is very long and spans multiple lines because it has a lot of
            important information for the user. It might be a stacktrace, maybe longwinded
            explanation about how stock derivatives work, or maybe just a haiku. In either case,
            tooltips should reach their max width and then start wrapping text.`}
        >
          <span style={buttonStyles} aria-describedby="ak-tooltip">Hover over me</span>
        </TooltipTrigger>
      </div>

      <DefaultTooltip id="ak-tooltip" />
    </div>
  ))
  .add('a tooltip with all directions', () => (
    <div>
      <div style={containerStyle}>
        <FourDirectionTooltipTrigger description="Tooltip!" />
      </div>

      <DefaultTooltip id="ak-tooltip" />
    </div>
  ))
  .add('a tooltip binding to elements in shadowDOM', () => (
    <div>
      <div>
        We can bind tooltips to items in the shadowDOM easily as we don't rely on looking
        elements up by ID.
        <br />
        (This funcitonality broke in Chrome 53 and will be investigated)
      </div>
      <div style={containerStyle}>
        <Container />
      </div>

      <DefaultTooltip id="ak-tooltip" />
    </div>
  ))
  .add('a tooltip in a scrollable parent', () => {
    const simpleButtonStyles = {
      backgroundColor: 'orange',
      padding: '5px',
      position: 'relative',
      top: '100px',
      left: '100px',
    };
    const scrollableStyles = {
      border: '1px solid',
      height: '300px',
      width: '300px',
      'overflow-y': 'scroll',
    };
    const bottomInfoText = {
      position: 'relative',
      top: '350px',
      'text-align': 'center',
    };
    const topInfoText = {
      'text-align': 'center',
      'margin-top': '5px',
    };
    return (
      <div>
        <div>
          Hint: Drag the Action Logger up to make the height small enough that the container
          is near the top of the page, then scroll the button to the top and watch the tooltip flip
          once it doesnt have enough space
        </div>
        <div style={containerStyle}>
          <div style={scrollableStyles}>
            <div style={topInfoText}>Try scrolling this box</div>
            <TooltipTrigger position="top" description="This is a tooltip">
              <span style={simpleButtonStyles} aria-describedby="ak-tooltip">Hover over me</span>
            </TooltipTrigger>
            <div style={bottomInfoText}>This content is to create scrolling</div>
          </div>
        </div>

        <DefaultTooltip id="ak-tooltip" />
      </div>
    );
  })
  .add('a tooltip around a focusable element', () => (
    <div>
      <div style={containerStyle}>
        <TooltipTrigger position="bottom" description="I am describing a focusable element!">
          <a href="#" style={buttonStyles} aria-describedby="ak-tooltip">Focus on me!</a>
        </TooltipTrigger>
      </div>

      <DefaultTooltip id="ak-tooltip" />
    </div>
  ))
  .add('a tooltip with multiple triggers', () => {
    const triggerStyles = {
      margin: '0 1em',
    };
    return (
      <div>
        <div style={containerStyle}>
          <TooltipTrigger style={triggerStyles} position="top" description="This is a tooltip">
            <span style={buttonStyles} aria-describedby="ak-tooltip">Button 1</span>
          </TooltipTrigger>
          <TooltipTrigger style={triggerStyles} position="top" description="This is a tooltip">
            <span style={buttonStyles} aria-describedby="ak-tooltip">Button 2</span>
          </TooltipTrigger>
          <TooltipTrigger style={triggerStyles} position="top" description="This is a tooltip">
            <span style={buttonStyles} aria-describedby="ak-tooltip">Button 3</span>
          </TooltipTrigger>
          <TooltipTrigger style={triggerStyles} position="top" description="This is a tooltip">
            <span style={buttonStyles} aria-describedby="ak-tooltip">Button 4</span>
          </TooltipTrigger>

        </div>

        <DefaultTooltip id="ak-tooltip" />
      </div>
    );
  });
