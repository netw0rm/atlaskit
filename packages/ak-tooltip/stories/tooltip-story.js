import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import TooltipWC from '../src/index';
import TooltipTriggerWC from '../src/index.tooltip-trigger';
import ContainerWC from './skate/container';
import FourDirectionTooltipTrigger from './four-direction-tooltip-trigger';
import React from 'react';
import { name } from '../package.json';
import styles from 'style!./../src/host.less';

const Tooltip = reactify(TooltipWC);

const TooltipTrigger = reactify(TooltipTriggerWC);

const Container = reactify(ContainerWC);

const tooltipClass = styles.akTooltip;

const DefaultTooltip = (props) => <Tooltip className={tooltipClass} {...props} />;

const buttonStyles = {
  backgroundColor: 'orange',
  padding: '5px',
  position: 'absolute',
  left: '100px',
  top: '100px',
};

storiesOf(name, module)
  .add('a simple ak-tooltip with ak-tooltip-trigger', () => (
    <div>
      <TooltipTrigger position="top" description="This is a tooltip">
        <span style={buttonStyles} aria-describedby="ak-tooltip">Hover over me</span>
      </TooltipTrigger>

      <DefaultTooltip id="ak-tooltip" />
    </div>
  ))
  .add('a tooltip with a really long description', () => (
    <div>
      <TooltipTrigger
        position="top"
        description={`This is a really really really really really really really really really
          really really really really really really really really really really really really
          really really really really really really really really really really really really
          really really really really really really really really really really really really
          really really really really really long tooltip`}
      >
        <span style={buttonStyles} aria-describedby="ak-tooltip">Hover over me</span>
      </TooltipTrigger>

      <DefaultTooltip id="ak-tooltip" />
    </div>
  ))
  .add('a tooltip with all directions', () => (
    <div>
      <FourDirectionTooltipTrigger description="Tooltip!" />
      <DefaultTooltip id="ak-tooltip" />
    </div>
  ))
  .add('a tooltip binding to elements in shadowDOM', () => (
    <div>
      <DefaultTooltip id="ak-tooltip" />
      <Container />
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
    const topInfoText = {
      position: 'relative',
      top: '350px',
      'text-align': 'center',
    };
    const bottomInfoText = {
      'text-align': 'center',
      'margin-top': '5px',
    };
    return (
      <div>
        <div style={scrollableStyles}>
          <div style={bottomInfoText}>Try scrolling this box</div>
          <TooltipTrigger position="top" description="This is a tooltip">
            <span style={simpleButtonStyles} aria-describedby="ak-tooltip">Hover over me</span>
          </TooltipTrigger>
          <div style={topInfoText}>This content is to create scrolling</div>
        </div>

        <DefaultTooltip id="ak-tooltip" />
      </div>
    );
  })
  .add('a tooltip around a focusable element', () => (
    <div>
      <TooltipTrigger position="bottom" description="I am describing a focusable element!">
        <a href="#" style={buttonStyles} aria-describedby="ak-tooltip">Focus on me!</a>
      </TooltipTrigger>
      <DefaultTooltip id="ak-tooltip" />
      <span id="desc">This is a description</span>
    </div>
  ));
