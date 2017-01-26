import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Tag from 'ak-tag';
import TagGroup from '../src';
import styles from '../src/styles.less';

chai.should();
describe('ak-tag-group', () => {
  it('should export a base component', () => {
    shallow(<TagGroup><Tag text="test" /></TagGroup>).should.be.an.instanceof(Object);
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
      wrapper.html().contains(tagName).should.be.equal(true);
    });
  });

  it('should apply the .endAligned class when aligment prop is set to end', () => {
    shallow(<TagGroup><Tag text="test" /></TagGroup>).hasClass(styles.locals.endAligned).should.equal(false);
    shallow(<TagGroup alignment="end"><Tag text="test" /></TagGroup>).hasClass(styles.locals.endAligned).should.equal(true);
  });
});
