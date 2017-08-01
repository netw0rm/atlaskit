import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { LinkCardViewSmall } from '../../../src/links';
import { CardGenericViewSmall } from '../../../src/utils/cardGenericViewSmall';
import { Href } from '../../../src/utils/href';
import { Title, Size, LoadingWrapper } from '../../../src/utils/cardGenericViewSmall/styled';

describe('LinkCardViewSmall', () => {
  const title = 'Hello world';
  const linkUrl = 'http://localhost:9001/';

  it('should only render the title and linkUrl when not supplied with optional props', () => {
    const card = mount(<LinkCardViewSmall title={title} linkUrl={linkUrl}/>);

    expect(card.find(Title).text()).toEqual(title);
    expect(card.find(Size).text()).toEqual(linkUrl);
    expect(card.find('.media-card')).toHaveLength(0);
  });

  it('should render a thumnail when supplied', () => {
    const thumbnailUrl = 'http://localhost:9001/some/thumbnail';

    const card = mount(<LinkCardViewSmall title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} />) as any;

    expect(card.find('.media-card')).toHaveLength(1);
    expect(card.find('.media-card').props().style.backgroundImage).toContain(thumbnailUrl);
  });

  it('should render loading placeholders', () => {
    const card = mount(<LinkCardViewSmall title={title} linkUrl={linkUrl} loading={true} />);

    expect(card.find(LoadingWrapper)).toHaveLength(1);
    expect(card.find('.media-card')).toHaveLength(0);
  });

  it('should pass the site name to CardGenericViewSmall as subtitle prop instead of the link url when it is a string', () => {
    const site = 'Some random site name';
    const card = shallow(<LinkCardViewSmall title={title} site={site} linkUrl={linkUrl} loading={true} />);

    expect(card.find(CardGenericViewSmall).props().subtitle).toEqual(site);
  });
  it('should not render a link tag when loading is "true"', () => {
    const card = shallow(<LinkCardViewSmall title={title} linkUrl={linkUrl} loading={true} />);
    expect(card.find(Href)).toHaveLength(0);
  });

  it('should not render a link tag when error is truthy', () => {
    const card = shallow(<LinkCardViewSmall title={title} linkUrl={linkUrl} error="some error occurred" />);
    expect(card.find(Href)).toHaveLength(0);
  });
});
