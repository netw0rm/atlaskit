import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import TooltipWC from '../src/index';
import TooltipTriggerWC from '../src/tooltip-trigger';
import ContainerWC from '../src/container';
import FourDirectionTooltipTrigger from './four-direction-tooltip-trigger';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import styles from 'style!./../src/host.less';

const Tooltip = reactify(TooltipWC, {
  React,
  ReactDOM,
});

const TooltipTrigger = reactify(TooltipTriggerWC, {
  React,
  ReactDOM,
});

const Test = reactify(ContainerWC, {
  React,
  ReactDOM,
});

const tooltipClass = styles.tooltip;

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
      <TooltipTrigger position="top" description="fgf">
        <span style={buttonStyles} aria-describedby="ak-tooltip">Click me</span>
      </TooltipTrigger>

      <DefaultTooltip id="ak-tooltip" />
    </div>
  ))
  .add('a tooltip with all directions', () => (
    <div>
      <FourDirectionTooltipTrigger description="test" />
      <DefaultTooltip id="ak-tooltip" />
    </div>
  ))
  .add('a tooltip binding to elements in shadowDOM', () => (
    <div>
      <DefaultTooltip id="ak-tooltip" />
      <Test />
    </div>
  ))
  .add('a tooltip around a focusable element', () => (
    <div>
      <TooltipTrigger position="right" description="hi sean">
        <a href="#" style={buttonStyles} aria-describedby="ak-tooltip">Focus on me!</a>
      </TooltipTrigger>
      <DefaultTooltip id="ak-tooltip" />
      <span id="desc">This is a description</span>
    </div>
  ));
