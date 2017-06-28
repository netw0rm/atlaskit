import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { FilmStripNavigator } from '@atlaskit/media-filmstrip';
import MediaGroup, { LargeCard, FilmStripWrapper } from '../../../src/nodes/mediaGroup';
import Media, { MediaNode } from '../../../src/nodes/media';
import { MediaProvider, ContextConfig as MediaContextConfig } from '@atlaskit/media-core';
import { Card } from '@atlaskit/media-card';
import {
  waitUntil,
  defaultClientId,
  defaultServiceHost,
  StoryBookTokenProvider,
} from '@atlaskit/media-test-helpers';

describe('MediaGroup', () => {
  let fixture;

  beforeEach(() => {
    fixture = document.body.appendChild(document.createElement('div'));
  });

  afterEach(() => {
    document.body.removeChild(fixture);
  });

  const mediaNode1: MediaNode = {
    type: 'media',
    attrs: {
      type: 'file',
      id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
      collection: 'MediaServicesSample'
    }
  };

  const mediaNode2: MediaNode = { ...mediaNode1 };

  it('should wrap content in a FilmStripWrapper component', () => {
    const mediaGroupSmall = mount(<MediaGroup><Media item={mediaNode1}/></MediaGroup>);
    expect(mediaGroupSmall.find(FilmStripWrapper)).to.have.length(1);

    const mediaGroupLarge = mount(<MediaGroup><Media item={mediaNode1}/><Media item={mediaNode2}/></MediaGroup>);
    expect(mediaGroupLarge.find(FilmStripWrapper)).to.have.length(1);
  });

  it('should render only child with large card dimensions', () => {
    const mediaGroup = shallow(<MediaGroup><Media item={mediaNode1}/></MediaGroup>);
    const wrapperProps = mediaGroup.find(Media).props();
    expect(wrapperProps.cardDimensions).to.equal(LargeCard);
  });

  it('should render children with their own card dimensions', () => {
    const mediaGroup = shallow(<MediaGroup><Media item={mediaNode1}/><Media item={mediaNode2}/></MediaGroup>);
    const mediaNodes =  mediaGroup.find(Media);
    expect(mediaNodes).to.have.length(2);

    mediaNodes.forEach(media => {
      const wrapperProps = media.props();
      expect(wrapperProps.cardDimensions).to.not.equal(LargeCard);
    });
  });

  it('should always render a FilmStripNavigator component', () => {
    const mediaGroupSmall = mount(<MediaGroup><Media item={mediaNode1}/></MediaGroup>);
    expect(mediaGroupSmall.find(FilmStripNavigator)).to.have.length(1);

    const mediaGroupLarge = mount(<MediaGroup><Media item={mediaNode1}/><Media item={mediaNode2}/></MediaGroup>);
    expect(mediaGroupLarge.find(FilmStripNavigator)).to.have.length(1);
  });

  it('should lazily render <Card>s inside the group', async () => {
    const cards: Array<JSX.Element> = [];
    const mediaProvider: Promise<MediaProvider> = Promise.resolve({
      viewContext: Promise.resolve<MediaContextConfig>({
        clientId: defaultClientId,
        serviceHost: defaultServiceHost,
        tokenProvider: StoryBookTokenProvider.tokenProvider
      })
    });
    const resolvedMediaProvider = await mediaProvider;
    await resolvedMediaProvider.viewContext;

    for (let x = 0; x < 100; x++) {
      cards.push(<Media item={mediaNode1} mediaProvider={mediaProvider} />);
    }

    const mediaGroup = mount(<MediaGroup>{cards}</MediaGroup>, { attachTo: fixture });
    expect(mediaGroup.find(FilmStripNavigator)).to.have.length(1);

    // Please forgive me, but we rely on react-lazy-load behaviour and there's no better, sane way to test it here.
    return waitUntil(() => {
      return !!mediaGroup.find(Card).length;
    }, 1000).then(() => {
      const numberOfCards = mediaGroup.find(Card).length;
      expect(numberOfCards).to.be.greaterThan(
        1,
        'At least one Media Card should render immediatelly in the Film Strip component'
      );

      expect(mediaGroup.find('CardView').filterWhere(card =>
        card.prop('status') === 'loading'
      ).length).to.be.greaterThan(
        0,
        'Not all cards should render in the viewport when using react-lazy-load'
      );
    });
  });
});
