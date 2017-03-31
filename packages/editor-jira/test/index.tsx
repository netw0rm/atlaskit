import * as chai from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { chaiPlugin } from '@atlaskit/editor-core/dist/es5/test-helper';
import Editor from '../src/index';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/editor-jira expand and collapse', () => {
  it('should not render expanded chrome when collapsed by default', () => {
    const wrapper = mount(<Editor />);
    expect(wrapper.find('ChromeCollapsed')).to.have.length.above(0);
    expect(wrapper.find('input[placeholder]')).to.have.length.above(0);
    expect(wrapper.find('ChromeExpanded').length).to.equal(0);
    wrapper.unmount();
  });

  it('should respect defaultExpanded property', () => {
    const wrapper = mount(<Editor isExpandedByDefault />);
    expect(wrapper.find('ChromeCollapsed').length).to.equal(0);
    expect(wrapper.find('ChromeExpanded')).to.have.length.above(0);
    wrapper.unmount();
  });

  it('should expand after clicking', () => {
    const editorWrapper = mount(<Editor />);

    editorWrapper.find('ChromeCollapsed input').simulate('focus');

    expect(editorWrapper.find('ChromeCollapsed').length).to.equal(0);
    expect(editorWrapper.find('ChromeExpanded')).to.have.length.above(0);
    editorWrapper.unmount();
  });

  it('.expand() method should expand the editor chrome', () => {
    const editorWrapper = mount(<Editor />);
    const editor: Editor = editorWrapper.get(0) as any;

    editor.expand();

    expect(editorWrapper.find('ChromeCollapsed').length).to.equal(0);
    expect(editorWrapper.find('ChromeExpanded')).to.have.length.above(0);
    editorWrapper.unmount();
  });

  it('.collapse() method should collapse the editor chrome', () => {
    const editorWrapper = mount(<Editor isExpandedByDefault />);
    const editor: Editor = editorWrapper.get(0) as any;

    editor.collapse();

    expect(editorWrapper.find('ChromeCollapsed')).to.have.length.above(0);
    expect(editorWrapper.find('ChromeExpanded').length).to.equal(0);
    editorWrapper.unmount();
  });

  it('should call onExpanded after editor is expanded via click', () => {
    const spy = sinon.spy();
    const editorWrapper = mount(<Editor onExpanded={spy}/>);

    editorWrapper.find('ChromeCollapsed input').simulate('focus');
    expect(spy.callCount).to.equal(1);
    editorWrapper.unmount();
  });

  it('should call onExpanded after editor is expanded via .expand()', () => {
    const spy = sinon.spy();
    const editorWrapper = mount(<Editor onExpanded={spy}/>);
    const editor: Editor = editorWrapper.get(0) as any;

    editor.expand();

    expect(spy.callCount).to.equal(1);
    editorWrapper.unmount();
  });

  describe('feature flags', () => {
    it('should enable mentions if mentionProvider exists', () => {
      const editorWrapper = mount(<Editor mentionProvider={Promise.resolve({})}/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.nodes.mention).to.exist;
      expect(editor.state.schema.marks.mention_query).to.exist;
      editorWrapper.unmount();
    });

    it('should not enable mentions if mentionProvider doesn`t exist', () => {
      const editorWrapper = mount(<Editor/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.nodes.mention).to.not.exist;
      expect(editor.state.schema.marks.mention_query).to.not.exist;
      editorWrapper.unmount();
    });

    it('allowLists=true prop should enable lists', () => {
      const editorWrapper = mount(<Editor allowLists={true}/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.nodes.bullet_list).to.exist;
      editorWrapper.unmount();
    });

    it('lists should be disabled without allowLists prop', () => {
      const editorWrapper = mount(<Editor/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.nodes.bullet_list).to.not.exist;
      editorWrapper.unmount();
    });

    it('allowLinks=true prop should enable links', () => {
      const editorWrapper = mount(<Editor allowLinks={true}/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.marks.link).to.exist;
      editorWrapper.unmount();
    });

    it('links should be disabled without allowLinks prop', () => {
      const editorWrapper = mount(<Editor/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.marks.link).to.not.exist;
      editorWrapper.unmount();
    });

    it('allowAdvancedTextFormatting=true prop should enable advanced text formatting features', () => {
      const editorWrapper = mount(<Editor allowAdvancedTextFormatting={true}/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.marks.code).to.exist;
      expect(editor.state.schema.marks.strike).to.exist;
      editorWrapper.unmount();
    });

    it('advanced text formatting features should be disabled without allowAdvancedTextFormatting prop', () => {
      const editorWrapper = mount(<Editor/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.marks.code).to.not.exist;
      expect(editor.state.schema.marks.strike).to.not.exist;
      editorWrapper.unmount();
    });

    it('allowCodeBlock=true prop should enable code blocks', () => {
      const editorWrapper = mount(<Editor allowCodeBlock={true}/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.nodes.code_block).to.exist;
      editorWrapper.unmount();
    });

    it('code blocks should be disabled without allowCodeBlock prop', () => {
      const editorWrapper = mount(<Editor/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.nodes.code_block).to.not.exist;
      editorWrapper.unmount();
    });
  });

});
