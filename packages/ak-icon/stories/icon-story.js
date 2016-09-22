import { storiesOf } from '@kadira/storybook';
import { vdom } from 'skatejs';
import AnimationDemo from './AnimationDemo';
import React from 'react'; // eslint-disable-line no-unused-vars
import reactify from 'akutil-react';
import { name } from '../package.json';
import styles from 'style!./styles.less';
import toggleIcons from './ToggleIcons';

const req = require.context('../glyph', true, /^.*\.js/);
const reactifiedComponents = req.keys().reduce((prev, file) => {
  const Icon = req(file).default;
  const ReactIcon = reactify(Icon);
  prev[file] = ReactIcon;
  return prev;
}, {});

const Checkbox = req('./checkbox.js').default;
const ReactCheckbox = reactify(Checkbox);
const ToggleableIcons = [['checkbox', ReactCheckbox]];

const ToggleIcons = toggleIcons({
  React,
  ToggleableIcons,
});


storiesOf('ak-icon', module)
  .add('All icons', () => (
    <div className={styles.iconContainer}>
      {Object.entries(reactifiedComponents).map(([key, Icon]) => <Icon key={key} />)}
    </div>
  ))
  .add('All icons (colored)', () => (
    <div className={styles.coloredIconContainer}>
      {Object.entries(reactifiedComponents).map(([key, Icon]) => <Icon key={key} />)}
    </div>
  ))
  .add('Two-color icons', () => <ToggleIcons />)
  .add('All icons (usage)', () => (
    <table>
      <thead>
        <tr>
          <th>Icon</th>
          <th>Import</th>
          <th>Web component</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(reactifiedComponents).map((file) => {
          const Icon = reactifiedComponents[file];
          const fileBase = file.substring(2, file.length - 3);
          const importName = `${name}/glyph/${fileBase}`;
          const tagName = `${name}-${fileBase.split('/').join('-')}`;
          return (
            <tr key={file}>
              <td><Icon /></td>
              <td><pre>import '{importName}';</pre></td>
              <td><pre>&lt;{tagName}/&gt;</pre></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ))
  .add('Animated', () => <AnimationDemo components={reactifiedComponents} />);
