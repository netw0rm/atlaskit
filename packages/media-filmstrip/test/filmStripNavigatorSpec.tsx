import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { FilmStripNavigator } from '../src';

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
});
