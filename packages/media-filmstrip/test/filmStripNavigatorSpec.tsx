import * as React from 'react';
import {Component} from 'react';
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

  it('Component gets re-rendered when children are modified', (done) => {
    interface State {
      items: Array<any>;
    }

    class NavigatorWrapper extends Component<{}, State> {
      constructor(props) {
        super(props);

        this.state = {
          items: [1, 2]
        };
      }

      componentDidMount() {
        window.setTimeout(() => {
          this.state.items.push(3);
          this.setState({items: this.state.items});
        }, 10);
      }

      render() {
        return <FilmStripNavigator>
          {this.state.items}
        </FilmStripNavigator>;
      }
    }

    const navigatorWrapper = mount(<NavigatorWrapper />);

    expect(navigatorWrapper.find('li').length).to.equal(2);
    setTimeout(() => {
      expect(navigatorWrapper.find('li').length).to.equal(3);
      done();
    }, 20);
  });
});
