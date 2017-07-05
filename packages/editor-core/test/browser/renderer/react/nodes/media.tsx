import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { MediaProvider } from '@atlaskit/media-core';
import Media from '../../../../../src/renderer/react/nodes/media';
import { MediaType } from '../../../../../src/schema';
import ProviderFactory from '../../../../../src/providerFactory';

const mediaProvider: Promise<MediaProvider> = Promise.resolve({
  viewContext: Promise.resolve({})
});

const providerFactory = new ProviderFactory();
providerFactory.setProvider('mediaProvider', mediaProvider);

describe('Media', () => {

  const mediaNode = {
    type: 'media',
    attrs: {
      type: 'file',
      id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
      collection: 'MediaServicesSample'
    }
  };

  it('should render a media component with the proper props', async () => {
    const mediaComponent = shallow(
      <Media
        type={mediaNode.attrs.type as MediaType}
        id={mediaNode.attrs.id}
        collection={mediaNode.attrs.collection}
      />);

    expect(mediaComponent.find('WithProviders').length).to.equal(1);
  });

});
