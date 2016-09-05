import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import { define, vdom } from 'skatejs';
import { style } from 'akutil-common';
import reactify from 'akutil-react';
import Theme, { themeable } from '../src/index';

const ReactTheme = reactify(Theme);
const TestTheme1 = () => (
  <ReactTheme id="x-btn">
    <ak-var name="background" value="blue" />
    <ak-var name="text" value="white" />
  </ReactTheme>
);
const TestTheme2 = () => (
  <ReactTheme id="x-btn-super" mixin="x-btn">
    <ak-var name="background" value="red" />
  </ReactTheme>
);
const Btn = reactify(define('x-btn', themeable({
  render(elem) {
    const { background, text } = elem.themeVars;
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
  .add('one ak-theme', () => (
    <div>
      <TestTheme1 />
      <Btn>test</Btn>
    </div>
  ))
  .add('one theme mixing in another theme', () => (
    <div>
      <TestTheme1 />
      <TestTheme2 />
      <Btn themeName="x-btn-super">test</Btn>
    </div>
  ));
