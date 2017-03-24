import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import { LinkCardViewSmall } from '../../src';
import {Title, Size, LoadingWrapper} from '../../src/utils/cardGenericViewSmall/styled';

describe('LinkCardViewSmall', () => {
  const title = 'Hello world';
  const linkUrl = 'http://localhost:9001/';

  it('should only render the title and linkUrl when not supplied with optional props', () => {
    const card = mount(<LinkCardViewSmall title={title} linkUrl={linkUrl}/>);

    expect(card.find(Title).text()).to.eql(title);
    expect(card.find(Size).text()).to.eql(linkUrl);
    expect(card.find('.media-card')).to.have.length(0);
  });

  it('should render a thumnail when supplied', () => {
    const thumbnailUrl = 'http://localhost:9001/some/thumbnail';

    const card = mount(<LinkCardViewSmall title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} />);

    expect(card.find('.media-card')).to.have.length(1);
    expect(card.find('.media-card').props().style.backgroundImage).to.contain(thumbnailUrl);
  });

  it('should render loading placeholders', () => {
    const card = mount(<LinkCardViewSmall title={title} linkUrl={linkUrl} loading={true} />);

    expect(card.find(LoadingWrapper)).to.have.length(1);
    expect(card.find('.media-card')).to.have.length(0);
  });
});
