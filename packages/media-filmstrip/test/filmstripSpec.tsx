import * as React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {FilmStripView, FilmStripViewItem} from '../src/index';
import {ArrowLeftWrapper, ArrowRightWrapper} from '../src/styled';

const mountFilmStrip = (container: HTMLDivElement, items: Array<FilmStripViewItem>, width: number) => {
  const wrapper = mount(<FilmStripView items={items} width={width} />, {attachTo: container});

  return wrapper;
};

const waitAndContinue = (f: () => void) => {
  setTimeout(f, 1000);
};

describe.skip('Filmstrip', () => {
  const items: Array<FilmStripViewItem> = [
    {
      id: 'some-id-1',
      dataURI: 'some-data-uri-1',
      mediaName: 'some-name-1',
      mediaType: 'image'
    },
    {
      id: 'some-id-2',
      dataURI: 'some-data-uri-2',
      mediaName: 'some-name-2',
      mediaType: 'image'
    },
    {
      id: 'some-id-3',
      dataURI: 'some-data-uri-3',
      mediaName: 'some-name-3',
      mediaType: 'image'
    },
    {
      id: 'some-id-4',
      dataURI: 'some-data-uri-4',
      mediaName: 'some-name-4',
      mediaType: 'image'
    },
    {
      id: 'some-id-5',
      dataURI: 'some-data-uri-5',
      mediaName: 'some-name-5',
      mediaType: 'image'
    },
    {
      id: 'some-id-6',
      dataURI: 'some-data-uri-6',
      mediaName: 'some-name-6',
      mediaType: 'image'
    },
    {
      id: 'some-id-7',
      dataURI: 'some-data-uri-7',
      mediaName: 'some-name-7',
      mediaType: 'image'
    },
    {
      id: 'some-id-8',
      dataURI: 'some-data-uri-8',
      mediaName: 'some-name-8',
      mediaType: 'image'
    },
    {
      id: 'some-id-9',
      dataURI: 'some-data-uri-9',
      mediaName: 'some-name-9',
      mediaType: 'image'
    }

  ];

  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should contain all provided items', () => {
    const filmStrip = mountFilmStrip(container, items, 500);

    expect(filmStrip.find('li').length).to.be.equal(items.length);
  });

  it('should initially have right arrow with large collection', (done) => {
    const filmStrip = mountFilmStrip(container, items, 500);

    waitAndContinue(() => {
      expect(filmStrip.find(ArrowLeftWrapper).length).to.equal(0);
      expect(filmStrip.find(ArrowRightWrapper).length).to.equal(1);

      filmStrip.detach();
      done();
    });
  });

  it('should initially have no arrows with small collection', (done) => {
    const smallCollection = items.slice(0, 2);
    const filmStrip = mountFilmStrip(container, smallCollection, 500);

    waitAndContinue(() => {
      expect(filmStrip.find(ArrowLeftWrapper).length).to.equal(0);
      expect(filmStrip.find(ArrowRightWrapper).length).to.equal(0);

      filmStrip.detach();
      done();
    });
  });

  it('should show both arrows after moving right', (done) => {
    const filmStrip = mountFilmStrip(container, items, 500);

    waitAndContinue(() => {
      filmStrip.find(ArrowRightWrapper).first().simulate('click');

      waitAndContinue(() => {
        expect(filmStrip.find(ArrowLeftWrapper).length).to.equal(1);
        expect(filmStrip.find(ArrowRightWrapper).length).to.equal(1);

        filmStrip.detach();
        done();
      });
    });
  });

  it('should show only right arrow in the leftmost position', (done) => {
    const filmStrip = mountFilmStrip(container, items, 500);

    waitAndContinue(() => {
      filmStrip.find(ArrowRightWrapper).first().simulate('click');

      waitAndContinue(() => {
        filmStrip.find(ArrowLeftWrapper).first().simulate('click');

        waitAndContinue(() => {
          expect(filmStrip.find(ArrowLeftWrapper).length).to.equal(0);
          expect(filmStrip.find(ArrowRightWrapper).length).to.equal(1);

          filmStrip.detach();
          done();
        });
      });
    });
  });
});
