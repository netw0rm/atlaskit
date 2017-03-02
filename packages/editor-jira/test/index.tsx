import * as chai from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { chaiPlugin } from '@atlaskit/editor-core/test-helper';
import Editor from '../src/index';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/editor-jira expand and collapse', () => {
  it('should not render expanded chrome when collapsed by default', () => {
    expect(mount(<Editor />).find('ChromeCollapsed')).to.have.length.above(0);
    expect(mount(<Editor />).find('input[placeholder]')).to.have.length.above(0);
    expect(mount(<Editor />).find('ChromeExpanded').length).to.equal(0);
  });

  it('should respect defaultExpanded property', () => {
    expect(mount(<Editor isExpandedByDefault />).find('ChromeCollapsed').length).to.equal(0);
    expect(mount(<Editor isExpandedByDefault />).find('ChromeExpanded')).to.have.length.above(0);
  });

  it('should expand after clicking', () => {
    const editorWrapper = mount(<Editor />);

    editorWrapper.find('ChromeCollapsed input').simulate('focus');

    expect(editorWrapper.find('ChromeCollapsed').length).to.equal(0);
    expect(editorWrapper.find('ChromeExpanded')).to.have.length.above(0);
  });

  it('.expand() method should expand the editor chrome', () => {
    const editorWrapper = mount(<Editor />);
    const editor: Editor = editorWrapper.get(0) as any;

    editor.expand();

    expect(editorWrapper.find('ChromeCollapsed').length).to.equal(0);
    expect(editorWrapper.find('ChromeExpanded')).to.have.length.above(0);
  });

  it('.collapse() method should collapse the editor chrome', () => {
    const editorWrapper = mount(<Editor isExpandedByDefault />);
    const editor: Editor = editorWrapper.get(0) as any;

    editor.collapse();

    expect(editorWrapper.find('ChromeCollapsed')).to.have.length.above(0);
    expect(editorWrapper.find('ChromeExpanded').length).to.equal(0);
  });

  it('should call onExpanded after editor is expanded via click', () => {
    const spy = sinon.spy();
    const editorWrapper = mount(<Editor onExpanded={spy}/>);

    editorWrapper.find('ChromeCollapsed input').simulate('focus');
    expect(spy.callCount).to.equal(1);
  });

  it('should call onExpanded after editor is expanded via .expand()', () => {
    const spy = sinon.spy();
    const editorWrapper = mount(<Editor onExpanded={spy}/>);
    const editor: Editor = editorWrapper.get(0) as any;

    editor.expand();

    expect(spy.callCount).to.equal(1);
  });
});
