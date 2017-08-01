import * as React from 'react';
import { shallow } from 'enzyme';
import { FileDetails } from '@atlaskit/media-core';

import { FileCard, FileCardImageView, FileCardViewSmall } from '../../../src/files';

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

    const fileCardView = card.find(FileCardImageView);
    expect(fileCardView.length).toEqual(1);
    expect(fileCardView.props()).toMatchObject(expectedProps);
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
      mediaName: details.name,
      mediaType: details.mediaType,
      mediaSize: details.size,
    };

    const card = shallow(
      <FileCard appearance="small" status="complete" details={details}/>
    );

    expect(card.find(FileCardViewSmall).length).toEqual(1);
    expect(card.find(FileCardViewSmall).props()).toMatchObject(expectedProps);
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

    expect(card.find(FileCardImageView).length).toEqual(1);
    expect(card.find(FileCardImageView).props().dataURI).toContain(fakeDataUri);
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

    expect(card.find(FileCardViewSmall).length).toEqual(1);
    expect(card.find(FileCardViewSmall).props().dataURI).toContain(fakeDataUri);
  });
});
