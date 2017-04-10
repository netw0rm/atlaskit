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

  describe('feature flags', () => {
    it('should enable mentions if mentionProvider exists', () => {
      const editorWrapper = mount(<Editor mentionProvider={Promise.resolve({})}/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.nodes.mention).to.exist;
      expect(editor.state.schema.marks.mentionQuery).to.exist;
    });

    it('should not enable mentions if mentionProvider doesn`t exist', () => {
      const editorWrapper = mount(<Editor/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.nodes.mention).to.not.exist;
      expect(editor.state.schema.marks.mentionQuery).to.not.exist;
    });

    it('allowLists=true prop should enable lists', () => {
      const editorWrapper = mount(<Editor allowLists={true}/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.nodes.bulletList).to.exist;
    });

    it('lists should be disabled without allowLists prop', () => {
      const editorWrapper = mount(<Editor/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.nodes.bulletList).to.not.exist;
    });

    it('allowLinks=true prop should enable links', () => {
      const editorWrapper = mount(<Editor allowLinks={true}/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.marks.link).to.exist;
    });

    it('links should be disabled without allowLinks prop', () => {
      const editorWrapper = mount(<Editor/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.marks.link).to.not.exist;
    });

    it('allowAdvancedTextFormatting=true prop should enable advanced text formatting features', () => {
      const editorWrapper = mount(<Editor allowAdvancedTextFormatting={true}/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.marks.code).to.exist;
      expect(editor.state.schema.marks.strike).to.exist;
    });

    it('advanced text formatting features should be disabled without allowAdvancedTextFormatting prop', () => {
      const editorWrapper = mount(<Editor/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.marks.code).to.not.exist;
      expect(editor.state.schema.marks.strike).to.not.exist;
    });

    it('allowCodeBlock=true prop should enable code blocks', () => {
      const editorWrapper = mount(<Editor allowCodeBlock={true}/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.nodes.codeBlock).to.exist;
    });

    it('code blocks should be disabled without allowCodeBlock prop', () => {
      const editorWrapper = mount(<Editor/>);
      const editor: Editor = editorWrapper.get(0) as any;
      expect(editor.state.schema.nodes.codeBlock).to.not.exist;
    });
  });

});
