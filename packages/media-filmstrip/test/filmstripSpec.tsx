import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { Observable } from 'rxjs';
import { MediaItemType } from '@atlaskit/media-core';
import { Card } from '@atlaskit/media-card';
import { fakeContext } from '@atlaskit/media-test-helpers';
import { FilmStrip } from '../src';

const fileType: MediaItemType = 'file';
const linkType: MediaItemType = 'link';
const link1 = {
  id: '',
  mediaItemType: linkType
};
const link2 = {
  id: '',
  mediaItemType: linkType
};
const file1 = {
  id: '',
  mediaItemType: fileType
};
const context = fakeContext({
  getMediaItemProvider: {observable: () => Observable.of([])}
});

describe('Filmstrip', () => {
  it('should use "auto" appearance when only 1 item', () => {
    const filmstrip = mount(<FilmStrip items={[link1]} actions={[]} context={context} />);

    expect(filmstrip.find(Card).props().appearance).to.equal('auto');
    filmstrip.unmount();
  });
  it('should force "image" appearance when more than 1 item is provided', () => {
    const filmstrip = mount(<FilmStrip items={[link1, link2]} actions={[]} context={context} />);

    expect(filmstrip.find(Card).first().props().appearance).to.equal('image');
    expect(filmstrip.find(Card).last().props().appearance).to.equal('image');
    filmstrip.unmount();
  });

  it('should use Cards for every item', () => {
    const filmstrip = shallow(<FilmStrip items={[link1, file1, link2]} actions={[]} context={context} />);

    expect(filmstrip.find(Card)).to.have.length(3);
    filmstrip.unmount();
  });
});
