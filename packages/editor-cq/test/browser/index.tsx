import * as chai from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {
  chaiPlugin,
  fixtures,
  fromHTML,
  makeEditor,
  sendKeyToPm,
  toDOM,
} from '@atlaskit/editor-core/dist/es5/test-helper';
import {
  blockquote,
  doc,
  h1,
  p,
} from './_schema-builder';
import Editor from '../../src';
import schema from '../../src/schema';
import unsupportedBlock from '../../src/schema/nodes/unsupportedBlock';
import unsupportedInline from '../../src/schema/nodes/unsupportedInline';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/editor-cq', () => {
  describe('expanded and isExpanded behaviour', () => {
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

  describe('ED-1410', () => {
    const fixture = fixtures();
    const editor = (doc: any) => makeEditor({
      doc,
      schema,
      place: fixture()
    });

    it('should split heading when Enter is pressed', () => {
      const { editorView } = editor(doc(h1('text{<>}')));

      sendKeyToPm(editorView, 'Enter');

      expect(editorView.state.doc).to.deep.equal(doc(h1('text'), p()));
    });

    it('should not break blockquote when Enter is pressed', () => {
      const { editorView } = editor(doc(blockquote(p('text{<>}'))));

      sendKeyToPm(editorView, 'Enter');

      expect(editorView.state.doc).to.deep.equal(doc(blockquote(p('text'), p())));
    });
  });

  describe('@atlaskit/editor-cq/schema unsupported nodes', () => {
    describe('parse HTML', () => {
      it('should work for unsupported block nodes', () => {
        const doc = fromHTML('<div data-node-type="unsupportedBlock" data-unsupported="block" data-unsupported-block-cxhtml="foobar"/>', schema);
        const unsupportedBlockNode = doc.firstChild!;

        expect(unsupportedBlockNode.type.spec).to.equal(unsupportedBlock);
        expect(unsupportedBlockNode.attrs.cxhtml).to.be.equal('foobar');
      });

      it('should work for unsupported inline nodes', () => {
        const doc = fromHTML('<div data-node-type="unsupportedInline" data-unsupported="inline" data-unsupported-inline-cxhtml="foobar"/>', schema);
        const paragraph = doc.firstChild!;
        const unsupportedInlineNode = paragraph.firstChild!;

        expect(unsupportedInlineNode.type.spec).to.equal(unsupportedInline);
        expect(unsupportedInlineNode.attrs.cxhtml).to.be.equal('foobar');
      });
    });

    describe('encode to html', () => {
      it('should work for unsupported block nodes', () => {
        const unsupportedBlockNode = schema.nodes.unsupportedBlock.create({ cxhtml: 'foobar' });
        const domNode = toDOM(unsupportedBlockNode, schema).firstChild as HTMLElement;

        expect(domNode.dataset.unsupported).to.be.equal('block');
        expect(domNode.dataset.unsupportedBlockCxhtml).to.be.equal('foobar');
      });

      it('should work for unsupported inline nodes', () => {
        const unsupportedInlineNode = schema.nodes.unsupportedInline.create({ cxhtml: 'foobar' });
        const domNode = toDOM(unsupportedInlineNode, schema).firstChild as HTMLElement;

        expect(domNode.dataset.unsupported).to.be.equal('inline');
        expect(domNode.dataset.unsupportedInlineCxhtml).to.be.equal('foobar');
      });
    });
  });
});

describe('@atlaskit/editor-cq/focus', () => {
  let editorWrapper: ReactWrapper<any, any>;

  beforeEach(() => {
    editorWrapper = mount(<Editor isExpandedByDefault={true} />);
  });

  afterEach(() => {
    editorWrapper.unmount();
  });

  it('should focus the editor if not already focused', () => {
    const editorInstance = editorWrapper.instance() as any;
    const hasFocusStub = sinon.stub(editorInstance.state.editorView, 'hasFocus').returns(false);
    const spy = sinon.stub(editorInstance.state.editorView, 'focus');
    editorInstance.focus();

    expect(spy.called).to.eq(true);
    hasFocusStub.restore();
    spy.restore();
  });

  it('should not try to focus when already focused', () => {
    const editorInstance = editorWrapper.instance() as any;
    const hasFocusStub = sinon.stub(editorInstance.state.editorView, 'hasFocus').returns(true);
    const spy = sinon.stub(editorInstance.state.editorView, 'focus');
    editorInstance.focus();

    expect(spy.called).to.eq(false);
    hasFocusStub.restore();
    spy.restore();
  });
});
