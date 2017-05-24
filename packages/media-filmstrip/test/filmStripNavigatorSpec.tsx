import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { FilmStripNavigator } from '../src';
import { FilmStripViewWrapper } from '../src/styled';

describe('FilmStripNavigator', () => {
  it('Wrap children into LI elements', () => {
    const children = [1, 2, 3];
    const filmstripNavigator = shallow(<FilmStripNavigator>{children}</FilmStripNavigator>);

    expect(filmstripNavigator.find('li').first().text()).to.equal(`${children[0]}`);
    expect(filmstripNavigator.find('li').last().text()).to.equal(`${children[2]}`);
  });

  it('Renders correct number of children', () => {
    const children = [<div key="1">1</div>, <div key="2">2</div>, <div key="3">3</div>];
    const filmstripNavigator = mount(<FilmStripNavigator>{children}</FilmStripNavigator>);

    expect(filmstripNavigator.find('li').length).to.equal(children.length);
  });

  it('Navigator items gets re-rendered when children are modified', () => {
    const filmstripNavigator = shallow(
      <FilmStripNavigator>
        {[1, 2]}
      </FilmStripNavigator>
    );
    expect(filmstripNavigator.find('li').length).to.equal(2);
    filmstripNavigator.setProps({children: [1, 2, 3]});
    expect(filmstripNavigator.find('li').length).to.equal(3);
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
});
