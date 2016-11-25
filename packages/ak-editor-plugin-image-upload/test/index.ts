import ImageUploadPlugin from '../src';
import { chaiPlugin, makeEditor, doc, p, img } from 'ak-editor-test';
import { default as chai, expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(chaiPlugin);
chai.use(sinonChai);

describe('ak-editor-plugin-image-upload', () => {
  const testImgSrc = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
  const testImg = () => img({ src: testImgSrc });
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: ImageUploadPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const Plugin = ImageUploadPlugin as any; // .State is not public API.
    expect(Plugin.State.name).is.be.a('string');
  });

  it('allows change handler to be registered', () => {
    const { plugin } = editor(doc(p('')));

    plugin.subscribe(sinon.spy());
  });

  it('allows an image to be added at the current collapsed selection', () => {
    const { pm, plugin } = editor(doc(p('{<>}')));

    expect(plugin.addImage({ src: testImgSrc })).to.be.true;
    expect(pm.doc).to.deep.equal(doc(p(testImg())));
  });

  it('should get current state immediately once subscribed', () => {
    const { pm, plugin, sel } = editor(doc(p('{<>}', testImg())));
    const spy = sinon.spy();
    plugin.subscribe(spy);

    expect(spy).to.have.been.callCount(1);

    expect(spy).to.have.been.calledWith({
      active: false,
      alt: "",
      enabled: true,
      src: "",
      title: "",
    });
  });

  it('emits a change when an image is selected', () => {
    const { pm, plugin, sel } = editor(doc(p('{<>}', testImg())));
    const spy = sinon.spy();
    plugin.subscribe(spy);

    pm.setNodeSelection(sel);

    expect(spy).to.have.been.callCount(2);
  });

  it('does not emit multiple changes when an image is not selected', () => {
    const { pm, plugin } = editor(doc(p('{<>}t{a}e{b}st', testImg())));
    const { a, b } = pm.doc.refs;
    const spy = sinon.spy();
    plugin.subscribe(spy);

    pm.setTextSelection(a);
    pm.setTextSelection(b);

    expect(spy).to.have.been.callCount(1);
  });

  it('does not emit multiple changes when an image is selected multiple times', () => {
    const { pm, plugin, sel } = editor(doc(p('{<>}', testImg())));
    const spy = sinon.spy();

    plugin.subscribe(spy);

    expect(spy).to.have.been.callCount(1);
  });

  it('emits a change event when selection leaves an image', () => {
    const { pm, plugin, sel } = editor(doc(p('{a}test{<>}', testImg())));
    const { a } = pm.doc.refs;
    const spy = sinon.spy();
    pm.setNodeSelection(sel);
    plugin.subscribe(spy);

    pm.setTextSelection(a);

    expect(spy).to.have.been.callCount(2);
  });

  it('does not permit an image to be added when an image is selected', () => {
    const { pm, plugin, sel } = editor(doc(p('{<>}', testImg())));
    pm.setNodeSelection(sel);

    expect(plugin.addImage({ src: testImgSrc })).to.be.false;
    expect(pm.doc).to.deep.equal(doc(p(testImg())));
  });

  it('does not permit an image to be added when the state is disabled', () => {
    const { pm, plugin } = editor(doc(p('{<>}')));

    plugin.setState({ enabled: false });

    expect(plugin.addImage({ src: testImgSrc })).to.be.false;
    expect(pm.doc).to.deep.equal(doc(p()));
  });

  it('does not permit an image to be removed at a collapsed text selection', () => {
    const { plugin } = editor(doc(p('test{<>}')));

    expect(plugin.removeImage()).to.be.false;
  });

  it('can remove a selected image', () => {
    const { pm, plugin, sel } = editor(doc(p('{<>}', testImg())));
    pm.setNodeSelection(sel);

    expect(plugin.removeImage()).to.be.true;
    expect(pm.doc).to.deep.equal(doc(p()));
  });

  it('can update a selected image', () => {
    const { pm, plugin, sel } = editor(doc(p('{<>}', testImg())));
    pm.setNodeSelection(sel);

    const replacementImage = {
      src: 'atlassian.png',
      title: 'Atlassian'
    };

    expect(plugin.updateImage(replacementImage)).to.be.true;
    expect(pm.doc).to.deep.equal(doc(p(img(replacementImage))));
  });
});
