import React from 'react';
import { shallow, mount } from 'enzyme';
import Tag from '@atlaskit/tag';
import TagGroup from '../src';
import Container from '../src/styled/Container';

describe('Tag-group', () => {
  it('should export a base component', () => {
    shallow(<TagGroup><Tag text="test" /></TagGroup>).should.be.an.instanceof(Object);
  });

  it('should render supplied tags', () => {
    const tags = ['Candy canes', 'Tiramisu', 'Gummi bears'];

    const wrapper = mount(
      <TagGroup>
        {tags.map(tagName => <Tag key={tagName} text={tagName} />)}
      </TagGroup>
    );

    wrapper.text().should.be.equal(tags.join(''));
    wrapper.unmount();
  });

  it('should apply the .endAligned class when aligment prop is set to end', () => {
    const wrapper = mount(<TagGroup><Tag text="test" /></TagGroup>);
    const wrapperEnd = mount(<TagGroup alignment="end"><Tag text="test" /></TagGroup>);
    expect(
      wrapper.find(Container).prop('justify')
    ).to.equal('start');
    expect(
      wrapperEnd.find(Container).prop('justify')
    ).to.equal('end');
    wrapper.unmount();
    wrapperEnd.unmount();
  });
});
