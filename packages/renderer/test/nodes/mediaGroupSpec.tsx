import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { FilmStripNavigator } from '@atlaskit/media-filmstrip';
import MediaGroup, { LargeCard, CardWrapper } from '../../src/nodes/mediaGroup';
import Media, { MediaNode } from '../../src/nodes/media';

describe('MediaGroup', () => {

  it('should render a CardWrapper component if the numOfCards prop equals 1', () => {
    const mediaGroup = shallow(<MediaGroup numOfCards={1}/>);
    expect(mediaGroup.find(CardWrapper).length).to.equal(1);
    mediaGroup.unmount();
  });

  it('should render children with the proper cardDimensions prop', () => {
    const mediaNode = {
      type: 'media',
      attrs: {
        type: 'file',
        id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
        collectionId: ['MediaServicesSample']
      }
    } as MediaNode;
    const mediaGroup = mount(<MediaGroup numOfCards={1}><Media item={mediaNode}/></MediaGroup>);
    const wrapperProps = mediaGroup.find(Media).props();
    expect(wrapperProps.cardDimensions).to.equal(LargeCard);
    mediaGroup.unmount();
  });

  it('should render a FilmStripNavigator component if it has more than one media node', () => {
    const mediaGroup = shallow(<MediaGroup numOfCards={2}/>);
    expect(mediaGroup.find(CardWrapper).length).to.equal(0);
    expect(mediaGroup.find(FilmStripNavigator).length).to.equal(1);
    mediaGroup.unmount();
  });

});
