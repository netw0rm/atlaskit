/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import {
  AnalyticsDecorator,
  AnalyticsListener,
  cleanProps,
  withAnalytics,
} from '../../src';

describe('Analytics', () => {
  it('should create a decorator component', () => {
    const component = shallow(<AnalyticsDecorator />);
    expect(component).not.toBe(undefined);
  });

  it('should create a listener component', () => {
    const component = shallow(<AnalyticsListener onEvent={() => {}} />);
    expect(component).not.toBe(undefined);
  });

  describe('withAnalytics', () => {
    it('should render the provided component', () => {
      const Button = withAnalytics(({ children }) =>
        <button>
          {children}
        </button>
      );
      const button = shallow(<Button>Hello</Button>);
      expect(button.html()).toBe('<button>Hello</button>');
    });

    it('should wrap the component in a WithAnalytics() component', () => {
      class Button extends Component {
        displayName = 'Button';
        render() {
          return <button />;
        }
      }
      const WrappedButton = withAnalytics(Button);
      expect(WrappedButton.displayName).toBe('WithAnalytics(Button)');
    });

    describe('wrapping callback props', () => {
      it('should call original callback props', () => {
        const spy = sinon.spy();
        const Button = withAnalytics(props =>
          <button {...cleanProps(props)} />
        );
        const button = shallow(<Button onClick={spy} />);

        button.simulate('click');
        expect(spy.callCount).toBe(1);
      });

      it('should fire analytics events', () => {
        const spy = sinon.spy();
        const Button = withAnalytics(
          props => <button {...cleanProps(props)} />,
          {
            onClick: 'click',
          }
        );
        const listener = mount(
          <AnalyticsListener onEvent={spy}>
            <Button analyticsId="button" />
          </AnalyticsListener>
        );

        listener.find(Button).simulate('click');
        expect(spy.callCount).toBe(1);
        expect(spy.getCall(0).args[0]).toBe('button.click');
      });

      it('should pass eventData to analytics events', () => {
        const spy = sinon.spy();
        const Button = withAnalytics(
          props => <button {...cleanProps(props)} />,
          {
            onClick: 'click',
          }
        );
        const listener = mount(
          <AnalyticsListener onEvent={spy}>
            <Button analyticsId="button" analyticsData={{ foo: 'bar' }} />
          </AnalyticsListener>
        );

        listener.find(Button).simulate('click');
        expect(spy.getCall(0).args[1].foo).toBe('bar');
      });
    });

    describe('integrated usage', () => {
      class Button extends Component {
        onClick = () => {
          this.props.fireAnalyticsEvent('click', { foo: 'bar' });
          this.props.firePrivateAnalyticsEvent('private.button.click');
        };
        render() {
          const props = cleanProps(this.props);
          return <button {...props} onClick={this.onClick} />;
        }
      }
      const ButtonWithAnalytics = withAnalytics(Button);

      it('should fire analytics events', () => {
        const spy = sinon.spy();
        const listener = mount(
          <AnalyticsListener onEvent={spy}>
            <ButtonWithAnalytics analyticsId="button" />
          </AnalyticsListener>
        );

        listener.find(Button).simulate('click');
        expect(spy.callCount).toBe(1);
        expect(spy.getCall(0).args[0]).toBe('button.click');
        expect(spy.getCall(0).args[1].foo).toBe('bar');
      });

      it('should fire private analytics events', () => {
        const spy = sinon.spy();
        const listener = mount(
          <AnalyticsListener matchPrivate onEvent={spy}>
            <ButtonWithAnalytics analyticsId="button" />
          </AnalyticsListener>
        );

        listener.find(Button).simulate('click');
        expect(spy.callCount).toBe(1);
        expect(spy.getCall(0).args[0]).toBe('private.button.click');
      });
    });
  });

  describe('AnalyticsDecorator', () => {
    const Button = withAnalytics(
      class B extends Component {
        onClick = () => {
          this.props.fireAnalyticsEvent('click');
          this.props.firePrivateAnalyticsEvent('private.button.click', {
            one: 1,
          });
        };
        render() {
          const props = cleanProps(this.props);
          return <button {...props} onClick={this.onClick} />;
        }
      }
    );

    it('should extend eventData for analytics events', () => {
      const spy = sinon.spy();
      const listener = mount(
        <AnalyticsListener onEvent={spy}>
          <AnalyticsDecorator data={{ two: 2 }}>
            <Button analyticsId="button" analyticsData={{ one: 1 }} />
          </AnalyticsDecorator>
        </AnalyticsListener>
      );

      listener.find(Button).simulate('click');
      expect(spy.getCall(0).args[1].one).toBe(1);
      expect(spy.getCall(0).args[1].two).toBe(2);
    });

    it('should extend eventData by calling a function', () => {
      const spy = sinon.spy();
      const getData = () => ({ two: 2 });
      const listener = mount(
        <AnalyticsListener onEvent={spy}>
          <AnalyticsDecorator getData={getData}>
            <Button analyticsId="button" analyticsData={{ one: 1 }} />
          </AnalyticsDecorator>
        </AnalyticsListener>
      );

      listener.find(Button).simulate('click');
      expect(spy.getCall(0).args[1].one).toBe(1);
      expect(spy.getCall(0).args[1].two).toBe(2);
    });

    it('should not extend public eventData when matchPrivate is true', () => {
      const spy = sinon.spy();
      const listener = mount(
        <AnalyticsListener onEvent={spy}>
          <AnalyticsDecorator data={{ two: 2 }} matchPrivate>
            <Button analyticsId="button" analyticsData={{ one: 1 }} />
          </AnalyticsDecorator>
        </AnalyticsListener>
      );

      listener.find(Button).simulate('click');
      expect(spy.getCall(0).args[1].one).toBe(1);
      expect(spy.getCall(0).args[1].two).toBe(undefined);
    });
  });

  describe('cleanProps', () => {
    it('should remove fireAnalyticsEvent and firePrivateAnalyticsEvent', () => {
      const dirty = cleanProps({
        fireAnalyticsEvent: true,
        firePrivateAnalyticsEvent: true,
        clean: true,
      });
      expect(dirty.clean).toBe(true);
      expect(dirty.fireAnalyticsEvent).toBe(undefined);
      expect(dirty.firePrivateAnalyticsEvent).toBe(undefined);
    });
  });
});
