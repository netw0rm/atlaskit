import * as React from 'react';
import { shallow } from 'enzyme';

import { FilmStripNavigator } from '../../src';
import { FilmStripViewWrapper, FilmStripListItem } from '../../src/styled';

jest.useFakeTimers();

describe('FilmStripNavigator', () => {
  it('Wrap children into LI elements', () => {
    const children = [1, 2, 3];
    const filmstripNavigator = shallow(<FilmStripNavigator>{children}</FilmStripNavigator>);

    expect(filmstripNavigator.find(FilmStripListItem).first().children().text()).toBe(`${children[0]}`);
    expect(filmstripNavigator.find(FilmStripListItem).last().children().text()).toBe(`${children[2]}`);
  });

  it('Renders correct number of children', () => {
    const children = [<div key="1">1</div>, <div key="2">2</div>, <div key="3">3</div>];
    const filmstripNavigator = shallow(<FilmStripNavigator>{children}</FilmStripNavigator>);

    expect(filmstripNavigator.find(FilmStripListItem).length).toBe(children.length);
  });

  it('Navigator items gets re-rendered when children are modified', () => {
    const filmstripNavigator = shallow(
      <FilmStripNavigator>
        {[1, 2]}
      </FilmStripNavigator>
    );
    expect(filmstripNavigator.find(FilmStripListItem).length).toBe(2);
    filmstripNavigator.setProps({children: [1, 2, 3]});
    expect(filmstripNavigator.find(FilmStripListItem).length).toBe(3);
  });

  it('passes width "undefined" to FilmStripViewWrapper when width prop is falsey', () => {
    const filmstripNavigator = shallow(
      <FilmStripNavigator>
        {[1, 2]}
      </FilmStripNavigator>
    );

    expect(filmstripNavigator.find(FilmStripViewWrapper).prop('style')).toEqual({width: undefined});
  });

  it('passes width to FilmstripViewWrapper when width prop is a truthy number', () => {
    const width = 1000;
    const filmstripNavigator = shallow(
      <FilmStripNavigator width={width}>
        {[1, 2]}
      </FilmStripNavigator>
    );

    expect(filmstripNavigator.find(FilmStripViewWrapper).prop('style')).toEqual({width: `${width}px`});
  });

  it('Fires a real "scroll" event when users navigate through the list', () => {
    const filmstripNavigator = shallow(
      <FilmStripNavigator width={10}>
        {[1, 2]}
      </FilmStripNavigator>
    );
    const instance = filmstripNavigator.instance() as FilmStripNavigator;
    const scrollSpy = jest.fn();

    instance.triggerScrollEvent = scrollSpy;
    instance.navigate('right')();

    jest.runOnlyPendingTimers();

    expect(scrollSpy).toHaveBeenCalled();
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

    expect(instance.childrenWidths[0]).toBe(0);
    expect(instance.childrenWidths[1]).toBe(42);
    expect(instance.childrenWidths[2]).toBe(12);
    expect(instance.childrenWidths[3]).toBe(16);
  });
});
