import * as React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { UrlPreview } from '@atlaskit/media-core';

import { LinkCard, LinkCardPlayer, LinkCardGenericView, LinkCardTrelloBoardView } from '../../src';

describe('LinkCard', () => {
  it('should render the default preview when is a generic link and processing status is "complete"', () => {
    const urlPreview: UrlPreview = {
      type: 'link',
      url: 'https://atlassian.com',
      title: 'Atlassian',
      resources: {}
    };

    const linkCard = shallow(<LinkCard urlPreview={urlPreview} cardProcessingStatus="complete" />);

    expect(linkCard.find(LinkCardGenericView)).to.have.length(1);
  });

  it('should use cardPlayer component if we have an embed available', () => {
    const urlPreview: UrlPreview = {
        type: 'media',
        url: 'https://atlassian.com',
        title: 'Atlassian',
        resources: {
          player: 'https://www.youtube.com/watch?v=zso6jskUaS8',
        }
      };

    const linkCard = shallow(<LinkCard urlPreview={urlPreview} cardProcessingStatus="complete" />);
    expect(linkCard.find(LinkCardPlayer)).to.have.length(1);
  });

  it('should render a TrelloBoard preview when link contains a trello board url', () => {
    const urlPreview: UrlPreview = {
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

    const linkCard = shallow(<LinkCard urlPreview={urlPreview} cardProcessingStatus="complete" />);
    expect(linkCard.find(LinkCardTrelloBoardView)).to.have.length(1);
  });
});
