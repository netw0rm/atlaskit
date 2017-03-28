// import * as React from 'react';
// import { expect } from 'chai';
// import { mount } from 'enzyme';
// import { MediaItemType } from '@atlaskit/media-core';
// import { Card } from '@atlaskit/media-card';
// import { createStorybookContext } from '@atlaskit/media-test-helpers';
// import { FilmStrip } from '../src';

// const fileType: MediaItemType = 'file';
// const linkType: MediaItemType = 'link';

// const link1 = {
//   id: 'fd119e6a-7881-4aac-8d31-daee546679ca',
//   mediaItemType: linkType
// };
// const context = createStorybookContext();
// const link2 = {
//   id: 'e2365f30-1e08-4259-9372-56247303d1ec',
//   mediaItemType: linkType
// };
// const file1 = {
//   id: '71cd7e7d-4e86-4b89-a0b4-7f6ffe013c94',
//   mediaItemType: fileType
// };

// describe('Filmstrip', () => {
//   it('should use "auto" appearance when only 1 item', () => {
//     const filmstrip = mount(<FilmStrip items={[link1]} actions={[]} context={context} />);

//     expect(filmstrip.find(Card).props().appearance).to.equal('auto');
//   });
  // it('should force "image" appearance when more than 1 item is provided', () => {
  //   const filmstrip = mount(<FilmStrip  />);

  //   expect(filmstrip.find(FileIcon).props().mediaType).to.equal('audio');
  // });

  // it('should use Cards for every item', () => {
  //   const filmstrip = mount(<FilmStrip  />);
  //   Card
  //   expect(card.find('.custom-icon')).to.have.length(1);
  //   expect(card.find('.custom-icon').prop('src')).to.equal(iconUrl);
  // });
// });
