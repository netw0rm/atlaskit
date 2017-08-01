import * as React from 'react';
import { shallow } from 'enzyme';
import { UrlPreview } from '@atlaskit/media-core';
import { minimalLinkDetailsContainingASmartCard } from '@atlaskit/media-test-helpers';

import { LinkCard, LinkCardGenericView } from '../../../src/links';
import { A } from '../../../src/links/card/styled';
import { LinkCardImageView } from '../../../src/links/cardImageView';
import { AppCardView } from '../../../src/app';
import { Href } from '../../../src/utils/href';

describe('LinkCard', () => {
  const emptyLinkDetails: UrlPreview = {
    url: '',
    type: 'link',
    title: 'Atlassian',
    resources: {}
  };
  const genericLinkDetails: UrlPreview = {
    url: 'https://atlassian.com',
    type: 'link',
    title: 'Atlassian',
    resources: {}
  };
  const smartLinkDetails: UrlPreview = {
    url: 'https://trello.com/b/rq2mYJNn/public-trello-boards',
    type: 'link',
    title: 'Public Trello Boards',
    resources: {
      smartCard: {
        title: {
          text: 'Public Trello Boards'
        }
      }
    }
  };
  const imageLink: UrlPreview = {
    type: 'link',
    url: 'http://i.imgur.com/KL5g7xl.png',
    title: 'A joke that took a life of its own',
    resources: {
      image: {
        url: 'image-url.png',
        type: 'image/png',
        width: 500,
        height: 500
      }
    }
  };

  it('should render the default preview when is a generic link and processing status is "complete"', () => {
    const details: UrlPreview = {
      type: 'link',
      url: 'https://atlassian.com',
      title: 'Atlassian',
      resources: {}
    };

    const linkCard = shallow(<LinkCard details={details} status="complete" />);

    expect(linkCard.find(LinkCardGenericView)).toHaveLength(1);
  });

  it('should render right image preview for links images', () => {
    const linkCard = shallow(<LinkCard details={imageLink} status="complete" />);

    expect(linkCard.find(LinkCardImageView)).toHaveLength(1);
    expect(linkCard.find(LinkCardImageView).props().thumbnailUrl).toBe('image-url.png');
  });

  it('should render generic link for "horizontal" and "square" appearances', () => {
    const squareCard = shallow(<LinkCard details={imageLink} status="complete" appearance="square" />);
    const horizontalCard = shallow(<LinkCard details={imageLink} status="complete" appearance="horizontal" />);

    expect(squareCard.find(LinkCardGenericView)).toHaveLength(1);
    expect(horizontalCard.find(LinkCardGenericView)).toHaveLength(1);
  });

  it('should render an AppCardView when when details contains smartCard data', () => {
    const element = shallow(<LinkCard status="complete" appearance="horizontal" details={smartLinkDetails}/>);
    expect(element.find(AppCardView).exists()).toBeTruthy();
  });

  it('should not render an AppCardView inside a Href when when details contains smartCard data without a link', () => {
    const element = shallow(<LinkCard status="complete" appearance="horizontal" details={smartLinkDetails}/>);
    expect(element.find(Href).exists()).toBeFalsy();
    expect(element.find(AppCardView).exists()).toBeTruthy();
  });

  it('should render an AppCardView inside a Href when when details contains smartCard data with a link', () => {
    const details: UrlPreview = {
      url: 'https://trello.com/b/rq2mYJNn/public-trello-boards',
      type: 'link',
      title: 'Public Trello Boards',
      resources: {
        smartCard: {
          title: {
            text: 'Public Trello Boards'
          },
          link: {
            url: 'https://trello.com/b/rq2mYJNn/public-trello-boards'
          }
        }
      }
    };

    const element = shallow(<LinkCard status="complete" appearance="horizontal" details={details}/>);
    expect(element.find(A).find(AppCardView).exists()).toBeTruthy();
  });

  it('should not render a link tag when status is "loading"', () => {
    const element = shallow(<LinkCard status="loading" details={genericLinkDetails}/>);
    expect(element.find(A)).toHaveLength(0);
  });

  it('should not render a link tag when status is "processing"', () => {
    const element = shallow(<LinkCard status="processing" details={genericLinkDetails}/>);
    expect(element.find(A)).toHaveLength(0);
  });

  it('should not render a link tag when error is truthy', () => {
    const element = shallow(<LinkCard status="error" details={genericLinkDetails}/>);
    expect(element.find(A)).toHaveLength(0);
  });

  it('should render a link tag when status is "complete"', () => {
    const element = shallow(<LinkCard status="complete" details={genericLinkDetails}/>);
    expect(element.find(A)).toHaveLength(1);
  });

  it('should not render a link tag when link is not present', () => {
    const element = shallow(<LinkCard status="complete" details={emptyLinkDetails}/>);
    expect(element.find(A)).toHaveLength(0);
  });

  it('should not render an AppCardView when appearance=small', () => {
    const element = shallow(<LinkCard status="complete" details={minimalLinkDetailsContainingASmartCard} appearance="small"/>);
    expect(element.find(AppCardView).exists()).toBeFalsy();
  });

  it('should not render an AppCardView when appearance=image', () => {
    const element = shallow(<LinkCard status="complete" details={minimalLinkDetailsContainingASmartCard} appearance="image"/>);
    expect(element.find(AppCardView).exists()).toBeFalsy();
  });

  it('should not render an AppCardView when appearance=square', () => {
    const element = shallow(<LinkCard status="complete" details={minimalLinkDetailsContainingASmartCard} appearance="square"/>);
    expect(element.find(AppCardView).exists()).toBeFalsy();
  });
});
