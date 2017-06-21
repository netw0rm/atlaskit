import React from 'react';
import Avatar from '@atlaskit/avatar';
import { PersonResult } from '../../src/components/js/results';
import { mountWithRootTheme } from '../theme-util';

describe('Person Result', () => {
  it('should render an avatar', () => {
    expect(mountWithRootTheme(<PersonResult />)
      .find(Avatar)).to.have.length(1);
  });

  it('should render name prop', () => {
    const name = 'Charlie Atlas';
    expect(mountWithRootTheme(<PersonResult name={name} />)
      .text()).to.contain(name);
  });

  it('should render mentionName prop prepended with an \'@\' (w/ default mentionPrefix)', () => {
    const name = 'atlassian';
    expect(mountWithRootTheme(<PersonResult mentionName={name} />)
      .text()).to.contain(`@${name}`);
  });

  it('should render mentionPrefix prepended to mentionName', () => {
    const name = 'atlassian';
    const prefix = '[at]';
    expect(mountWithRootTheme(<PersonResult mentionPrefix={prefix} mentionName={name} />)
      .text()).to.contain(`${prefix}${name}`);
  });

  it('should not render mentionPrefix if mentionName is not provided', () => {
    const prefix = '[at]';
    expect(mountWithRootTheme(<PersonResult mentionPrefix={prefix} />)
      .text()).to.not.contain(prefix);
  });

  it('should render presenceMessage if provided', () => {
    const msg = 'Gone fishin\'';
    expect(mountWithRootTheme(<PersonResult presenceMessage={msg} />)
      .text()).to.contain(msg);
  });

  it('known presence states are still valid', () => {
    expect(mountWithRootTheme(<PersonResult presenceState="online" />)
      .find('Presence').find('svg')).to.have.length(1);
    expect(mountWithRootTheme(<PersonResult presenceState="offline" />)
      .find('Presence').find('svg')).to.have.length(1);
    expect(mountWithRootTheme(<PersonResult presenceState="busy" />)
      .find('Presence').find('svg')).to.have.length(1);
  });
});
