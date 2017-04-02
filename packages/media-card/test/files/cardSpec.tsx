import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { shallow, ShallowWrapper } from 'enzyme';
import { FileDetails } from '@atlaskit/media-core';
import { waitUntil } from '@atlaskit/media-test-helpers';

import { FileCard, FileCardProps, FileCardState, FileCardView, FileCardViewSmall } from '../../src';

describe('FileCard', () => {
  const waitUntilCardIsLoaded = (card: ShallowWrapper<FileCardProps, FileCardState>) => {
    return waitUntil(() => !!card.instance().state.dataURI, 50);
  };

  it('should render cardFileView with fileDetails passed through to props', function() {
    const fakeDataUri: string = 'l33tdatauri';

    const fileDetails: FileDetails = {
      mediaType: 'image',
      mimeType: 'image/jpeg',
      name: 'some-image.jpg',
      processingStatus: 'succeeded',
      size: 123456,
      artifacts: {}
    };

    const expectedProps = {
      loading: false,
      dimensions: undefined,

      mediaName: fileDetails.name,
      mediaType: fileDetails.mediaType,
      mediaSize: fileDetails.size,
    };

    const dataUriService = {
      fetchImageDataUri: sinon.stub().returns(Promise.resolve(fakeDataUri)),
      fetchOriginalDataUri: sinon.stub().returns(Promise.resolve(fakeDataUri))
    };

    const card = shallow(
      <FileCard fileDetails={fileDetails} cardProcessingStatus="complete" dataURIService={dataUriService} />
    );

    expect(card.find(FileCardView).length).to.eql(1);
    expect(card.find(FileCardView).props()).to.contain(expectedProps);
  });

  it('should render cardFileViewSmall with fileDetails passed through to props', () => {
    const fakeDataUri: string = 'l33tdatauri';

    const fileDetails: FileDetails = {
      mediaType: 'image',
      mimeType: 'image/jpeg',
      name: 'some-image.jpg',
      processingStatus: 'succeeded',
      size: 123456,
      artifacts: {}
    };

    const expectedProps = {
      loading: false,
      width: undefined,

      mediaName: fileDetails.name,
      mediaType: fileDetails.mediaType,
      mediaSize: fileDetails.size,
    };

    const dataUriService = {
      fetchImageDataUri: sinon.stub().returns(Promise.resolve(fakeDataUri)),
      fetchOriginalDataUri: sinon.stub().returns(Promise.resolve(fakeDataUri))
    };

    const card = shallow(
      <FileCard appearance="small" fileDetails={fileDetails} cardProcessingStatus="complete" dataURIService={dataUriService} />
    );

    expect(card.find(FileCardViewSmall).length).to.eql(1);
    expect(card.find(FileCardViewSmall).props()).to.contain(expectedProps);
  });

  it('should render fileCardView with dataUri when dataURIService resolves', () => {
    const fakeDataUri: string = 'l33tdatauri';

    const fileDetails: FileDetails = {
      mediaType: 'image',
      mimeType: 'image/jpeg',
      name: 'some-image.jpg',
      processingStatus: 'succeeded',
      size: 123456,
      artifacts: {}
    };

    const dataUriService = {
      fetchImageDataUri: sinon.stub().returns(Promise.resolve(fakeDataUri)),
      fetchOriginalDataUri: sinon.stub().returns(Promise.resolve(fakeDataUri))
    };

    const card = shallow<FileCardProps, FileCardState>(
      <FileCard fileDetails={fileDetails} cardProcessingStatus="complete" dataURIService={dataUriService} />
    );

    return waitUntilCardIsLoaded(card).then(() => {
      expect(card.find(FileCardView).length).to.eql(1);
      expect(card.find(FileCardView).props().dataURI).to.contain(fakeDataUri);
    });
  });

  it('should render fileCardViewSmall with dataUri when dataURIService resolves', () => {
    const fakeDataUri: string = 'l33tdatauri';

    const fileDetails: FileDetails = {
      mediaType: 'image',
      mimeType: 'image/jpeg',
      name: 'some-image.jpg',
      processingStatus: 'succeeded',
      size: 123456,
      artifacts: {}
    };

    const dataUriService = {
      fetchImageDataUri: sinon.stub().returns(Promise.resolve(fakeDataUri)),
      fetchOriginalDataUri: sinon.stub().returns(Promise.resolve(fakeDataUri))
    };

    const card = shallow<FileCardProps, FileCardState>(
      <FileCard appearance="small" fileDetails={fileDetails} cardProcessingStatus="complete" dataURIService={dataUriService} />
    );

    return waitUntilCardIsLoaded(card).then(() => {
      expect(card.find(FileCardViewSmall).length).to.eql(1);
      expect(card.find(FileCardViewSmall).props().dataURI).to.contain(fakeDataUri);
    });
  });
});
