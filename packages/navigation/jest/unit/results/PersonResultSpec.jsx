import React from 'react';
import Avatar from '@atlaskit/avatar';
import { PersonResult } from '../../../src/components/js/results';
import { mountWithRootTheme } from '../_theme-util';

describe('Person Result', () => {
  it('should render an avatar', () => {
    expect(mountWithRootTheme(<PersonResult />)
      .find(Avatar)).toHaveLength(1);
  });

  it('should render name prop', () => {
    const name = 'Charlie Atlas';
    expect(mountWithRootTheme(<PersonResult name={name} />)
      .text()).toEqual(expect.stringContaining(name));
  });

  it('should render mentionName prop prepended with an \'@\' (w/ default mentionPrefix)', () => {
    const name = 'atlassian';
    expect(mountWithRootTheme(<PersonResult mentionName={name} />)
      .text()).toEqual(expect.stringContaining(`@${name}`));
  });

  it('should render mentionPrefix prepended to mentionName', () => {
    const name = 'atlassian';
    const prefix = '[at]';
    expect(mountWithRootTheme(<PersonResult mentionPrefix={prefix} mentionName={name} />)
      .text()).toEqual(expect.stringContaining(`${prefix}${name}`));
  });

  it('should not render mentionPrefix if mentionName is not provided', () => {
    const prefix = '[at]';
    expect(mountWithRootTheme(<PersonResult mentionPrefix={prefix} />)
      .text()).not.toEqual(expect.stringContaining(prefix));
  });

  it('should render presenceMessage if provided', () => {
    const msg = 'Gone fishin\'';
    expect(mountWithRootTheme(<PersonResult presenceMessage={msg} />)
      .text()).toEqual(expect.stringContaining(msg));
  });

  it('known presence states are still valid', () => {
    expect(mountWithRootTheme(<PersonResult presenceState="online" />)
      .find('Presence').find('svg')).toHaveLength(1);
    expect(mountWithRootTheme(<PersonResult presenceState="offline" />)
      .find('Presence').find('svg')).toHaveLength(1);
    expect(mountWithRootTheme(<PersonResult presenceState="busy" />)
      .find('Presence').find('svg')).toHaveLength(1);
  });
});
