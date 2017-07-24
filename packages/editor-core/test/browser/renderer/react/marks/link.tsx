import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Link from '../../../../../src/renderer/react/marks/link';

describe('Renderer - React/Marks/Link', () => {
  const mark = mount(<Link href="https://www.atlassian.com" target="_blank">This is a link</Link>);

  it('should wrap content with <a>-tag', () => {
    expect(mark.find('a').length).to.equal(1);
  });

  it('should set href to attrs.href', () => {
    expect(mark.find('a').props()).to.have.property('href', 'https://www.atlassian.com');
  });

  it('should set target to _blank', () => {
    expect(mark.find('a').props()).to.have.property('target', '_blank');
  });

  it('should set target to _blank by default', () => {
    const mark = mount(<Link href="https://www.atlassian.com">This is a link</Link>);
    expect(mark.find('a').props()).to.have.property('target', '_blank');
  });

  it('should set target to whatever props.target was', () => {
    const mark = mount(<Link href="https://www.atlassian.com" target="_top">This is a link</Link>);
    expect(mark.find('a').props()).to.have.property('target', '_top');
  });
});
