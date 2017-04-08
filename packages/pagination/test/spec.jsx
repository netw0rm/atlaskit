import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import Button from '@atlaskit/button';
import AkPagination, { Pagination } from '../src';

import { name } from '../package.json';

describe(name, () => {
  describe('stateless', () => {
    it('should not render when total is 0', () => {
      const wrapper = mount(<Pagination total={0} current={0} />);
      expect(wrapper.find(Button).length).to.equal(0);
      wrapper.unmount();
    });

    it('should render pages and Prev/Next buttons when total is not 0', () => {
      const wrapper = mount(<Pagination total={2} />);
      const buttons = wrapper.find(Button);
      expect(buttons.length).to.equal(4);
      expect(buttons.at(0).text()).to.equal('Prev');
      expect(buttons.at(1).text()).to.equal('1');
      expect(buttons.at(2).text()).to.equal('2');
      expect(buttons.at(3).text()).to.equal('Next');
      wrapper.unmount();
    });

    it('should render Prev button disabled when current in 1', () => {
      const wrapper = mount(<Pagination total={3} />);
      const prevButton = wrapper.find(Button).at(0);
      expect(prevButton.prop('isDisabled')).to.equal(true);
      wrapper.unmount();
    });

    it('should render Next button disabled when current in 1', () => {
      const wrapper = mount(<Pagination total={3} current={3} />);
      const nextButton = wrapper.find(Button).at(4);
      expect(nextButton.prop('isDisabled')).to.equal(true);
      wrapper.unmount();
    });

    it('should invoke callback passed to onSetPage', () => {
      const onSetPage = spy();
      const wrapper = mount(<Pagination total={3} current={2} onSetPage={onSetPage} />);
      const buttons = wrapper.find(Button);

      buttons.at(1).simulate('click');
      expect(onSetPage.calledOnce).to.equal(true);
      expect(onSetPage.calledWith(1)).to.equal(true);

      buttons.at(3).simulate('click');
      expect(onSetPage.calledTwice).to.equal(true);
      expect(onSetPage.calledWith(3)).to.equal(true);
      wrapper.unmount();
    });

    describe('shouldn\'t invoke callback passed to onSetPage', () => {
      it('when clicked on active page', () => {
        const onSetPage = spy();
        const wrapper = mount(
          <Pagination
            total={3}
            current={2}
            onSetPage={onSetPage}
          />
            );
        const buttons = wrapper.find(Button);
        buttons.at(2).simulate('click');
        expect(onSetPage.calledOnce).to.equal(false);
        wrapper.unmount();
      });

      it('when clicked on Prev and first page is active', () => {
        const onSetPage = spy();
        const wrapper = mount(
          <Pagination
            total={3}
            current={1}
            onSetPage={onSetPage}
          />
            );
        const buttons = wrapper.find(Button);
        buttons.at(1).simulate('click');
        expect(onSetPage.calledOnce).to.equal(false);
        wrapper.unmount();
      });

      it('when clicked on Next and last page is active', () => {
        const onSetPage = spy();
        const wrapper = mount(
          <Pagination
            total={3}
            current={3}
            onSetPage={onSetPage}
          />
            );
        const buttons = wrapper.find(Button);
        buttons.at(4).simulate('click');
        expect(onSetPage.calledOnce).to.equal(false);
        wrapper.unmount();
      });
    });
  });

  describe('stateful', () => {
    describe('should change current page', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = mount(
          <AkPagination
            total={10}
            defaultCurrent={3}
          />
        );
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it('upon clicking on corresponding button', () => {
        let buttons = wrapper.find(Button);
        buttons.at(2).simulate('click');
        expect(wrapper.state('current')).to.equal(2);
        buttons = wrapper.find(Button);
        expect(buttons.at(2).prop('isDisabled')).to.equal(true);
        expect(buttons.at(3).prop('isDisabled')).to.equal(false);
      });

      it('upon clicking on Prev button', () => {
        let buttons = wrapper.find(Button);
        buttons.at(0).simulate('click');
        expect(wrapper.state('current')).to.equal(2);
        buttons = wrapper.find(Button);
        expect(buttons.at(2).prop('isDisabled')).to.equal(true);
        expect(buttons.at(3).prop('isDisabled')).to.equal(false);
      });

      it('upon clicking on Next button', () => {
        let buttons = wrapper.find(Button);
        buttons.at(11).simulate('click');
        expect(wrapper.state('current')).to.equal(4);
        buttons = wrapper.find(Button);
        expect(buttons.at(4).prop('isDisabled')).to.equal(true);
        expect(buttons.at(3).prop('isDisabled')).to.equal(false);
      });
    });
  });
});
