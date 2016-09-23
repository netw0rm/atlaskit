import { storiesOf } from '@kadira/storybook';
import { vdom } from 'skatejs';
import AnimationDemo from './AnimationDemo';
import React from 'react'; // eslint-disable-line no-unused-vars
import reactify from 'akutil-react';
import { name } from '../package.json';
import styles from 'style!./styles.less';
import ToggleIcons from './ToggleIcons';
import classnames from 'classnames';
import fileToScope from '../src/fileToScope';
import pathToDashed from '../src/pathToDashed';

const req = require.context('../glyph', true, /^.*\.js/);
const reactifiedComponents = req.keys().reduce((prev, file) => {
  const Icon = req(file).default;
  const ReactIcon = reactify(Icon);
  prev[file] = ReactIcon;
  return prev;
}, {});

const toggleableIcons = Object
  .keys(reactifiedComponents)
  .filter((key) => (key === './checkbox.js' || key === './radio.js'))
  .map((key) => [key, reactifiedComponents[key]]);

const AllIcons = (props) => (
  // eslint-disable-next-line react/prop-types
  <div {...props} className={classnames(styles.container, props.className)}>
    {Object
      .entries(reactifiedComponents)
      .map(([key, Icon]) => <Icon title={`${fileToScope(key)}.svg`} key={key} />)}
  </div>
);

const AbsoluteAllIcons = (props) => (
  <AllIcons
    {...props}
    // eslint-disable-next-line react/prop-types
    style={Object.assign({ position: 'absolute' }, props.style || {})}
  />
);

storiesOf('ak-icon', module)
  .add('All icons', () => <AllIcons />)
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
          const fileBase = fileToScope(file);
          const importName = `${name}/glyph/${fileBase}`;
          const tagName = `${name}-${pathToDashed(fileBase)}`;
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
  .add('All icons (colored)', () => (
    <AllIcons className={styles.colored} />
  ))
  .add('Icons with broken fills (solid parts)', () => (
    <div>
      <style>{'body { background: white; }'}</style>
      <AbsoluteAllIcons
        style={{ color: 'rgba(0,0,0,0.1)' }}
      />
      <AbsoluteAllIcons
        style={{ color: 'transparent' }}
      />
    </div>
  ))
  .add('Icons that are too big (red parts)', () => (
    <div>
      <style>{'body { background: white; }'}</style>
      <AbsoluteAllIcons className={styles.colored} />
      <AbsoluteAllIcons className={styles.boxes} />
    </div>
  ))
  .add('Two-color icons', () => <ToggleIcons icons={toggleableIcons} />)
  .add('Animated', () => <AnimationDemo components={reactifiedComponents} />);
