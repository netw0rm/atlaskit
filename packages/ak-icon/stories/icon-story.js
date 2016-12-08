import { storiesOf } from '@kadira/storybook';
import React from 'react';
import classnames from 'classnames';
import AkButton from 'ak-button';

import styles from 'style!./styles.less';

import AnimationDemo from './AnimationDemo';
import { name } from '../package.json';
import ToggleIcons from './ToggleIcons';
import { getGlyphs } from '../test/_helpers';
import { size } from '../src/Icon';

const iconSizes = Object.values(size);
const twoColorIcons = ['checkbox', 'radio'];
const components = getGlyphs();
const sampleIconName = 'atlassian';
const AtlassianIcon = components[sampleIconName];
if (!AtlassianIcon) {
  throw new Error('Atlassian icon was removed, but is needed to display stories properly');
}

const toggleableIcons = Object
  .keys(components)
  .filter(key => twoColorIcons.indexOf(key) !== -1)
  .map(key => [key, components[key]]);

const AllIcons = props => (
  // eslint-disable-next-line react/prop-types
  <div {...props} className={classnames(styles.container, props.className)}>
    {Object
      .entries(components)
      .map(([key, Icon]) =>
        <Icon
          label={`${key} icon`}
          title={`${key}.svg`}
          key={key}
        />)}
  </div>
);

const AbsoluteAllIcons = props => (
  <AllIcons
    {...props}
    // eslint-disable-next-line react/prop-types
    style={{ position: 'absolute', ...(props.style || {}) }}
  />
);

const AllIconsSizeChecked = props => (
  // eslint-disable-next-line react/prop-types
  <div {...props} className={classnames(styles.container, props.className)}>
    {Object
      .entries(components)
      .map(([key, Icon]) =>
        <div className={styles.compareIconContainer}>
          <Icon
            label={`${key} icon`}
            title={`${key}.svg`}
            key={`${key}-original`}
          />
          <Icon
            label={`${key} icon`}
            title={`${key}.svg`}
            key={`${key}-constrained`}
          />
        </div>)}
  </div>
);

storiesOf('ak-icon', module)
  .add('Single icon', () => (
    <AtlassianIcon
      label="Atlassian icon"
      size="medium"
    />
  ))
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
        {Object
          .entries(components)
          .map(([key, Icon]) => {
            const importName = `${name}/glyph/${key}`;
            return (
              <tr key={key}>
                <td><Icon label={`${key} icon`} /></td>
                <td><pre>import &#39;{importName}&#39;;</pre></td>
              </tr>
            );
          })
        }
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
      <AllIconsSizeChecked />
    </div>

  ))
  .add('Two-color icons', () => <ToggleIcons icons={toggleableIcons} />)
  .add('Animated', () => <AnimationDemo components={components} />)
  .addBaselineAligned('baseline alignment', () => (
    <AtlassianIcon label="Baseline aligned icon" />
  ))
  .add('Inside a button', () => (
    <div>
      <div><AkButton iconBefore={<AtlassianIcon label="Icon before button" />}>
        Button
      </AkButton></div>
      <div><AkButton iconAfter={<AtlassianIcon label="Icon after button" />}>
        Button
      </AkButton></div>
    </div>

  ))
  .add('Different sizes', () => (
    <table>
      <thead>
        <tr>
          <th>Usage</th>
          <th>Icon</th>
        </tr>
      </thead>
      <tbody>
        {iconSizes.map(s => (
          <tr key={s}>
            <td><pre>&lt;ak-icon-{sampleIconName} size=&quot;{s}&quot; /&gt;</pre></td>
            <td><AtlassianIcon
              size={s}
              label={`Atlassian icon with size ${s}`}
            /></td>
          </tr>
      ))}
      </tbody>
    </table>
  ));
