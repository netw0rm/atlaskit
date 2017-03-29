import * as sinon from 'sinon';
import { Context } from '@atlaskit/media-core';

export const fakeContext = (stubbedContext = {}): Context => {
  const defaultContext = {
    getMediaItemProvider: sinon.stub().returns({observable: sinon.spy()}),
    getMediaCollectionProvider: sinon.stub().returns({observable: sinon.spy()}),
    getDataUriService: sinon.stub().returns({fetchOriginalDataUri: sinon.spy(), fetchImageDataUri: sinon.spy()}),
    addLinkItem: sinon.stub().returns({observable: sinon.spy()}),
    getUrlPreviewProvider: sinon.stub().returns({observable: sinon.spy()}),
    config: {
      clientId: 'some-client',
      serviceHost: 'some-service-host',
      tokenProvider: () => Promise.resolve('some-token')
    }
  };

  const wrappedStubbedContext = {};
  Object.keys(stubbedContext).forEach(methodName => {
    wrappedStubbedContext[methodName] = sinon.stub().returns(stubbedContext[methodName]);
  });

  return {
    ...defaultContext,
    ...wrappedStubbedContext
  };

};
