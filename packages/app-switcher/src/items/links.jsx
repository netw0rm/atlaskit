// @flow
import React from 'react';
import { Item, Link } from '../styled';
import type { Links, DropdownConfig } from '../internal/types';

export default (links: Links): DropdownConfig => {
  if (links.length === 0) return null;
  return {
    items: links.map(({ text, url, onClick }) => ({
      content: <Item><Link>{text}</Link></Item>,
      href: url,
      onClick,
    })),
  };
};
