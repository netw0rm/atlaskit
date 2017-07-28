import * as React from 'react';
import { shallow } from 'enzyme';
import { CardGenericViewSmall } from '../../../src/utils/cardGenericViewSmall';

describe('CardGenericViewSmall', () => {
  it('should fire onClick when component is clicked', () => {
    const event = 'some-random-event';
    const handler = jest.fn();
    const card = shallow(<CardGenericViewSmall onClick={handler} />);

    card.simulate('click', event);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0]).toEqual(event);
  });

  it('should fire onMouseEnter when component is hovered', () => {
    const event = 'some-random-event';
    const handler = jest.fn();
    const card = shallow(<CardGenericViewSmall onMouseEnter={handler} />);

    card.simulate('mouseEnter', event);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0]).toEqual(event);
  });
});
