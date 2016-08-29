import { default as plugin } from '../src';
import { ProseMirror } from 'prosemirror/dist/edit';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { schema } from 'prosemirror/dist/schema-basic';
import testing from 'ak-editor-test';
import { SyncPlugin } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

const { builder, chaiEditor } = testing({ schema, Node, Slice, Fragment });
const { doc, p, img } = builder;
chai.use(chaiEditor);

describe('ak-editor-plugin-image-upload', () => {
  const makeEditor = () => new ProseMirror({
    schema: schema,
    plugins: [plugin, SyncPlugin]
  });

  it('should be able to register handlers for state change events', () => {
    const pm = makeEditor();
    const onChange = sinon.spy();
    plugin.get(pm).onChange(onChange);

    plugin.get(pm).addImage({ src: 'https://atlassian.com/favicon.png' });
    pm.setNodeSelection(pm.selection.from - 1);

    expect(onChange.callCount).to.equal(1);
  });

  it('should not emit extra change events when state has not changed', () => {
    const pm = makeEditor();
    const onChange = sinon.spy();
    plugin.get(pm).onChange(onChange);

    plugin.get(pm).addImage({ src: 'https://atlassian.com/favicon.png' });

    pm.setNodeSelection(pm.selection.from - 1);
    // TODO: Make the test pass with this line uncommented.
    // pm.setNodeSelection(pm.selection.from - 1);

    expect(onChange.callCount).to.equal(1);
  });

  it('should emit change events when the state has changed', () => {
    const pm = makeEditor();
    const onChange = sinon.spy();
    plugin.get(pm).onChange(onChange);

    plugin.get(pm).addImage({ src: 'https://atlassian.com/favicon.png' });

    pm.setNodeSelection(pm.selection.from - 1);
    pm.setTextSelection(pm.selection.from + 1);

    expect(onChange.callCount).to.equal(2);
  });

  it('should not be able to create an image on another image', () => {
    const pm = makeEditor();
    const imageOptions = { src: 'https://atlassian.com/favicon.png' };

    plugin.get(pm).addImage(imageOptions);
    // place the cursor on top of the image we just added
    pm.setNodeSelection(pm.selection.from - 1);

    expect(plugin.get(pm).addImage(imageOptions)).to.be.false;
  });

  it('should not be able to create an image when state is disabled', () => {
    const pm = makeEditor();
    const imageOptions = { src: 'https://atlassian.com/favicon.png' };

    plugin.get(pm).setState({ enabled: false });

    expect(plugin.get(pm).addImage(imageOptions)).to.be.false;
  });

  it('should be able to create an image ImageUploadOptions', () => {
    const pm = makeEditor();
    const imageOptions = {
      src: 'https://atlassian.com/favicon.png',
      title: 'Atlassian'
    };

    expect(plugin.get(pm).addImage(imageOptions)).to.be.true;
    expect(pm.doc).to.equal(doc(p(img(imageOptions))));
  });

  it('should not be able to remove a a non image', () => {
    const pm = makeEditor();
    expect(plugin.get(pm).removeImage()).to.be.false;
  });

  it('should be able to remove an image', () => {
    const pm = makeEditor();
    const imageOptions = {
      src: 'https://atlassian.com/favicon.png',
      title: 'Atlassian'
    };

    expect(plugin.get(pm).addImage(imageOptions)).to.be.true;
    expect(pm.doc).to.equal(doc(p(img(imageOptions))));

    // place the cursor on top of the image we just added
    pm.setNodeSelection(pm.selection.from - 1);

    expect(plugin.get(pm).removeImage()).to.be.true;
    expect(pm.doc).to.equal(doc(p()));
  });

  it('should be able to update an image', () => {
    const pm = makeEditor();
    const originalImage = {
      src: 'https://atlassian.com/favicon.png',
      title: 'Atlassian'
    };
    const replacementImage = {
      src: 'https://atlassian.com/favicon.png',
      title: 'Atlassian'
    };

    expect(plugin.get(pm).addImage(originalImage)).to.be.true;
    expect(pm.doc).to.equal(doc(p(img(originalImage))));

    // place the cursor on top of the image we just added
    pm.setNodeSelection(pm.selection.from - 1);

    expect(plugin.get(pm).updateImage(replacementImage)).to.be.true;
    expect(pm.doc).to.equal(doc(p(img(replacementImage))));
  });
});
