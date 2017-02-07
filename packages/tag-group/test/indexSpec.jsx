import React from 'react';
import { shallow, mount } from 'enzyme';
import Tag from '@atlaskit/tag';
import TagGroup from '../src';
import styles from '../src/styles.less';

describe('Tag-group', () => {
  it('should export a base component', () => {
    shallow(<TagGroup><Tag text="test" /></TagGroup>).should.be.an.instanceof(Object);
  });

  it('should render supplied tags', () => {
    const tags = ['Candy canes', 'Tiramisu', 'Gummi bears'];

    const wrapper = mount(
      <TagGroup>
        {
          tags.map(tagName => <Tag key={tagName} text={tagName} />)
        }
      </TagGroup>
    );

    wrapper.text().should.be.equal(tags.join(''));
  });

  it('should apply the .endAligned class when aligment prop is set to end', () => {
    shallow(<TagGroup><Tag text="test" /></TagGroup>).hasClass(styles.locals.endAligned).should.equal(false);
    shallow(<TagGroup alignment="end"><Tag text="test" /></TagGroup>).hasClass(styles.locals.endAligned).should.equal(true);
  });
});
