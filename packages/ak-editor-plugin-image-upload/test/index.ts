import ImageUploadPlugin from '../src';
import { chaiPlugin, makeEditor } from 'ak-editor-test';
import { default as chai, expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { doc, noimages, images, image, schema } from './_schema-builder';

chai.use(chaiPlugin);
chai.use(sinonChai);

describe('ak-editor-plugin-image-upload', () => {
  const testImgSrc = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
  const testImg = () => image({ src: testImgSrc });
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: ImageUploadPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const Plugin = ImageUploadPlugin as any; // .State is not public API.
    expect(Plugin.State.name).is.be.a('string');
  });

  it('allows change handler to be registered', () => {
    const { plugin } = editor(doc(images('')));

    plugin.subscribe(sinon.spy());
  });

  it('allows an image to be added at the current collapsed selection', () => {
    const { pm, plugin } = editor(doc(images('{<>}')));

    plugin.addImage({ src: testImgSrc });

    expect(pm.doc).to.deep.equal(doc(images(testImg())));
  });

  it('should get current state immediately once subscribed', () => {
    const { pm, plugin, sel } = editor(doc(images('{<>}', testImg())));
    const spy = sinon.spy();
    plugin.subscribe(spy);

    expect(spy).to.have.been.callCount(1);
    expect(plugin).to.have.property('active', false);
    expect(plugin).to.have.property('enabled', true);
    expect(plugin).to.have.property('src', undefined);
    expect(plugin).to.have.property('element', undefined);
  });

  it('emits a change when an image is selected', () => {
    const { pm, plugin, sel } = editor(doc(images('{<>}', testImg())));
    const spy = sinon.spy();
    plugin.subscribe(spy);

    pm.setNodeSelection(sel);

    expect(spy).to.have.been.callCount(2);
  });

  it('does not emit multiple changes when an image is not selected', () => {
    const { pm, plugin } = editor(doc(images('{<>}t{a}e{b}st', testImg())));
    const { a, b } = pm.doc.refs;
    const spy = sinon.spy();
    plugin.subscribe(spy);

    pm.setTextSelection(a);
    pm.setTextSelection(b);

    expect(spy).to.have.been.callCount(1);
  });

  it('does not emit multiple changes when an image is selected multiple times', () => {
    const { pm, plugin, sel } = editor(doc(images('{<>}', testImg())));
    const spy = sinon.spy();

    plugin.subscribe(spy);

    expect(spy).to.have.been.callCount(1);
  });

  it('emits a change event when selection leaves an image', () => {
    const { pm, plugin, sel } = editor(doc(images('{a}test{<>}', testImg())));
    const { a } = pm.doc.refs;
    const spy = sinon.spy();
    pm.setNodeSelection(sel);
    plugin.subscribe(spy);

    pm.setTextSelection(a);

    expect(spy).to.have.been.callCount(2);
  });

  it('does not permit an image to be added when an image is selected', () => {
    const { pm, plugin, sel } = editor(doc(images('{<>}', testImg())));
    pm.setNodeSelection(sel);

    plugin.addImage({ src: testImgSrc });

    expect(pm.doc).to.deep.equal(doc(images(testImg())));
  });

  it('does not permit an image to be added when the state is disabled', () => {
    const { pm, plugin } = editor(doc(noimages('{<>}')));

    plugin.addImage({ src: testImgSrc });

    expect(pm.doc).to.deep.equal(doc(noimages()));
  });

  it('does not permit an image to be removed at a collapsed text selection', () => {
    const { plugin } = editor(doc(images('test{<>}')));

    plugin.removeImage();
  });

  it('can remove a selected image', () => {
    const { pm, plugin, sel } = editor(doc(images('{<>}', testImg())));
    pm.setNodeSelection(sel);

    plugin.removeImage();

    expect(pm.doc).to.deep.equal(doc(images()));
  });

  it('can update a selected image', () => {
    const { pm, plugin, sel } = editor(doc(images('{<>}', testImg())));
    pm.setNodeSelection(sel);

    plugin.updateImage({ src: 'atlassian.png' });

    expect(pm.doc).to.deep.equal(doc(images(image({ src: 'atlassian.png' }))));
  });
});
