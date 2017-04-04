import { stub } from 'sinon';
import { mount } from 'enzyme';
import React, { PropTypes } from 'react';
import { withAnalytics, AnalyticsProvider } from '../src';

const Example = ({ onFocus, onChange }) => (
  <input onFocus={onFocus} onChange={onChange} />
);

Example.propTypes = {
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
};

const WrappedExample = withAnalytics(trigger => ({
  onFocus: () => trigger('focus'),
  onChange: e => trigger('change', {
    length: e.target.value.length,
  }),
}))(Example);

describe('analytics provider and withAnalytics', () => {
  it('should propagate analytics events from wrapped components to the provider', () => {
    const onEvent = stub();
    const app = mount(
      <AnalyticsProvider onEvent={onEvent}>
        <WrappedExample externalId="test.input" />
      </AnalyticsProvider>
    );

    app.find('input').simulate('focus');

    expect(onEvent.callCount).to.equal(1);
    expect(onEvent.getCall(0).args).to.deep.equal([
      {
        externalId: 'test.input',
        type: 'focus',
        payload: {},
      },
    ]);
  });

  it('should not propagate events if no externalId is provided', () => {
    const onEvent = stub();
    const app = mount(
      <AnalyticsProvider onEvent={onEvent}>
        <WrappedExample />
      </AnalyticsProvider>
    );

    app.find('input').simulate('focus');

    expect(onEvent.callCount).to.equal(0);
  });

  it('should include the payload if provided', () => {
    const onEvent = stub();
    const app = mount(
      <AnalyticsProvider onEvent={onEvent}>
        <WrappedExample externalId="test.input" />
      </AnalyticsProvider>
    );

    app.find('input').simulate('change', {
      target: { value: 'abc' },
    });

    expect(onEvent.callCount).to.equal(1);
    expect(onEvent.getCall(0).args).to.deep.equal([
      {
        externalId: 'test.input',
        type: 'change',
        payload: { length: 3 },
      },
    ]);
  });

  it('should distinguish between multiple wrapped components', () => {
    const onEvent = stub();
    const app = mount(
      <AnalyticsProvider onEvent={onEvent}>
        <div>
          <WrappedExample externalId="test.input" />
          <WrappedExample externalId="test.input-2" />
        </div>
      </AnalyticsProvider>
    );

    app.find('input').at(0).simulate('change', {
      target: { value: '' },
    });
    app.find('input').at(1).simulate('focus');

    expect(onEvent.callCount).to.equal(2);
    expect(onEvent.getCall(0).args).to.deep.equal([
      {
        externalId: 'test.input',
        type: 'change',
        payload: { length: 0 },
      },
    ]);
    expect(onEvent.getCall(1).args).to.deep.equal([
      {
        externalId: 'test.input-2',
        type: 'focus',
        payload: {},
      },
    ]);
  });

  it('should pass through any handlers on the wrapped component', () => {
    const onFocus = stub();
    const onEvent = stub();
    const app = mount(
      <AnalyticsProvider onEvent={onEvent}>
        <WrappedExample
          externalId="test.input"
          onFocus={onFocus}
        />
      </AnalyticsProvider>
    );

    app.find('input').simulate('focus');

    expect(onFocus.callCount).to.equal(1);
    expect(onFocus.getCall(0).args[0].target.value).to.equal('');

    expect(onEvent.callCount).to.equal(1);
    expect(onEvent.getCall(0).args).to.deep.equal([
      {
        externalId: 'test.input',
        type: 'focus',
        payload: {},
      },
    ]);
  });

  it('should pass externalValues as payload on the event', () => {
    const onEvent = stub();
    const app = mount(
      <AnalyticsProvider onEvent={onEvent}>
        <WrappedExample
          externalId="test.input"
          externalValues={{ foo: 'bar' }}
        />
      </AnalyticsProvider>
    );

    app.find('input').simulate('focus');

    expect(onEvent.callCount).to.equal(1);
    expect(onEvent.getCall(0).args).to.deep.equal([
      {
        externalId: 'test.input',
        type: 'focus',
        payload: { foo: 'bar' },
      },
    ]);
  });
});
