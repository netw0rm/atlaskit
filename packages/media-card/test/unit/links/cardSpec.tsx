import * as React from 'react';
import { shallow } from 'enzyme';
import { UrlPreview } from '@atlaskit/media-core';

import { LinkCard, LinkCardPlayer, LinkCardViewSmall, LinkCardGenericView, LinkCardTrelloBoardView } from '../../../src/links';
import { LinkCardImageView } from '../../../src/links/cardImageView';
import { AppCardView } from '../../../src/app';
import { Href } from '../../../src/utils/href';

describe('LinkCard', () => {
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

  it('should use cardPlayer component if we have an embed available', () => {
    const details: UrlPreview = {
        type: 'media',
        url: 'https://atlassian.com',
        title: 'Atlassian',
        resources: {
          player: 'https://www.youtube.com/watch?v=zso6jskUaS8',
        }
      };

    const linkCard = shallow(<LinkCard details={details} status="complete" />);
    expect(linkCard.find(LinkCardPlayer)).toHaveLength(1);
  });

  it('should render a TrelloBoard preview when link contains a trello board url', () => {
    const details: UrlPreview = {
      type: 'media',
      url: 'https://trello.com/b/rq2mYJNn/public-trello-boards',
      title: 'Atlassian',
      resources: {
        app: {
          type: 'trello_board',
          name: 'Public Trello boards list',
          background: 'some-background',
          shortUrl: 'short-url',
          url: 'some url',
          lists: [{
            name: 'todo',
            count: 20
          }],
          member: [{
            avatarUrl: 'https://robohash.org/hectorzarco.png?set=set2&size=80x80',
            username: 'hector'
          }]
        }
      }
    };

    const linkCard = shallow(<LinkCard details={details} status="complete" />);
    expect(linkCard.find(LinkCardTrelloBoardView)).toHaveLength(1);
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

  it('should pass onClick handlers through to root component for appearances "small", "image" and "horizontal/square"', () => {
    const handler = () => {};

    const smallCard = shallow(<LinkCard status="complete" appearance="small" onClick={handler} />);
    const imageCard = shallow(<LinkCard status="complete" appearance="image" onClick={handler} />);
    const horizontalCard = shallow(<LinkCard status="complete" appearance="horizontal" onClick={handler} />);
    const squareCard = shallow(<LinkCard status="complete" appearance="square" onClick={handler} />);

    expect(smallCard.find(LinkCardViewSmall).props().onClick).toEqual(handler);
    expect(imageCard.find(LinkCardImageView).props().onClick).toEqual(handler);
    expect(horizontalCard.find(LinkCardGenericView).props().onClick).toEqual(handler);
    expect(squareCard.find(LinkCardGenericView).props().onClick).toEqual(handler);
  });

  it('should pass onMouseEnter handlers through to root component for appearances "small", "image" and "horizontal/square"', () => {
    const handler = () => {};

    const smallCard = shallow(<LinkCard status="complete" appearance="small" onMouseEnter={handler} />);
    const imageCard = shallow(<LinkCard status="complete" appearance="image" onMouseEnter={handler} />);
    const horizontalCard = shallow(<LinkCard status="complete" appearance="horizontal" onMouseEnter={handler} />);
    const squareCard = shallow(<LinkCard status="complete" appearance="square" onMouseEnter={handler} />);

    expect(smallCard.find(LinkCardViewSmall).props().onMouseEnter).toEqual(handler);
    expect(imageCard.find(LinkCardImageView).props().onMouseEnter).toEqual(handler);
    expect(horizontalCard.find(LinkCardGenericView).props().onMouseEnter).toEqual(handler);
    expect(squareCard.find(LinkCardGenericView).props().onMouseEnter).toEqual(handler);
  });

  it('should render an AppCardView when when details contains smartCard data', () => {

    const details: UrlPreview = {
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

    const element = shallow(<LinkCard status="complete" details={details}/>);
    expect(element.find(AppCardView).exists()).toBeTruthy();

  });

  it('should not render an AppCardView inside a Href when when details contains smartCard data without a link', () => {

    const details: UrlPreview = {
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

    const element = shallow(<LinkCard status="complete" details={details}/>);
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

    const element = shallow(<LinkCard status="complete" details={details}/>);
    expect(element.find(Href).find(AppCardView).exists()).toBeTruthy();

  });

});
