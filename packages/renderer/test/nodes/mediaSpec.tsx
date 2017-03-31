import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FileCard, FileCardView } from '@atlaskit/media-card';
import { fakeContext } from '@atlaskit/media-test-helpers';
import Media, { MediaNode } from '../../src/nodes/media';

describe('Media', () => {

  const mediaNode = {
    type: 'media',
    attrs: {
      type: 'file',
      id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
      collectionId: ['MediaServicesSample']
    }
  } as MediaNode;

  it('should render a FileCardView component if there is no mediaProvider prop', () => {
    const mediaComponent = shallow(<Media item={mediaNode}/>);
    const props = mediaComponent.find(FileCardView).props();
    expect(mediaComponent.find(FileCardView).length).to.equal(1);
    expect(props.mediaType).to.equal('unknown');
    expect(props.mediaName).to.equal('Loading…');
    mediaComponent.unmount();
  });

  it('should render a FileCard component if it has a vewContext state', () => {
    const mediaComponent = shallow(<Media item={mediaNode}/>);
    expect(mediaComponent.find(FileCardView).length).to.equal(1);
    mediaComponent.setState({
      viewContext: fakeContext()
    });
    expect(mediaComponent.find(FileCardView).length).to.equal(0);
    expect(mediaComponent.find(FileCard).length).to.equal(1);
    mediaComponent.unmount();
  });

  it('should render a FileCard component with the proper props', () => {
    const mediaComponent = shallow(<Media item={mediaNode}/>);
    expect(mediaComponent.find(FileCardView).length).to.equal(1);
    mediaComponent.setState({
      viewContext: fakeContext()
    });
    const cardProps = mediaComponent.find(FileCard).props();
    expect(cardProps.id).to.equal('5556346b-b081-482b-bc4a-4faca8ecd2de');
    expect(cardProps.collectionName).to.equal('MediaServicesSample');
    mediaComponent.unmount();
  });

});
