import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Doc from '../../src/nodes/doc';

describe('<Doc/>', () => {
  const paragraph = shallow(<Doc>This is an empty document</Doc>);

  it('should wrap content with <div>-tag', () => {
    expect(paragraph.is('div')).to.equal(true);
  });

  it('should output correct html', () => {
    expect(paragraph.html()).to.equal('<div>This is an empty document</div>');
  });
});
