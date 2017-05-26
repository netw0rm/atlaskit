import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { FilmStripNavigator } from '@atlaskit/media-filmstrip';
import { StoryBookTokenProvider, defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers';
import MediaGroup, { LargeCard, CardWrapper } from '../../../src/nodes/mediaGroup';
import Media, { MediaNode } from '../../../src/nodes/media';
import { Card } from '@atlaskit/media-card';

import * as sinon from 'sinon';

describe('MediaGroup', () => {
  let fixture;
  const testMediaItem = {
    type: 'media',
    attrs: {
      type: 'file',
      id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
      collection: 'MediaServicesSample'
    }
  } as MediaNode;


  const mediaProvider = Promise.resolve({
    viewContext: Promise.resolve({
      clientId: defaultClientId,
      serviceHost: defaultServiceHost,
      tokenProvider: StoryBookTokenProvider.tokenProvider
    })
  });

  beforeEach(() => {
    fixture = document.createElement('div');
    document.body.appendChild(fixture);
  });

  afterEach(() => {
    document.body.removeChild(fixture);
  });

  it('should render a CardWrapper component if the numOfCards prop equals 1', () => {
    const mediaGroup = shallow(<MediaGroup numOfCards={1}/>);
    expect(mediaGroup.find(CardWrapper).length).to.equal(1);
  });

  it('should render children with the proper cardDimensions prop', () => {
    const mediaGroup = mount(<MediaGroup numOfCards={1}><Media item={testMediaItem}/></MediaGroup>);
    const wrapperProps = mediaGroup.find(Media).props();
    expect(wrapperProps.cardDimensions).to.equal(LargeCard);
  });

  it('should render a FilmStripNavigator component if it has more than one media node', () => {
    const mediaGroup = shallow(<MediaGroup numOfCards={2}/>);
    expect(mediaGroup.find(CardWrapper).length).to.equal(0);
    expect(mediaGroup.find(FilmStripNavigator).length).to.equal(1);
  });

  it('should call onClick with all the items in a media group', async () => {
    const onClick = sinon.spy();
    const mediaGroup = mount(
      <MediaGroup numOfCards={2}>
        <Media item={testMediaItem} onClick={onClick} mediaProvider={mediaProvider} />
        <Media item={testMediaItem} />
      </MediaGroup>,
      { attachTo: fixture }
    );
    expect(mediaGroup.find(FilmStripNavigator).length).to.equal(1);

    const provider = await mediaProvider;
    await provider.viewContext;

    const card = mediaGroup.find(FilmStripNavigator).find(Media).first().find(Card);
    card.simulate('click');

    expect(onClick.callCount).to.equal(1);
    // console.log(onClick.lastCall.args);
    // debugger;
    expect(onClick.lastCall.args.length).to.be.greaterThan(1);
    // console.log(onClick.lastCall.args[1]);
    const items = onClick.lastCall.args[1];
    console.log(items);
    expect(items.length).to.equal(2);
    expect(items[0]).to.deep.equal(testMediaItem);
    expect(items[1]).to.deep.equal(testMediaItem);
  });
});
