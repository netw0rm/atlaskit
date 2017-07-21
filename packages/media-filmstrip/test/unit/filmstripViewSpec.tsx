import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as sinon from 'sinon';

import { FilmstripView } from '../../src/filmstripView';
import { FilmStripViewWrapper, FilmStripListItem } from '../../src/styled';

describe('FilmstripView', () => {
  let clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    clock.restore();
  });

  it('Wrap children into LI elements', () => {
    const children = [1, 2, 3];
    const filmstripNavigator = shallow(<FilmStripNavigator>{children}</FilmStripNavigator>);

    expect(filmstripNavigator.find(FilmStripListItem).first().children().text()).to.equal(`${children[0]}`);
    expect(filmstripNavigator.find(FilmStripListItem).last().children().text()).to.equal(`${children[2]}`);
  });

  it('Renders correct number of children', () => {
    const children = [<div key="1">1</div>, <div key="2">2</div>, <div key="3">3</div>];
    const filmstripNavigator = shallow(<FilmStripNavigator>{children}</FilmStripNavigator>);

    expect(filmstripNavigator.find(FilmStripListItem).length).to.equal(children.length);
  });

  it('Navigator items gets re-rendered when children are modified', () => {
    const filmstripNavigator = shallow(
      <FilmStripNavigator>
        {[1, 2]}
      </FilmStripNavigator>
    );
    expect(filmstripNavigator.find(FilmStripListItem).length).to.equal(2);
    filmstripNavigator.setProps({children: [1, 2, 3]});
    expect(filmstripNavigator.find(FilmStripListItem).length).to.equal(3);
  });

  it('passes width "undefined" to FilmStripViewWrapper when width prop is falsey', () => {
    const filmstripNavigator = shallow(
      <FilmStripNavigator>
        {[1, 2]}
      </FilmStripNavigator>
    );

    expect(filmstripNavigator.find(FilmStripViewWrapper).prop('style')).to.deep.equal({width: undefined});
  });

  it('passes width to FilmstripViewWrapper when width prop is a truthy number', () => {
    const width = 1000;
    const filmstripNavigator = shallow(
      <FilmStripNavigator width={width}>
        {[1, 2]}
      </FilmStripNavigator>
    );

    expect(filmstripNavigator.find(FilmStripViewWrapper).prop('style')).to.deep.equal({width: `${width}px`});
  });

  it('Fires a real "scroll" event when users navigate through the list', () => {
    const filmstripNavigator = shallow(
      <FilmStripNavigator width={10}>
        {[1, 2]}
      </FilmStripNavigator>
    );
    const instance = filmstripNavigator.instance() as FilmStripNavigator;
    const scrollSpy = sinon.spy();

    instance.triggerScrollEvent = scrollSpy;
    instance.navigate('right')();

    clock.tick(10);
    expect(scrollSpy.called).to.equal(true);
  });

  it('should save the right width for all child elements', () => {
    const filmstripNavigator = shallow(
      <FilmStripNavigator width={10}>
        {[1, 2, 3, 4]}
      </FilmStripNavigator>
    );
    const children = [{
      clientWidth: 10
    }, {
      clientWidth: 50
    }, {
      clientWidth: 20
    }, {
      clientWidth: 30
    }] as Array<HTMLElement>;
    const instance = filmstripNavigator.instance() as FilmStripNavigator;

    instance.saveChildrenWidths(children);

    expect(instance.childrenWidths[0]).to.be.equal(0);
    expect(instance.childrenWidths[1]).to.be.equal(42);
    expect(instance.childrenWidths[2]).to.be.equal(12);
    expect(instance.childrenWidths[3]).to.be.equal(16);
  });
});
