import * as chai from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import { chaiPlugin } from '@atlaskit/editor-core/dist/es5/test-helper';
import Editor from '../src';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/editor-cq: expanded and isExpanded behaviour', () => {
  it('should render collapsed chrome if neither isExpandedByDefault not expanded is set', () => {
    expect(mount(<Editor />).find('ChromeCollapsed')).to.have.length.above(0);
  });

  it('should render expanded chrome if only isExpandedByDefault is set', () => {
    expect(mount(<Editor isExpandedByDefault={true} />).find('ChromeExpanded')).to.have.length.above(0);
  });

  it('should render expanded chrome if only expanded is set', () => {
    expect(mount(<Editor expanded={true} />).find('ChromeExpanded')).to.have.length.above(0);
  });

  it('should have higher priority for expanded over isExpandedByDefault', () => {
    expect(
      mount(<Editor expanded={false} isExpandedByDefault={true} />).find('ChromeCollapsed')
    ).to.have.length.above(0);
  });

  it('should expand chrome if expanded has been changed', () => {
    const node = mount(<Editor isExpandedByDefault={true} />);
    expect(node.find('ChromeExpanded')).to.have.length.above(0);

    node.setProps({ expanded: false });
    expect(node.find('ChromeCollapsed')).to.have.length.above(0);
  });
});
