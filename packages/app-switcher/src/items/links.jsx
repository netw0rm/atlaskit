// @flow
import React from 'react';
import { Item, Link } from '../styled';
import type { Links, DropdownConfig } from '../internal/types';

export default (links: Links): DropdownConfig => {
  if (links.length === 0) return null;
  return {
    items: links.map(({ text, url }) => ({
      content: <Item><Link>{text}</Link></Item>,
      href: url,
      // TODO: Should I send an analytic event (all the other app switcher links do)?
      //       If so, what key should I use?
      analyticEvent: { key: 'appswitcher.link.click', properties: { url } },
    })),
  };
};
