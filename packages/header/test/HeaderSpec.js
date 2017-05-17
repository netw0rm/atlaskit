import { render, mount, shallow } from 'enzyme';
import React from 'react';
import { AtlassianLogo } from '@atlaskit/logo';
import HeaderSearch from '../../src/HeaderSearch';
import { Header } from '../../src';
import HeaderLinks from '../../src/HeaderLinks';

describe('Header', () => {
  const logoHref = '#logo';
  const title = '|Page title|';
  const titleHref = '#title';

  const header = (
    <Header
      logoHref={logoHref}
      title={title}
      titleHref={titleHref}
    />
  );

  it('should render the Atlassian logo link', () => {
    const mounted = mount(header);
    expect(mounted.find(`.show-for-large [href="${logoHref}"]`).find(AtlassianLogo).length).to.equal(1);
  });

  it('should render the desktop title link', () => {
    const wrapped = shallow(<Header
      logoHref={logoHref}
      title={title}
      titleHref={titleHref}
    />);
    expect(wrapped.find(`.show-for-large [href="${titleHref}"]`).contains(title)).to.equal(true);
  });

  it('should render the mobile title', () => {
    const rendered = render(header);
    expect(rendered.find('.hide-for-large span').text()).to.equal(title);
  });

  it('should render a link to doc overview page', () => {
    const mounted = mount(header);
    expect(mounted.find('[href="/docs/"]').length).to.equal(1);
  });

  it('should include search', () => {
    const mounted = mount(header);
    expect(mounted.find(HeaderSearch).length).to.equal(1);
  });

  it('should use the foundation grid', () => {
    const rendered = render(header);
    const row = rendered.find('.row');
    expect(row.length).to.equal(6);
    expect(row.children('.column.large-12, .columns.large-12').length).to.equal(1);
  });
});

describe('Header with links', () => {
  const logoHref = '#logo';
  const title = '|Page title|';
  const titleHref = '#title';
  const primaryLinks = [
    { label: 'Link 1', href: '#link1', selected: true },
    { label: 'Link 2', href: '#link2' },
  ];

  const header = (
    <Header
      logoHref={logoHref}
      title={title}
      titleHref={titleHref}
      primaryLinks={primaryLinks}
    />
  );

  it('should render 1 <HeaderLinks /> component for desktop view', () => {
    const mounted = mount(header);
    const headerLinkComponents = mounted.find('.show-for-large').find(HeaderLinks);
    expect(headerLinkComponents.length).to.equal(1);
  });

  it('should render 2 <HeaderLinks /> components for mobile view', () => {
    const mounted = mount(header);
    const headerLinkComponents = mounted.find('.hide-for-large').find(HeaderLinks);
    expect(headerLinkComponents.length).to.equal(2);
  });
});
