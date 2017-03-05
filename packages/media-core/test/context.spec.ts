import * as chai from 'chai';
import { ContextFactory } from '../src/context/context';

const expect = chai.expect;

const tokenProvider = function () {
  return Promise.resolve('some-token-that-does-not-really-matter-in-this-tests');
};

describe('Context', () => {
  it('should return different mediaItemProviders for different fileIds', () => {
    const fileId = 'some-id';
    const fileId2 = 'some-other-id';
    const context = ContextFactory.create({
      clientId: 'some-clientId',
      serviceHost: 'service-host',
      tokenProvider
    });
    const mediaItemProvider = context.getMediaItemProvider(fileId, 'file');
    expect(mediaItemProvider).to.not.equal(context.getMediaItemProvider(fileId2, 'file'));
  });
});
