/* tslint:disable:no-unused-expression */
import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import { CardImageView } from '../../src/utils/cardImageView';
import { FileIcon } from '../../src/utils';
import { CardOverlay } from '../../src/utils/cardImageView/cardOverlay';
import { UploadingView } from '../../src/utils/uploadingView';

/* tslint:disable */ //:no-unused-expressions

describe('CardImageView', () => {

  it('should render default icon according to mediaType', () => {
    const card = mount(<CardImageView mediaType="audio" status="complete"/>);

    expect(card.find(FileIcon).props().mediaType).to.equal('audio');
  });

  it('should render a custom icon when provided', () => {
    const iconUrl = 'path/to/icon';
    const card = mount(<CardImageView icon={iconUrl} status="complete"/>);

    expect(card.find('.custom-icon')).to.have.length(1);
    expect(card.find('.custom-icon').prop('src')).to.equal(iconUrl);
  });

  it('should render subtitle when provided', function() {
    const subtitle = 'Software Development and Collaboration Tools';
    const card = mount(<CardImageView subtitle={subtitle} status="complete" />);

    expect(card.find(CardOverlay).props().subtitle).to.equal(subtitle);
  });

  it('should render the overlay as NOT persistent when dataURI is a string and mediaType is "video"', function() {
    const card = shallow(<CardImageView mediaType="video" dataURI="some-data-uri" status="complete" />);

    expect(card.find(CardOverlay).props().persistent).to.be.false;
  });

  it('should render the overlay as NOT persistent when dataURI is a string and mediaType is "audio"', function() {
    const card = shallow(<CardImageView mediaType="audio" dataURI="some-data-uri" status="complete" />);

    expect(card.find(CardOverlay).props().persistent).to.be.false;
  });

  it('should render the overlay as NOT persistent when dataURI is a string and mediaType is "image"', function() {
    const card = shallow(<CardImageView mediaType="image" dataURI="some-data-uri" status="complete" />);

    expect(card.find(CardOverlay).props().persistent).to.be.false;
  });

  it('should render the overlay as persistent when dataURI is a string and mediaType is "doc"', function() {
    const card = shallow(<CardImageView mediaType="doc" dataURI="some-data-uri" status="complete" />);

    expect(card.find(CardOverlay).props().persistent).to.be.true;
  });

  it('should render the overlay as persistent when dataURI is undefined', function() {
    const card = shallow(<CardImageView mediaType="video" status="complete" />);

    expect(card.find(CardOverlay).props().persistent).to.be.true;
  });

  it('should render the UploadView when status=uploading', () => {
    const card = shallow(<CardImageView status="uploading" mediaName="foo" progress={90}/>);
    const uploadView = card.find(UploadingView);
    expect(uploadView).to.be.length(1);
    expect(uploadView.props()).to.include({
      title: 'foo',
      progress: 90
    });
  });

});
