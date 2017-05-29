import React from 'react';
import { Header } from '../../src';

const handleOnExpand = (ev) => {
  console.log(`Clicked expandable link: ${ev.target.text}`);
};

export default (
  <Header
    logoHref="#home"
    title="JIRA Service Desk Cloud"
    titleHref="#jsdcloud"
    primaryLinks={[
      { label: 'Guides', href: '#guides', onExpand: handleOnExpand },
      { label: 'Reference', href: '#reference', onExpand: handleOnExpand, selected: true },
      { label: 'Get help', href: '#gethelp' },
    ]}
    secondaryLinks={[
      { label: 'Home', href: '#home' },
      { label: 'All product docs', href: '#reference' },
      { label: 'Developer community', href: '#gethelp' },
    ]}
  />
);
