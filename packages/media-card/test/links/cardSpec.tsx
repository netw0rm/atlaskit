import * as React from 'react';
import { expect } from 'chai';
import { Observable } from 'rxjs';
import { mount } from 'enzyme';
import { LinkCard, LinkCardPlayer, LinkCardGenericView, LinkCardTrelloBoardView } from '../../src';
import { fakeContextFrom } from '@atlaskit/media-test-helpers';

describe('LinkCard', () => {
  it('should render the default preview when is a external link', () => {
    const context = fakeContextFrom({
      getUrlPreviewProvider: {
        type: 'link',
        title: 'Atlassian',
        resources: {}
      }
    });
    const link = 'https://atlassian.com';
    const linkCard = mount(<LinkCard context={context} link={link} />);

    expect(linkCard.find(LinkCardGenericView)).to.have.length(1);
  });

  it('should use cardPlayer component if we have an embed available', () => {
    const context = fakeContextFrom({
      getUrlPreviewProvider: {
        type: 'media',
        resources: {
          player: 'https://www.youtube.com/embed/zso6jskUaS8?feature=oembed',
        }
      }
    });
    const link = 'https://www.youtube.com/watch?v=zso6jskUaS8';
    const linkCard = mount(<LinkCard context={context} link={link} />);

    expect(linkCard.find(LinkCardPlayer)).to.have.length(1);
  });

  it('should render a TrelloBoard preview when link contains a trello board url', () => {
    const context = fakeContextFrom({
      getUrlPreviewProvider: {
        type: 'media',
        resources: {
          app: {
            type: 'trello_board',
            name: 'Public Trello boards list',
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
      }
    });
    const link = 'https://trello.com/b/rq2mYJNn/public-trello-boards';
    const linkCard = mount(<LinkCard context={context} link={link} />);

    expect(linkCard.find(LinkCardTrelloBoardView)).to.have.length(1);
  });
});
