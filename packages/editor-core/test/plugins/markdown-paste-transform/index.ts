import * as chai from 'chai';
import { expect } from 'chai';
import { isLinkMark } from '../../../src/schema';
import { Fragment, Slice } from '../../../src/prosemirror';
import MarkdownPasteTransformPlugin from '../../../src/plugins/markdown-paste-transform';
import {
  chaiPlugin, doc, makeEditor, p
} from '../../../src/test-helper';
chai.use(chaiPlugin);

describe('markdown-inputrules', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: MarkdownPasteTransformPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const plugin = MarkdownPasteTransformPlugin as any;
    expect(plugin.State.name).is.be.a('string');
  });

  it('should paste a simple text node as is', () => {
    const { plugin } = editor(doc());
    const node = p('testing');
    const fragment = new Fragment([node], node.nodeSize);
    const slice = new Slice(fragment, 0, 0);
    const newSlice = plugin.transformMarkdown(slice);
    expect(newSlice.size).to.equal(slice.size);
    expect(newSlice.content.childCount).to.equal(slice.content.childCount);
  });

  it('should paste a multiple blocks as is', () => {
    const { plugin } = editor(doc());
    const node = doc(p('testing1'), p('testing2'));
    const fragment = new Fragment([node], node.nodeSize);
    const slice = new Slice(fragment, 0, 0);
    const newSlice = plugin.transformMarkdown(slice);
    expect(newSlice.size).to.equal(slice.size);
    expect(newSlice.content.childCount).to.equal(slice.content.childCount);
    expect(newSlice.content.child(0).childCount).to.equal(slice.content.child(0).childCount);
  });

  it('should not paste content as is if it has link markdown in it', () => {
    const { plugin } = editor(doc());
    const node = p('testing[test](testurl)');
    const fragment = new Fragment([node], node.nodeSize);
    const slice = new Slice(fragment, 0, 0);
    const newSlice = plugin.transformMarkdown(slice);
    expect(newSlice.size).to.not.equal(slice.size);
    expect(newSlice.content.child(0).childCount).to.not.equal(slice.content.child(0).childCount);
  });

  it('should create link node if pasted text has link markdown in it', () => {
    const { plugin } = editor(doc());
    const node = p('testing[test](testurl)');
    const fragment = new Fragment([node], node.nodeSize);
    const slice = new Slice(fragment, 0, 0);
    const newSlice = plugin.transformMarkdown(slice);
    expect(newSlice.content.child(0).childCount).to.equal(2);
    expect(newSlice.content.child(0).child(1).marks.length).to.equal(1);
    expect(isLinkMark(newSlice.content.child(0).child(1).marks[0])).to.be.true;
  });

  it('should create correct link href when linkifying', () => {
    const { plugin } = editor(doc());
    const node = p('testing[test](testurl)');
    const fragment = new Fragment([node], node.nodeSize);
    const slice = new Slice(fragment, 0, 0);
    const newSlice = plugin.transformMarkdown(slice);
    expect(newSlice.content.child(0).child(1).marks[0].attrs.href).to.equal('testurl');
  });

  it('should create link node if pasted text has multiple link markdowns in it', () => {
    const { plugin } = editor(doc());
    const node = p('test[test](testurl)testing[rest](resturl)rest');
    const fragment = new Fragment([node], node.nodeSize);
    const slice = new Slice(fragment, 0, 0);
    const newSlice = plugin.transformMarkdown(slice);
    expect(newSlice.content.child(0).childCount).to.equal(5);
    expect(newSlice.content.child(0).child(1).marks.length).to.equal(1);
    expect(newSlice.content.child(0).child(1).marks[0].attrs.href).to.equal('testurl');
    expect(newSlice.content.child(0).child(3).marks[0].attrs.href).to.equal('resturl');
  });
});
