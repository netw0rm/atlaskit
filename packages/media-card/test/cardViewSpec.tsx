import * as React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {FileDetails, LinkDetails} from '@atlaskit/media-core';

import {CardView} from '../src/cardView';
import {LinkCard} from '../src/links';
import {FileCard} from '../src/files';

describe('CardView', () => {

  it('should render LinkCard when no metadata is passed', () => {
    const element = shallow(
      <CardView
        status="loading"
        appearance="small"
      />
    );
    const linkCard = element.find(LinkCard);
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

    const linkCard = element.find(FileCard);
    expect(linkCard).to.be.length(1);
    expect(linkCard.prop('appearance')).to.equal('small');
  });

});
