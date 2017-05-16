import { shallow } from 'enzyme';
import React from 'react';
import HeaderLinks from '../../src/HeaderLinks';

describe('HeaderLinks', () => {
  const links = [
    {
      label: 'myLabel1',
      href: 'myHref1',
      selected: true,
    },
    {
      label: 'myLabel2',
      href: 'myHref2',
      selected: false,
    },
    {
      label: 'myLabel3',
      href: 'myHref3',
    },
  ];
  const header = (
    <HeaderLinks
      links={links}
      linkStyle={'primary'}
      screen={'large'}
    />
  );
  it('should reflect the selected state of the links', () => {
    const wrapped = shallow(header);
    links.forEach((link) => {
      const anchor = wrapped.find(`[href="${link.href}"]`);
      expect(anchor.parent().is({ selected: link.selected })).toEqual(true, link.label);
    });
  });
});
