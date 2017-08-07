/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';

import {
  AnalyticsListener,
  cleanProps,
  withAnalytics,
} from '../../src';

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

    it('should fire analytics events when fireAnalyticsEvent is used directly', () => {
      const spy = jest.fn();
      const Button = withAnalytics(
        props => <button {...cleanProps(props)} />,
        fireAnalyticsEvent => ({
          onClick: () => fireAnalyticsEvent('click'),
        })
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

    describe('should pass through analyticsId to the WrappedComponent', () => {
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

    it('should use defaultProps for analyticsId and analyticsData', () => {
      const spy = jest.fn();
      const Button = withAnalytics(
        props => <button {...cleanProps(props)} />,
        {
          onClick: 'click',
        },
        {
          analyticsId: 'button',
          analyticsData: { foo: 'bar' },
        }
      );
      const listener = mount(
        <AnalyticsListener onEvent={spy}>
          <Button />
        </AnalyticsListener>
      );

      listener.find(Button).simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('button.click', { foo: 'bar' });
    });

    it('should override defaultProps with specified analyticsId and analyticsData', () => {
      const spy = jest.fn();
      const Button = withAnalytics(
        props => <button {...cleanProps(props)} />,
        {
          onClick: 'click',
        },
        {
          analyticsId: 'button',
          analyticsData: { foo: 'bar' },
        }
      );
      const listener = mount(
        <AnalyticsListener onEvent={spy}>
          <Button analyticsId="specified.button" analyticsData={{ one: 1 }} />
        </AnalyticsListener>
      );

      listener.find(Button).simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('specified.button.click', { one: 1 });
    });

    it('should not fire analytics if missing analyticsId', () => {
      const spy = jest.fn();
      const Button = withAnalytics(
        props => <button {...cleanProps(props)} />,
        {
          onClick: 'click',
        }
      );
      const listener = mount(
        <AnalyticsListener onEvent={spy}>
          <Button analyticsData={{ one: 1 }} />
        </AnalyticsListener>
      );

      listener.find(Button).simulate('click');
      expect(spy).toHaveBeenCalledTimes(0);
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
});
