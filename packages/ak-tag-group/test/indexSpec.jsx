import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import Tag from 'ak-tag';
import TagGroup from '../src';

chai.should();
chai.use(chaiEnzyme());

describe('ak-tag-group', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      shallow(<TagGroup><Tag text="test" /></TagGroup>).should.be.an.instanceof(Object);
    });
  });

  it('should render supplied tags', () => {
    const tags = ['Candy canes', 'Tiramisu', 'Gummi bears'];

    const wrapper = shallow(
      <TagGroup>
        {
          tags.map(tagName => <Tag key={tagName} text={tagName} />)
        }
      </TagGroup>
    );

    tags.forEach((tagName) => {
      wrapper.html().should.contain(tagName);
    });
  });
});
