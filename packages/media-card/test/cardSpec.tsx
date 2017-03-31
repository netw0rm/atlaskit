import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { fakeContext } from '@atlaskit/media-test-helpers';

import { Card, LinkCard, FileCard, UrlPreviewIdentifier, MediaIdentifier } from '../src';

describe('Card', function() {
  it('should load the stateful link card when passed a UrlPreviewIdentifier', function() {
    const dummyUrl = 'http://some.url.com';
    const identifier: UrlPreviewIdentifier = {
      url: dummyUrl,
      mediaItemType: 'link'
    };

    const context = fakeContext();

    const card = shallow(<Card context={context} identifier={identifier} />);
    const linkCard = card.find(LinkCard);

    expect(linkCard).to.have.length(1);
    expect(linkCard.props().context).to.deep.equal(context);
    expect(linkCard.props().link).to.deep.equal(dummyUrl);
    card.unmount();
  });

  it('should load the stateful link card when passed a MediaIdentifier with mediaItemType "link"', function() {
    const identifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'link',
      collectionName: 'some-collection-name'
    };

    const context = fakeContext();

    const card = shallow(<Card context={context} identifier={identifier} />);
    const linkCard = card.find(LinkCard);

    expect(linkCard).to.have.length(1);
    expect(linkCard.props().context).to.deep.equal(context);
    expect(linkCard.props().link).to.deep.equal(identifier);
    card.unmount();
  });

  it('should load the stateful file card when passed a MediaIdentifier with mediaItemType "file"', function() {
    const dummyId = 'some-random-id';
    const dummyCollectionName = 'some-collection-name';

    const identifier: MediaIdentifier = {
      id: dummyId,
      mediaItemType: 'file',
      collectionName: dummyCollectionName
    };

    const context = fakeContext();

    const card = shallow(<Card context={context} identifier={identifier} />);
    const fileCard = card.find(FileCard);

    expect(fileCard).to.have.length(1);
    expect(fileCard.props().context).to.deep.equal(context);
    expect(fileCard.props().id).to.deep.equal(dummyId);
    expect(fileCard.props().collectionName).to.deep.equal(dummyCollectionName);
    card.unmount();
  });
});
