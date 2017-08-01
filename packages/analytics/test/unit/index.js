/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';

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
        const spy = jest.fn();
        const Button = withAnalytics(props =>
          <button {...cleanProps(props)} />
        );
        const button = shallow(<Button onClick={spy} />);

        button.simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should fire analytics events', () => {
        const spy = jest.fn();
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
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy.mock.calls[0][0]).toBe('button.click');
      });

      it('should pass eventData to analytics events', () => {
        const spy = jest.fn();
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
        expect(spy.mock.calls[0][1].foo).toBe('bar');
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
        const spy = jest.fn();
        const listener = mount(
          <AnalyticsListener onEvent={spy}>
            <ButtonWithAnalytics analyticsId="button" />
          </AnalyticsListener>
        );

        listener.find(Button).simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy.mock.calls[0][0]).toBe('button.click');
        expect(spy.mock.calls[0][1].foo).toBe('bar');
      });

      it('should fire private analytics events', () => {
        const spy = jest.fn();
        const listener = mount(
          <AnalyticsListener matchPrivate onEvent={spy}>
            <ButtonWithAnalytics analyticsId="button" />
          </AnalyticsListener>
        );

        listener.find(Button).simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy.mock.calls[0][0]).toBe('private.button.click');
      });
    });

    describe('it should pass through analyticsId to the WrappedComponent', () => {
      class TestComponent extends Component {
        render() {
          return null;
        }
      }
      const ComponentWithAnalytics = withAnalytics(TestComponent);
      const TEST_ANALYTICS_ID = 'test.analytics.id';
      const mountWrapper = mount(<ComponentWithAnalytics analyticsId={TEST_ANALYTICS_ID} />);
      expect(mountWrapper.find('TestComponent').props()).toHaveProperty('analyticsId', TEST_ANALYTICS_ID);
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
      const spy = jest.fn();
      const listener = mount(
        <AnalyticsListener onEvent={spy}>
          <AnalyticsDecorator data={{ two: 2 }}>
            <Button analyticsId="button" analyticsData={{ one: 1 }} />
          </AnalyticsDecorator>
        </AnalyticsListener>
      );

      listener.find(Button).simulate('click');
      expect(spy.mock.calls[0][1].one).toBe(1);
      expect(spy.mock.calls[0][1].two).toBe(2);
    });

    it('should extend eventData by calling a function', () => {
      const spy = jest.fn();
      const getData = () => ({ two: 2 });
      const listener = mount(
        <AnalyticsListener onEvent={spy}>
          <AnalyticsDecorator getData={getData}>
            <Button analyticsId="button" analyticsData={{ one: 1 }} />
          </AnalyticsDecorator>
        </AnalyticsListener>
      );

      listener.find(Button).simulate('click');
      expect(spy.mock.calls[0][1].one).toBe(1);
      expect(spy.mock.calls[0][1].two).toBe(2);
    });

    it('should not extend public eventData when matchPrivate is true', () => {
      const spy = jest.fn();
      const listener = mount(
        <AnalyticsListener onEvent={spy}>
          <AnalyticsDecorator data={{ two: 2 }} matchPrivate>
            <Button analyticsId="button" analyticsData={{ one: 1 }} />
          </AnalyticsDecorator>
        </AnalyticsListener>
      );

      listener.find(Button).simulate('click');
      expect(spy.mock.calls[0][1].one).toBe(1);
      expect(spy.mock.calls[0][1].two).toBe(undefined);
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
