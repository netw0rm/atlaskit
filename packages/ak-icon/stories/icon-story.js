import { storiesOf } from '@kadira/storybook';
import { vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
import React from 'react';
import reactify from 'akutil-react';
import classnames from 'classnames';
import AkButtonWc from 'ak-button';

import componentStyles from 'style!../src/shadow.less';
import styles from 'style!./styles.less';

import AnimationDemo from './AnimationDemo';
import { name } from '../package.json';
import ToggleIcons from './ToggleIcons';
import pathToDashed from '../bin/pathToDashed';
import { getGlyphs } from '../test/_helpers';
import { size } from '../src/Icon';


const iconSizes = Object.values(size);

const AkButton = reactify(AkButtonWc);

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
          className={componentStyles.akIcon}
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
    style={Object.assign({ position: 'absolute' }, props.style || {})}
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
            className={classnames(componentStyles.akIcon, styles.original)}
            label={`${key} icon`}
            title={`${key}.svg`}
            key={`${key}-original`}
          />
          <Icon
            className={classnames(componentStyles.akIcon, styles.constrained)}
            label={`${key} icon`}
            title={`${key}.svg`}
            key={`${key}-costrained`}
          />
        </div>)}
  </div>
);

storiesOf('ak-icon', module)
  .add('Single icon', () => (
    <AtlassianIcon
      className={componentStyles.akIcon}
      label="My label"
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
            const tagName = `${name}-${pathToDashed(key)}`;
            return (
              <tr key={key}>
                <td><Icon /></td>
                <td><pre>import &#39;{importName}&#39;;</pre></td>
                <td><pre>&lt;{tagName} /&gt;</pre></td>
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
    <AtlassianIcon className={componentStyles.akIcon} />
  ))
  .add('Inside a button', () => (
    <AkButton>
      <AtlassianIcon className={componentStyles.akIcon} slot="before" />
      Button
    </AkButton>
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
            <td><AtlassianIcon className={componentStyles.akIcon} size={s} /></td>
          </tr>
      ))}
      </tbody>
    </table>
  ));
