import * as React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {FileDetails, LinkDetails} from '@atlaskit/media-core';

import {CardView} from '../src/cardView';
import {LinkCard} from '../src/links';
import {FileCard} from '../src/files';

describe('CardView', () => {
  it('should render FileCard when no metadata is passed', () => {
    const element = shallow(
      <CardView
        status="loading"
        appearance="small"
      />
    );
    const linkCard = element.find(FileCard);
    expect(linkCard).to.be.length(1);
  });

  it('should render LinkCard with details', () => {
    const link: LinkDetails = {
      id: 'abcd',
      type: 'wha',
      url: 'https://example.com',
      title: 'foobar'
    };

    const element = shallow(
      <CardView
        status="loading"
        metadata={link}
        appearance="small"
      />
    );

    const linkCard = element.find(LinkCard);
    expect(linkCard).to.be.length(1);
    expect(linkCard.props().details).to.equal(link);
  });

  it('should render LinkCard with other props', () => {
    const link: LinkDetails = {
      id: 'abcd',
      type: 'wha',
      url: 'https://example.com',
      title: 'foobar'
    };

    const element = shallow(
      <CardView
        status="loading"
        metadata={link}
        appearance="small"
      />
    );

    const linkCard = element.find(LinkCard);
    expect(linkCard).to.be.length(1);
    expect(linkCard.prop('appearance')).to.equal('small');
  });

  it('should render FileCard with details', () => {
    const file: FileDetails = {
      id: 'abcd',
      name: 'my-file'
    };

    const element = shallow(
      <CardView
        status="loading"
        metadata={file}
        appearance="small"
      />
    );

    const card = element.find(FileCard);
    expect(card).to.be.length(1);
    expect(card.props().details).to.equal(file);
  });

  it('should render FileCard with other props', () => {
    const file: FileDetails = {
      id: 'abcd',
      name: 'my-file'
    };

    const element = shallow(
      <CardView
        status="loading"
        metadata={file}
        appearance="small"
      />
    );

    const fileCard = element.find(FileCard);
    expect(fileCard).to.be.length(1);
    expect(fileCard.prop('appearance')).to.equal('small');
  });

  it('should render LinkCard and NOT use details to determine which card to render when mediaItemType is "link"', () => {
    const file: FileDetails = {
      id: 'abcd',
      name: 'my-file'
    };

    const element = shallow(
      <CardView
        mediaItemType="link"
        status="loading"
        metadata={file}
      />
    );

    const linkCard = element.find(LinkCard);
    expect(linkCard).to.be.length(1);
  });

  it('should render FileCard and NOT use details to determine which card to render when mediaItemType is "file"', () => {
    const linkDetails: LinkDetails = {
      type: 'link',
      id: 'abcd',
      url: 'my-file',
      title: 'some-title'
    };

    const element = shallow(
      <CardView
        mediaItemType="file"
        status="loading"
        metadata={linkDetails}
      />
    );

    const linkCard = element.find(FileCard);
    expect(linkCard).to.be.length(1);
  });
});
