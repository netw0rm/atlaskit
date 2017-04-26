import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { UrlPreview } from '@atlaskit/media-core';

import { LinkCard, LinkCardPlayer, LinkCardGenericView, LinkCardTrelloBoardView } from '../../src';
import { LinkCardImageView } from '../../src/links/cardImageView';

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

    expect(linkCard.find(LinkCardGenericView)).to.have.length(1);
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
    expect(linkCard.find(LinkCardPlayer)).to.have.length(1);
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
    expect(linkCard.find(LinkCardTrelloBoardView)).to.have.length(1);
  });

  it('should render right image preview for links images', () => {
    const linkCard = shallow(<LinkCard details={imageLink} status="complete" />);

    expect(linkCard.find(LinkCardImageView)).to.have.length(1);
    expect(linkCard.find(LinkCardImageView).props().thumbnailUrl).to.equal('image-url.png');
  });

  it('should render generic link for "horizontal" and "square" appearances', () => {
    const squareCard = shallow(<LinkCard details={imageLink} status="complete" appearance="square" />);
    const horizontalCard = shallow(<LinkCard details={imageLink} status="complete" appearance="horizontal" />);

    expect(squareCard.find(LinkCardGenericView)).to.have.length(1);
    expect(horizontalCard.find(LinkCardGenericView)).to.have.length(1);
  });
});
