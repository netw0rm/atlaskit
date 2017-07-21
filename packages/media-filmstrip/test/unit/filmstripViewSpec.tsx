import * as React from 'react';
import {shallow} from 'enzyme';
import * as sinon from 'sinon';

import {FilmstripView} from '../../src/filmstripView';
import {FilmStripListItem} from '../../src/filmstripView/styled';

describe('FilmstripView', () => {
  let clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    clock.restore();
  });

  it('should wrap children', () => {
    const children = [1, 2, 3];
    const element = shallow(<FilmstripView>{children}</FilmstripView>);
    element.find(FilmStripListItem).forEach((child, index) => {
      expect(child.children().text()).toEqual(`${children[index]}`);
    });
  });

  it('should re-render when children are modified', () => {
    const element = shallow(
      <FilmstripView>
        {[1, 2]}
      </FilmstripView>
    );
    expect(element.find(FilmStripListItem).length).toEqual(2);
    element.setProps({children: [1, 2, 3]});
    expect(element.find(FilmStripListItem).length).toEqual(3);
  });

  it('passes width "undefined" to FilmStripViewWrapper when width prop is falsey', () => {
    const element = shallow(
      <FilmstripView>
        {[1, 2]}
      </FilmstripView>
    );

    expect(element.find(FilmStripViewWrapper).prop('style')).to.deep.equal({width: undefined});
  });

  it('passes width to FilmstripViewWrapper when width prop is a truthy number', () => {
    const width = 1000;
    const element = shallow(
      <FilmstripView width={width}>
        {[1, 2]}
      </FilmstripView>
    );

    expect(element.find(FilmStripViewWrapper).prop('style')).to.deep.equal({width: `${width}px`});
  });

  it('Fires a real "scroll" event when users navigate through the list', () => {
    const element = shallow(
      <FilmstripView width={10}>
        {[1, 2]}
      </FilmstripView>
    );
    const instance = element.instance() as FilmstripView;
    const scrollSpy = sinon.spy();

    instance.triggerScrollEvent = scrollSpy;
    instance.navigate('right')();

    clock.tick(10);
    expect(scrollSpy.called).toEqual(true);
  });

  it('should save the right width for all child elements', () => {
    const element = shallow(
      <FilmstripView width={10}>
        {[1, 2, 3, 4]}
      </FilmstripView>
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
    const instance = element.instance() as FilmstripView;

    instance.saveChildrenWidths(children);

    expect(instance.childrenWidths[0]).to.be.equal(0);
    expect(instance.childrenWidths[1]).to.be.equal(42);
    expect(instance.childrenWidths[2]).to.be.equal(12);
    expect(instance.childrenWidths[3]).to.be.equal(16);
  });
});
