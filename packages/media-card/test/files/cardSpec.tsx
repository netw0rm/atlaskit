import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { FileDetails } from '@atlaskit/media-core';

import { FileCard, FileCardView, FileCardViewSmall } from '../../src/files';

describe('FileCard', () => {

  it('should render cardFileView with details passed through to props', function() {
    const details: FileDetails = {
      mediaType: 'image',
      mimeType: 'image/jpeg',
      name: 'some-image.jpg',
      processingStatus: 'succeeded',
      size: 123456,
      artifacts: {}
    };

    const expectedProps = {
      status: 'complete',
      dimensions: undefined,

      mediaName: details.name,
      mediaType: details.mediaType,
      mediaSize: details.size,
    };

    const card = shallow(
      <FileCard status="complete" details={details}/>
    );

    const fileCardView = card.find(FileCardView);
    expect(fileCardView.length).to.eql(1);
    expect(fileCardView.props()).to.contain(expectedProps);
  });

  it('should render cardFileViewSmall with details passed through to props', () => {
    const details: FileDetails = {
      mediaType: 'image',
      mimeType: 'image/jpeg',
      name: 'some-image.jpg',
      processingStatus: 'succeeded',
      size: 123456,
      artifacts: {}
    };

    const expectedProps = {
      width: undefined,

      mediaName: details.name,
      mediaType: details.mediaType,
      mediaSize: details.size,
    };

    const card = shallow(
      <FileCard appearance="small" status="complete" details={details}/>
    );

    expect(card.find(FileCardViewSmall).length).to.eql(1);
    expect(card.find(FileCardViewSmall).props()).to.contain(expectedProps);
  });

  it('should render fileCardView with dataUri when passed', () => {
    const fakeDataUri: string = 'l33tdatauri';

    const details: FileDetails = {
      mediaType: 'image',
      mimeType: 'image/jpeg',
      name: 'some-image.jpg',
      processingStatus: 'succeeded',
      size: 123456,
      artifacts: {}
    };

    const card = shallow(
      <FileCard status="complete" details={details} dataURI={fakeDataUri}/>
    );

    expect(card.find(FileCardView).length).to.eql(1);
    expect(card.find(FileCardView).props().dataURI).to.contain(fakeDataUri);
  });

  it('should render fileCardViewSmall with dataUri when passed', () => {
    const fakeDataUri: string = 'l33tdatauri';

    const details: FileDetails = {
      mediaType: 'image',
      mimeType: 'image/jpeg',
      name: 'some-image.jpg',
      processingStatus: 'succeeded',
      size: 123456,
      artifacts: {}
    };

    const card = shallow(
      <FileCard appearance="small" status="complete" details={details} dataURI={fakeDataUri}/>
    );

    expect(card.find(FileCardViewSmall).length).to.eql(1);
    expect(card.find(FileCardViewSmall).props().dataURI).to.contain(fakeDataUri);
  });

});
