import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { mount } from 'enzyme';

import { LinkCardGenericView } from '../../src';
import { Title, Link } from '../../src/links/cardGenericView/styled';

describe('LinkCardViewGeneric', () => {
  it('should only render the title and linkUrl when not supplied with optional props', () => {
    const title = 'Hello world';
    const linkUrl = 'http://localhost:9001/';

    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl}/>);

    expect(card.find(Title).text()).to.eql(title);
    expect(card.find(Link).text()).to.eql(linkUrl);
    expect(card.find('img')).to.have.length(0);
  });

  it('should render in horizontal display mode by default', () => {
    const title = 'Hello world';
    const linkUrl = 'http://localhost:9001/';
    const thumbnailUrl = 'http://localhost:9001/some/thumbnail';

    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} />);
    expect(card.find('img')).to.have.length(1);
    expect(card.find('.square-img')).to.have.length(0);
  });

  it('should render in square display mode when specified', () => {
    const title = 'Hello world';
    const linkUrl = 'http://localhost:9001/';
    const thumbnailUrl = 'http://localhost:9001/some/thumbnail';

    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} display="square" />);
    expect(card.find('img')).to.have.length(0);
    expect(card.find('.square-img')).to.have.length(1);
  });

  it('should render a thumnail when supplied', () => {
    const title = 'Hello world';
    const linkUrl = 'http://localhost:9001/';
    const thumbnailUrl = 'http://localhost:9001/some/thumbnail';

    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} />);
    expect(card.find('img')).to.have.length(1);
    expect(card.find(`img[src='${thumbnailUrl}']`)).to.have.length(1);
  });

  it('should NOT render a thumnail when supplied thumbnail url errors', () => {
    const title = 'Hello world';
    const linkUrl = 'http://localhost:9001/';
    const thumbnailUrl = 'http://localhost:9001/some/thumbnail';

    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} />);
    card.find(`img[src='${thumbnailUrl}']`).simulate('error');

    expect(card.find('img')).to.have.length(0);
    expect(card.find(`img[src='${thumbnailUrl}']`)).to.have.length(0);
  });

  it('should render an icon when supplied', () => {
    const title = 'Hello world';
    const linkUrl = 'http://localhost:9001/';
    const iconUrl = 'http://localhost:9001/some/icon';

    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} iconUrl={iconUrl} />);

    expect(card.find('img')).to.have.length(1);
    expect(card.find(`img[src='${iconUrl}']`)).to.have.length(1);
  });

  it('should NOT render an icon when supplied icon url errors', () => {
    const title = 'Hello world';
    const linkUrl = 'http://localhost:9001/';
    const iconUrl = 'http://localhost:9001/some/icon';

    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} iconUrl={iconUrl} />);
    card.find(`img[src='${iconUrl}']`).simulate('error');

    expect(card.find('img')).to.have.length(0);
    expect(card.find(`img[src='${iconUrl}']`)).to.have.length(0);
  });

  it('currently ignores the loading prop', () => {
    const title = 'Hello world';
    const linkUrl = 'http://localhost:9001/';

    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl}/>);

    expect(card.find(Title).text()).to.eql(title);
    expect(card.find(Link).text()).to.eql(linkUrl);
    expect(card.find('img')).to.have.length(0);
  });

  it('currently ignores the error prop', () => {
    const title = 'Hello world';
    const linkUrl = 'http://localhost:9001/';

    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl}/>);

    expect(card.find(Title).text()).to.eql(title);
    expect(card.find(Link).text()).to.eql(linkUrl);
    expect(card.find('img')).to.have.length(0);
  });
});
