import ImageUploadPlugin from '../src';
import { chaiPlugin, makeEditor, doc, p, img } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

chai.use(chaiPlugin);

describe('ak-editor-plugin-image-upload', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: ImageUploadPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };
  const favicon = () => img({ src: 'favicon.png' });

  it('allows change handler to be registered', () => {
    const { plugin } = editor(doc(p('')));

    plugin.onChange(sinon.spy());
  });

  it('allows an image to be added at the current collapsed selection', () => {
    const { pm, plugin } = editor(doc(p('{<>}')));

    expect(plugin.addImage({ src: 'favicon.png' })).to.be.true;
    expect(pm.doc).to.deep.equal(doc(p(favicon())));
  });

  it('emits a change when an image is selected', () => {
    const { pm, plugin, sel } = editor(doc(p('{<>}', favicon())));
    const onChange = sinon.spy();
    plugin.onChange(onChange);

    pm.setNodeSelection(sel);

    expect(onChange.callCount).to.equal(1);
  });

  it('does not emit multiple changes when an image is not selected', () => {
    const { pm, plugin } = editor(doc(p('{<>}t{a}e{b}st', favicon())));
    const { a, b } = pm.doc.refs;
    const onChange = sinon.spy();
    plugin.onChange(onChange);

    pm.setTextSelection(a);
    pm.setTextSelection(b);

    expect(onChange.callCount).to.equal(0);
  });

  it('does not emit multiple changes when an image is selected multiple times', () => {
    const { pm, plugin, sel } = editor(doc(p('{<>}', favicon())));
    const onChange = sinon.spy();
    pm.setNodeSelection(sel);

    plugin.onChange(onChange);
    pm.setNodeSelection(sel);

    expect(onChange.callCount).to.equal(0);
  });

  it('emits a change event when selection leaves an image', () => {
    const { pm, plugin, sel } = editor(doc(p('{a}test{<>}', favicon())));
    const { a } = pm.doc.refs;
    const onChange = sinon.spy();
    pm.setNodeSelection(sel);
    plugin.onChange(onChange);

    pm.setTextSelection(a);

    expect(onChange.callCount).to.equal(1);
  });

  it('does not permit an image to be added when an image is selected', () => {
    const { pm, plugin, sel } = editor(doc(p('{<>}', favicon())));
    pm.setNodeSelection(sel);

    expect(plugin.addImage({ src: 'favicon.png' })).to.be.false;
    expect(pm.doc).to.deep.equal(doc(p(favicon())));
  });

  it('does not permit an image to be added when the state is disabled', () => {
    const { pm, plugin } = editor(doc(p('{<>}')));

    plugin.setState({ enabled: false });

    expect(plugin.addImage({ src: 'favicon.png' })).to.be.false;
    expect(pm.doc).to.deep.equal(doc(p()));
  });

  it('does not permit an image to be removed at a collapsed text selection', () => {
    const { plugin } = editor(doc(p('test{<>}')));

    expect(plugin.removeImage()).to.be.false;
  });

  it('can remove a selected image', () => {
    const { pm, plugin, sel } = editor(doc(p('{<>}', favicon())));
    pm.setNodeSelection(sel);

    expect(plugin.removeImage()).to.be.true;
    expect(pm.doc).to.deep.equal(doc(p()));
  });

  it('can update a selected image', () => {
    const { pm, plugin, sel } = editor(doc(p('{<>}', favicon())));
    pm.setNodeSelection(sel);

    const replacementImage = {
      src: 'atlassian.png',
      title: 'Atlassian'
    };

    expect(plugin.updateImage(replacementImage)).to.be.true;
    expect(pm.doc).to.deep.equal(doc(p(img(replacementImage))));
  });
});
