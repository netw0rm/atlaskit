import * as React from 'react';
import { mount } from 'enzyme';

import { LinkCardGenericView } from '../../../src/links';
import { Details } from '../../../src/links/styled';
import { Title, Link, ErrorContainer, ErrorHeader } from '../../../src/links/cardGenericView/styled';

describe('LinkCardGenericView', () => {
  const title = 'Hello world';
  const linkUrl = 'http://localhost:9001/';
  const thumbnailUrl = 'http://localhost:9001/some/thumbnail';
  const iconUrl = 'http://localhost:9001/some/icon';

  it('should only render the title and linkUrl when not supplied with optional props', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl}/>);

    expect(card.find(Title).text()).toEqual(title);
    expect(card.find(Link).text()).toEqual(linkUrl);
    expect(card.find('.media-card')).toHaveLength(0);
  });

  it('should render in horizontal display mode by default', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} />);
    expect(card.find('.media-card')).toHaveLength(1);
  });

  it('should render in square display mode when specified', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} appearance="square" />);
    expect(card.find('.media-card')).toHaveLength(1);
  });

  it('should render a thumnail when supplied', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} />) as any;

    expect(card.find('.media-card')).toHaveLength(1);
    expect(card.find('.media-card').props().style.backgroundImage).toContain(thumbnailUrl);
  });

  it.skip('should NOT render a thumnail when supplied thumbnail url errors', (done) => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} />);

    // TODO: test fails on pipeline, find way of wait until img is loaded properly
    // Waits until the image tries to load the uri and calls the error handler which hanpens async.
    setTimeout(() => {
      expect(card.state('thumbnailError')).toBe(true);
      done();
    }, 10);
  });

  it('should render an icon when supplied', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} iconUrl={iconUrl} />);

    expect(card.find('.media-card')).toHaveLength(0);
    expect(card.find(`img[src='${iconUrl}']`)).toHaveLength(1);
  });

  it('should NOT render an icon when supplied icon url errors', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} iconUrl={iconUrl} />);
    card.find(`img[src='${iconUrl}']`).simulate('error');

    expect(card.find('.media-card')).toHaveLength(0);
    expect(card.find(`img[src='${iconUrl}']`)).toHaveLength(0);
  });

  it('should render the site name instead of link url inside of they <a> tag when it is supplied as a prop', () => {
    const site = 'Hello world';

    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} site={site}/>);
    expect(card.find(Link).text()).toEqual(site);
  });

  it('currently ignores the loading prop', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl}/>);

    expect(card.find(Title).text()).toEqual(title);
    expect(card.find(Link).text()).toEqual(linkUrl);
    expect(card.find('.media-card')).toHaveLength(0);
  });

  it('displays error when error prop is passed in', () => {
    const error = 'Some random error occured';
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} error={error}/>);

    expect(card.find(Details)).toHaveLength(0);
    expect(card.find(ErrorContainer)).toHaveLength(1);
    expect(card.find(ErrorHeader)).toHaveLength(1);
    expect(card.find(ErrorHeader).text()).toBe(error);
  });

  it('should use max horizontal dimensions and large size if the width is too big', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} dimensions={{width: 1000000}} />);
    const instance = card.instance() as LinkCardGenericView;

    expect(instance.width).toBe('744px');
    expect(instance.cardSize).toBe('large');
  });
});
