import React, { PureComponent } from 'react';
import { shallow, mount } from 'enzyme';
import GlobalPrimaryActionsList from '../../src/components/js/GlobalPrimaryActionsList';

const describe = window.describe;
const it = window.it;

class Child extends PureComponent {
  render() {
    return <div>Hi there</div>;
  }
}

describe('<GlobalPrimaryActionsList />', () => {
  let spy;

  beforeEach(() => {
    spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockReset();
    spy.mockRestore();
  });

  it('should render action items', () => {
    const wrapper = shallow(
      <GlobalPrimaryActionsList
        actions={[<Child />, <Child />, <Child />]}
      />
    );

    expect(wrapper.find(Child).length).toBe(3);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call console.error if attempting to mount with more than 3 actions', () => {
    shallow(
      <GlobalPrimaryActionsList
        actions={[<Child />, <Child />, <Child />, <Child />]}
      />
    );
    expect(spy).toHaveBeenCalled();
  });

  it('should not call console.error if attempting to update with 3 or fewer actions', () => {
    const wrapper = shallow(
      <GlobalPrimaryActionsList actions={[]} />
    );
    wrapper.setProps({
      actions: [<Child />, <Child />, <Child />],
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should call console.error if attempting to update with more than 3 actions', () => {
    const wrapper = shallow(
      <GlobalPrimaryActionsList actions={[]} />
    );
    wrapper.setProps({
      actions: [<Child />, <Child />, <Child />, <Child />],
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should only render up to 3 actions', () => {
    const actions = [<Child />, <Child />, <Child />, <Child />];
    const wrapper = mount(
      <GlobalPrimaryActionsList
        actions={actions}
      />
    );
    const children = wrapper.find(Child);
    expect(children.length).toBe(3);
    expect(spy).toHaveBeenCalled();
  });
});
