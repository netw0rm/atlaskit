import React from 'react';
import { mount } from 'enzyme';
import SmartSelect, { StatelessSelect } from '../src';

import { name } from '../package.json';

describe(`${name} - smart`, () => {
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  describe('render', () => {
    it('should render stateless single select', () => {
      const wrapper = mount(<SmartSelect />);
      expect(wrapper.find(StatelessSelect).length).to.equal(1);
      wrapper.unmount();
    });
  });

  describe('native search', () => {
    let wrapper;
    const items = [
      { content: 'some text', value: 1 },
      { content: 'another text', value: 2 },
      { content: 'test text 1', value: 3 },
      { content: 'test text 2', value: 4 },
      { content: 'test text 3', value: 5 },
      { content: 'again another text', value: 6 },
      { content: 'agrrrr', value: 7 },
    ];

    beforeEach(() => {
      wrapper = mount(<SmartSelect items={[{ items }]} />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    describe('when select is closed', () => {
      it('should select first matching item when a key is pressed', () => {
        wrapper.simulate('keyDown', { key: 't' });
        expect(wrapper.state('selectedItem')).to.equal(items[2]);
      });

      it('should select next matching item if the same key was pressed after an interval', (done) => {
        wrapper.simulate('keyDown', { key: 't' });
        expect(wrapper.state('selectedItem')).to.equal(items[2]);
        setTimeout(() => {
          wrapper.simulate('keyDown', { key: 't' });
          expect(wrapper.state('selectedItem')).to.equal(items[3]);

          setTimeout(() => {
            wrapper.simulate('keyDown', { key: 't' });
            expect(wrapper.state('selectedItem')).to.equal(items[4]);
            done();
          }, 210);
        }, 210);
      });

      it('should select first matching item after the selected item', () => {
        wrapper.setState({ selectedItem: items[3] });
        wrapper.simulate('keyDown', { key: 't' });
        expect(wrapper.state('selectedItem')).to.equal(items[4]);
      });

      it('should return to the first matching item when the last one was selected', (done) => {
        wrapper.setState({ selectedItem: items[3] });
        wrapper.simulate('keyDown', { key: 't' });
        expect(wrapper.state('selectedItem')).to.equal(items[4]);

        setTimeout(() => {
          wrapper.simulate('keyDown', { key: 't' });
          expect(wrapper.state('selectedItem')).to.equal(items[2]);
          done();
        }, 210);
      });
    });

    it('should "append" values if keys are pressed quickly', () => {
      wrapper.simulate('keyDown', { key: 'a' });
      expect(wrapper.state('selectedItem')).to.equal(items[1]);
      wrapper.simulate('keyDown', { key: 'g' });
      expect(wrapper.state('selectedItem')).to.equal(items[5]);
      wrapper.simulate('keyDown', { key: 'r' });
      expect(wrapper.state('selectedItem')).to.equal(items[6]);
    });
  });
});
