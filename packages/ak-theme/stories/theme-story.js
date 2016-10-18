import { storiesOf } from '@kadira/storybook';
import { define, vdom } from 'skatejs';
import { style } from 'akutil-common';
import React from 'react';
import reactify from 'akutil-react';

import { name } from '../package.json';
import Theme, { Prop, themeable } from '../src';


const ReactTheme = reactify(Theme);
const ReactThemeProp = reactify(Prop);
const TestTheme1 = () => (
  <ReactTheme id="x-btn-base">
    <ReactThemeProp name="background" value="blue" />
    <ReactThemeProp name="text" value="white" />
  </ReactTheme>
);
const TestTheme2 = () => (
  <ReactTheme id="x-btn" mixin="x-btn-base">
    <ReactThemeProp name="background" value="red" />
  </ReactTheme>
);
const TestTheme3 = () => (
  <ReactTheme id="x-btn-super" mixin="x-btn">
    <ReactThemeProp name="background" value="orange" />
  </ReactTheme>
);
const Btn = reactify(define('x-btn', themeable({
  render(elem) {
    const { background, text } = elem.themeProps;
    const css = style(vdom, {
      btn: {
        background: `${background} none`,
        color: text,
      },
    });
    vdom.element('button', { className: css.btn }, () => vdom.element('slot'));
  },
})));

storiesOf(name, module)
  .add('theme casdcading', () => (
    <div>
      <TestTheme1 />
      <TestTheme2 />
      <TestTheme3 />
      <Btn themeName="x-btn-base">theme: x-btn-base</Btn>
      <Btn>theme: x-btn (default)</Btn>
      <Btn themeName="x-btn-super">theme: x-btn-super</Btn>
    </div>
  ));
