import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { shallow, ShallowWrapper } from 'enzyme';
import { FileDetails } from '@atlaskit/media-core';
import { waitUntil } from '@atlaskit/media-test-helpers';

import { FileCard, FileCardProps, FileCardState, FileCardView, FileCardViewSmall } from '../../src';

describe('FileCard', () => {

  const waitUntilDataURIIsTruthy = (card: ShallowWrapper<FileCardProps, FileCardState>) => {
    return waitUntil(() => Boolean(card.instance().state.dataURI), 50);
  };

  const waitUntilDataURIIsFalsey = (card: ShallowWrapper<FileCardProps, FileCardState>) => {
    return waitUntil(() => !Boolean(card.instance().state.dataURI), 50);
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

    return waitUntilDataURIIsTruthy(card).then(() => {
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

    return waitUntilDataURIIsTruthy(card).then(() => {
      expect(card.find(FileCardViewSmall).length).to.eql(1);
      expect(card.find(FileCardViewSmall).props().dataURI).to.contain(fakeDataUri);
    });
  });

  describe('.fetchDataUri()', () => {

    it('should set dataURI to be a GIF when mimeType is GIF', () => {
      const fileDetails = {
        mimeType: 'image/gif'
      };

      const dataUriService = {
        fetchImageDataUri: sinon.stub().returns(Promise.resolve('test.jpg')),
        fetchOriginalDataUri: sinon.stub().returns(Promise.resolve('test.gif'))
      };

      const card = shallow<FileCardProps, FileCardState>(
        <FileCard appearance="small" fileDetails={fileDetails} dataURIService={dataUriService} cardProcessingStatus="complete" />
      ) as any;

      card.instance().fetchDataUri(dataUriService, fileDetails);

      return waitUntilDataURIIsTruthy(card).then(() => {
        expect(card.state().dataURI).to.be.equal('test.gif');
      });
    });

    it('should set dataURI to be undefined when mimeType is GIF and an error occurs', () => {
      const fileDetails = {
        mimeType: 'image/gif'
      };

      const dataUriService = {
        fetchImageDataUri: sinon.stub().returns(Promise.resolve('test.jpg')),
        fetchOriginalDataUri: sinon.stub().returns(Promise.reject(new Error()))
      };

      const card = shallow<FileCardProps, FileCardState>(
        <FileCard appearance="small" fileDetails={fileDetails} dataURIService={dataUriService} cardProcessingStatus="complete" />
      ) as any;

      card.setState({dataURI: 'test.exe'});
      card.instance().fetchDataUri(dataUriService, fileDetails);

      return waitUntilDataURIIsFalsey(card).then(() => {
        expect(card.state().dataURI).to.be.undefined;
      });
    });

    it('should set dataURI to be a JPG when mimeType is not GIF', () => {
      const fileDetails = {
        mimeType: 'image/jpg'
      };

      const dataUriService = {
        fetchImageDataUri: sinon.stub().returns(Promise.resolve('test.jpg')),
        fetchOriginalDataUri: sinon.stub().returns(Promise.resolve('test.gif'))
      };

      const card = shallow<FileCardProps, FileCardState>(
        <FileCard appearance="small" fileDetails={fileDetails} dataURIService={dataUriService} cardProcessingStatus="complete" />
      ) as any;

      card.instance().fetchDataUri(dataUriService, fileDetails);

      return waitUntilDataURIIsTruthy(card).then(() => {
        expect(card.state().dataURI).to.be.equal('test.jpg');
      });
    });

    it('should set dataURI to be undefined when mimeType is not GIF and and error occurs', () => {
      const fileDetails = {
        mimeType: 'image/gif'
      };

      const dataUriService = {
        fetchImageDataUri: sinon.stub().returns(Promise.resolve(new Error())),
        fetchOriginalDataUri: sinon.stub().returns(Promise.reject('test.gif'))
      };

      const card = shallow<FileCardProps, FileCardState>(
        <FileCard appearance="small" fileDetails={fileDetails} dataURIService={dataUriService} cardProcessingStatus="complete" />
      ) as any;

      card.setState({dataURI: 'test.exe'});
      card.instance().fetchDataUri(dataUriService, fileDetails);

      return waitUntilDataURIIsFalsey(card).then(() => {
        expect(card.state().dataURI).to.be.undefined;
      });
    });

  });

});
