import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Trigger from '../../src/internal/trigger';

const noop = () => {};

describe('@atlaskit/reactions/trigger', () => {

  it('should render a button', () => {
    const trigger = shallow(<Trigger onClick={noop} />);
    expect(trigger.find('button').length).toBe(1);
  });

  it('should add "miniMode" css-class when miniMode is true', () => {
    const trigger = shallow(<Trigger miniMode={true} onClick={noop} />);
    expect(trigger.hasClass('miniMode')).toBe(true);
  });

  it('should call "onClick" when clicked', () => {
    const onClick = jest.fn();
    const trigger = mount(<Trigger onClick={onClick} />);
    trigger.simulate('mousedown', { button: 0 });
    expect(onClick).toHaveBeenCalled();
  });

});
