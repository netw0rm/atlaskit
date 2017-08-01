import * as React from 'react';
import {shallow} from 'enzyme';
import {Ellipsify} from '../../../src/utils/ellipsify';
import {TruncateWrapper, OldWrapper} from '../../../src/utils/ellipsify/styled';

describe('Ellipsify', () => {

  it('should render the old Ellipsify component when old=true', () => {
    const element = shallow(<Ellipsify lines={2} hasStyledCharacters={true}/>);
    expect(element.type()).toBe(OldWrapper);
  });

  it('should render the new Ellipsify component when old=false', () => {
    const element = shallow(<Ellipsify lines={2} hasStyledCharacters={false}/>);
    expect(element.type()).toBe(TruncateWrapper);
  });

});
